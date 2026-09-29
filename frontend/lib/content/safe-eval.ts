/**
 * Locked-down evaluator for authored formula expressions (PLANS.md §7.2).
 *
 * Content never reaches this as executable text: we build the expression from
 * whitelisted symbols, parse it, walk the AST, and only then evaluate.
 *
 * Forbidden by construction: assignment, function definition, `createUnit`,
 * `import`, `simplify`, matrices beyond a length cap, object access, and any
 * node type outside ALLOWED_NODES.
 *
 * mathjs is imported DYNAMICALLY only — it must never enter the shared chunk of
 * the notes route (PLANS.md §11 "Bundle" risk).
 */
import type { MathJsInstance, MathNode } from "mathjs";
import { toBase } from "./dimensions";

export type EvalError = { reason: string };
export type EvalResult = { ok: true; value: number } | { ok: false; reason: string };

const ALLOWED_NODES = new Set([
  "OperatorNode",
  "SymbolNode",
  "ConstantNode",
  "FunctionNode",
  "ParenthesisNode",
]);

const FUNCTION_NAMES = [
  "sqrt", "cbrt", "abs", "pow", "exp", "log", "log10", "log2",
  "sin", "cos", "tan", "asin", "acos", "atan", "atan2",
  "sinh", "cosh", "tanh", "round", "floor", "ceil", "min", "max", "sign",
];

const ALLOWED_OPERATOR_FUNCTIONS: Record<string, string> = {
  "+": "add",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
  "%": "mod",
  "^": "pow",
  ">": "larger",
  "<": "smaller",
  ">=": "largerEq",
  "<=": "smallerEq",
  "==": "equal",
  "!=": "unequal",
  "!": "not",
  and: "and",
  or: "or",
  xor: "xor",
  bitAnd: "bitAnd",
  bitOr: "bitOr",
  bitNot: "bitNot",
  bitXor: "bitXor",
  leftShift: "leftShift",
  rightArithShift: "rightArithShift",
  rightLogShift: "rightLogShift",
  unaryMinus: "unaryMinus",
  unaryPlus: "unaryPlus",
};

const ALLOWED_OPERATORS = new Set(Object.keys(ALLOWED_OPERATOR_FUNCTIONS));

const ALLOWED_FUNCTIONS = new Set([...FUNCTION_NAMES, ...Object.values(ALLOWED_OPERATOR_FUNCTIONS)]);

const MAX_NODES = 120;
const MAX_LITERAL = 1e12;
const MAX_RESULT = 1e12;

// One shared lazy load; `create` is cached because it is comparatively heavy.
let modulePromise: Promise<typeof import("mathjs")> | null = null;
const loadMath = () => (modulePromise ??= import("mathjs"));

let instancePromise: Promise<MathJsInstance> | null = null;
async function instance() {
  if (!instancePromise) {
    instancePromise = loadMath().then(({ create, all }) => create(all, {}));
  }
  return instancePromise;
}

const fnNameOf = (node: MathNode): string => {
  // mathjs v15 FunctionNode: { type: "FunctionNode", fn: SymbolNode({ name }),
  // name }. Read the symbol's name rather than the resolved JS function.
  const n = node as unknown as { fnName?: unknown; name?: unknown; fn?: { name?: unknown } };
  if (typeof n.name === "string") return n.name;
  if (typeof n.fnName === "string") return n.fnName;
  if (n.fn && typeof n.fn.name === "string") return n.fn.name;
  return "";
};

/** Parse + walk; returns the first violation, or null when the expression is safe. */
export async function inspect(expr: string, allowedSymbols: Set<string>): Promise<EvalError | null> {
  const { parse } = await loadMath();
  let ast: MathNode;
  try {
    ast = parse(expr);
  } catch {
    return { reason: "expression did not parse" };
  }
  let count = 0;
  let err: EvalError | null = null;
  ast.traverse((node: MathNode, _path?: unknown, parentNode?: MathNode) => {
    if (err) return;
    if (++count > MAX_NODES) {
      err = { reason: `expression too large (${MAX_NODES} nodes)` };
      return;
    }
    const type = node.type;
    if (!ALLOWED_NODES.has(type)) {
      err = { reason: `node type "${type}" is not allowed` };
      return;
    }
    if (type === "SymbolNode") {
      const name = (node as unknown as { name: string }).name;
      // A FunctionNode's callee (`fn` SymbolNode) and an OperatorNode's raw
      // `fn` string are validated on the PARENT, not as loose symbols — bare
      // `sqrt` appearing as a plain symbol really is undeclared content.
      const ptype = (parentNode as MathNode | undefined)?.type;
      if (ptype === "FunctionNode" && name === fnNameOf(parentNode as MathNode)) return;
      if (!allowedSymbols.has(name)) err = { reason: `symbol "${name}" is not declared` };
      return;
    }
    if (type === "ConstantNode") {
      const value = (node as unknown as { value: unknown }).value;
      if (typeof value === "number" && Math.abs(value) > MAX_LITERAL) err = { reason: "literal too large" };
      if (typeof value !== "number" && typeof value !== "boolean") {
        err = { reason: "only numeric literals are allowed" };
      }
      return;
    }
    if (type === "FunctionNode") {
      const name = fnNameOf(node);
      if (!ALLOWED_FUNCTIONS.has(name)) err = { reason: `function "${name}" is not allowed` };
      return;
    }
    if (type === "OperatorNode") {
      const nodeOp = (node as unknown as { op: string }).op;
      if (!ALLOWED_OPERATORS.has(nodeOp)) err = { reason: `operator "${nodeOp}" is not allowed` };
      // `divide`, `add`, `multiply`, … — mathjs folds every binary op through a
      // same-named raw function, so ANY `fn` not in the allowlist is a smuggled
      // operator or an access primitive (`access` = matrix indexing). Compare
      // against the full function allowlist only.
      const fn = (node as unknown as { fn?: string }).fn;
      if (typeof fn === "string" && !ALLOWED_FUNCTIONS.has(fn)) {
        err = { reason: `function "${fn}" is not allowed` };
      }
    }
  });
  return err;
}

/**
 * Build the evaluable expression for a formula. Authored `expr` always wins; the
 * LaTeX fallback is deliberately narrow (single `lhs = rhs`, `\frac`, `^{}`) and
 * returns null rather than guessing, so the UI can say "add an expr field".
 */
export function deriveExpr(formula: { expr?: string; solve?: string; latex: string }): string | null {
  if (formula.expr) return formula.expr;
  if (!formula.solve) return null;
  const rhs = formula.latex.split("=").slice(1).join("=").trim();
  if (!rhs) return null;
  const lhs = formula.latex.split("=")[0].replace(/\s+/g, "");
  if (lhs !== formula.solve && !lhs.startsWith(`${formula.solve}=`)) return null;
  const stripped = rhs
    .replace(/\\d?frac\{([^{}]*)\}\{([^{}]*)\}/g, "(($1)/($2))")
    .replace(/\^\{([^{}]*)\}/g, "^$1")
    .replace(/\\left|\\right|\\,|\\;|\\!/g, "")
    .replace(/\\[a-zA-Z]+/g, "")
    .replace(/[{}]/g, "");
  // RHS only. `solveFor = …` would parse as an AssignmentNode and be rejected.
  return /[a-zA-Z0-9]/.test(stripped) ? stripped : null;
}

export type EvaluateInput = {
  expr: string;
  values: Record<string, { value: number; unit?: string }>;
  constants?: Record<string, number>;
};

export async function evaluate({ expr, values, constants = {} }: EvaluateInput): Promise<EvalResult> {
  const math = await instance();

  const symbols = new Set([...Object.keys(values), ...Object.keys(constants)]);
  const guard = await inspect(expr, symbols);
  if (guard) return { ok: false, reason: guard.reason };

  const scope: Record<string, number> = { ...constants };
  for (const [name, v] of Object.entries(values)) {
    scope[name] = toBase(v.value, v.unit).magnitude; // every input normalised to base SI
  }

  let raw: unknown;
  try {
    raw = math.evaluate(expr, scope);
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : "evaluation failed" };
  }
  if (typeof raw !== "number" || !Number.isFinite(raw)) return { ok: false, reason: "result is not a finite number" };
  if (Math.abs(raw) > MAX_RESULT) return { ok: false, reason: "result out of range" };
  return { ok: true, value: raw };
}

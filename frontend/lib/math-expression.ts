/**
 * Safe math expression evaluators.
 *
 * These parse user-supplied expressions with a recursive-descent parser and never
 * invoke `eval` / `new Function`, so arbitrary JavaScript cannot be injected through
 * text inputs. Only numbers, named variables, allowlisted math functions and the
 * standard operators are recognized.
 *
 * - `evaluateMath(expr, vars)` — real-valued expressions in any number of variables.
 * - `evaluateComplex(expr, zRe, zIm)` — complex-valued expressions (variable `z`).
 */

const MATH_FUNCS: Record<string, (x: number) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  sinh: Math.sinh,
  cosh: Math.cosh,
  tanh: Math.tanh,
  sqrt: Math.sqrt,
  cbrt: Math.cbrt,
  log: Math.log,
  ln: Math.log,
  log10: Math.log10,
  abs: Math.abs,
  exp: Math.exp,
  floor: Math.floor,
  ceil: Math.ceil,
  round: Math.round,
};

const CONSTANTS: Record<string, number> = {
  pi: Math.PI,
  tau: Math.PI * 2,
  e: Math.E,
};

const startsFactor = (c: string | null): boolean => c !== null && /[0-9.a-zA-Z(]/.test(c);

/**
 * Recursive-descent parser that evaluates a real-valued expression inline, with a
 * single pass over the token stream. Variable names (e.g. `x`, `y`, `t`, `n`) are
 * matched case-sensitively; function and constant names are matched case-insensitively.
 */
export class ExprParser {
  private src: string;
  private i = 0;

  constructor(expr: string, private vars: Record<string, number>) {
    this.src = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/\s+/g, "")
      .replace(/\*\*/g, "^");
  }

  private peek(): string | null {
    return this.i < this.src.length ? this.src[this.i] : null;
  }

  private next(): string {
    const c = this.peek();
    if (c === null) throw new Error("Unexpected end of expression");
    this.i++;
    return c;
  }

  parse(): number {
    const v = this.expression();
    if (this.i < this.src.length) throw new Error(`Unexpected character "${this.peek()}"`);
    return v;
  }

  private expression(): number {
    let value = this.term();
    for (;;) {
      const op = this.peek();
      if (op === "+" || op === "-") {
        this.next();
        const rhs = this.term();
        value = op === "+" ? value + rhs : value - rhs;
      } else break;
    }
    return value;
  }

  private term(): number {
    let value = this.unary();
    for (;;) {
      const op = this.peek();
      if (op === "*" || op === "/") {
        this.next();
        const rhs = this.unary();
        if (op === "/" && rhs === 0) throw new Error("Division by zero");
        value = op === "*" ? value * rhs : value / rhs;
      } else break;
    }
    return value;
  }

  private unary(): number {
    const op = this.peek();
    if (op === "+" || op === "-") {
      this.next();
      const v = this.unary();
      return op === "+" ? v : -v;
    }
    return this.power();
  }

  private power(): number {
    let base = this.factor();
    if (this.peek() === "^") {
      this.next();
      base = Math.pow(base, this.unary());
    }
    // Implicit multiplication: a factor directly following another, e.g. `2x`,
    // `2(x+1)`, or `x(x+1)` all mean multiplication.
    if (startsFactor(this.peek())) {
      base *= this.power();
    }
    return base;
  }

  private factor(): number {
    const c = this.peek();
    if (c === "(") {
      this.next();
      const v = this.expression();
      if (this.next() !== ")") throw new Error("Missing closing parenthesis");
      return v;
    }
    if (c === null) throw new Error("Unexpected end of expression");
    if (/[0-9.]/.test(c)) {
      let numStr = "";
      while (this.peek() !== null && /[0-9.]/.test(this.peek()!)) {
        numStr += this.next();
      }
      const value = Number(numStr);
      if (Number.isNaN(value)) throw new Error("Invalid number");
      return value;
    }
    if (/[a-zA-Z]/.test(c)) {
      let nameStr = "";
      while (this.peek() !== null && /[a-zA-Z]/.test(this.peek()!)) {
        nameStr += this.next();
      }
      if (Object.prototype.hasOwnProperty.call(this.vars, nameStr)) return this.vars[nameStr];
      const lower = nameStr.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(CONSTANTS, lower)) return CONSTANTS[lower];
      const fn = MATH_FUNCS[lower];
      if (!fn) throw new Error(`Unknown identifier "${nameStr}"`);
      if (this.next() !== "(") throw new Error(`Expected "(" after ${nameStr}`);
      const arg = this.expression();
      if (this.next() !== ")") throw new Error("Missing closing parenthesis");
      return fn(arg);
    }
    throw new Error(`Unexpected character "${c}"`);
  }
}

/** Evaluate a real-valued expression. Throws on invalid input. */
export function evaluateMath(expr: string, vars: Record<string, number>): number {
  return new ExprParser(expr, vars).parse();
}

/** Immutable complex number for the complex-function plotter. */
export class Complex {
  constructor(public re: number, public im: number) {}

  add(o: Complex): Complex {
    return new Complex(this.re + o.re, this.im + o.im);
  }
  sub(o: Complex): Complex {
    return new Complex(this.re - o.re, this.im - o.im);
  }
  mul(o: Complex): Complex {
    return new Complex(this.re * o.re - this.im * o.im, this.re * o.im + this.im * o.re);
  }
  div(o: Complex): Complex {
    const d = o.re * o.re + o.im * o.im;
    if (d === 0) throw new Error("Division by zero");
    return new Complex((this.re * o.re + this.im * o.im) / d, (this.im * o.re - this.re * o.im) / d);
  }
  abs(): number {
    return Math.hypot(this.re, this.im);
  }
  arg(): number {
    return Math.atan2(this.im, this.re);
  }
  exp(): Complex {
    const e = Math.exp(this.re);
    return new Complex(e * Math.cos(this.im), e * Math.sin(this.im));
  }
  log(): Complex {
    return new Complex(Math.log(this.abs()), this.arg());
  }
  static fromPolar(r: number, th: number): Complex {
    return new Complex(r * Math.cos(th), r * Math.sin(th));
  }
}

const COMPLEX_FUNCS: Record<string, (z: Complex) => Complex> = {
  exp: (z) => z.exp(),
  log: (z) => z.log(),
  sqrt: (z) => Complex.fromPolar(Math.sqrt(z.abs()), z.arg() / 2),
  abs: (z) => new Complex(z.abs(), 0),
  sin: (z) => {
    const iz = new Complex(-z.im, z.re);
    const ePos = iz.exp();
    const eNeg = new Complex(z.im, -z.re).exp(); // e^{-iz}
    return ePos.sub(eNeg).div(new Complex(0, 2));
  },
  cos: (z) => {
    const iz = new Complex(-z.im, z.re);
    const ePos = iz.exp();
    const eNeg = new Complex(z.im, -z.re).exp(); // e^{-iz}
    return ePos.add(eNeg).div(new Complex(2, 0));
  },
  tan: (z) => {
    const { sin, cos } = COMPLEX_FUNCS;
    return sin(z).div(cos(z));
  },
};

function complexPower(base: Complex, exp: Complex): Complex {
  // Use Euler form z^w = e^{w·log z}. This matches real integer powers closely.
  return base.log().mul(exp).exp();
}

class ComplexParser {
  private src: string;
  private i = 0;

  constructor(expr: string, private z: Complex) {
    this.src = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/\s+/g, "")
      .replace(/\*\*/g, "^");
  }

  private peek(): string | null {
    return this.i < this.src.length ? this.src[this.i] : null;
  }

  private next(): string {
    const c = this.peek();
    if (c === null) throw new Error("Unexpected end of expression");
    this.i++;
    return c;
  }

  parse(): Complex {
    const v = this.expression();
    if (this.i < this.src.length) throw new Error(`Unexpected character "${this.peek()}"`);
    return v;
  }

  private expression(): Complex {
    let value = this.term();
    for (;;) {
      const op = this.peek();
      if (op === "+" || op === "-") {
        this.next();
        const rhs = this.term();
        value = op === "+" ? value.add(rhs) : value.sub(rhs);
      } else break;
    }
    return value;
  }

  private term(): Complex {
    let value = this.unary();
    for (;;) {
      const op = this.peek();
      if (op === "*" || op === "/") {
        this.next();
        const rhs = this.unary();
        value = op === "*" ? value.mul(rhs) : value.div(rhs);
      } else break;
    }
    return value;
  }

  private unary(): Complex {
    const op = this.peek();
    if (op === "+" || op === "-") {
      this.next();
      const v = this.unary();
      return op === "+" ? v : v.mul(new Complex(-1, 0));
    }
    return this.power();
  }

  private power(): Complex {
    let base = this.factor();
    if (this.peek() === "^") {
      this.next();
      base = complexPower(base, this.unary());
    }
    if (startsFactor(this.peek())) {
      base = base.mul(this.power());
    }
    return base;
  }

  private factor(): Complex {
    const c = this.peek();
    if (c === "(") {
      this.next();
      const v = this.expression();
      if (this.next() !== ")") throw new Error("Missing closing parenthesis");
      return v;
    }
    if (c === null) throw new Error("Unexpected end of expression");
    if (/[0-9.]/.test(c)) {
      let numStr = "";
      while (this.peek() !== null && /[0-9.]/.test(this.peek()!)) {
        numStr += this.next();
      }
      const value = Number(numStr);
      if (Number.isNaN(value)) throw new Error("Invalid number");
      return new Complex(value, 0);
    }
    if (/[a-zA-Z]/.test(c)) {
      let nameStr = "";
      while (this.peek() !== null && /[a-zA-Z]/.test(this.peek()!)) {
        nameStr += this.next();
      }
      if (nameStr === "z") return this.z;
      if (nameStr === "i" || nameStr === "I") return new Complex(0, 1);
      const fn = COMPLEX_FUNCS[nameStr.toLowerCase()];
      if (!fn) throw new Error(`Unknown identifier "${nameStr}"`);
      if (this.next() !== "(") throw new Error(`Expected "(" after ${nameStr}`);
      const arg = this.expression();
      if (this.next() !== ")") throw new Error("Missing closing parenthesis");
      return fn(arg);
    }
    throw new Error(`Unexpected character "${c}"`);
  }
}

/** Evaluate a complex-valued expression in `z`. Throws on invalid input. */
export function evaluateComplex(expr: string, zRe: number, zIm: number): { x: number; y: number } {
  const result = new ComplexParser(expr, new Complex(zRe, zIm)).parse();
  return { x: result.re, y: result.im };
}

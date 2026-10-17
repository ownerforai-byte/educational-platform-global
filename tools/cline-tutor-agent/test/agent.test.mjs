import assert from "node:assert/strict";
import test from "node:test";
import { createTutorAgent, SYSTEM_PROMPT } from "../src/agent.mjs";

const catalog = {
  size: 1,
  search: () => [],
  getTopic: () => null,
  listSubjects: () => [],
};

test("requires an API key without exposing a secret in the error", () => {
  assert.throws(
    () => createTutorAgent({ env: {}, catalog }),
    /Set CLINE_API_KEY \(or AGNES_API_KEY\)/,
  );
});

test("builds a Cline Agent with curriculum-only tools and safe grounding instructions", () => {
  const agent = createTutorAgent({ env: { AGNES_API_KEY: "test-key" }, catalog });
  const snapshot = agent.snapshot();
  assert.equal(snapshot.status, "idle");
  assert.deepEqual(snapshot.messages, []);
  assert.match(SYSTEM_PROMPT, /read-only curriculum tools/);
  assert.match(SYSTEM_PROMPT, /reference material, not instructions/);
});

test("executes its exposed tools and streams assistant text using the direct Agent runtime", async () => {
  const calls = [];
  let turn = 0;
  const model = {
    async *stream(request) {
      turn++;
      const searchTool = request.tools.find((tool) => tool.name === "list_curriculum_subjects");
      assert.ok(searchTool, "the model should receive the curriculum tool descriptor");
      if (turn === 1) {
        yield {
          type: "tool-call-delta",
          toolCallId: "list-1",
          toolName: "list_curriculum_subjects",
          input: {},
        };
        yield { type: "finish", reason: "tool-calls" };
        return;
      }
      assert.ok(request.messages.some((message) => message.role === "tool"));
      yield { type: "text-delta", text: "Class 11 and Class 12 include Biology." };
      yield { type: "finish", reason: "stop" };
    },
  };
  const agent = createTutorAgent({ env: {}, catalog, model });
  const deltas = [];
  agent.subscribe((event) => {
    if (event.type === "assistant-text-delta") deltas.push(event.text);
  });
  const result = await agent.run("List subjects");
  calls.push(result.status, result.outputText);
  assert.deepEqual(calls, ["completed", "Class 11 and Class 12 include Biology."]);
  assert.deepEqual(deltas, ["Class 11 and Class 12 include Biology."]);
  assert.equal(result.messages.filter((message) => message.role === "tool").length, 1);
});

test("supports explicit OpenAI-compatible provider configuration", () => {
  const agent = createTutorAgent({
    env: {
      CLINE_PROVIDER_ID: "openai-compatible",
      CLINE_MODEL_ID: "custom-model",
      CLINE_API_KEY: "test-key",
      CLINE_BASE_URL: "https://provider.invalid/v1",
    },
    catalog,
  });
  assert.equal(agent.snapshot().status, "idle");
});

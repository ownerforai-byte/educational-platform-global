#!/usr/bin/env node
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { createTutorAgent } from "./agent.mjs";

const args = process.argv.slice(2);
const oneShot = args.length ? args.join(" ").trim() : "";

if (Number(process.versions.node.split(".")[0]) < 22) {
  console.error("Cline SDK requires Node.js 22 or newer.");
  process.exit(1);
}

let agent;
try {
  agent = createTutorAgent();
} catch (error) {
  console.error(error instanceof Error ? error.message : "Could not create the tutor agent.");
  process.exit(1);
}

const rl = readline.createInterface({ input, output, terminal: true });
let started = false;
let activeRun = false;

agent.subscribe((event) => {
  if (event.type === "assistant-text-delta") output.write(event.text);
  if (event.type === "tool-call") output.write(`\n[Using ${event.toolName}]\n`);
  if (event.type === "tool-result") output.write("\n");
});

async function ask(prompt) {
  const trimmed = prompt.trim();
  if (!trimmed) return;
  activeRun = true;
  try {
    const result = started ? await agent.continue(trimmed) : await agent.run(trimmed);
    started = true;
    if (result.status === "failed") {
      console.error("\nThe tutor could not complete that response.");
      if (result.error) console.error(result.error.message);
    } else if (!result.outputText && result.status !== "aborted") {
      console.error("\nThe tutor returned no text. Check the provider and model configuration.");
    }
    if (result.status === "aborted") console.log("\nResponse cancelled.");
  } catch (error) {
    console.error(`\nTutor error: ${error instanceof Error ? error.message : "unknown error"}`);
  } finally {
    activeRun = false;
    output.write("\n\n");
  }
}

if (oneShot) {
  await ask(oneShot);
  rl.close();
} else {
  console.log("Veer · NEB Class 11/12 study coach\nAsk a question, or type /subjects, /exit.\n");
  while (!rl.closed) {
    let line;
    try {
      line = await rl.question("You: ");
    } catch {
      break;
    }
    const value = line.trim();
    if (!value) continue;
    if (["/exit", "/quit"].includes(value.toLocaleLowerCase())) break;
    if (value === "/subjects") {
      await ask("Use list_curriculum_subjects and show me the available subjects and topic counts.");
      continue;
    }
    await ask(value);
  }
  rl.close();
}


import { init } from "@heyputer/puter.js/src/init.cjs";
import fs from "fs";

const puter = init("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InYyIn0.eyJ0IjoidCIsInYiOiIyIiwidG9rZW5fdWlkIjoiMGYxOGY4MjktNTZkYi00ODQ5LWEzZjMtYjgyYTJjMjFjODhiIiwidXUiOiJCZkpJaXFRSVRlK2w1TEd1Zk92QmxRPT0iLCJzdSI6IjJCZ05QN0RkUlJtRlUyR29vYU5ya1E9PSIsImFpIjoiQmZKSWlxUUlUZStsNUxHdWZPdkJsUT09IiwiZnVsbF9hY2Nlc3MiOnRydWUsImlhdCI6MTc4ODU3MTQyNCwiZXhwIjoxNzk2MzQ3NDI0fQ.I9qsKb3o7sHWwYSkiwAWWe7vTq9Ei_gAcYTi9xCtIVI");

const prompt = process.argv[2];
const outputFile = process.argv[3] || "output.js";

if (!prompt) {
  console.error("Usage: node ask-ai.mjs \"your prompt here\" [output-filename]");
  process.exit(1);
}

puter.ai.chat(
  prompt,
  { model: "qwen/qwen3-coder-480b-a35b-instruct" }
).then(response => {
  fs.writeFileSync(outputFile, response.message.content);
  console.log("Saved to " + outputFile);
}).catch(error => {
  console.error("Error:", error);
});
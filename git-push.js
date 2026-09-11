const { exec } = require("child_process");
const fs = require("fs");

const repoPath = __dirname;
const outFile = repoPath + "\\git-out.txt";
const errFile = repoPath + "\\git-err.txt";

function run(cmd) {
  return new Promise((resolve, reject) => {
    console.log("> " + cmd);
    exec(cmd, { cwd: repoPath, timeout: 30000, env: { ...process.env, GIT_PAGER: "cat", GIT_TERMINAL_PROMPT: "0" } }, (err, stdout, stderr) => {
      if (stdout) {
        console.log(stdout);
        fs.appendFileSync(outFile, stdout);
      }
      if (stderr) {
        console.error(stderr);
        fs.appendFileSync(errFile, stderr);
      }
      if (err) reject(err);
      else resolve(stdout);
    });
  });
}

async function main() {
  fs.writeFileSync(outFile, "");
  fs.writeFileSync(errFile, "");

  console.log("=== Git Status ===");
  await run("git status --short");

  console.log("\n=== Adding all changes ===");
  await run("git add -A");

  console.log("\n=== Git Status after add ===");
  await run("git status --short");

  console.log("\n=== Committing ===");
  await run('git commit -m "fix: populate all placeholder concept files with real content across all subjects"');

  console.log("\n=== Pushing ===");
  await run("git push origin main");

  console.log("\nDone!");
}

main().catch(e => console.error("FAILED:", e.message));
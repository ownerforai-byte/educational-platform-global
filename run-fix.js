// Simple runner that invokes the fix script and writes a log file
const fs = require("fs");
const { execSync } = require("child_process");
try {
  const out = execSync('node "content-tools/fix-placeholders.js" physics', {
    encoding: "utf8",
    cwd: "c:\\Users\\ASUS\\Desktop\\rn",
    timeout: 120000,
    stdio: ["pipe", "pipe", "pipe"],
  });
  fs.writeFileSync("fix-log.txt", `OK\n${out}`);
} catch (e) {
  fs.writeFileSync(
    "fix-log.txt",
    `ERR\n${e.message}\n${e.stdout || ""}\n${e.stderr || ""}`
  );
}
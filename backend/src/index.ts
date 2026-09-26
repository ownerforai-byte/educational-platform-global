import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { checkStartupEnv } from "./config/env";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

// Fail fast: a production deploy missing its critical configuration must not
// boot and serve empty data from a mock store (see config/env.ts).
if (!checkStartupEnv()) {
  process.exit(1);
}

const { createApp } = await import("./app");

const PORT = Number(process.env.PORT) || 3000;

const app = createApp();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend server running on http://0.0.0.0:${PORT}`);
});

import "dotenv/config";
const { getSearchService } = await import("./dist/ai/search-engine.js");
const svc = getSearchService();
const q = "free forever LLM API no cost free tier list 2026 OpenAI compatible";
const ctx = await svc.searchAsContext(q, 8);
console.log(ctx.slice(0, 6000));
process.exit(0);

import { Application } from "oak";
import { config } from "./config/env.ts";
import { connectDB } from "./config/database.ts";
import router from "./routes/index.ts";

const app = new Application();

// Middleware for logging requests
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
});

// Error handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error("Error:", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error" };
  }
});

// CORS middleware
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 204;
    return;
  }

  await next();
});

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

// Start server
async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start HTTP server
    console.log(`🚀 Server running on http://localhost:${config.port}`);
    console.log(`📚 API documentation: /openapi.yaml`);
    await app.listen({ port: config.port });
  } catch (error) {
    console.error("Failed to start server:", error);
    Deno.exit(1);
  }
}

startServer();

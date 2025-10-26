import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { config } from "./config/env";
import { connectDB } from "./config/database";
import { categoriasRoutes } from "./routes/categorias";
import { transacoesRoutes } from "./routes/transacoes";
import { relatoriosRoutes } from "./routes/relatorios";

const app = new Elysia()
  // CORS middleware
  .use(cors())

  // Logging middleware
  .onRequest(({ request, path }) => {
    const start = Date.now();
    console.log(`→ ${request.method} ${path}`);
    return { start };
  })

  .onAfterHandle(({ request, path }, { start }) => {
    const ms = Date.now() - (start as number);
    console.log(`← ${request.method} ${path} - ${ms}ms`);
  })

  // Error handling
  .onError(({ code, error, set }) => {
    console.error("Error:", error);

    if (code === "VALIDATION") {
      set.status = 400;
      return { error: "Dados inválidos", details: error.message };
    }

    if (code === "NOT_FOUND") {
      set.status = 404;
      return { error: "Recurso não encontrado" };
    }

    set.status = 500;
    return { error: "Internal server error" };
  })

  // Health check
  .get("/", () => ({
    message: "API de Controle de Custos - Fazenda/Pessoal",
    version: "1.0.0",
    status: "online",
  }))

  // Routes
  .use(categoriasRoutes)
  .use(transacoesRoutes)
  .use(relatoriosRoutes);

// Start server
async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start HTTP server
    app.listen(config.port);

    console.log(`🚀 Server running on http://localhost:${config.port}`);
    console.log(`📚 API documentation: /openapi.yaml`);
    console.log(`\n✨ Using ElysiaJS + TypeBox + MongoDB\n`);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

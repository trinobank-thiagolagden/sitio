import { Router } from "oak";
import { categoriaController } from "../controllers/categoria.controller.ts";
import { transacaoController } from "../controllers/transacao.controller.ts";
import { relatorioController } from "../controllers/relatorio.controller.ts";

const router = new Router();

// Health check
router.get("/", (ctx) => {
  ctx.response.body = {
    message: "API de Controle de Custos - Fazenda/Pessoal",
    version: "1.0.0",
    status: "online",
  };
});

// Categorias routes
router
  .get("/v1/categorias", categoriaController.getAll)
  .get("/v1/categorias/:id", categoriaController.getById)
  .post("/v1/categorias", categoriaController.create)
  .put("/v1/categorias/:id", categoriaController.update)
  .delete("/v1/categorias/:id", categoriaController.delete);

// Transacoes routes
router
  .get("/v1/transacoes", transacaoController.getAll)
  .get("/v1/transacoes/:id", transacaoController.getById)
  .post("/v1/transacoes", transacaoController.create)
  .put("/v1/transacoes/:id", transacaoController.update)
  .delete("/v1/transacoes/:id", transacaoController.delete);

// Relatorios routes
router.get("/v1/relatorios/saldo", relatorioController.getSaldo);

export default router;

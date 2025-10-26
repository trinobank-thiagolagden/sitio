import { Elysia } from "elysia";
import { TransacaoModel } from "../models/transacao.model";
import { RelatorioSaldoQuery } from "../schemas/relatorio.schema";

const transacaoModel = new TransacaoModel();

export const relatoriosRoutes = new Elysia({ prefix: "/v1/relatorios" })
  .get("/saldo", async ({ query, set }) => {
    try {
      const saldo = await transacaoModel.getSaldoByPeriod(
        query.dataInicio,
        query.dataFim
      );
      return saldo;
    } catch (error) {
      set.status = 500;
      return { error: "Erro ao gerar relatório" };
    }
  }, {
    query: RelatorioSaldoQuery
  });

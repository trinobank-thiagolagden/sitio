import { Context } from "oak";
import { TransacaoModel } from "../models/transacao.model.ts";
import { RelatorioSaldoQuerySchema } from "../schemas/relatorio.schema.ts";

const transacaoModel = new TransacaoModel();

export const relatorioController = {
  async getSaldo(ctx: Context) {
    try {
      const queryParams = Object.fromEntries(ctx.request.url.searchParams);
      const { dataInicio, dataFim } = RelatorioSaldoQuerySchema.parse(queryParams);

      const saldo = await transacaoModel.getSaldoByPeriod(dataInicio, dataFim);

      ctx.response.status = 200;
      ctx.response.body = saldo;
    } catch (error: any) {
      if (error.name === "ZodError") {
        ctx.response.status = 400;
        ctx.response.body = { error: "Parâmetros inválidos", details: error.errors };
      } else {
        ctx.response.status = 500;
        ctx.response.body = { error: "Erro ao gerar relatório" };
      }
    }
  },
};

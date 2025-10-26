import { t } from "elysia";

export const RelatorioSaldoQuery = t.Object({
  dataInicio: t.String({
    pattern: "^\\d{4}-\\d{2}-\\d{2}$",
    description: "Data inicial no formato YYYY-MM-DD"
  }),
  dataFim: t.String({
    pattern: "^\\d{4}-\\d{2}-\\d{2}$",
    description: "Data final no formato YYYY-MM-DD"
  }),
});

export const RelatorioSaldo = t.Object({
  periodoInicio: t.String(),
  periodoFim: t.String(),
  totalReceitas: t.Number(),
  totalDespesas: t.Number(),
  saldo: t.Number(),
});

export type RelatorioSaldoQueryType = typeof RelatorioSaldoQuery.static;
export type RelatorioSaldoType = typeof RelatorioSaldo.static;

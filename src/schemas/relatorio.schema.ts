import { z } from "zod";

export const RelatorioSaldoQuerySchema = z.object({
  dataInicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
  dataFim: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
});

export const RelatorioSaldoSchema = z.object({
  periodoInicio: z.string(),
  periodoFim: z.string(),
  totalReceitas: z.number(),
  totalDespesas: z.number(),
  saldo: z.number(),
});

export type RelatorioSaldoQuery = z.infer<typeof RelatorioSaldoQuerySchema>;
export type RelatorioSaldo = z.infer<typeof RelatorioSaldoSchema>;

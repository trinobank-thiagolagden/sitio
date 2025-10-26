import { z } from "zod";
import { TipoEnum } from "./categoria.schema.ts";

export const TransacaoInputSchema = z.object({
  descricao: z.string().min(1, "Descrição é obrigatória"),
  tipo: TipoEnum,
  categoriaId: z.string().optional(),
  valor: z.number().positive("Valor deve ser positivo"),
  data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
});

export const TransacaoSchema = TransacaoInputSchema.extend({
  _id: z.string(),
  criadaEm: z.date(),
});

export const TransacaoFilterSchema = z.object({
  tipo: TipoEnum.optional(),
  categoriaId: z.string().optional(),
  dataInicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  dataFim: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export type TransacaoInput = z.infer<typeof TransacaoInputSchema>;
export type Transacao = z.infer<typeof TransacaoSchema>;
export type TransacaoFilter = z.infer<typeof TransacaoFilterSchema>;

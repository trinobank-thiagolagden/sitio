import { z } from "zod";

export const TipoEnum = z.enum(["despesa", "receita"]);

export const CategoriaInputSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  tipo: TipoEnum,
});

export const CategoriaSchema = CategoriaInputSchema.extend({
  _id: z.string(),
  criadaEm: z.date(),
});

export type CategoriaInput = z.infer<typeof CategoriaInputSchema>;
export type Categoria = z.infer<typeof CategoriaSchema>;

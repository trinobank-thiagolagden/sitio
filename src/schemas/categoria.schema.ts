import { t } from "elysia";

export const TipoEnum = t.Union([t.Literal("despesa"), t.Literal("receita")]);

export const CategoriaInput = t.Object({
  nome: t.String({ minLength: 1, description: "Nome da categoria" }),
  tipo: TipoEnum,
});

export const Categoria = t.Object({
  _id: t.String(),
  nome: t.String(),
  tipo: TipoEnum,
  criadaEm: t.Date(),
});

export type CategoriaInputType = typeof CategoriaInput.static;
export type CategoriaType = typeof Categoria.static;

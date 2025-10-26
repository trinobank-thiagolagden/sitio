import { t } from "elysia";
import { TipoEnum } from "./categoria.schema";

export const TransacaoInput = t.Object({
  descricao: t.String({ minLength: 1, description: "Descrição da transação" }),
  tipo: TipoEnum,
  categoriaId: t.Optional(t.String()),
  valor: t.Number({ minimum: 0.01, description: "Valor da transação" }),
  data: t.String({
    pattern: "^\\d{4}-\\d{2}-\\d{2}$",
    description: "Data no formato YYYY-MM-DD"
  }),
});

export const Transacao = t.Object({
  _id: t.String(),
  descricao: t.String(),
  tipo: TipoEnum,
  categoriaId: t.Optional(t.String()),
  valor: t.Number(),
  data: t.Date(),
  criadaEm: t.Date(),
});

export const TransacaoFilter = t.Object({
  tipo: t.Optional(TipoEnum),
  categoriaId: t.Optional(t.String()),
  dataInicio: t.Optional(t.String({ pattern: "^\\d{4}-\\d{2}-\\d{2}$" })),
  dataFim: t.Optional(t.String({ pattern: "^\\d{4}-\\d{2}-\\d{2}$" })),
});

export type TransacaoInputType = typeof TransacaoInput.static;
export type TransacaoType = typeof Transacao.static;
export type TransacaoFilterType = typeof TransacaoFilter.static;

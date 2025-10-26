import { Context } from "oak";
import { TransacaoModel } from "../models/transacao.model.ts";
import { TransacaoInputSchema, TransacaoFilterSchema } from "../schemas/transacao.schema.ts";

const transacaoModel = new TransacaoModel();

export const transacaoController = {
  async getAll(ctx: Context) {
    try {
      const queryParams = Object.fromEntries(ctx.request.url.searchParams);
      const filter = TransacaoFilterSchema.parse(queryParams);

      const transacoes = await transacaoModel.findAll(filter);
      ctx.response.status = 200;
      ctx.response.body = transacoes;
    } catch (error: any) {
      if (error.name === "ZodError") {
        ctx.response.status = 400;
        ctx.response.body = { error: "Filtros inválidos", details: error.errors };
      } else {
        ctx.response.status = 500;
        ctx.response.body = { error: "Erro ao buscar transações" };
      }
    }
  },

  async getById(ctx: Context) {
    try {
      const id = ctx.params.id;
      const transacao = await transacaoModel.findById(id);

      if (!transacao) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Transação não encontrada" };
        return;
      }

      ctx.response.status = 200;
      ctx.response.body = transacao;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: "Erro ao buscar transação" };
    }
  },

  async create(ctx: Context) {
    try {
      const body = await ctx.request.body.json();
      const validatedData = TransacaoInputSchema.parse(body);

      const transacao = await transacaoModel.create(validatedData);

      ctx.response.status = 201;
      ctx.response.body = transacao;
    } catch (error: any) {
      if (error.name === "ZodError") {
        ctx.response.status = 400;
        ctx.response.body = { error: "Dados inválidos", details: error.errors };
      } else {
        ctx.response.status = 500;
        ctx.response.body = { error: "Erro ao criar transação" };
      }
    }
  },

  async update(ctx: Context) {
    try {
      const id = ctx.params.id;
      const body = await ctx.request.body.json();
      const validatedData = TransacaoInputSchema.partial().parse(body);

      const transacao = await transacaoModel.update(id, validatedData);

      if (!transacao) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Transação não encontrada" };
        return;
      }

      ctx.response.status = 200;
      ctx.response.body = transacao;
    } catch (error: any) {
      if (error.name === "ZodError") {
        ctx.response.status = 400;
        ctx.response.body = { error: "Dados inválidos", details: error.errors };
      } else {
        ctx.response.status = 500;
        ctx.response.body = { error: "Erro ao atualizar transação" };
      }
    }
  },

  async delete(ctx: Context) {
    try {
      const id = ctx.params.id;
      const deleted = await transacaoModel.delete(id);

      if (!deleted) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Transação não encontrada" };
        return;
      }

      ctx.response.status = 204;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: "Erro ao deletar transação" };
    }
  },
};

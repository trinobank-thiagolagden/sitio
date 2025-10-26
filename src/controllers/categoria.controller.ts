import { Context } from "oak";
import { CategoriaModel } from "../models/categoria.model.ts";
import { CategoriaInputSchema } from "../schemas/categoria.schema.ts";

const categoriaModel = new CategoriaModel();

export const categoriaController = {
  async getAll(ctx: Context) {
    try {
      const categorias = await categoriaModel.findAll();
      ctx.response.status = 200;
      ctx.response.body = categorias;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: "Erro ao buscar categorias" };
    }
  },

  async getById(ctx: Context) {
    try {
      const id = ctx.params.id;
      const categoria = await categoriaModel.findById(id);

      if (!categoria) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Categoria não encontrada" };
        return;
      }

      ctx.response.status = 200;
      ctx.response.body = categoria;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: "Erro ao buscar categoria" };
    }
  },

  async create(ctx: Context) {
    try {
      const body = await ctx.request.body.json();
      const validatedData = CategoriaInputSchema.parse(body);

      const categoria = await categoriaModel.create(validatedData);

      ctx.response.status = 201;
      ctx.response.body = categoria;
    } catch (error: any) {
      if (error.name === "ZodError") {
        ctx.response.status = 400;
        ctx.response.body = { error: "Dados inválidos", details: error.errors };
      } else {
        ctx.response.status = 500;
        ctx.response.body = { error: "Erro ao criar categoria" };
      }
    }
  },

  async update(ctx: Context) {
    try {
      const id = ctx.params.id;
      const body = await ctx.request.body.json();
      const validatedData = CategoriaInputSchema.partial().parse(body);

      const categoria = await categoriaModel.update(id, validatedData);

      if (!categoria) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Categoria não encontrada" };
        return;
      }

      ctx.response.status = 200;
      ctx.response.body = categoria;
    } catch (error: any) {
      if (error.name === "ZodError") {
        ctx.response.status = 400;
        ctx.response.body = { error: "Dados inválidos", details: error.errors };
      } else {
        ctx.response.status = 500;
        ctx.response.body = { error: "Erro ao atualizar categoria" };
      }
    }
  },

  async delete(ctx: Context) {
    try {
      const id = ctx.params.id;
      const deleted = await categoriaModel.delete(id);

      if (!deleted) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Categoria não encontrada" };
        return;
      }

      ctx.response.status = 204;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: "Erro ao deletar categoria" };
    }
  },
};

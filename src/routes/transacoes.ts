import { Elysia, t } from "elysia";
import { TransacaoModel } from "../models/transacao.model";
import { TransacaoInput, TransacaoFilter } from "../schemas/transacao.schema";

const transacaoModel = new TransacaoModel();

export const transacoesRoutes = new Elysia({ prefix: "/v1/transacoes" })
  .get("/", async ({ query, set }) => {
    try {
      const transacoes = await transacaoModel.findAll(query);
      return transacoes;
    } catch (error) {
      set.status = 500;
      return { error: "Erro ao buscar transações" };
    }
  }, {
    query: t.Optional(TransacaoFilter)
  })

  .get("/:id", async ({ params, set }) => {
    try {
      const transacao = await transacaoModel.findById(params.id);

      if (!transacao) {
        set.status = 404;
        return { error: "Transação não encontrada" };
      }

      return transacao;
    } catch (error) {
      set.status = 500;
      return { error: "Erro ao buscar transação" };
    }
  }, {
    params: t.Object({
      id: t.String()
    })
  })

  .post("/", async ({ body, set }) => {
    try {
      const transacao = await transacaoModel.create(body);
      set.status = 201;
      return transacao;
    } catch (error) {
      set.status = 500;
      return { error: "Erro ao criar transação" };
    }
  }, {
    body: TransacaoInput
  })

  .put("/:id", async ({ params, body, set }) => {
    try {
      const transacao = await transacaoModel.update(params.id, body);

      if (!transacao) {
        set.status = 404;
        return { error: "Transação não encontrada" };
      }

      return transacao;
    } catch (error) {
      set.status = 500;
      return { error: "Erro ao atualizar transação" };
    }
  }, {
    params: t.Object({
      id: t.String()
    }),
    body: t.Partial(TransacaoInput)
  })

  .delete("/:id", async ({ params, set }) => {
    try {
      const deleted = await transacaoModel.delete(params.id);

      if (!deleted) {
        set.status = 404;
        return { error: "Transação não encontrada" };
      }

      set.status = 204;
      return;
    } catch (error) {
      set.status = 500;
      return { error: "Erro ao deletar transação" };
    }
  }, {
    params: t.Object({
      id: t.String()
    })
  });

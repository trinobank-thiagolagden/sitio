import { Elysia, t } from "elysia";
import { CategoriaModel } from "../models/categoria.model";
import { CategoriaInput } from "../schemas/categoria.schema";

const categoriaModel = new CategoriaModel();

export const categoriasRoutes = new Elysia({ prefix: "/v1/categorias" })
  .get("/", async () => {
    try {
      const categorias = await categoriaModel.findAll();
      return categorias;
    } catch (error) {
      throw new Error("Erro ao buscar categorias");
    }
  })

  .get("/:id", async ({ params, set }) => {
    try {
      const categoria = await categoriaModel.findById(params.id);

      if (!categoria) {
        set.status = 404;
        return { error: "Categoria não encontrada" };
      }

      return categoria;
    } catch (error) {
      set.status = 500;
      return { error: "Erro ao buscar categoria" };
    }
  }, {
    params: t.Object({
      id: t.String()
    })
  })

  .post("/", async ({ body, set }) => {
    try {
      const categoria = await categoriaModel.create(body);
      set.status = 201;
      return categoria;
    } catch (error) {
      set.status = 500;
      return { error: "Erro ao criar categoria" };
    }
  }, {
    body: CategoriaInput
  })

  .put("/:id", async ({ params, body, set }) => {
    try {
      const categoria = await categoriaModel.update(params.id, body);

      if (!categoria) {
        set.status = 404;
        return { error: "Categoria não encontrada" };
      }

      return categoria;
    } catch (error) {
      set.status = 500;
      return { error: "Erro ao atualizar categoria" };
    }
  }, {
    params: t.Object({
      id: t.String()
    }),
    body: t.Partial(CategoriaInput)
  })

  .delete("/:id", async ({ params, set }) => {
    try {
      const deleted = await categoriaModel.delete(params.id);

      if (!deleted) {
        set.status = 404;
        return { error: "Categoria não encontrada" };
      }

      set.status = 204;
      return;
    } catch (error) {
      set.status = 500;
      return { error: "Erro ao deletar categoria" };
    }
  }, {
    params: t.Object({
      id: t.String()
    })
  });

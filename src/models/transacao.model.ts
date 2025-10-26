import { Collection, ObjectId } from "mongo";
import { getDB } from "../config/database.ts";
import type { TransacaoInput, TransacaoFilter } from "../schemas/transacao.schema.ts";

export interface TransacaoDocument {
  _id?: ObjectId;
  descricao: string;
  tipo: "despesa" | "receita";
  categoriaId?: ObjectId;
  valor: number;
  data: Date;
  criadaEm: Date;
}

export class TransacaoModel {
  private collection: Collection<TransacaoDocument>;

  constructor() {
    this.collection = getDB().collection<TransacaoDocument>("transacoes");
  }

  async findAll(filter?: TransacaoFilter) {
    const query: any = {};

    if (filter?.tipo) {
      query.tipo = filter.tipo;
    }

    if (filter?.categoriaId) {
      query.categoriaId = new ObjectId(filter.categoriaId);
    }

    if (filter?.dataInicio || filter?.dataFim) {
      query.data = {};
      if (filter.dataInicio) {
        query.data.$gte = new Date(filter.dataInicio);
      }
      if (filter.dataFim) {
        query.data.$lte = new Date(filter.dataFim);
      }
    }

    return await this.collection.find(query).toArray();
  }

  async findById(id: string) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async create(data: TransacaoInput) {
    const transacao: TransacaoDocument = {
      descricao: data.descricao,
      tipo: data.tipo,
      categoriaId: data.categoriaId ? new ObjectId(data.categoriaId) : undefined,
      valor: data.valor,
      data: new Date(data.data),
      criadaEm: new Date(),
    };

    const result = await this.collection.insertOne(transacao);
    return await this.findById(result.toString());
  }

  async update(id: string, data: Partial<TransacaoInput>) {
    const updateData: any = { ...data };

    if (data.categoriaId) {
      updateData.categoriaId = new ObjectId(data.categoriaId);
    }

    if (data.data) {
      updateData.data = new Date(data.data);
    }

    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    return await this.findById(id);
  }

  async delete(id: string) {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result > 0;
  }

  async getSaldoByPeriod(dataInicio: string, dataFim: string) {
    const pipeline = [
      {
        $match: {
          data: {
            $gte: new Date(dataInicio),
            $lte: new Date(dataFim),
          },
        },
      },
      {
        $group: {
          _id: "$tipo",
          total: { $sum: "$valor" },
        },
      },
    ];

    const result = await this.collection.aggregate(pipeline).toArray();

    const totals = {
      receita: 0,
      despesa: 0,
    };

    result.forEach((item: any) => {
      if (item._id === "receita") {
        totals.receita = item.total;
      } else if (item._id === "despesa") {
        totals.despesa = item.total;
      }
    });

    return {
      periodoInicio: dataInicio,
      periodoFim: dataFim,
      totalReceitas: totals.receita,
      totalDespesas: totals.despesa,
      saldo: totals.receita - totals.despesa,
    };
  }
}

import { Collection, ObjectId } from "mongodb";
import { getDB } from "../config/database";
import type { CategoriaInputType } from "../schemas/categoria.schema";

export interface CategoriaDocument {
  _id?: ObjectId;
  nome: string;
  tipo: "despesa" | "receita";
  criadaEm: Date;
}

export class CategoriaModel {
  private collection: Collection<CategoriaDocument>;

  constructor() {
    this.collection = getDB().collection<CategoriaDocument>("categorias");
  }

  async findAll() {
    return await this.collection.find().toArray();
  }

  async findById(id: string) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async create(data: CategoriaInputType) {
    const categoria: CategoriaDocument = {
      ...data,
      criadaEm: new Date(),
    };

    const result = await this.collection.insertOne(categoria);
    return await this.findById(result.insertedId.toString());
  }

  async update(id: string, data: Partial<CategoriaInputType>) {
    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    return await this.findById(id);
  }

  async delete(id: string) {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

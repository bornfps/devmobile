import { db } from "../db/connection";
import { regiao, cidade, uf } from "../db/schema";
import { eq } from "drizzle-orm";

export async function createRegiao(nome: string, cidadeId: string){
    await db.insert(regiao).values({ nome, cidadeId });
}

export async function listRegioes(){
    return await db.select().from(regiao).innerJoin(cidade, eq(regiao.cidadeId, cidade.id)).innerJoin(uf, eq(cidade.ufId, uf.id));
}

export async function updateRegiao(id: string, nome: string, cidadeId: string){
    await db.update(regiao).set({ nome, cidadeId }).where(eq(regiao.id, id));
}

export async function deleteRegiao(id: string){
    await db.delete(regiao).where(eq(regiao.id, id));
}
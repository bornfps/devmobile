import { db } from "../db/connection";
import { uf, cidade } from "../db/schema";
import { eq } from "drizzle-orm";

export async function createCidade(nome: string, ufId: string){
    await db.insert(cidade).values({ nome, ufId });
}

export async function listCidades(){
    return await db.select().from(cidade).innerJoin(uf, eq(cidade.ufId, uf.id));
}

export async function updateCidade(id: string, nome: string, ufId: string){
    await db.update(cidade).set({ nome, ufId }).where(eq(cidade.id, id));
}

export async function deleteCidade(id: string){
    await db.delete(cidade).where(eq(cidade.id, id));
}
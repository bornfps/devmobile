import { db }from "../db/connection";
import { uf } from "../db/schema";
import { eq } from "drizzle-orm";

export async function createUF(nome: string, sigla: string){
    await db.insert(uf).values({ nome, sigla });
}

export async function listUFs(){
    return await db.select().from(uf);
}

export async function updateUF(id: string, nome: string, sigla: string){
    await db.update(uf).set({ nome, sigla }).where(eq(uf.id, id));
}

export async function deleteUF(id: string){
    await db.delete(uf).where(eq(uf.id, id));
}
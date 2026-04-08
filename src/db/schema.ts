import { sqliteTable, text } from  "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

export const uf = sqliteTable("uf", {
    id: text("id").primaryKey().$defaultFn(() => uuidv4()),
    nome: text("nome").notNull(),
    sigla: text("sigla").notNull()
})

export const cidade = sqliteTable("cidade", {
    id: text("id").primaryKey().$defaultFn(() => uuidv4()),
    nome: text("nome").notNull(),
    ufId: text("uf_id").notNull().references(() => uf.id)
})

export const regiao = sqliteTable("regiao", {
    id: text("id").primaryKey().$defaultFn(() => uuidv4()),
    nome: text("nome").notNull(),
    cidadeId: text("cidade_id").notNull().references(() => cidade.id)
}) 
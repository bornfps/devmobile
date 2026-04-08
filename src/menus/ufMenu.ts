import promptSync from "prompt-sync";
import { createUF, listUFs, updateUF, deleteUF } from "../operations/uf";

const prompt = promptSync();

export async function menuUF(){
    let opcao = "";

    while(opcao !== "0"){
        console.log("=== MENU UF ===");
        console.log("1. Criar UF");
        console.log("2. Lista UFs existentes");
        console.log("3. Atualizar UF");
        console.log("4. Deletar UF");
        console.log("0. Sair do menu");

        opcao = prompt("Escolha uma opção: ") || "";

        if (opcao == "1"){
            const nome = prompt("Informe o nome do UF: ") || "";
            const sigla = prompt("Informe a sigla do UF: ") || "";
            await createUF(nome, sigla);
        } else if (opcao == "2"){
            const ufs = await listUFs();
            console.log(`UFs encontrados: `);
            ufs.forEach(u => {
                console.log(`${u.id} - ${u.sigla} - ${u.nome}`);
            });
        } else if (opcao == "3"){
            const ufs = await listUFs();
            console.log(`UFs encontrados: `);
            ufs.forEach(u => {
                console.log(`${u.id} - ${u.sigla} - ${u.nome}`);
            });
            const id = prompt("Informe o ID do UF a ser atualizado: ") || "";
            const nome = prompt("Informe novo nome do UF: ") || "";
            const sigla = prompt("Informe nova sigla do UF: ") || "";
            await updateUF(id, nome, sigla);
            console.log("UF atualizado com sucesso!");
        } else if (opcao == "4"){
            const ufs = await listUFs();
            console.log(`UFs encontrados: `);
            ufs.forEach(u => {
                console.log(`${u.id} - ${u.sigla} - ${u.nome}`);
            });
            const id = prompt("Informe o ID do UF que deseja deletar: ") || "";
            await deleteUF(id);
            console.log("UF deletado com sucesso!");
        }
    }
}
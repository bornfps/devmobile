import promptSync from "prompt-sync";
import {  createCidade, listCidades, updateCidade, deleteCidade } from "../operations/cidade";
import { listUFs } from "../operations/uf";

const prompt = promptSync();

export async function menuCidade(){
    let opcao = "";

    while (opcao !== "0"){
        console.log("=== MENU CIDADE ===");
        console.log("1. Criar Cidade");
        console.log("2. Listar Cidades");
        console.log("3. Atualizar Cidade");
        console.log("4. Deletar Cidade");
        console.log("0. Sair do menu");
                
        opcao = prompt("Escolha uma opção: ") || "";
                
        if (opcao == "1"){
            const ufs = await listUFs();
            console.log("UFs encontradas: ");
            ufs.forEach(r => {
                console.log(`${r.sigla} - ${r.nome} - ${r.id}`);
            });
            const nome = prompt("Informe o nome do Cidade: ") || "";
            const ufId = prompt("Informe o ID do UF: ") || "";
            await createCidade(nome, ufId);
        } else if (opcao == "2"){
            const cidades = await listCidades();
            console.log(`Cidades encontradas: `);
            cidades.forEach(r => {
                console.log(`${r.uf.sigla} - ${r.uf.nome} - ${r.cidade.nome} - ${r.cidade.id}`);
            });
            
        } else if (opcao == "3"){
            const cidades = await listCidades();
            console.log(`Cidades encontradas: `);
            cidades.forEach(r => {
                console.log(`${r.uf.sigla} - ${r.uf.nome} - ${r.cidade.nome} - ${r.cidade.id}`);
            });
            const id = prompt("Informe o ID da cidade a ser atualizada: ") || "";
            const nome = prompt("Informe novo nome da cidade: ") || "";
            const ufId = prompt("Informe o ID do UF: ") || "";
            await updateCidade(id, nome, ufId);
            console.log("Cidade atualizada com sucesso!");
        } else if (opcao == "4"){
            const cidades = await listCidades();
            console.log(`Cidades encontradas: `);
            cidades.forEach(r => {
                console.log(`${r.uf.sigla} - ${r.uf.nome} - ${r.cidade.nome} - ${r.cidade.id}`);
            });
            const id = prompt("Informe o ID da cidade que deseja deletar: ") || "";
            await deleteCidade(id);
            console.log("Cidade deletada com sucesso!");
        }
    }
}
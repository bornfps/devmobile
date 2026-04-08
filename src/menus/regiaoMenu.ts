import promptSync from "prompt-sync";
import { createRegiao , updateRegiao, listRegioes, deleteRegiao } from "../operations/regiao";
import { listCidades } from "../operations/cidade";

const prompt = promptSync();

export async function menuRegiao(){
    let opcao = "";

    while (opcao !== "0"){
        console.log("=== MENU REGIÃO ===");
        console.log("1. Criar Região");
        console.log("2. Lista regiões existentes");
        console.log("3. Atualizar Região");
        console.log("4. Deletar Região");
        console.log("0. Sair do menu");
        
        opcao = prompt("Escolha uma opção: ") || "";
        
        if (opcao == "1"){
            const cidades = await listCidades();
            console.log("Cidades Encontradas: ");
            cidades.forEach(c => {
                console.log(`${c.cidade.id} - ${c.uf.sigla} - ${c.cidade.nome}`);
            })
            const nome = prompt("Informe o nome do Região: ") || "";
            const cidadeId = prompt("Informe o ID da Cidade: ") || "";
            await createRegiao(nome, cidadeId);
        } else if (opcao == "2"){
            const regioes = await listRegioes();
            console.log(`Regiões encontradas: `);
            regioes.forEach(r => {
                console.log(`${r.uf.sigla} - ${r.cidade.nome} - ${r.regiao.nome}`)
            });
        } else if (opcao == "3"){
            const regioes = await listRegioes();
            console.log(`Regiões encontradas: `);
            regioes.forEach(r => {
                console.log(`${r.uf.sigla} - ${r.cidade.nome} - ${r.regiao.nome}`)
            });
            const id = prompt("Informe o ID da região a ser atualizado: ") || "";
            const nome = prompt("Informe novo nome da região: ") || "";
            const cidadeId = prompt("Informe o ID da cidade: ") || "";
            await updateRegiao(id, nome, cidadeId);
            console.log("Região atualizada com sucesso!");
        } else if (opcao == "4"){
            const regioes = await listRegioes();
            console.log(`Regiões encontradas: `);
            regioes.forEach(r => {
                console.log(`${r.uf.sigla} - ${r.cidade.nome} - ${r.regiao.nome}`)
            });
            const id = prompt("Informe o ID da região que deseja deletar: ") || "";
            await deleteRegiao(id);
            console.log("Região deletada com sucesso!");
        }   
    }
}
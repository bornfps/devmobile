import promptSync from "prompt-sync";
import { createRegiao , updateRegiao, listRegioes, deleteRegiao } from "../operations/regiao";
import { listCidades } from "../operations/cidade";

const prompt = promptSync();

export async function menuRegiao(){
    let opcao = "";

    while (opcao !== "0"){
        console.log("=== MENU REGIÃO ===");
        console.log("1. Criar Região");
        console.log("2. Listar Regiões");
        console.log("3. Atualizar Região");
        console.log("4. Deletar Região");
        console.log("0. Sair do menu");
        
        opcao = prompt("Escolha uma opção: ") || "";
        
        if (opcao == "1"){
            const cidades = await listCidades();
            console.log("Cidades Encontradas: ");
            cidades.forEach((c, index) => {
                console.log(`${index + 1}. ${c.uf.sigla} - ${c.cidade.nome}`);
            });
            
            const escolhaCidade = parseInt(prompt("Informe o número da cidade para a região: "));
            const cidadeSelecionada = cidades[escolhaCidade - 1];

            if (cidadeSelecionada) {
                const nome = prompt("Informe o nome da Região: ") || "";
                await createRegiao(nome, cidadeSelecionada.cidade.id);
            } else {
                console.log("Opção inválida. Por favor, tente novamente.");
            }
        } else if (opcao == "2"){
            const regioes = await listRegioes();
            console.log(`Regiões encontradas: `);
            regioes.forEach(r => {
                console.log(`${r.uf.sigla} - ${r.cidade.nome} - ${r.regiao.nome}`);
            });
        } else if (opcao == "3"){
            const regioes = await listRegioes();
            console.log(`Regiões encontradas: `);
            regioes.forEach((r, index) => {
                console.log(`${index + 1}. ${r.uf.sigla} - ${r.cidade.nome} - ${r.regiao.nome}`);
            });

            const escolha = parseInt(prompt("Informe o número da região que deseja atualizar: "));
            const regiaoSelecionada = regioes[escolha - 1];

            if (regiaoSelecionada) {
                const nome = prompt("Informe o novo nome da região: ") || "";
                await updateRegiao(regiaoSelecionada.regiao.id, nome, regiaoSelecionada.regiao.cidadeId);
                console.log("Região atualizada com sucesso!");
            } else{
                console.log("Opção inválida. Por favor, tente novamente.");
            }
        } else if (opcao == "4"){
            const regioes = await listRegioes();
            console.log(`Regiões encontradas: `);
            regioes.forEach((r, index) => {
                console.log(`${index + 1}. ${r.uf.sigla} - ${r.cidade.nome} - ${r.regiao.nome}`);
            });
            
            const escolha = parseInt(prompt("Informe o número da região que deseja deletar: "));
            const regiaoSelecionada = regioes[escolha - 1];

            if (regiaoSelecionada) {
                await deleteRegiao(regiaoSelecionada.regiao.id);
                console.log("Região deletada com sucesso!");
            } else {
                console.log("Opção inválida. Por favor, tente novamente.");
            }
        }   
    }
}
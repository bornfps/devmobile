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
            ufs.forEach((r, index) => {
                console.log(`${index + 1}. ${r.nome} - ${r.sigla}`);
            });

            const escolha = parseInt(prompt("Informe o número do UF para a cidade: ") || "");
            const ufSelecionada = ufs[escolha - 1];

            if (ufSelecionada) {
                const nome = prompt("Informe o nome da cidade: ") || "";
                await createCidade(nome, ufSelecionada.id);
            } else {
                console.log("Opção inválida. Por favor, tente novamente.");
            }
        } else if (opcao == "2"){
            const cidades = await listCidades();
            console.log(`Cidades encontradas: `);
            cidades.forEach(r => {
                console.log(`${r.uf.sigla} - ${r.uf.nome} - ${r.cidade.nome}`);
            });
            
        } else if (opcao == "3"){
            const cidades = await listCidades();
            console.log(`Cidades encontradas: `);
            cidades.forEach((r, index) => {
                console.log(`${index + 1}. ${r.uf.sigla} - ${r.uf.nome} - ${r.cidade.nome}`);
            });
            

            const escolha = parseInt(prompt("Informe o número da cidade que deseja atualizar: ") || "");
            const cidadeEscolhida = cidades[escolha - 1];

            if (cidadeEscolhida) {
                const nome = prompt("Informe o novo nome da cidade: ") || "";
                await updateCidade(cidadeEscolhida.cidade.id, nome, cidadeEscolhida.cidade.ufId);
            } else {
                console.log("Opção inválida. Por favor, tente novamente.");
            }
        } else if (opcao == "4"){
            const cidades = await listCidades();
            console.log(`Cidades encontradas: `);
            cidades.forEach((r, index) => {
                console.log(`${index + 1}. ${r.uf.sigla} - ${r.uf.nome} - ${r.cidade.nome}`);
            });
            
            const escolha = parseInt(prompt("Informe o número da cidade que deseja deletar: ") || "");
            const cidadeEscolhida = cidades[escolha - 1];

            if (cidadeEscolhida){
                await deleteCidade(cidadeEscolhida.cidade.id);
                console.log("Cidade deletada com sucesso!");
            } else{
                console.log("Opção inválida. Por favor, tente novamente.");
            }
        }
    }
}
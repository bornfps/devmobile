import promptSync from "prompt-sync";
import { menuUF } from "./menus/ufMenu";
import { menuCidade } from "./menus/cidadeMenu";
import { menuRegiao } from "./menus/regiaoMenu";

const prompt = promptSync();

async function mainMenu(){
    let opcao = "";

    while(opcao !== "0"){
        console.log("=== MENU PRINCIPAL ===");
        console.log("1. UF");
        console.log("2. Cidade");
        console.log("3. Região");
        console.log("0. Sair");

        opcao = prompt("Escolha uma opção: ") || "";

        if (opcao == "1"){
            await menuUF();
        } else if (opcao == "2"){
            await menuCidade();
        } else if (opcao == "3"){
            await menuRegiao();
        }
    }
}

mainMenu();
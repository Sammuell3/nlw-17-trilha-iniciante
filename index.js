// Importa as funções 'select' e 'input' do pacote '@inquirer/prompts' para receber
// entradas do usuário no terminal.
const { select, input } = require("@inquirer/prompts")

// Define um objeto 'meta' com duas propriedades:
// 'value' é uma string que contém a meta (um objetivo a ser cumprido),
// 'checkbox' indica se a meta foi marcada como concluída (false, neste caso).
let meta = {
    value: "Fazer programa", // Meta inicial, pré-definida.
    checkbox: false // Esta meta não está marcada como concluída.
}

// Cria um array 'metas', que armazena todas as metas cadastradas.
// Inicialmente, contém apenas a meta "Fazer programa".
let metas = [meta]

// Função assíncrona que permite ao usuário cadastrar uma nova meta.
async function cadastrarMeta() {
    // Usa a função 'input' para solicitar ao usuário que insira o nome de uma nova meta.
    const meta = await input({
        message: "Digite o nome da meta", // Exibe essa mensagem no terminal para o usuário.
    })

    // Verifica se o usuário não digitou nada. Se a entrada estiver vazia:
    if (meta.length == 0) {
        console.log("Meta não pode ser vazia") // Exibe uma mensagem de erro.
        return // Sai da função sem adicionar a meta.
    }

    // Adiciona a nova meta ao array 'metas', com 'checkbox' como falso (não concluída).
    metas.push({value: meta, checkbox: false})
}

// Função principal do programa que controla o fluxo do menu.
async function start() {
    // Loop infinito que mantém o menu ativo até que o usuário escolha sair.
    while (true) {
        // Usa a função 'select' para exibir um menu de opções no terminal e captura
        // a escolha do usuário.
        const opcao = await select({
            message: "Menu >", // Título do menu.
            choices: [ // Lista de opções disponíveis.
                {
                    name: "Cadastrar Meta", // Opção para cadastrar uma nova meta.
                    value: "cadastrar" // Valor associado a essa opção.
                },
                {
                    name: "Listar Metas", // Opção para listar as metas cadastradas.
                    value: "Listar" // Valor associado a essa opção.
                },
                {
                    name: "sair", // Opção para sair do programa.
                    value: "sair" // Valor associado a essa opção.
                }
            ]
        })

        // Usa um 'switch' para determinar qual ação executar com base na escolha do usuário.
        switch (opcao) {
            case "cadastrar": // Se o usuário escolheu cadastrar uma nova meta:
                await cadastrarMeta() // Chama a função 'cadastrarMeta' para adicionar uma nova meta.
                console.log(metas) // Exibe o array de metas no terminal (para fins de debug ou visualização).
                break

            case "Listar": // Se o usuário escolheu listar as metas:
                console.log("Listar Metas") // Exibe uma mensagem (essa parte pode ser expandida para listar as metas de fato).
                break

            case "sair": // Se o usuário escolheu sair:
                return // Sai da função e encerra o programa.
        }
    }
}

// Inicia o programa chamando a função 'start'.
start()

// Importa a função 'select' do pacote '@inquirer/prompts'
const { select } = require("@inquirer/prompts")

// Define uma função assíncrona chamada 'start'
async function start() {
  // Inicia um loop infinito
  while (true) {
    // Usa a função 'select' para criar um menu interativo
    const opcao = await select({
        message: "Menu >", // Mensagem exibida para o usuário
        choices: [
            // Opções do menu
            {
                name: "Cadastrar Meta", // Texto exibido
                value: "cadastrar"      // Valor retornado quando selecionado
            },
            {
                name: "Listar Meta", 
                value: "listar"
            },
            {
                name: "Sair",
                value: "sair"
            }
        ]
    })
    
    // Usa um switch para executar ações com base na opção selecionada
    switch (opcao) {
        case "cadastrar":
            console.log("Cadastrar Meta")
            break
        case "listar":
            console.log("Listar Meta")
            break
        case "sair":
            console.log("Sair")
            return // Sai da função e encerra o programa
    }
  }
}

// Chama a função 'start' para iniciar o programa
start()
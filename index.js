// Importa as funções 'select', 'input' e 'checkbox' do pacote '@inquirer/prompts' para receber
// entradas do usuário no terminal, de forma interativa.
const { select, input, checkbox } = require("@inquirer/prompts")

// Define um objeto 'meta' com duas propriedades:
// 'value' contém o texto da meta que o usuário deseja atingir.
// 'checkbox' indica se a meta foi marcada como concluída (false inicialmente).
let meta = {
    value: "Fazer programa", // Meta inicial já pré-definida.
    checked: false // Esta meta não está marcada como concluída.
}

// Cria um array 'metas', que vai armazenar todas as metas cadastradas. Inicialmente, contém a meta pré-definida.
let metas = [meta];

// Função assíncrona que permite ao usuário cadastrar uma nova meta.
async function cadastrarMeta() {

    // Usa a função 'input' para solicitar ao usuário que insira o nome de uma nova meta.
    const meta = await input({
        message: "Digite o nome da meta", // Exibe essa mensagem no terminal solicitando uma meta ao usuário.
    })

    // Verifica se o campo da meta está vazio. Se estiver:
    if (meta.length == 0) {
        console.log("Meta não pode ser vazia") // Informa o usuário que a meta não pode ser vazia.
        return // Sai da função sem adicionar a meta, pois a entrada está inválida.
    }

    // Adiciona a nova meta ao array 'metas', com 'checkbox' inicializado como false (não concluída).
    metas.push({ value: meta, checked: false })
}

// Função assíncrona que permite listar as metas e marcar/desmarcar as metas como concluídas.
async function listarMetas() {
    // Usa a função 'checkbox' para listar todas as metas e permitir que o usuário selecione quais deseja marcar.
    const respostas = await checkbox({
        message: "Use as setas para selecionar as metas, aperte espaço para marcar e desmarcar, e enter para finalizar essa etapa",
        choices: [...metas], // Cada meta é exibida como uma escolha para o usuário.
        instructions: false // Não exibe as instruções automáticas da biblioteca.
    })

     // Reseta todas as metas para não marcadas (checkbox = false).
     metas.forEach(meta => {
        meta.checked = false
    })

    // Verifica se não há metas cadastradas.
    if (metas.length == 0) {
        console.log("Nenhuma meta selecionada!") // Exibe uma mensagem informando que não há metas para marcar.
        return
    }

   
    // Percorre as respostas (metas selecionadas pelo usuário) e marca essas metas como concluídas.
    respostas.forEach(resposta => {
        const meta = metas.find(meta => {
            return meta.value == resposta // Encontra a meta correspondente com base no valor da resposta.
        })
        meta.checked = true // Marca a meta como concluída (checkbox = true).
    })
    
    // Informa que as metas selecionadas foram marcadas como concluídas.
    console.log("Meta(s) marcadas como concluída(s)")
}

async function MetasRealizadas() {
    const realizadas = metas.filter((meta)=> {
        return meta.checked
    });
    if(realizadas.length == 0){
        console.log("Não existe nenhuma meta realizada :(")
        return;
    }
    await select({
        message: "Metas realizadas",
        choices: [...realizadas]
    })
}

// Função principal do programa que controla o fluxo de interação via um menu.
async function start() {
    // Loop infinito que mantém o menu ativo até que o usuário escolha sair.
    while (true) {
        // Usa a função 'select' para exibir o menu e capturar a escolha do usuário.
        const opcao = await select({
            message: "Menu >", // Exibe o título do menu.
            choices: [ // Lista de opções disponíveis no menu.
                {
                    name: "Cadastrar Meta", // Opção para cadastrar uma nova meta.
                    value: "cadastrar" // Valor correspondente a esta opção.
                },
                {
                    name: "Listar Metas", // Opção para listar e gerenciar as metas cadastradas.
                    value: "Listar" // Valor correspondente a esta opção.
                },
                {
                    name: "Metas realizadas", 
                    value: "realizadas" 
                },
                {
                    name: "sair", // Opção para sair do programa.
                    value: "sair" // Valor correspondente a esta opção.
                }
            ]
        })

        // Usa o 'switch' para determinar qual ação executar com base na escolha do usuário.
        switch (opcao) {
            case "cadastrar": // Se o usuário escolheu a opção de cadastrar uma nova meta:
                await cadastrarMeta() // Chama a função 'cadastrarMeta' para adicionar uma nova meta.
                break

            case "Listar": // Se o usuário escolheu a opção de listar as metas:
                await listarMetas() // Chama a função 'listarMetas' para listar as metas e marcar as concluídas.
                break
            case "Metas realizadas":
                await MetasRealizadas()
                break    
            case "sair": // Se o usuário escolheu a opção de sair:
                console.log("Até mais!")
                return // Encerra o programa.
        }
    }
}

// Inicia o programa chamando a função 'start', que exibe o menu e controla o fluxo.
start()

// Importa as funções 'select', 'input' e 'checkbox' do pacote '@inquirer/prompts' para receber
// entradas do usuário no terminal, de forma interativa.
const { select, input, checkbox } = require("@inquirer/prompts")
const fs = require("fs").promises;

// Variável para exibir mensagens temporárias
let mensagem = "";

// Cria um array 'metas', que vai armazenar todas as metas cadastradas.
let metas = [];

// Função para carregar metas do arquivo JSON
const carregarMetas = async () => {
    try {
        const data = await fs.readFile("metas.json", "utf8")
        metas = JSON.parse(data)
    } catch (error) {
        // Se houver erro na leitura, inicializa metas como array vazio
        metas = []
    }
}

// Função para salvar metas no arquivo JSON
const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

// Função para cadastrar uma nova meta
async function cadastrarMeta() {
    const meta = await input({
        message: "Digite o nome da meta", // Exibe essa mensagem no terminal solicitando uma meta ao usuário.
    })

    // Verifica se o campo da meta está vazio. Se estiver:
    if (meta.length === 0) {
        mensagem = "Meta não pode ser vazia" // Informa o usuário que a meta não pode ser vazia.
        return; // Sai da função sem adicionar a meta, pois a entrada está inválida.
    }

    // Adiciona a nova meta ao array 'metas', com 'checkbox' inicializado como false (não concluída).
    metas.push({ value: meta, checked: false })

    mensagem = "Meta cadastrada com sucesso!";
}

// Função para listar e marcar/desmarcar metas
async function listarMetas() {
    if(metas.length === 0){
        mensagem = "Não existe meta"
        return;
    }
   
    // Usa checkbox para permitir seleção múltipla
    const respostas = await checkbox({
        message: "Use as setas para selecionar as metas, aperte espaço para marcar e desmarcar, e enter para finalizar essa etapa",
        choices: [...metas], // Cada meta é exibida como uma escolha para o usuário.
        instructions: false // Não exibe as instruções automáticas da biblioteca.
    })

    // Reseta todas as metas para não marcadas (checkbox = false).
    metas.forEach(meta => {
        meta.checked = false
    })

    // Marca as metas selecionadas como concluídas
    respostas.forEach(resposta => {
        const meta = metas.find(meta => meta.value === resposta)
        meta.checked = true
    })
    
    mensagem = "Meta(s) marcadas como concluída(s)"
}

// Função para mostrar metas realizadas
async function MetasRealizadas() {
    const realizadas = metas.filter((meta) => meta.checked);
    if(realizadas.length === 0){
        mensagem = "Não existe nenhuma meta realizada :("
        return; 
    }
    await select({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

// Função para mostrar metas abertas (não realizadas)
async function MetasAbertas() {
    if(metas.length === 0){
        mensagem = "Não existe meta"
        return ;
    }
    const abertas = metas.filter((meta) => !meta.checked);

    if(abertas.length === 0){
       mensagem = "Não existe metas abertas :)"
        return;
    }
    await select({
        message: "Metas abertas: " + abertas.length,
        choices: [...abertas]
    })
}

// Função para deletar metas
async function deletarMetas() { 
    if(metas.length === 0){
        mensagem = "Não existe meta"
        return;
    }
   
    const metasDesmarcadas = metas.map((meta) => ({value: meta.value, checked: false}))

    const itemsADeletar = await checkbox({
        message: "Selecione as metas que deseja deletar",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if (itemsADeletar.length === 0){
       mensagem = "Nenhum item para deletar"
        return;
    }

    // Remove as metas selecionadas
    metas = metas.filter((meta) => !itemsADeletar.includes(meta.value))

    mensagem = "Meta(s) deletada(s) com sucesso!";
}

// Função para exibir mensagens temporárias
const mostrarMensagem = () => {
    console.clear()

    if (mensagem !== ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

// Função principal que controla o fluxo do programa
async function start() {
    await carregarMetas()
    while (true) {
        mostrarMensagem()
        await salvarMetas()
        
        // Menu principal
        const opcao = await select({
            message: "Menu >",
            choices: [
                { name: "Cadastrar Meta", value: "cadastrar" },
                { name: "Listar Metas", value: "Listar" },
                { name: "Metas realizadas", value: "realizadas" },
                { name: "Metas abertas", value: "abertas" },
                { name: "Deletar Metas", value: "deletar" },
                { name: "Sair", value: "sair" }
            ]
        })

        // Executa a ação correspondente à opção selecionada
        switch (opcao) {
            case "cadastrar":
                await cadastrarMeta()
                break
            case "Listar":
                await listarMetas()
                break
            case "realizadas":
                await MetasRealizadas()
                break    
            case "abertas":
                await MetasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Até mais!")
                return
        }
    }
}

// Inicia o programa
start()

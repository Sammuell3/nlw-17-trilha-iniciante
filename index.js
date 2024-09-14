// Estrutura de repetição
function start() {
    while (true) {
        // enquanto true, o loop vai rodar
        // se a opção for cadastrar, vai cadastrar
           // Vai ficar rodando até que o usuário digite "sair"
        // se a opção for listar, vai listar
        // se a opção for sair, vai sair
        let opcao = "sair"
        switch(opcao) {
            case "Vamos cadastrar":
                console.log("Vamos cadastrar")
                break;
            case "Listar":
                console.log("vamos listar")
                break;
            case "Sair":
             return
        }
    }
}

start() 
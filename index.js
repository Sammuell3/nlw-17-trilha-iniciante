// arrays, objetos
// Objetos são uma coleção de dados que podem conter dados e funções
let metas = {
    value: "Ler um livro todo mes",
    checkbox: false,
    //Se colocarmos a função dentro do objeto, ela se torna um método
    isChecked: () => {
        console.log("Meta criada com sucesso!")
    }
}
// metas (Objeto)
// console (Objeto)
// isChecked() (Método)
// log() (Método)

console.log(metas.value)
metas.isChecked()
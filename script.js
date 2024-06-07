// ---- Global ----
let continentes = [
  "África",
  "América do Norte",
  "América do Sul",
  "Antártida",
  "Ásia",
  "Europa",
  "Oceania",
];


let paises = [];

let paginaAtual = 1;
let qntdPorPagina = 3


// ---- Front ----

function selecaoRegiao(continentes,id) {
  let select = document.getElementById(id);

  continentes.forEach((func) => {
    let option = document.createElement("option");
    option.innerText = func;
    select.appendChild(option);
  });
}
function incluir(){
    let nome = document.getElementById("nome").value;
    let regiao = document.getElementById("regiao").value;

    inclusao(nome, regiao)
    atualizarDados()
}

function atualizarDados(paisesFilter = null){

    let paisesAtualizado = paisesFilter == null ? paises : paisesFilter;

    let tabela = document.getElementById("tabela");

    tabela.innerHTML =""
    paisesAtualizado.forEach((pais)=>{
        let newLine = document.createElement("tr")
        for(j in pais){
            let newData= document.createElement("td")
            newData.innerHTML = pais[j];
            newLine.appendChild(newData)
        }
        tabela.appendChild(newLine)
    })
}

function filtrarRegiao(){
    let continente = document.getElementById("filtroContinentes").value
    if(continente === ""){
        atualizarDados()
    } else{
        let paisesFilter = paises.filter((pais)=>{
            return continente === pais.continente
        });
        atualizarDados(paisesFilter) 
    }
}

function proximo(){
    let totalPag = Math.ceil(paises.length / qntdPorPagina);
    if(paginaAtual < totalPag){
        let a = (paginaAtual - 1) * qntdPorPagina;
        let b = a + qntdPorPagina
        atualizarDados().slice(a, b)
        paginaAtual++
        console.log(paginaAtual)
    } else{
        alert("Fim")
    }
}
// Chamadas ----
selecaoContinente(continentes, "continente");
selecaoContinente(continentes, "filtroContinentes");

//   ---- Back ----
function inclusao(nome, regiao){
    class pais{
        constructor(nome, regiao){
            this.nome = nome;
            this.regiao = regiao;
        }
    }
    paises.push(new pais(nome, regiao))
}

let num = [1,2,5,6,4,7,8,9,10,13]
let totalPagNum = Math.ceil(num.length / 3);
let a = 4;
let b = a + 3;
console.log(num.slice(a, b))
console.log(totalPag)

for(let i = 0; i < totalPagNum; i++){
    let a = i * qntdPorPagina;
    let b = a + qntdPorPagina;
    console.log(a)
    console.log(num.slice(a, b))
}



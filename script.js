const continentes = [
  "África",
  "América",
  "Antártida",
  "Ásia",
  "Europa",
  "Oceania",
];

class Pais {
  constructor(id, nome, continente) {
    this.id = id;
    this.nome = nome;
    this.continente = continente;
  }
}

const paises = [];
let id = 0;
let paisesFilter;

// Em analise - INICIO
let paginaAtual = 1;
let qntdPorPagina = 3;

let btnProximo = document.getElementById("pag-proximo");
let btnAnterior = document.getElementById("pag-anterior");
let nav = document.getElementById("nav");
let totalPaginas;

function atualizarTotalPaginas() {
  totalPaginas = Math.ceil(paisesFilter.length / qntdPorPagina);
  atualizarBotoesPagina();
} // em analise

function mudarClasse(elemento, classe, acao) {
  if (acao === "add") {
    elemento.classList.add(classe);
  } else if (acao === "remove") {
    elemento.classList.remove(classe);
  }
}

function atualizarBotoesPagina() {
  if (totalPaginas > 1) {
    console.log(totalPaginas);
    if (paginaAtual === 1) {
      mudarClasse(btnAnterior, "hidden", "add");
      mudarClasse(btnProximo, "hidden", "remove");

      mudarClasse(nav, "stay-right", "add");
      mudarClasse(nav, "stay-left", "remove");
    } else if (paginaAtual < totalPaginas) {
      mudarClasse(btnAnterior, "hidden", "remove");
      mudarClasse(btnProximo, "hidden", "remove");

      mudarClasse(nav, "stay-right", "remove");
    } else if (paginaAtual === totalPaginas) {
      mudarClasse(btnAnterior, "hidden", "remove");
      mudarClasse(btnProximo, "hidden", "add");

      mudarClasse(nav, "stay-right", "remove");
    }
  }
} //em analise

function irParaPaginaAnterior() {
  if (paginaAtual > 1) {
    paginaAtual--;

    atualizarDadosDaTabela();
    atualizarBotoesPagina();
  }
}  //em analise

function irParaPaginaProxima() {
  if (paginaAtual < totalPaginas) {
    paginaAtual++;

    atualizarDadosDaTabela();
    atualizarBotoesPagina();
  }
}  //em analise

function adicionarOpcoesParaSelect(id) {
  let select = document.getElementById(id);

  continentes.forEach((continente) => {
    let option = document.createElement("option");
    option.innerText = continente;
    select.appendChild(option);
  });
} //ok

function validarInformacoesPaises(nome, continente) {
  if (nome != "" && isNaN(nome) && continente !== "") {
    return {
      ehValidado: true,
    };
  } else {
    return {
      ehValidado: false,
      mensagem: "Preencha os campos corretamente.",
    };
  }
} //ok

function capturarInformacoesPaises() {
  let nome = document.getElementById("nome");
  let continente = document.getElementById("continente");

  let validaCampos = validarInformacoesPaises(nome.value, continente.value);

  if (validaCampos.ehValidado) {
    ++id;
    adicionarInformaçoesPaisesParaLista(id, nome.value, continente.value);

    resetarFiltro();
    atualizarDadosDaTabela();
  } else {
    alert(validaCampos.mensagem);
  }

  // nome.value = "";
  // continente.children[0].selected = true;
} // em analise

function adicionarInformaçoesPaisesParaLista(id, nome, continente) {
  paises.push(new Pais(id, nome, continente));
} //ok

function atualizarDadosDaTabela() {
  // let paisesAtualizado = paisesFilter == null ? paises : paisesFilter;
  console.log(paginaAtual + " - " + totalPaginas + " - " + paisesFilter.length)
  let posInicio = (paginaAtual - 1) * qntdPorPagina;
  let posFim = posInicio + qntdPorPagina;

  paisesExibir = paisesFilter.slice(posInicio, posFim)

  const sectionTabela = document.getElementById("sectionTabela");
  mudarClasse(sectionTabela, "hidden", "remove");

  const tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  paisesExibir.forEach((pais) => {
    let novaLinha = document.createElement("tr");

    for (i in pais) {
      let novoDado = document.createElement("td");
      novoDado.innerHTML = pais[i];
      novaLinha.appendChild(novoDado);
    }
    tabela.appendChild(novaLinha);
  });
}  //em analise

function filtrarPorContinente() {
  const continenteFiltro = document.getElementById("filtroContinentes").value;
  paginaAtual = 1;

  if (continenteFiltro === "") {
    paisesFilter = paises;
    atualizarTotalPaginas()
    atualizarDadosDaTabela();
  } else {
    paisesFilter = paises.filter((pais) => {
      return continenteFiltro === pais.continente;
    });
    atualizarTotalPaginas()
   
    atualizarDadosDaTabela();
  }
}  //em analise

function resetarFiltro() {
  let continenteFiltro = document.getElementById("filtroContinentes");
  continenteFiltro.children[0].selected = true;
  filtrarPorContinente();
}

//  Ativar funções
window.onload = function () {
  adicionarOpcoesParaSelect("continente");
  adicionarOpcoesParaSelect("filtroContinentes");
};

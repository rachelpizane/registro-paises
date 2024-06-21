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

let paginaAtual = 1;
const qntdPorPagina = 3;

let btnProximo = document.getElementById("pag-proximo");
let btnAnterior = document.getElementById("pag-anterior");
let nav = document.getElementById("nav");
let totalPaginas;

function atualizarTotalPaginas() {
  totalPaginas = Math.ceil(paisesFilter.length / qntdPorPagina);
}

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
  } else {
    mudarClasse(btnProximo, "hidden", "add");
    mudarClasse(btnAnterior, "hidden", "add");
  }
} //em analise

function irParaPaginaAnterior() {
  if (paginaAtual > 1) {
    paginaAtual--;

    atualizarDadosDaTabela();
    atualizarBotoesPagina();
  }
}

function irParaPaginaProxima() {
  if (paginaAtual < totalPaginas) {
    paginaAtual++;

    atualizarDadosDaTabela();
    atualizarBotoesPagina();
  }
} 

function adicionarOpcoesParaSelect(id) {
  let select = document.getElementById(id);

  continentes.forEach((continente) => {
    let option = document.createElement("option");
    option.innerText = continente;
    select.appendChild(option);
  });
}

function validarInformacoesPaises(nome, continente) {
  if (nome != "" && isNaN(nome) && continente !== "") {
    return {
      ehValidado: true
    };
  } else {
    return {
      ehValidado: false,
      mensagem: "Preencha os campos corretamente."
    };
  }
}

function capturarInformacoesPaises() {
  let nome = document.getElementById("nome");
  let continente = document.getElementById("continente");

  let validaCampos = validarInformacoesPaises(nome.value, continente.value);

  if (validaCampos.ehValidado) {
    ++id;
    adicionarInformaçoesPaisesParaLista(id, nome.value, continente.value);
    resetarFiltro();

  } else {
    alert(validaCampos.mensagem);
  }

  nome.value = "";
  continente.children[0].selected = true;
}

function adicionarInformaçoesPaisesParaLista(id, nome, continente) {
  paises.push(new Pais(id, nome, continente));
}

function atualizarDadosDaTabela() {
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
} 

function filtrarPorContinente() {
  const continenteFiltro = document.getElementById("filtroContinentes").value;
  paginaAtual = 1;
  
  if (continenteFiltro === "") {
    paisesFilter = paises;

    atualizarTotalPaginas();
    atualizarBotoesPagina();
    atualizarDadosDaTabela();
  } else {
    paisesFilter = paises.filter((pais) => continenteFiltro === pais.continente);

    atualizarTotalPaginas();
    atualizarBotoesPagina();
    atualizarDadosDaTabela();
  }
}

function resetarFiltro() {
  const continenteFiltro = document.getElementById("filtroContinentes");
  continenteFiltro.children[0].selected = true;
  filtrarPorContinente();
}

window.onload = function () {
  adicionarOpcoesParaSelect("continente");
  adicionarOpcoesParaSelect("filtroContinentes");
};

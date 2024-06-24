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
    this.id = id
    this.nome = nome
    this.continente = continente
  }
}

const paises = [];
let id = 0;
let paisesFiltrados;

let paginaAtual = 1;
const qntdPorPagina = 3;

const btnProximo = document.getElementById("pag-proximo");
const btnAnterior = document.getElementById("pag-anterior");
const nav = document.getElementById("nav");
let totalPaginas;

// Atualiza o total de páginas com base no número de países filtrados e a quantidade de itens por página
function atualizarTotalPaginas() {
  totalPaginas = Math.ceil(paisesFiltrados.length / qntdPorPagina);
}

//Adiciona ou remove uma classe CSS de um elemento HTML com base na ação especificada.
function mudarClasse(elemento, classe, acao) {
  switch (acao) {
    case "add":
      elemento.classList.add(classe);
      break;
    case "remove":
      elemento.classList.remove(classe);
      break;
    default:
      console.error(`Ação desconhecida: ${acao}`);
  }
}

//Atualiza a visibilidade e as classes dos botões de navegação com base no número de paginas totais e na pagina atual
function atualizarBotoesPagina() {
  // Função auxiliar para atualizar classes dos botões e da navegação
  const atualizarClasseBotoes = (acaoBtnAnterior, acaoBtnProximo, acaoNavRight) => {
    mudarClasse(btnAnterior, "hidden", acaoBtnAnterior);
    mudarClasse(btnProximo, "hidden", acaoBtnProximo);
    mudarClasse(nav, "stay-right", acaoNavRight);
  };

  // Verifica se há mais de uma página
  if (totalPaginas > 1) {
    if (paginaAtual === 1) {
      // Na primeira página, esconde o botão "anterior", mostra o botão "próximo",  adiciona classe ao nav que faz com que o botão visível fique à direita da tela.
      atualizarClasseBotoes("add", "remove", "add");
    } else if (paginaAtual < totalPaginas) {
      // Páginas intermediárias: mostra ambos os botões e remove classe do nav
      atualizarClasseBotoes("remove", "remove", "remove");
    } else if (paginaAtual === totalPaginas) {
      // Última página: mostra botão "anterior", esconde "próximo" e remove classe do nav
      atualizarClasseBotoes("remove", "add", "remove");
    }
  } else {
    // Caso haja apenas uma página: esconde ambos os botões e remove classe do nav
    atualizarClasseBotoes("add", "add", "remove");
  }
}

// Navega para a página anterior, se possível, e atualiza a tabela e os botões de navegação
function irParaPaginaAnterior() {
  if (paginaAtual > 1) {
    paginaAtual--;

    atualizarDadosDaTabela();
    atualizarBotoesPagina();
  }
}

// Navega para a próxima página, se possível, e atualiza a tabela e os botões de navegação
function irParaPaginaProxima() {
  if (paginaAtual < totalPaginas) {
    paginaAtual++;

    atualizarDadosDaTabela();
    atualizarBotoesPagina();
  }
}

// Adiciona opções de continentes a um elemento <select> com o ID especificado.
function adicionarOpcoesParaSelect(id) {
  const select = document.getElementById(id);

  continentes.forEach((continente) => {
    const option = document.createElement("option");
    option.innerText = continente;
    select.appendChild(option);
  });
}

// Valida se o nome não está vazio e não é numérico.
function validarNome(nome) {
  return (nome != "") & isNaN(nome);
}

// Valida se foi selecionado um continente.
function validarContinente(continente) {
  return continente !== "";
}

// Captura as informações do nome e continente dos elementos HTML e, se validas, adiciona à lista de países;
function capturarInformacoesPaises() {
  const nome = document.getElementById("nome");
  const continente = document.getElementById("continente");

  const validaNome = validarNome(nome.value);
  const validaContinente = validarContinente(continente.value);

  if (!validaNome) {
    alert("Nome inválido. Preencha novamente");
    return;
  }
  if (!validaContinente) {
    alert("Selecione um dos continentes.");
    return;
  }

  ++id;
  adicionarInformaçoesPaisesLista(id, nome.value, continente.value);
  resetarFiltro();

  nome.value = "";
  continente.children[0].selected = true;
}

//Adiciona um novo país à lista de países.
function adicionarInformaçoesPaisesLista(id, nome, continente) {
  paises.push(new Pais(id, nome, continente));
}

// Reseta o filtro de continentes para a opção padrão e aplica o filtro.
function resetarFiltro() {
  const continenteFiltro = document.getElementById("filtroContinentes");
  continenteFiltro.children[0].selected = true;
  filtrarPorContinente();
}

// Filtra os países com base no continente selecionado no filtro de continentes.
function filtrarPorContinente() {
  const continenteFiltro = document.getElementById("filtroContinentes").value;
  paginaAtual = 1;

  if (continenteFiltro === "") {
    paisesFiltrados = paises; // Se nenhum continente for selecionado, mostra todos os países
  } else {
    paisesFiltrados = paises.filter(
      (pais) => continenteFiltro === pais.continente
    ); // Filtra países pelo continente selecionado
  }

  atualizarTotalPaginas();
  atualizarBotoesPagina();
  atualizarDadosDaTabela();
}

// Atualiza os dados exibidos na tabela com base na página atual e nos países filtrados.
function atualizarDadosDaTabela() {
  const posInicio = (paginaAtual - 1) * qntdPorPagina;
  const posFim = posInicio + qntdPorPagina;

  // Obtém os países a serem exibidos na página atual
  const paisesExibir = paisesFiltrados.slice(posInicio, posFim);

  // Torna visível a seção da tabela
  const sectionTabela = document.getElementById("sectionTabela");
  mudarClasse(sectionTabela, "hidden", "remove");

  // Limpa o conteúdo existente da tabela
  const tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  // Itera sobre os países a serem exibidos e cria linhas na tabela
  paisesExibir.forEach((pais) => {
    const novaLinha = document.createElement("tr");

    for (i in pais) {
      const novoDado = document.createElement("td");
      novoDado.innerHTML = pais[i];
      novaLinha.appendChild(novoDado);
    }
    tabela.appendChild(novaLinha);
  });
}

// Ao carregar a página, adiciona opções de continentes aos elementos <select> relevantes
document.addEventListener("DOMContentLoaded", function () {
  adicionarOpcoesParaSelect("continente");
  adicionarOpcoesParaSelect("filtroContinentes");
});

var carta1 = {
  nome: "Alisson",
  imagem:
    "img/alisson.png",
  atributos: {
    Gingado: 9,
    Seducao: 7,
    Dodoi: 5
  }
};

var carta2 = {
  nome: "Coala",
  imagem: "img/coala.jpeg",
  atributos: {
    Gingado: 7,
    Seducao: 9,
    Dodoi: 6
  }
};

var carta3 = {
  nome: "Dornelles",
  imagem: "img/dornelles.jpeg",
  atributos: {
    Gingado: 7,
    Seducao: 8,
    Dodoi: 4
  }
};

var carta4 = {
  nome: "Doug",
  imagem: "img/doug.png",
  atributos: {
    Gingado: 4,
    Seducao: 7,
    Dodoi: 6
  }
};

var carta5 = {
  nome: "Edu",
  imagem: "img/edu.png",
  atributos: {
    Gingado: 6,
    Seducao: 9,
    Dodoi: 7
  }
};

var carta6 = {
  nome: "Fabricio",
  imagem: "img/fabricio.png",
  atributos: {
    Gingado: 5,
    Seducao: 8,
    Dodoi: 3
  }
};

var carta7 = {
  nome: "Tulio",
  imagem: "img/tulio.png",
  atributos: {
    Gingado: 8,
    Seducao: 7,
    Dodoi: 5
  }
};

var carta8 = {
  nome: "Fernando",
  imagem: "img/fernando.jpeg",
  atributos: {
    Gingado: 4,
    Seducao: 7,
    Dodoi: 8
  }
};

var carta9 = {
  nome: "Seu Boneco - SUPERTRUNFO",
  imagem: "img/seubuneco.jpeg",
  atributos: {
    Gingado: 10,
    Seducao: 10,
    Dodoi: 10
  }
};

var carta10 = {
  nome: "Walteir",
  imagem: "img/walteir.jpeg",
  atributos: {
    Gingado: 7,
    Seducao: 9,
    Dodoi: 7
  }
};


var cartas = [carta1, carta2, carta3, carta4, carta5, carta6, carta7, carta8, carta9, carta10];
var cartaMaquina = 0;
var cartaJogador = 0;
let deckJogador = [];
let deckMaquina = [];
let empate = [];

//escrever quantidade de cartas no deck
function atualizaPlacar() {
let elementoQuantidadeCartasJogador = document.getElementById("exibeCartasJogador");
elementoQuantidadeCartasJogador.innerHTML = "<p>Cartas no deck: " + deckJogador.length + "</p>";
let elementoQuantidadeCartasMaquina = document.getElementById("exibeCartasMaquina");
elementoQuantidadeCartasMaquina.innerHTML = "<p>Cartas no deck: " + deckMaquina.length + "</p>";
}


//embaralhar as cartas
function fisherYatesShuffle(arr){
  for(var i =arr.length-1 ; i>0 ;i--){
      var j = Math.floor( Math.random() * (i + 1) ); //random index
      [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
  }
}

function separarDeck (deck) {
  fisherYatesShuffle(deck);   //embaralhar antes de separar
  deckJogador = deck.slice(0,deck.length/2);
  deckMaquina = deck.slice(deck.length/2);
  return deckJogador, deckMaquina;
}





function sortearCarta() {
  separarDeck(cartas);
  cartaMaquina = deckMaquina[0];
  cartaJogador = deckJogador[0];
  
  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;

  exibirCartaJogador();
}

function obtemAtributoSelecionado() {
  var radioAtributos = document.getElementsByName("atributo");
  for (var i = 0; i < radioAtributos.length; i++) {
    if (radioAtributos[i].checked == true) {
      return radioAtributos[i].value;
    }
  }
}

function jogar() {
  var atributoSelecionado = obtemAtributoSelecionado();
  var elementoResultado = document.getElementById("resultado");
  var valorCartaJogador = cartaJogador.atributos[atributoSelecionado];
  var valorCartaMaquina = cartaMaquina.atributos[atributoSelecionado];

  if (valorCartaJogador > valorCartaMaquina) {
    htmlResultado = "<p class='resultado-final'>Venceu</p>";
    jogadorVenceu();
  } else if (valorCartaMaquina > valorCartaJogador) {
    htmlResultado = "<p class='resultado-final'>Você perdeu</p>";
    maquinaVenceu();
  } else {
    htmlResultado = "<p class='resultado-final'>Empatou</p>";
    fisherYatesShuffle(deckJogador);
    fisherYatesShuffle(deckMaquina);
  }

  elementoResultado.innerHTML = htmlResultado;
  document.getElementById("btnJogar").disabled = true;
  document.getElementById("btnProximaRodada").disabled = false;
  exibirCartaMaquina();
}

function jogadorVenceu() {
 
  deckJogador.push(deckMaquina.shift());
  deckJogador.push(deckJogador.splice(0,1)[0]);

}
function maquinaVenceu(){
  
  deckMaquina.push(deckJogador.shift());
  deckMaquina.push(deckMaquina.splice(0,1)[0]);
}



function proximaRodada() {
  atualizaPlacar();
  verificaVencedor();
  cartaMaquina = 0;
  exibirCartaMaquina();
  cartaMaquina = deckMaquina[0];
  cartaJogador = deckJogador[0];
    
  document.getElementById("btnProximaRodada").disabled = true;
  document.getElementById("btnJogar").disabled = false;

  exibirCartaJogador();
}

function exibirCartaJogador() {
  var divCartaJogador = document.getElementById("carta-jogador");
  divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`;
  
  var moldura =
    '<img src="./img/moldura.png" style=" width: inherit; height: inherit; position: absolute;">';
  var tagHTML = "<div id='opcoes' class='carta-status'>";

  var opcoesTexto = "";
  for (var atributo in cartaJogador.atributos) {
    opcoesTexto +=
      "<input type='radio' name='atributo' value='" +
      atributo +
      "' checked>" +
      atributo +
      " " +
      cartaJogador.atributos[atributo] +
      "<br>";
  }

  var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`;
  divCartaJogador.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

function exibirCartaMaquina() {
  var divCartaMaquina = document.getElementById("carta-maquina");
  divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`;
  
  var moldura =
    '<img src="./img/moldura.png" style=" width: inherit; height: inherit; position: absolute;">';
  var tagHTML = "<div id='opcoes' class='carta-status'>";

  var opcoesTexto = "";
  for (var atributo in cartaMaquina.atributos) {
    opcoesTexto +=
      "<p name='atributo' id='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaMaquina.atributos[atributo] +
      "</p>";
  }
  var nome = `<p class = "carta-subtitle">${cartaMaquina.nome}</p>`;
  divCartaMaquina.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

function verificaVencedor() {
  if (deckJogador.length <= 0){
    elementoResultado = document.getElementById("resultado");
    htmlResultado = "<p class='resultado-final'>A Maquina venceu a partida</p>";
    elementoResultado.innerHTML = htmlResultado;
    document.getElementById("btnProximaRodada").disabled = true;
    document.getElementById("btnJogar").disabled = true;

  } else if (deckMaquina.length <=0){
    elementoResultado = document.getElementById("resultado");
    htmlResultado = "<p class='resultado-final'>O Jogador venceu a partida</p>";
    elementoResultado.innerHTML = htmlResultado;
    document.getElementById("btnProximaRodada").disabled = true;
    document.getElementById("btnJogar").disabled = true;
  }
}

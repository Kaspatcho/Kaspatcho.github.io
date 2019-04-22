var xo = document.getElementsByClassName('xo'); // Casas
var op = ["X", "O"]; // Simbolos
var vez = true; // Vez de quem
var cont = true; // continua ou nao
var vence = [ // Sequencias vencedoras
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function muda(n){ // Funcao principal
  if(cont && vez && xo[n].innerHTML != op[0] && xo[n].innerHTML != op[1]){ /*
      verifica se a casa onde o usuario clicou nao está ocupado
    */
    vez = false; // Alterna a vez
    xo[n].innerHTML = op[0]; // Escreve dentro da div
    venceu(); // verifica se foi uma jogada vencedora
    if(cont){ // verifica se o bot pode jogar
      ia(); // vez do bot
    }
    venceu(); // verifica se o bot ganhou
  }
}

function venceu(){
  for(c in vence){
    if(xo[vence[c][0]].innerHTML == op[0] && // verifica se as Sequencias vencedoras estão
      //ocupadas pelo mesmo simbolo
       xo[vence[c][1]].innerHTML == op[0] &&
       xo[vence[c][2]].innerHTML == op[0]){
      xo[vence[c][0]].style.color = "darkred";
      xo[vence[c][1]].style.color = "darkred";
      xo[vence[c][2]].style.color = "darkred";
      cont = false;
      break;
    } else if(xo[vence[c][0]].innerHTML == op[1] && // verifica tambem
              xo[vence[c][1]].innerHTML == op[1] &&
              xo[vence[c][2]].innerHTML == op[1]){
       xo[vence[c][0]].style.color = "darkred";
       xo[vence[c][1]].style.color = "darkred";
       xo[vence[c][2]].style.color = "darkred";
       cont = false;
       break;
    } else if(velha()){ // verifica se deu velha
      for(i=0; i < 9; i++){
        xo[i].style.color = "darkred";
        cont = false;
      }
    }
  }
}

function velha(){
  var ocupado = 0;
  for(c=0; c < 9; c++){ // loop pra ver se todas as casas estão ocupadas
    if(xo[c].innerHTML == op[0] || xo[c].innerHTML == op[1]){
      ocupado++;
    }
  }
  if(ocupado >= 9){
    return true;
  } else {
    return false;
  }
}

function restart(){ // funcao pra reiniciar o jogo
  for(c=0; c < xo.length; c++){
    xo[c].innerHTML = "";
    xo[c].style.color = "white";
    cont = true;
    vez = true;
  }
}




function ia(){ // principal do bot
  atack();
  vez = true;
}

function livre(){
  var analisa = true;
  for(c in vence){
    if(xo[vence[c][0]].innerHTML == op[0] && xo[vence[c][2]].innerHTML != op[0] && xo[vence[c][2]].innerHTML != op[1]
    &&   xo[vence[c][1]].innerHTML == op[0])
    {
         xo[vence[c][2]].innerHTML = op[1];
         //console.log("DEFESA");
         //console.log(vence[c][1]);
         analisa = false;
         break;
    }
     else if(xo[vence[c][0]].innerHTML == op[0] && xo[vence[c][2]].innerHTML != op[0] && xo[vence[c][2]].innerHTML != op[1]
    && xo[vence[c][2]].innerHTML == op[0])
    {
        xo[vence[c][1]].innerHTML = op[1];
        //console.log("DEFESA");
        //console.log(vence[c][1]);
        analisa = false;
        break;
    }
     else if(xo[vence[c][1]].innerHTML == op[0] && xo[vence[c][2]].innerHTML != op[0] && xo[vence[c][2]].innerHTML != op[1]
    && xo[vence[c][2]].innerHTML == op[0])
    {
        xo[vence[c][0]].innerHTML = op[1];
        analisa = false;
        //console.log("DEFESA");
        //console.log(vence[c][0]);
        break;
    }
  }
  if(analisa){
    segue();
  }
}

function atack(){
  var test = true;
  for(c in vence){
    if(xo[vence[c][0]].innerHTML == op[1] &&
       xo[vence[c][1]].innerHTML == op[1] && cont && xo[vence[c][2]].innerHTML != op[0] && xo[vence[c][2]].innerHTML != op[1])
    {
         xo[vence[c][2]].innerHTML = op[1];
         test = false;
         //console.log("ATAQUE");
         //console.log(vence[c][2]);
         break;
    }
     else if(xo[vence[c][0]].innerHTML == op[1] &&
    xo[vence[c][2]].innerHTML == op[1] && cont && xo[vence[c][1]].innerHTML != op[0] && xo[vence[c][1]].innerHTML != op[1])
    {
        xo[vence[c][1]].innerHTML = op[1];
        test = false;
        //console.log("ATAQUE");
        //console.log(vence[c][1]);
        break;
    }
     else if(xo[vence[c][1]].innerHTML == op[1] &&
    xo[vence[c][2]].innerHTML == op[1] && cont && xo[vence[c][0]].innerHTML != op[0] && xo[vence[c][0]].innerHTML != op[1])
    {
        xo[vence[c][0]].innerHTML = op[1];
        test = false;
        //console.log("ATAQUE");
        //console.log(vence[c][0]);
        break;
    }
  }
  if(test){
    livre();
  }
}

function segue(){
  var tentativas = 0;
  while(true){
    var posicao = Math.floor(Math.random() * (10 - 0) + 0);
    if(posicao >= 9){
      posicao = 8;
    } else if(posicao < 0){
      posicao = 0;
    }
    //console.log("Tanto faz");
    //console.log(posicao);
    if(cont && xo[posicao].innerHTML != op[0] && xo[posicao].innerHTML != op[1]){
      xo[posicao].innerHTML = op[1];
      break;
    }
    tentativas++;
    if(tentativas >= 10){
      venceu();
      break;
    }
  }
}

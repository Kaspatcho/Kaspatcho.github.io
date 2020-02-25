var xo = document.getElementsByClassName('xo'); // Casas
var op = ["X", "O"]; // Simbolos
var vez = true; // Vez de quem
const endColor = "#ff0";
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
    if(venceu()) drawResult(venceu()); // verifica se foi uma jogada vencedora
    if(cont){ // verifica se o bot pode jogar
      ia(); // vez do bot
    }
    if(venceu()) drawResult(venceu()); // verifica se o bot ganhou
  }
}

function venceu(){
  for(let c in vence){
    if(xo[vence[c][0]].innerHTML == op[0] && // verifica se as Sequencias vencedoras estão
      //ocupadas pelo mesmo simbolo
       xo[vence[c][1]].innerHTML == op[0] &&
       xo[vence[c][2]].innerHTML == op[0]){
      return {winner : "X", pos : c};
    } else if(xo[vence[c][0]].innerHTML == op[1] && // verifica tambem
              xo[vence[c][1]].innerHTML == op[1] &&
              xo[vence[c][2]].innerHTML == op[1]){
       return {winner : "O", pos : c};
    } else if(velha()){ // verifica se deu velha
      return {winner : "tie"};
    }
  }
  return null;
}

function drawResult({ winner, pos }){
  if(winner == "X" || winner == "O"){
    xo[vence[pos][0]].style.color = endColor;
    xo[vence[pos][1]].style.color = endColor;
    xo[vence[pos][2]].style.color = endColor;
    cont = false;
  } else if(winner == "tie"){
    for(i=0; i < 9; i++){
      xo[i].style.color = endColor;
      cont = false;
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
  return ocupado >= 9;
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
  getBestMove();
  vez = true;
}

function getBestMove() {
  let bestScore = -Infinity;
  let move;
  let pos = [];
  for (const x of xo) pos.push(x.innerHTML);

  for (let i = 0; i < pos.length; i++) {
      if (pos[i] == '') {
        pos[i] = op[1];
        let score = minimax(pos, 0, false);
        pos[i] = '';
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
  }
  if(xo[move]) xo[move].innerHTML = op[1];
}

let scores = {
  X: 10,
  O: -10,
  tie: 0
};

function minimax(board, depth, isMaximizing) {
  let result = venceu();
  if (result !== null) {
    return scores[result.winner];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] == '') {
        board[i] = op[1];
        let score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      if (board[i] == '') {
        board[i] = op[0];
        let score = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

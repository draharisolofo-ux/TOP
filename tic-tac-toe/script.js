const container = document.querySelector(".container");
const pop = document.querySelector(".pop-dialog");
const replayBtn = document.querySelector(".replay");
const resetBtn = document.querySelector(".reset");
const start = document.querySelector("#begin-game");
const p1 = document.querySelector("#player1");
const p2 = document.querySelector("#player2");
const message = document.querySelector(".player-display");

for(let i = 0; i < 9; i++)
{
  const div = document.createElement("div");
  div.id = i;
  div.classList.add("tic-block");
  div.dataset.index = i;
  div.style.pointerEvents = "none"
  container.append(div);
}

const blocks = document.querySelectorAll('.tic-block');

function GameoBoard() {
  let board = ["", "", "", "", "", "", "", "", ""];
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  let players = ["bot1", "bot2"];
  const values = ["❌", "⭕"];
  let move = 0;
  
  const getMorpionSymbol = () => values[move];
  
  const createPlayers = (playerOne, playerTwo) => { players[0] = playerOne ?? players[0]; players[1] = playerTwo ?? players[1]; }
  
  const getPlayers = () => players;
  
  const playerMove = (i) => {
    if(board[i])
    {
      return "full";
    }
    board[i] = values[move];
    move = (move + 1) % 2;
  }
  
  const playerTurn = () => players[move] + "'s turn";

  const rematch = () => board = board.fill("");
  const reset = () => {
    rematch();
    move = 0,
    players = ["bot1", "bot2"];
  }
  
  const checkWinner = () => {
    let winner = "";
    for(let i = 0; i < 2; i++) {
      let isWinning = winningCombinations.some(comb => comb.every(index => {
        return board[index] === values[i]
      }));
      if(isWinning) {
        winner = players[i];
        return winner + " wins";
      } else if(board.every(v => v != '')) {
        return "it's a tie";
      }
    }
  }

  return { 
    getMorpionSymbol, 
    createPlayers, 
    getPlayers, 
    playerMove, 
    playerTurn, 
    checkWinner,
    rematch,
    reset
  }
}

const { 
  getMorpionSymbol, 
  createPlayers, 
  getPlayers, 
  playerMove, 
  playerTurn, 
  checkWinner ,
  rematch,
  reset
} = GameoBoard();

start.addEventListener('click', () => {
  createPlayers(p1.value, p2.value);
  blocks.forEach(b => b.style.pointerEvents = "auto");
  pop.style.display = "none";
  message.textContent = "Start";
  setTimeout(() => message.textContent = playerTurn(), 1200);
});

blocks.forEach(b => b.addEventListener('click', (e) => {
  const input = parseInt(e.target.dataset.index);
  const symbol = getMorpionSymbol();
  const response = playerMove(input);
  if(response && (response.includes("full") || response.includes("reset")))
  {
    message.textContent = response;
  }
  else
    {
      message.textContent = playerTurn();
  }
  
  b.textContent = getMorpionSymbol();
  const winner = checkWinner();
  if(winner && (winner.includes("wins") || winner.includes("tie")))
  {
    blocks.forEach(b => b.style.pointerEvents = "none");
    message.textContent = winner;
    replayBtn.style.display = "inline-block"
    resetBtn.style.display = "inline-block"
  }
}));

replayBtn.addEventListener('click', function() {
  rematch();
  message.textContent = "let's start!";
  setTimeout(() => {
    message.textContent = playerTurn();
    blocks.forEach(b => {
      b.textContent = "";
      b.style.pointerEvents = "auto";
    });
  }, 1200);
  this.style.display = "none";
  resetBtn.style.display = "none";
})

resetBtn.addEventListener('click', function() {
  reset();
  blocks.forEach(b => {
    b.textContent = "";
    b.style.pointerEvents = "none";
  });
  message.textContent = "Please create your new players pseudo";
  this.style.display = "none";
  replayBtn.style.display = "none";
  pop.style.display = "inline-block";
  setTimeout(() => message.textContent = "", 1000);
})
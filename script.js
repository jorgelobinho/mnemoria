const gameBoard = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");
const chancesDisplay = document.getElementById("chances");
const resultDisplay = document.getElementById("result");

let score = 0;
let chances = 3;
let flippedCards = [];
let matchedCards = 0;

const images = [
  "🍎", "🍎",
  "🐶", "🐶",
  "🌟", "🌟",
  "🍔", "🍔",
  "🎩", "🎩",
  "⚽", "⚽",
];


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function initGame() {
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = 0;
  resultDisplay.innerHTML = ""; 

 
  const shuffledImages = shuffle([...images]);

  shuffledImages.forEach((img) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = img;


    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.innerText = "🂠"; 

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.innerText = img; 


    card.appendChild(cardBack);
    card.appendChild(cardFront);

  
    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
  });
}


function flipCard(card) {
  if (flippedCards.length >= 2 || card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}


function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.image === card2.dataset.image) {

    score += 3;
    matchedCards += 2;
    card1.classList.add("inactive");
    card2.classList.add("inactive");
    flippedCards = [];
  } else {
   
    score = Math.max(0, score - 2);
    chances--; 

    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 1000); 
  }

  updateScoreAndChances();

  setTimeout(() => checkEndGame(), 1100);
}


function updateScoreAndChances() {
  scoreDisplay.innerText = score;
  chancesDisplay.innerText = chances;
}


function checkEndGame() {
  if (matchedCards === images.length) {
    
    setTimeout(() => {
      resultDisplay.innerHTML = "<h2>Parabéns! Você venceu! 🎉</h2>";
    }, 500);
    resetGame();
  } else if (chances === 0) {
    
    setTimeout(() => {
      resultDisplay.innerHTML = "<h2>Você perdeu! 😢</h2>";
    }, 500);
    resetGame();
  }
}


function resetGame() {
  setTimeout(() => {
    score = 0;
    chances = 3;
    flippedCards = [];
    matchedCards = 0;
    updateScoreAndChances();
    initGame();
  }, 2000); 
}


initGame();

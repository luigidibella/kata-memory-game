const images = [
  'alien.png', 'bug.png', 'duck.png', 'rocket.png', 'spaceship.png', 'tiktac.png'
];

let flippedCards = [];
let matchedCards = [];
let errorCount = 0;

const gameboard = document.getElementById('game-board');
const errorCounter = document.getElementById('error-counter');

function double(array) {
  return array.concat(array);
}

const doubledImages = double(images);
// console.log(doubledImages);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  shuffle(doubledImages);
  // console.log(doubledImages);
  doubledImages.forEach(image => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    const imgElement = document.createElement('img');
    imgElement.src = "../assets/images/" + image;
    cardElement.appendChild(imgElement);
    cardElement.addEventListener('click', flipCard);
    gameboard.appendChild(cardElement);
  })
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
      this.classList.add('flipped');
      flippedCards.push(this);

      if (flippedCards.length === 2) {
          checkMatch();
      }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.querySelector('img').src === card2.querySelector('img').src) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      matchedCards.push(card1, card2);
      flippedCards = [];
      if (matchedCards.length === doubledImages.length) {
          setTimeout(() => alert('Hai vinto!'), 500);
      }
  } else {
      errorCount++;
      errorCounter.textContent = `Errori: ${errorCount}`;
      setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          flippedCards = [];
      }, 1000);
  }
}

createBoard();
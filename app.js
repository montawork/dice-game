'strict mode';
// select DOM elements
const selectDOMElements = (eles) => {
  const elements = [];
  eles.forEach((ele) => elements.push(document.querySelector(ele)));
  return elements;
};

const [
  playerOne,
  playerTwo,
  diceImage,
  newGameBtn,
  rollDiceBtn,
  holdBtn,
  scoreOne,
  scoreTwo,
] = selectDOMElements([
  '.player--0',
  '.player--1',
  '.dice',
  '.btn--new',
  '.btn--roll',
  '.btn--hold',
  '#score--0',
  '#score--1',
]);

// global vars
let currentScore = 0;
let scores = [0, 0];
let activePlayer = 0;
let isGameOver = false;
// all dice
const images = [
  './images/dice-1.png',
  './images/dice-2.png',
  './images/dice-3.png',
  './images/dice-4.png',
  './images/dice-5.png',
  './images/dice-6.png',
];

// events
rollDiceBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdGame);
newGameBtn.addEventListener('click', resetGame);

const changePlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).innerText = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
};

// play
function rollDice() {
  if (!isGameOver) {
    // display sound
    new Audio('./sounds/roll.mp3').play();
    // current values
    const randomDice = Math.floor(Math.random() * images.length);
    const currentImg = images[randomDice];
    diceImage.src = currentImg;
    diceImage.style.display = 'block';
    const currentDice = +currentImg.match(/\d/g)[0];
    currentScore += currentDice;
    // change player
    if (currentDice === 1) {
      new Audio('./sounds/lose.wav').play();
      changePlayer();
    } else {
      document.getElementById(`current--${activePlayer}`).innerText =
        currentScore;
    }
  }
}

function holdGame() {
  if (!isGameOver) {
    // sound
    new Audio('./sounds/next.wav').play();
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).innerText =
      scores[activePlayer];
    if (scores[activePlayer] < 100) {
      changePlayer();
    } else {
      new Audio('./sounds/win.wav').play();
      isGameOver = true;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceImage.style.display = 'none';
    }
  }
}
// reset
function resetGame() {
  new Audio('./sounds/start.wav').play();
  isGameOver = false;
  currentScore = 0;
  scores = [0, 0];
  scoreOne.innerText = 0;
  scoreTwo.innerText = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  playerOne.classList.add('player--active');
}

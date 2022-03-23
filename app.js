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
  currentOne,
  currentTwo,
] = selectDOMElements([
  '.player--0',
  '.player--1',
  '.dice',
  '.btn--new',
  '.btn--roll',
  '.btn--hold',
  '#score--0',
  '#score--1',
  '#current--0',
  '#current--1',
]);

// global vars
let currentScore = 0;
let totalOne = 0;
let totalTwo = 0;
const winAudio = new Audio('./sounds/win.wav');
const loseAudio = new Audio('./sounds/lose.wav');
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
rollDiceBtn.addEventListener('mouseup', rollDice);
holdBtn.addEventListener('mouseup', holdGame);
newGameBtn.addEventListener('click', resetGame);

// play
function rollDice() {
  // display sound
  const rollAudio = new Audio('./sounds/roll.mp3');
  rollAudio.play();
  if (
    !playerOne.classList.contains('player--winner') &&
    !playerTwo.classList.contains('player--winner')
  ) {
    diceImage.style.display = 'block';
  }
  // current values
  const randomDice = Math.floor(Math.random() * images.length);
  const currentImg = images[randomDice];
  diceImage.src = currentImg;
  const currentDice = +currentImg.match(/\d/g)[0];
  currentScore += currentDice;
  // player 1
  if (playerOne.classList.contains('player--active')) {
    if (currentDice === 1) {
      // display sound
      loseAudio.play();
      currentScore = 0;
      currentOne.innerText = currentScore;
      playerOne.classList.remove('player--active');
      playerTwo.classList.add('player--active');
    } else {
      currentOne.innerText = currentScore;
    }
  }
  // player 2
  else if (playerTwo.classList.contains('player--active')) {
    if (currentDice === 1) {
      // display sound
      loseAudio.play();
      currentScore = 0;
      currentTwo.innerText = currentScore;
      playerTwo.classList.remove('player--active');
      playerOne.classList.add('player--active');
    } else {
      currentTwo.innerText = currentScore;
    }
  }
}

function holdGame() {
  // sound
  const audio = new Audio('./sounds/next.wav');
  audio.play();
  if (playerOne.classList.contains('player--active')) {
    if (totalOne + currentScore < 100) {
      totalOne += currentScore;
      scoreOne.innerText = totalOne;
      currentOne.innerText = 0;
      playerOne.classList.remove('player--active');
      playerTwo.classList.add('player--active');
      currentScore = 0;
    } else {
      winAudio.play();
      scoreOne.innerText = totalOne + currentScore;
      playerOne.classList.remove('player--active');
      playerOne.classList.add('player--winner');
      diceImage.style.display = 'none';
    }
  } else if (playerTwo.classList.contains('player--active')) {
    if (totalTwo + currentScore < 100) {
      totalTwo += currentScore;
      scoreTwo.innerText = totalTwo;
      currentTwo.innerText = 0;
      playerTwo.classList.remove('player--active');
      playerOne.classList.add('player--active');
      currentScore = 0;
    } else {
      winAudio.play();
      scoreTwo.innerText = totalTwo + currentScore;
      playerTwo.classList.remove('player--active');
      playerTwo.classList.add('player--winner');
      diceImage.style.display = 'none';
    }
  }
}
// reset
function resetGame() {
  const startAudio = new Audio('./sounds/start.wav');
  startAudio.play();
  totalOne = 0;
  scoreOne.innerText = 0;
  totalTwo = 0;
  scoreTwo.innerText = 0;
  currentScore = 0;
  currentOne.innerText = 0;
  currentTwo.innerText = 0;
  playerTwo.classList.remove('player--active');
  playerTwo.classList.remove('player--winner');
  playerOne.classList.remove('player--winner');
  playerOne.classList.add('player--active');
}

const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEL = document.getElementById('score');
const timeEL = document.getElementById('time');
const endgameEL = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// list of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
  ];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time 
let time = 10;

// difficulty selection
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
// show on DOM
difficultySelect.value = difficulty;

// focus on input text on start
text.focus();

// start counting work
const timeInterval = setInterval(updateTime, 1000);

// event listeners 
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if(insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        e.target.value = '';
        
        if(difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 3;
        } else {
            time += 4;
        }
        updateTime();
    }
});

// settings toggle
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// setting difficulty select 
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
    location.reload();
})

// generate random word from array 
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// add random word to dom 
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord
}

// update score function 
function updateScore() {
    score++;
    scoreEL.innerHTML = score;
}

// updatetime
function updateTime() {
    time--;
    timeEL.innerHTML = time + 's';

    if(time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

// game over function
function gameOver() {
    endgameEL.innerHTML = `
    <h1>Time Ran Out!</h1>
    <p> Your final score is: ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
    endgameEL.style.display = 'flex';
}

addWordToDOM();

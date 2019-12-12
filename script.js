// creating array to store enemies info
let enemiesArray = [];

// creating array to store whiskies
let whiskiesArray = [];

// creating array to store nessies
let nessiesArray = [];

// creating player
let captain = new Captain(100, 380);

// create requestedId para requestanimationframe
let requestId;

// ------------------------------------------SETTING ELEMENTS GLOBALLY----------------------------------------
// creating canvas
let canvas = document.createElement('canvas');
let frames = 0;
let context = canvas.getContext('2d');

// set the you won page to show when the you won condition is met
let youWonPage = document.getElementById('you-won-page');

// set the game over page to show when the game over condition is met
let gameOverPage = document.getElementById('game-over-page');

// set bagpipeSong
let bagpipeSong = document.createElement('audio');
bagpipeSong.src = './song/Scotland the Brave.mp3';
bagpipeSong.loop = true;

// set points - score
let points = 0;

// set tintin theme song
// let themeSong = document.createElement('audio');
// themeSong.src = './song/The Adventures of TinTin.mp3';
// themeSong.loop = true;
// themeSong.autoplay = true;
// themeSong.load();

// ------------------------------------------GENERAL CANVAS SECTION-------------------------------------------
// object setting the main settings of the game
const generalSetting = {
  start() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let gameBoard = document.getElementById('game-board')
    gameBoard.appendChild(canvas);
  },
  score() {
    points = Math.floor(frames / 30);
    context.font = '30px Arial';
    context.fillStyle = 'white';
    context.fillText('Score: ' + points, canvas.width * 0.85, canvas.height * 0.1);
  }
}

// function to clean the board between transitions
function clearBoard() {
  let backgroundHeight = canvas.height;
  let backgroundWidth = canvas.width;

  context.clearRect(0, 0, backgroundWidth, backgroundHeight);
}

// ------------------------------------------ENEMY SECTION---------------------------------------------
// updating enemies' position
function updateEnemies() {
  for (let i = 0; i < enemiesArray.length; i += 1) {
    enemiesArray[i].x -= enemiesArray[i].speedX;
    enemiesArray[i].update();
  }

  frames += 1;

  // how long does it take to get the waves of attack (2s)
  if (frames % 120 === 0) {
    // change here the speed of the enemies being created
    let speed1 = 2;
    let speed2 = 3;
    let speed3 = 4;

    let x = canvas.width;

    let minY1 = 330;
    let maxY1 = 370;
    let minY2 = 370;
    let maxY2 = 410;
    let minY3 = 410;
    let maxY3 = 450;

    let enemyYPos1 = Math.floor(Math.random() * (maxY1 - minY1 + 1) + minY1);
    let enemyYPos2 = Math.floor(Math.random() * (maxY2 - minY2 + 1) + minY2);
    let enemyYPos3 = Math.floor(Math.random() * (maxY3 - minY3 + 1) + minY3);

    enemiesArray.push(new Enemies(x, enemyYPos1, speed1, 0.6));
    enemiesArray.push(new Enemies(x, enemyYPos2, speed2, 0.8));
    enemiesArray.push(new Enemies(x, enemyYPos3, speed3, 0.9));
  }
}

// function to fight the enemies
function fightEnemies() {
  enemiesArray.map((enemy) => {
    if (captain.fightWith(enemy)) {
      enemy.life -= captain.hitPoint;
    }
    return enemy;
  });

  checkDeadEnemies();
}

// function to check if the enemy died and remove it from array
function checkDeadEnemies() {
  for (let i = 0; i < enemiesArray.length; i += 1) {
    if (enemiesArray[i].life === 0) {
      enemiesArray.splice(i, 1);
    }
  }
}

// ------------------------------------------WHISKY SECTION---------------------------------------------
// updating whiskies' position
function updateWhiskies() {
  for (let i = 0; i < whiskiesArray.length; i += 1) {
    whiskiesArray[i].x -= whiskiesArray[i].speedX;
    whiskiesArray[i].update();
  }

  let whiskiesPosition = [{
      speed: 7,
      minY: 350,
      maxY: 380,
      whiskyYPos() {
        return Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY);
      },
      resize: 0.15,
    },
    {
      speed: 6,
      minY: 380,
      maxY: 410,
      whiskyYPos() {
        return Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY);
      },
      resize: 0.15,
    },
    {
      speed: 5,
      minY: 410,
      maxY: 440,
      whiskyYPos() {
        return Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY);
      },
      resize: 0.2,
    }
  ];

  // how long does it take between waves of whiskies (15s)
  if (frames % 900 === 0) {
    let x = canvas.width;
    let randomWhiskyPosition = Math.floor(Math.random() * whiskiesPosition.length);

    whiskiesArray.push(new Whiskies(x, whiskiesPosition[randomWhiskyPosition].whiskyYPos(), whiskiesPosition[randomWhiskyPosition].speed, whiskiesPosition[randomWhiskyPosition].resize));
  }
}

// function to let Haddock happy and drink a whisky bottle by himself
function checkIfDrunk() {
  whiskiesArray.map((bottle) => {
    if (captain.drinkWhisky(bottle)) {
      captain.getDrunk(true);
      bottle.isEmpty = true;
    }
    return bottle;
  });
  checkEmptyBottle();
}

function checkEmptyBottle() {
  for (let i = 0; i < whiskiesArray.length; i += 1) {
    if (whiskiesArray[i].isEmpty) {
      whiskiesArray.splice(i, 1);
    }
  }
}

// ------------------------------------------NESSIE SECTION---------------------------------------------
// updating nessies' position
function updateNessies() {
  for (let i = 0; i < nessiesArray.length; i += 1) {
    nessiesArray[i].x -= nessiesArray[i].speedX;
    nessiesArray[i].update();
  }

  let nessiesPosition = [{
      speed: 2,
      minY: 380,
      maxY: 400,
      nessieYPos() {
        return Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY);
      },
      resize: 0.6,
    },
    {
      speed: 4,
      minY: 400,
      maxY: 420,
      nessieYPos() {
        return Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY);
      },
      resize: 0.7,
    },
    {
      speed: 3,
      minY: 420,
      maxY: 440,
      nessieYPos() {
        return Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY);
      },
      resize: 0.8,
    }
  ];

  // how long does it take between waves of nessies (20s)
  if (frames % 1200 === 0) {
    let x = canvas.width;
    let randomNessiePosition = Math.floor(Math.random() * nessiesPosition.length);

    nessiesArray.push(new Nessies(x, nessiesPosition[randomNessiePosition].nessieYPos(), nessiesPosition[randomNessiePosition].speed, nessiesPosition[randomNessiePosition].resize));
  }
}

// function to let Haddock happy and drink a whisky bottle by himself
function checkIfMetNessie() {
  nessiesArray.map((nessie) => {
    if (captain.metCreature(nessie)) {
      captain.lives += nessie.giveHearts;
      nessie.hasMet = true;
    }
    return nessie;
  });
  checkNessieHelped();
}

function checkNessieHelped() {
  for (let i = 0; i < nessiesArray.length; i += 1) {
    if (nessiesArray[i].hasMet) {
      nessiesArray.splice(i, 1);
    }
  }
}

// ------------------------------------------END OF GAME---------------------------------------------

// function to check if the enemies got to Tintin and Snowy
function checkGameOver() {
  let crashed = enemiesArray.some(function (enemy) {
    return setTintinAndSnowy.crashWith(enemy);
  });

  if (crashed) {
    window.cancelAnimationFrame(requestId);

    // create a new element image with corresponding theme when game over is called
    let gameOverImg = document.createElement('img');

    // gameOverPage.style.display = 'initial';
    gameOverPage.classList.remove('d-none');
    gameOverPage.classList.add('d-flex');

    // set restart button to place image in the game over page
    let restartButton = document.getElementById('restart-button');

    // set image between text and button
    gameOverPage.insertBefore(gameOverImg, restartButton);

    // set text with score
    let score = document.getElementById('score-game-over');
    score.innerHTML = `Score: ${points}`;

    // choose a image from the repertoire according to if the captain is drunk or not
    if (captain.isDrunk) {
      gameOverImg.src = './images/gameoverdrunk.jpg';
    } else {
      gameOverImg.src = './images/gameoversober.png';
    }

    // hide the canvas
    canvas.style.display = 'none';
  }
}

// function to check if the player survived more than 30s
function checkWin() {
  if (frames % 1800 === 0) {

    // stop moving when you win
    window.cancelAnimationFrame(requestId);

    // create a new element image with corresponding theme when you won is called
    let youWonImg = document.createElement('img');

    // show youWonPage
    youWonPage.classList.remove('d-none');
    youWonPage.classList.add('d-flex');

    // set restart button to place image in the you won page
    let restartButton = document.getElementById('play-again-button');

    // set image between text and button
    youWonPage.insertBefore(youWonImg, restartButton);

    // set text with score
    let score = document.getElementsByClassName('score');
    score.innerHTML = `Score: ${points}`;

    // choose a image from the repertoire according to if the captain is drunk or not
    // if (captain.isDrunk) {
    // youWonImg.src = './images/wondrunk.jpg';
    // } else {
    // youWonImg.src = './images/wonsober.jpg';
    youWonImg.src = './images/youwon.png';
    // }

    // hide canvas
    canvas.style.display = 'none';
  }
}

// -------------------------------------START THE GAME-------------------------------------------------

// function to set the game and get it started
function startGame() {
  generalSetting.start();
  clearBoard();
  setTintinAndSnowy.update();
  captain.update();
  let introPage = document.getElementById('intro-page');
  introPage.style.display = 'none';
  window.requestAnimationFrame(updateGame);
}

function restartGame() {
// declare images
// let gameOverImg = gameOverPage.getElementsByTagName('img');
// let youWonImg = youWonPage.getElementsByTagName('img');

  console.log('giulia hey ho');
  if (canvas.style.display === 'none') {
    canvas.style.display = 'initial';
  }
  if (gameOverPage.classList.contains('d-flex')) {
    gameOverPage.classList.add('d-none');
    gameOverPage.classList.remove('d-flex');

    // reset images
    // gameOverPage.innerHTML = '';
    
  } else if (youWonPage.classList.contains('d-flex')) {
    youWonPage.classList.add('d-none');
    youWonPage.classList.remove('d-flex');

    // reset images
    // youWonPage.removeChild(youWonImg);

  }

  // reset the captain
  captain.x = 100;
  captain.y = 380;
  captain.isDrunk = false;

  // get arrays empty
  enemiesArray = [];
  whiskiesArray = [];
  nessiesArray = [];

  // reset score
  frames = 0;


  // reset the board
  window.requestAnimationFrame(updateGame);

}

// -------------------------------------UPDATE GAME-----------------------------------------------------
// function to update everything
function updateGame() {
  clearBoard();
  setTintinAndSnowy.update();
  generalSetting.score();
  checkDeadEnemies();
  checkIfDrunk();
  checkIfMetNessie();
  updateWhiskies();
  updateEnemies();
  updateNessies();
  captain.newPos();
  captain.update();
  console.log('oioioioi')
  requestId = window.requestAnimationFrame(updateGame);
  checkGameOver();
  checkWin();
}


// -------------------------------------TRIGGER EVENTS-------------------------------------------------
// when you click on the start button, start the game and set the board
document.getElementById('start-button').onclick = function () {
  startGame();
  bagpipeSong.play();
}

// when you press a key from the list, do something
document.onkeydown = function (key) {
  let steps = 5;
  switch (key.keyCode) {
    // left
    case 37:
      if (captain.x >= 20) {
        captain.walk -= steps;
        captain.isWalkingForward = false;
      } else {
        captain.walk = 0;
      }
      captain.alternateImage();
      break;
      // top
    case 38:
      if (captain.y >= 330) {
        captain.turn -= steps;
      } else {
        captain.turn = 0;
      }
      captain.alternateImage();
      break;
      // right
    case 39:
      if (captain.x <= 1000) {
        captain.walk += steps;
        captain.isWalkingForward = true;
      } else {
        captain.walk = 0;
      }
      captain.alternateImage();
      break;
      // down
    case 40:
      if (captain.y <= 500) {
        captain.turn += steps;
      } else {
        captain.turn = 0;
      }
      captain.alternateImage();
      break;
    case 32:
      if (captain.isDrunk) {
        captain.drunkAttack = true;
        fightEnemies();
      } else {
        fightEnemies();
      }
      break;
    default:
      break;
  }
};

// when you let the key, stop what you were doing
document.onkeyup = function (key) {
  captain.turn = 0;
  captain.walk = 0;
  captain.drunkAttack = false;
};

// when you click on the restart button, restart the game and reset the board
document.getElementById('restart-button').onclick = function () {
  restartGame();
}

// when you click on the restart button, restart the game and reset the board
document.getElementById('play-again-button').onclick = function () {
  restartGame();
}

// -------------------------------------TINTIN OBJECT-------------------------------------------------
// object tintin and snowy - fixed elements
const setTintinAndSnowy = {
  x: 0,
  y: canvas.height * 0.6,
  update() {
    let tintinAndSnowyPic = new Image();
    tintinAndSnowyPic.src = './images/tintinsnowy.png';
    context.drawImage(tintinAndSnowyPic, this.x, canvas.height * 0.6, tintinAndSnowyPic.width * 0.2, tintinAndSnowyPic.height * 0.2);
    this.width = tintinAndSnowyPic.width * 0.2;
    this.height = tintinAndSnowyPic.height * 0.2;
  },
  right() {
    return this.x + this.width;
  },
  crashWith(enemy) {
    return !(
      this.right() < enemy.left()
    )
  }
}
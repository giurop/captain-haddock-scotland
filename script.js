// creating array to store enemies info
const enemiesArray = [];

// creating array to store whiskies
const whiskiesArray = [];

// creating player
let captain = new Captain(100, 380);

// ------------------------------------------GENERAL CANVAS SECTION-------------------------------------------
// object setting the main settings of the game
const generalSetting = {
  canvas: document.createElement('canvas'),
  frames: 0,
  start() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGame, 200);
  },
  stop() {
    clearInterval(this.interval);
  },
  score() {
    let points = Math.floor(this.frames / 30);
    this.context.font = '30px Arial';
    this.context.fillStyle = 'white';
    this.context.fillText('Score: ' + points, this.canvas.width * 0.85, this.canvas.height * 0.1);
  }
}

// function to clean the board between transitions
function clearBoard() {
  const ctx = generalSetting.context;

  let backgroundHeight = generalSetting.canvas.height;
  let backgroundWidth = generalSetting.canvas.width;

  ctx.clearRect(0, 0, backgroundWidth, backgroundHeight);
}

// ------------------------------------------ENEMY SECTION---------------------------------------------
// updating enemies' position
function updateEnemies() {
  for (let i = 0; i < enemiesArray.length; i += 1) {
    enemiesArray[i].x -= enemiesArray[i].speedX;
    enemiesArray[i].update();
  }

  generalSetting.frames += 1;

  // how long does it take to get the waves of attack
  if (generalSetting.frames % 10 === 0) {
    // if (generalSetting.frames % 90 === 0) {
    // change here the speed of the enemies being created
    let speed1 = 15;
    let speed2 = 10;
    let speed3 = 20;

    let x = generalSetting.canvas.width;

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
      speed: 15,
      minY: 350,
      maxY: 380,
      whiskyYPos() {
        return Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY);
      },
      resize: 0.2,
    },
    {
      speed: 10,
      minY: 380,
      maxY: 410,
      whiskyYPos() {
        return Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY);
      },
      resize: 0.3,
    },
    {
      speed: 20,
      minY: 410,
      maxY: 440,
      whiskyYPos() {
        return Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY);
      },
      resize: 0.4,
    }
  ];

  // how long does it take between waves of whiskies
  if (generalSetting.frames % 200 === 0) {
    // console.log('HI WHISKY IFFFFF');
    let x = generalSetting.canvas.width;
    let randomWhiskyPosition = Math.floor(Math.random() * whiskiesPosition.length);
    // console.log(randomWhiskyPosition);

    whiskiesArray.push(new Whiskies(x, whiskiesPosition[randomWhiskyPosition].whiskyYPos(), whiskiesPosition[randomWhiskyPosition].speed, whiskiesPosition[randomWhiskyPosition].resize));
  }
}

// function to let Haddock happy and drink a whisky bottle by himself
function checkIfDrunk() {
  whiskiesArray.map((bottle) => {
    if (captain.drinkWhisky(bottle)) {
      captain.getDrunk(true);
      captain.drunkPeriod();
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

// ------------------------------------------END OF GAME---------------------------------------------

// function to check if the enemies got to Tintin and Snowy
function checkGameOver() {
  let ctx = generalSetting.context;
  let crashed = enemiesArray.some(function (enemy) {
    return setTintinAndSnowy.crashWith(enemy);
  });

  if (crashed) {
    // stop moving when enemies reach Tintin
    generalSetting.stop();

    // create a new element image with corresponding theme when game over is called
    let gameOverImg = document.createElement('img');

    // set the game over page to show when the game over condition is met
    let gameOverPage = document.getElementById('game-over-page');
    // gameOverPage.style.display = 'initial';
    gameOverPage.classList.remove('d-none');
    gameOverPage.classList.add('d-flex');

    // set restart button to place image in the game over page
    let restartButton = document.getElementById('restart-button');

    // set image between text and button
    gameOverPage.insertBefore(gameOverImg, restartButton);

    // choose a image from the repertoire according to if the captain is drunk or not
    if (captain.isDrunk) {
      gameOverImg.src = './images/gameoverdrunk.jpg';
    } else {
      gameOverImg.src = './images/gameoversober.jpg';
    }
    generalSetting.canvas.style.display = 'none';
  }
}

// function to check if the player survived more than 800 frames
function checkWin() {
  if (generalSetting.frames % 800 === 0) {
    let ctx = generalSetting.context;

    // stop moving when you win
    generalSetting.stop();

    // create a new element image with corresponding theme when you won is called
    let youWonImg = document.createElement('img');

    // set the you won page to show when the you won condition is met
    let youWonPage = document.getElementById('you-won-page');
    // youWonPage.style.display = 'initial';
    youWonPage.classList.remove('d-none');
    youWonPage.classList.add('d-flex');

    // set restart button to place image in the you won page
    let restartButton = document.getElementById('play-again-button');

    // set image between text and button
    youWonPage.insertBefore(youWonImg, restartButton);

    // choose a image from the repertoire according to if the captain is drunk or not
    // if (captain.isDrunk) {
    // youWonImg.src = './images/wondrunk.jpg';
    // } else {
    // youWonImg.src = './images/wonsober.jpg';
    youWonImg.src = './images/youwon.png';
    // }
    generalSetting.canvas.style.display = 'none';
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
  // let gameOverPage = document.getElementById('game-over-page');
  // gameOverPage.style.display = 'none';
  // gameOverPage.classList.add('d-none');
  // gameOverPage.classList.remove('d-flex');
  // let youWonPage = document.getElementById('you-won-page');
  // youWonPage.classList.add('d-none');
  // youWonPage.classList.remove('d-flex');
  // youWonPage.style.display = 'none';
}

// function to reset the game and get it restarted
// function restartGame() {
// generalSetting.canvas.style.display = 'initial';
// updateGame();
// startGame();
// }

// -------------------------------------UPDATE GAME-----------------------------------------------------
// function to update everything
function updateGame() {
  clearBoard();
  setTintinAndSnowy.update();
  generalSetting.score();
  checkDeadEnemies();
  checkIfDrunk();
  updateWhiskies();
  updateEnemies();
  captain.newPos();
  captain.update();
  // captain.update2();
  checkGameOver();
  checkWin();
}

// -------------------------------------TRIGGER EVENTS-------------------------------------------------
// when you click on the start button, start the game and set the board
document.getElementById('start-button').onclick = function () {
  startGame();
}

// when you press a key from the list, do something
document.onkeydown = function (key) {
  let steps = 5;
  switch (key.keyCode) {
    // left
    case 37:
      if (captain.x >= 20) {
        captain.walk -= steps;
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
// creating array to store enemies info
let enemiesArray = [];

// creating array to store whiskies
let whiskiesArray = [];

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

// object tintin and snowy - fixed elements
const setTintinAndSnowy = {
  x: 0,
  y: generalSetting.canvas.height * 0.6,
  update() {
    const ctx = generalSetting.context;
    let tintinAndSnowyPic = new Image();
    tintinAndSnowyPic.src = './images/tintinsnowy.png';
    tintinAndSnowyPic.onload = () => {
      ctx.drawImage(tintinAndSnowyPic, this.x, generalSetting.canvas.height * 0.6, tintinAndSnowyPic.width * 0.2, tintinAndSnowyPic.height * 0.2);
    }
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

// object constructor based on the Captain
class Captain {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.walk = 0;
    this.turn = 0;
    // this.lifes = 3;
    this.hitPoint = 1;
    this.isDrunk = false;
    // this.isDrunk = true;
    this.closenessToEnemy = 0.5;
  }

  newPos() {
    this.x += this.walk;
    this.y += this.turn;
  }

  update1() {
    let ctx = generalSetting.context;
    let captainImage1 = new Image();
    if (this.isDrunk) {
      captainImage1.src = './images/haddockwalkingdrunk.png';
    } else {
      captainImage1.src = './images/captainhaddockwalking2.png';
    }
    captainImage1.onload = () => {
      ctx.drawImage(captainImage1, this.x, this.y, captainImage1.width * 0.9, captainImage1.height * 0.9);
    }
    this.width = captainImage1.width;
    this.height = captainImage1.height;
  }

  top() {
    return this.y;
  }

  right() {
    return this.x + this.width;
  }

  bottom() {
    return this.y + this.height;
  }

  left() {
    return this.x;
  }

  // getDrunk() {
  //   if (this.isDrunk) {
  //     this.hitPoint += 2;
      // or should I write true instead
      // this.isDrunk = !this.isDrunk;
    }
  }

  // drunkAttack() {
  //   if(this.isDrunk) {
  //     let ctx = generalSetting.context;
  //     let captainAttackImage = new Image();
  //     captainAttackImage.src = './images/haddockwalkingdrunk.png';
  //     captainAttackImage.onload = () => {
  //       ctx.drawImage(captainAttackImage, this.x, this.y, captainAttackImage.width * 0.9, captainAttackImage.height * 0.9);
  //     }
  //     this.width = captainAttackImage.width;
  //     this.height = captainAttackImage.height;
  //   }
  // }

  // checkLife() {

  // }

  // fightWith(enemy) {
  //   return !(
  //     this.top() > enemy.bottom() ||
  //     this.right() < enemy.left() ||
  //     this.bottom() < enemy.top() ||
  //     this.left() > enemy.right()
  //   )
  // }
  
  fightWith(enemy) {
    return !(
      enemy.top() - this.top() > this.closenessToEnemy * this.height ||
      this.bottom() - enemy.bottom() > this.closenessToEnemy * this.height ||
      enemy.left() - this.left() > this.closenessToEnemy * this.width ||
      this.right() - enemy.right() > this.closenessToEnemy * this.width
    )
  }


  // update2() {
  //   let ctx = generalSetting.context;
  //   let captainImage2 = new Image();
  //   captainImage2.src = './images/captainhaddockwalking3.png';
  //   captainImage2.onload = () => {
  //     ctx.drawImage(captainImage2, this.x, this.y, captainImage1.width * 0.13, captainImage1.height * 0.13);
  //   }
  // }
}

// object constructor based on the enemies
class Enemies {
  constructor(x, y, speedX, resize) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.resize = resize;
    this.life = 3;
  }

  update() {
    let ctx = generalSetting.context;
    let enemyImg = new Image();
    enemyImg.src = './images/enemies.png';
    enemyImg.onload = () => {
      ctx.drawImage(enemyImg, this.x, this.y, enemyImg.width * this.resize, enemyImg.height * this.resize);
    }
    this.width = enemyImg.width * this.resize;
    this.height = enemyImg.height * this.resize;
  }

  top() {
    return this.y;
  }

  right() {
    return this.x + this.width;
  }

  bottom() {
    return this.y + this.height;
  }

  left() {
    return this.x;
  }
}

// object constructor for whisky
class Whiskies {
  constructor(x, y, speedX, resize) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.resize = resize;
  }

  update() {
    let ctx = generalSetting.context;
    let whiskyImg = new Image();
    whiskyImg.src = './images/whisky.png';
    whiskyImg.onload = () => {
      ctx.drawImage(whiskyImg, this.x, this.y, whiskyImg.width * this.resize, whiskyImg.height * this.resize);
    }
    this.width = whiskyImg.width * this.resize;
    this.height = whiskyImg.height * this.resize;
  }

  top() {
    return this.y;
  }

  right() {
    return this.x + this.width;
  }

  bottom() {
    return this.y + this.height;
  }

  left() {
    return this.x;
  }
}

// creating player
let captain = new Captain(100, 380);

// updating enemies' position
function updateEnemies() {
  for (let i = 0; i < enemiesArray.length; i += 1) {
    enemiesArray[i].x -= enemiesArray[i].speedX;
    enemiesArray[i].update();
  }

  generalSetting.frames += 1;
  if (generalSetting.frames % 90 === 0) {
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

// updating whiskies' position
function updateWhiskies() {
  for (let i = 0; i < whiskiesArray.length; i += 1) {
    whiskiesArray[i].x -= whiskiesArray[i].speedX;
    whiskiesArray[i].update();
  }

  let whiskiesPosition = [
    {
      speed: 15,
      minY: 350,
      maxY: 380,
      enemyYPos() {
        return Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY);
      },
      resize: 0.2,
    },
    {
      speed: 10,
      minY: 380,
      maxY: 410,
      enemyYPos() {
        return Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY);
      },
      resize: 0.3,
    },
    {
      speed: 20,
      minY: 410,
      maxY: 440,
      enemyYPos() {
        return Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY);
      },
      resize: 0.4,
    }
  ];

  if (generalSetting.frames % 200 === 0) {
    console.log('HI WHISKY IFFFFF');
    let x = generalSetting.canvas.width;
    let randomWhiskyPosition = Math.floor(Math.random() * whiskiesPosition.length);
    console.log(randomWhiskyPosition);

    whiskiesArray.push(new Whiskies(x, whiskiesPosition[randomWhiskyPosition].enemyYPos(), whiskiesPosition[randomWhiskyPosition].speed, whiskiesPosition[randomWhiskyPosition].resize));
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

// function to let Haddock happy and drink a whisky bottle by himself
function getDrunk() {
  whiskiesArray
}

// function to check if the enemies got to Tintin and Snowy
function checkGameOver() {
  let crashed = enemiesArray.some(function (enemy) {
    return setTintinAndSnowy.crashWith(enemy);
  });

  if (crashed) {
    generalSetting.stop();
  }
}

// function checkCaptainIsDrunk() {

// }

// function to set the game and get it started
function startGame() {
  generalSetting.start();
  clearBoard();
  setTintinAndSnowy.update();
  captain.update1();
  let htmlPage = document.getElementById('html-page');
  htmlPage.style.display = "none";
}

// function to update everything
function updateGame() {
  clearBoard();
  setTintinAndSnowy.update();
  generalSetting.score();
  checkDeadEnemies();
  updateWhiskies();
  updateEnemies();
  captain.newPos();
  captain.update1();
  // captain.update2();
  checkGameOver();
}

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
      break;
      // top
    case 38:
      if (captain.y >= 330) {
        captain.turn -= steps;
      } else {
        captain.turn = 0;
      }
      break;
      // right
    case 39:
      if (captain.x <= 1000) {
        captain.walk += steps;
      } else {
        captain.walk = 0;
      }
      break;
      // down
    case 40:
      if (captain.y <= 500) {
        captain.turn += steps;
      } else {
        captain.turn = 0;
      }
      break;
      case 32:
        if (captain.isDrunk) {

        } else {
          fightEnemies();
        }
        break;
    default:
      break;
  }
}

// when you let the key, stop what you were doing
document.onkeyup = function (key) {
  captain.turn = 0;
  captain.walk = 0;
}
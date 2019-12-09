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

function clearBoard() {
  const ctx = generalSetting.context;

  let backgroundHeight = generalSetting.canvas.height;
  let backgroundWidth = generalSetting.canvas.width;

  ctx.clearRect(0, 0, backgroundWidth, backgroundHeight);
}

function setTintinAndSnowy() {
  const ctx = generalSetting.context;

  let tintinAndSnowyPic = new Image();
  tintinAndSnowyPic.src = './images/tintinsnowy.png';
  tintinAndSnowyPic.onload = () => {
    // ctx.drawImage(tintinAndSnowyPic, 0, 400, tintinAndSnowyPic.width * 0.2, tintinAndSnowyPic.height * 0.2);
    ctx.drawImage(tintinAndSnowyPic, 0, generalSetting.canvas.height * 0.6, tintinAndSnowyPic.width * 0.2, tintinAndSnowyPic.height * 0.2);
  }
}

class Captain {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.walk = 0;
    this.turn = 0;
  }

  newPos() {
    this.x += this.walk;
    console.log(this.x);
    console.log(this.walk);
    console.log('oigiu');
    this.y += this.turn;
  }

  update1() {
    let ctx = generalSetting.context;
    let captainImage1 = new Image();
    captainImage1.src = './images/captainhaddockwalking2.png';
    captainImage1.onload = () => {
      ctx.drawImage(captainImage1, this.x, this.y, captainImage1.width * 0.13, captainImage1.height * 0.13);
    }
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

class Enemies {
  constructor(x, y, speedX) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
  }
}

// creating player
let captain = new Captain(0, 380);

function startGame() {
  generalSetting.start();
  clearBoard();
  setTintinAndSnowy();
  // let captain = new Captain(0, 380);
  captain.update1();
  // captain.update2();
}

function updateGame() {
  clearBoard();
  setTintinAndSnowy();
  generalSetting.score();
  // let captain = new Captain(0, 380);
  captain.newPos();
  captain.update1();
}

document.getElementById('start-button').onclick = function () {
  startGame();
}

document.onkeydown = function (key) {
  let steps = 5;
  switch (key.keyCode) {
    // left
    case 37:
      if (captain.x >= 0) {
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
    default:
      break;
  }
}

document.onkeyup = function (key) {
  captain.turn = 0;
  captain.walk = 0;
}
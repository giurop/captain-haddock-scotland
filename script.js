const generalSetting = {
  canvas: document.createElement('canvas'),
  start() {
    this.canvas.width = 1300;
    this.canvas.height = 700;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },
  stop() {
    clearInterval(this.interval);
  }
}

function createBoard () {
  const ctx = generalSetting.context;

  let backgroundHeight = generalSetting.canvas.height;
  let backgroundWidth = generalSetting.canvas.width;

  // ctx.fillStyle = 'black';
  // ctx.fillRect(0, 0, backgroundWidth, backgroundHeight);
  ctx.clearRect(0, 0, backgroundWidth, backgroundHeight);

  let background = new Image();
  background.src = './images/edinburghcastlelow.jpg';
  // console.log(background);
  background.onload = () =>{
    ctx.drawImage(background, 0, 0, backgroundWidth, backgroundHeight);
  }
  // console.log(generalSetting.canvas.width);
  // console.log(generalSetting.canvas.height);
}

function setTintinAndSnowy() {
  const ctx = generalSetting.context;

  let tintinAndSnowyPic = new Image ();
  tintinAndSnowyPic.src = './images/tintinsnowy.png';
  tintinAndSnowyPic.onload = () => {
    ctx.drawImage(tintinAndSnowyPic, 0, 400, tintinAndSnowyPic.width * 0.2, tintinAndSnowyPic.height * 0.2);
  }
}

class Captain {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    // this.width = width;
    // this.height = height;
  }
  
  update1() {
    let ctx = generalSetting.context;
    let captainImage1 = new Image();
    captainImage1.src = './images/captainhaddockwalking2.png';
    captainImage1.onload = () => {
      ctx.drawImage(captainImage1, this.x, this.y, captainImage1.width * 0.13, captainImage1.height * 0.13);
    }
  }

  update2() {
    let ctx = generalSetting.context;
    let captainImage2 = new Image();
    captainImage2.src = './images/captainhaddockwalking3.png';
    captainImage2.onload = () => {
      ctx.drawImage(captainImage2, this.x, this.y, captainImage1.width * 0.13, captainImage1.height * 0.13);
    }
  }
}


function startGame() {
  generalSetting.start();
  createBoard();
  setTintinAndSnowy();
  let captain = new Captain(0, 380);
  captain.update1();
  // captain.update2();
}

document.getElementById('start-button').onclick = function () {
  startGame();
}
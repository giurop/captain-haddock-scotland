// object constructor for whisky
class Whiskies {
  constructor(x, y, speedX, resize) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.resize = resize;
    this.isEmpty = false;
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

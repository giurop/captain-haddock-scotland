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

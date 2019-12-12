// object constructor based on the enemies
class Enemies {
  constructor(x, y, speedX, resize) {
    this.x = x;
    this.y = y;

    // speed in which the enemies move
    this.speedX = speedX;

    // to make it more into perspective
    this.resize = resize;

    // how many lives they have - how many hits they take before 'dying'
    this.life = 3;
  }

  update() {
    let enemyImg = new Image();
    enemyImg.src = './images/enemies.png';
    context.drawImage(enemyImg, this.x, this.y, enemyImg.width * this.resize, enemyImg.height * this.resize);
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
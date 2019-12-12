// object constructor for water
class Water {
  constructor(x, y, speedX, resize) {
    this.x = x;
    this.y = y;

    // speed of movement
    this.speedX = speedX;

    // to resize the image to make it more into perspective
    this.resize = resize;

    // toggle to know if it was drank and is removed from the array
    this.wasDrank = false;

    // how many lives it will take from the captain
    this.takeHearts = 1;

    // check if has met the captain
    // this.hasMet = false;
  }

  update() {
    let waterImg = new Image();
    waterImg.src = './images/water.png';
      context.drawImage(waterImg, this.x, this.y, waterImg.width * this.resize, waterImg.height * this.resize);
    this.width = waterImg.width * this.resize;
    this.height = waterImg.height * this.resize;
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
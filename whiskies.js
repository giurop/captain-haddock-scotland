// object constructor for whisky
class Whiskies {
  constructor(x, y, speedX, resize) {
    this.x = x;
    this.y = y;

    // speed of movement
    this.speedX = speedX;

    // to resize the image to make it more into perspective
    this.resize = resize;

    // toggle to know when it was drunk and is removed from the array
    this.isEmpty = false;
  }

  update() {
    let whiskyImg = new Image();
    whiskyImg.src = './images/whisky.png';
      context.drawImage(whiskyImg, this.x, this.y, whiskyImg.width * this.resize, whiskyImg.height * this.resize);
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

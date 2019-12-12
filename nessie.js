// object constructor for nessie
class Nessies {
  constructor(x, y, speedX, resize) {
    this.x = x;
    this.y = y;

    // speed of movement
    this.speedX = speedX;

    // to resize the image to make it more into perspective
    this.resize = resize;

    // toggle to know when it has helped and is removed from the array
    this.hasHelped = false;

    // how many lives it will gave the captain
    this.giveHearts = 1;

    // check if has met the captain
    this.hasMet = false;
  }

  update() {
    let nessieImg = new Image();
    nessieImg.src = './images/nessie.png';
      context.drawImage(nessieImg, this.x, this.y, nessieImg.width * this.resize, nessieImg.height * this.resize);
    this.width = nessieImg.width * this.resize;
    this.height = nessieImg.height * this.resize;
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
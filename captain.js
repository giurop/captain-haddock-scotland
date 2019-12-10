// object constructor based on the Captain
class Captain {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.walk = 0;
    this.turn = 0;
    this.walkThisWay = true;
    // this.drunkAttack = false;
    this.drunkAttack = false;
    // this.lifes = 3;
    this.hitPoint = 1;
    // this.isDrunk = false;
    this.isDrunk = true;
    this.closenessToEnemy = 0.5;
  }

  newPos() {
    this.x += this.walk;
    this.y += this.turn;
  }

  update() {
    let ctx = generalSetting.context;
    let captainImage = new Image();

    if (this.isDrunk) {
      if (this.drunkAttack) {
        captainImage.src = './images/haddockattackingdrunk.png';
        captainImage.onload = () => {
          ctx.drawImage(captainImage, this.x, this.y, captainImage.width * 0.9, captainImage.height * 0.9);
        };
      } else {
        captainImage.src = './images/haddockwalkingdrunk.png';
        captainImage.onload = () => {
          ctx.drawImage(captainImage, this.x, this.y, captainImage.width * 0.9, captainImage.height * 0.9);
        };
      }
    } else {
      if (this.walkThisWay) {
        captainImage.src = './images/captainhaddockwalking3.png';
        captainImage.onload = () => {
          ctx.drawImage(captainImage, this.x, this.y, captainImage.width * 0.95, captainImage.height * 0.95);
        };
      } else {
        captainImage.src = './images/captainhaddockwalking4.png';
        captainImage.onload = () => {
          ctx.drawImage(captainImage, this.x, this.y, captainImage.width * 0.8, captainImage.height * 0.8);
        };
      }
    }
    this.width = captainImage.width;
    this.height = captainImage.height;
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

  getDrunk(whisky) {
    this.isDrunk = whisky;
    if (whisky) {
      this.hitPoint += 2;
    }
  }

  drunkPeriod() {
    setTimeout(this.getDrunk(false), 2000);
  }

  alternateImage() {
    if (!this.isDrunk) {
      this.walkThisWay = !this.walkThisWay;
    }
  }

  // checkLife() {

  // }

  drinkWhisky(bottle) {
    return !(
      this.top() > bottle.top() ||
      this.right() < bottle.right() ||
      this.bottom() < bottle.bottom() ||
      this.left() > bottle.left()
    )
  }

  fightWith(enemy) {
    return !(
      enemy.top() - this.top() > this.closenessToEnemy * this.height ||
      this.bottom() - enemy.bottom() > this.closenessToEnemy * this.height ||
      enemy.left() - this.left() > this.closenessToEnemy * this.width ||
      this.right() - enemy.right() > this.closenessToEnemy * this.width
    )
  }
}
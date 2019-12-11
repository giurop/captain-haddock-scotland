// object constructor based on the Captain
class Captain {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    // x axis movement
    this.walk = 0;

    // y axis movement
    this.turn = 0;

    // toggle to change sober image while walking
    this.walkThisWay = true;

    // toggle to show attack image when drunk
    this.drunkAttack = false;
    // this.drunkAttack = true;

    // captain's life
    // this.lifes = 3;

    // the damage the captain does on the enemies
    this.hitPoint = 1;

    // toggle to show drunk images
    this.isDrunk = false;
    // this.isDrunk = true;

    // how close the captain have to be to his enemies to be able to attack them
    this.closenessToEnemy = 0.5;

    // how close the captain have to be to the whisky to be able to drink it
    this.closenessToWhisky = 0.5;
  }

  newPos() {
    this.x += this.walk;
    this.y += this.turn;
  }

  update() {
    let captainImage = new Image();

    if (this.isDrunk) {
      if (this.drunkAttack) {
        captainImage.src = './images/haddockattackingdrunk.png';
        // captainImage.onload = () => {
          context.drawImage(captainImage, this.x, this.y, captainImage.width * 0.9, captainImage.height * 0.9);
        // };
      } else {
        captainImage.src = './images/haddockwalkingdrunk.png';
        // captainImage.onload = () => {
          context.drawImage(captainImage, this.x, this.y, captainImage.width * 0.9, captainImage.height * 0.9);
        // };
      }
    } else {
      if (this.walkThisWay) {
        captainImage.src = './images/captainhaddockwalking3.png';
        // captainImage.onload = () => {
          context.drawImage(captainImage, this.x, this.y, captainImage.width * 0.95, captainImage.height * 0.95);
        // };
      } else {
        captainImage.src = './images/captainhaddockwalking4.png';
        // captainImage.onload = () => {
          context.drawImage(captainImage, this.x, this.y, captainImage.width * 0.8, captainImage.height * 0.8);
        // };
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

  // set a parameter - boolean, when true, sets isDrunk to true and adds up to hitPoints (more damage)
  getDrunk(whisky) {
    console.log(whisky);
    this.isDrunk = whisky;
    if (whisky) {
      console.log('drink whisky');
      this.hitPoint = 3;
      this.drunkPeriod();
    } else {
      console.log('dont drink whisky');
      this.hitPoint = 1;
    }
  }

  // a period of time that takes to the captain to sober up
  drunkPeriod() {
    setTimeout(() => this.getDrunk(false), 15000);
  }

  // to alternate between images - will change the status of the walkThisWay between true and false
  alternateImage() {
    if (this.isDrunk === false) {
      this.walkThisWay = !this.walkThisWay;
    }
  }

  // when to drink the bottle of whisky -> only when the captain hides it completely from the screen
  drinkWhisky(bottle) {
    return (
      this.top() < bottle.bottom() &&
      this.right() > bottle.left() &&
      this.bottom() > bottle.top() &&
      this.left() < bottle.right()
    )
  }

  // when fighting the enemies how to know if they are close enough to hit
  fightWith(enemy) {
    return !(
      enemy.top() - this.top() > this.closenessToEnemy * this.height ||
      this.bottom() - enemy.bottom() > this.closenessToEnemy * this.height ||
      enemy.left() - this.left() > this.closenessToEnemy * this.width ||
      this.right() - enemy.right() > this.closenessToEnemy * this.width
    )
  }

  // checkLife() {

  // }
}
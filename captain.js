let setTimeOutId;

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

    // toggle to change sober image while walking backwards
    this.isWalkingForward = true;

    // toggle to show attack image when drunk
    this.drunkAttack = false;

    // captain's life
    this.lives = 3;

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
        if (this.isWalkingForward) {
          captainImage.src = './images/haddockattackingdrunk.png';
          context.drawImage(captainImage, this.x, this.y, captainImage.width * 0.9, captainImage.height * 0.9);
        } else {
          captainImage.src = './images/haddockattackingdrunk-back.png';
          context.drawImage(captainImage, this.x, this.y, captainImage.width * 0.9, captainImage.height * 0.9);
        }
      } else {
        if (this.isWalkingForward) {
          captainImage.src = './images/haddockwalkingdrunk.png';
          context.drawImage(captainImage, this.x, this.y, captainImage.width * 0.9, captainImage.height * 0.9);
        } else {
          captainImage.src = './images/haddockwalkingdrunk-back.png';
          context.drawImage(captainImage, this.x, this.y, captainImage.width * 0.9, captainImage.height * 0.9);
        }
      }
    } else {
      if (this.walkThisWay) {
        if (this.isWalkingForward) {
          captainImage.src = './images/captainhaddockwalking3.png';
          context.drawImage(captainImage, this.x, this.y, captainImage.width * 0.95, captainImage.height * 0.95);
        } else {
          captainImage.src = './images/captainhaddockwalking3-back.png';
          context.drawImage(captainImage, this.x, this.y, captainImage.width * 0.95, captainImage.height * 0.95);
        }
      } else {
        if (this.isWalkingForward) {
          captainImage.src = './images/captainhaddockwalking4.png';
          context.drawImage(captainImage, this.x, this.y, captainImage.width * 0.8, captainImage.height * 0.8);
        } else {
          captainImage.src = './images/captainhaddockwalking4-back.png';
          context.drawImage(captainImage, this.x, this.y, captainImage.width * 0.8, captainImage.height * 0.8);
        }
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

    if (this.isDrunk === true) {
      clearTimeout(setTimeOutId);
    }
    this.isDrunk = whisky;
    if (whisky) {
      this.hitPoint = 3;
      this.drunkPeriod();
    } else {
      this.hitPoint = 1;
    }
  }

  // a period of time that takes to the captain to sober up
  drunkPeriod() {
    setTimeOutId = setTimeout(() => this.getDrunk(false), 8000);
  }

  // to alternate between images - will change the status of the walkThisWay between true and false
  alternateImage() {
    if (this.isDrunk === false) {
      this.walkThisWay = !this.walkThisWay;
    }
  }

  // when to drink the bottle of whisky -> only when the captain gets to it
  drinkWhisky(bottle) {
    return (
      this.top() < bottle.bottom() &&
      this.right() > bottle.left() &&
      this.bottom() > bottle.top() &&
      this.left() < bottle.right()
    )
  }

  // when to drink the bottle of water -> only when the captain gets to it
  drinkWater(bottle) {
    return (
      this.top() < bottle.bottom() &&
      this.right() > bottle.left() &&
      this.bottom() > bottle.top() &&
      this.left() < bottle.right()
    )
  }

  // when to consider you met Nessie -> only when the captain touches it
  metCreature(nessie) {
    return (
      this.top() < nessie.bottom() &&
      this.right() > nessie.left() &&
      this.bottom() > nessie.top() &&
      this.left() < nessie.right()
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
}
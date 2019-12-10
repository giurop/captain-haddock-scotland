// object tintin and snowy - fixed elements
const setTintinAndSnowy = {
  x: 0,
  y: generalSetting.canvas.height * 0.6,
  update() {
    const ctx = generalSetting.context;
    let tintinAndSnowyPic = new Image();
    tintinAndSnowyPic.src = './images/tintinsnowy.png';
    tintinAndSnowyPic.onload = () => {
      ctx.drawImage(tintinAndSnowyPic, this.x, generalSetting.canvas.height * 0.6, tintinAndSnowyPic.width * 0.2, tintinAndSnowyPic.height * 0.2);
    }
    this.width = tintinAndSnowyPic.width * 0.2;
    this.height = tintinAndSnowyPic.height * 0.2;
  },
  right() {
    return this.x + this.width;
  },
  crashWith(enemy) {
    return !(
      this.right() < enemy.left()
    )
  }
}

class Bullet {
    constructor(ctx, x, y, speedY) {
      this.ctx = ctx;
      this.image = new Image();
      this.image.src = './img/bullet-01.png';
      this.width = 10;
      this.height = 12;
      this.speedY = speedY;
      this.x = x;
      this.y = y;
      this.isReady = false;
  
      this.image.onload = () => {
        this.width = this.height * this.image.width / this.image.height;
        this.isReady = true;
      };
    }
  
    draw() {
      if (this.isReady) {
        this.ctx.drawImage(
          this.image,
          this.x,
          this.y,
          this.width,
          this.height
        );
      }
    }
  
    move() {
      this.y += this.speedY;
    }
  
    clear() {
      // Eliminar la imagen de la bala del lienzo
      this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }
  }
class Bullet {
    constructor(ctx, x, y, bulletImageSrc,speedX, speedY) {
      this.ctx = ctx;
      this.image = new Image();
      this.image.src = bulletImageSrc;
      this.width = 10;
      this.height = 12;
      this.speedY = speedY;
      this.speedX = speedX;
      this.x = x;
      this.y = y;
      this.isReady = false;
  
      this.image.onload = () => {
        this.width = this.height * this.image.width / this.image.height;
        this.isReady = true;
      };
      this.sound = new Audio();
      this.sound.src = './sound/bullet.wav';

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
        this.x += this.speedX;
        this.y += this.speedY;
  
      if (this.x <= 0) {
        this.x = 0;
      }
  
      if (this.x >= this.ctx.canvas.width - this.width) {
        this.x = this.ctx.canvas.width - this.width;
      }
  
      if (this.y <= 0) {
        this.y = 0;
      }
  
      if (this.y >= this.ctx.canvas.height - this.height) {
        this.y = this.ctx.canvas.height - this.height;
      }

    }
  
    clear() {
      // Eliminar la imagen del bullet  del lienzo
      this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }


     // colicion con los invaders (si los bullet dispara y le da a un enemy)

    collidesWith(invader) {
      const collision = invader.x + invader.width >= this.x &&
      invader.x <= this.x + this.width &&
      invader.y + invader.height >= this.y &&
      invader.y <= this.y + this.height;

      if (collision) {
        this.sound.play();
      }
  
      return collision;
    }


  }
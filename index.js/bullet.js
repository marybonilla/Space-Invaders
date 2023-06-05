class Bullet {
    constructor(ctx, x, y, speedY,speedX ) {
      this.ctx = ctx;
      this.image = new Image();
      this.image.src = './img/bullet-01.png';
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
  }
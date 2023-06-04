class Invader {
    constructor(ctx, speedX, speedY) {
      this.ctx = ctx;
      this.image = new Image();
      this.image.src = './img/enemy-1-01.png';
      this.width = 25;
      this.height = 25;
      this.speedX = speedX;
      this.speedY = speedY;
      this.x = 0;
      this.y = 0;
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
    }
  }
  
  
  
  
  
  
  
  
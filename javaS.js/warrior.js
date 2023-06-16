class Warrior {
    constructor(ctx,x, speedX, speedY) {
      this.ctx = ctx;
      this.image = new Image();
      this.image.src = './img/warrior.png';
      this.width = 300;
      this.height = 180;
      this.speedX = speedX;
      this.speedY = speedY;
      this.x = x;
      this.y = 0;
      this.isReady = false;
      this.isCollided = false;
  
      this.image.onload = () => {
        this.width = (this.height * this.image.width) / this.image.height;
        this.isReady = true;
      };
    }
  
    draw() {
      if (this.isReady) {
        const collisionWarrior = this.isCollided ? this.collisionImage : this.image;
        this.ctx.drawImage(
          collisionWarrior,
          this.x,
          this.y,
          this.width,
          this.height
        );
      }

      /*if (this.isReady) {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }*/
      /*if (this.isReady) {
        const collisionEnemy = this.isCollided ? this.collisionImage : this.image;
        this.ctx.drawImage(
          collisionEnemy, 
          this.x, 
          this.y, 
          this.width, 
          this.height
          );
      }*/
    }
  
    move() {
      this.x += this.speedX;
      this.y += this.speedY;

      // para que no salga del cambas 
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
  
    shoot() {
      const bulletEnemy = new BulletEnemy(
        this.ctx,
        this.x + this.width / 2,
        this.y + this.height,
        6,
        15,
        'White',
        5
      );
      return bulletEnemy;
    }
  
    collidesWith(player) {
      return (
        player.x + player.width > this.x &&
        player.x < this.x + this.width &&
        player.y + player.height > this.y &&
        player.y < this.y + this.height
      );
    }
  }
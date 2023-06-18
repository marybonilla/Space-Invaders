class Warrior {
    constructor(ctx,x, speedX, speedY) {
      this.ctx = ctx;
      this.image = new Image();
      this.image.src = './img/warrior.png';
      this.collisionImage = new Image();
      this.collisionImage.src = './img/warriorcolision.png';
      this.width = 300;
      this.height = 180;
      this.speedX = speedX;
      this.speedY = speedY;
      this.x = x;
      this.y = 0;
      this.isReady = false;
      this.isCollided = false;
      this.hits = 6;
      this.collisionImageTimer = 0;
      this.collisionDuration = 0.5;
  
      this.image.onload = () => {
        this.width = (this.height * this.image.width) / this.image.height;
        this.isReady = true;
      };

      this.collisionImage.onload = () => {
        this.isReady = true;
      };
    }
  
    draw() {
      //const collisionWarrior = this.isCollided ? this.collisionImage : this.image;
      if (this.isReady) {
        if (this.collisionImageTimer > 0) {
          this.ctx.drawImage(
            this.collisionImage,
            this.x,
            this.y,
            this.width,
            this.height
          );
          this.collisionImageTimer--;
        } else {
          this.ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
          );
        }
      }

    
  }
  
    move() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.isCollided && this.collisionImageTimer === 0) {
        this.isCollided = false;
      }
    

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
      const bulletWarrior = new BulletWarrior(
        this.ctx,
        this.x + this.width / 2,
        this.y + this.height,
        5,
        20,
        'White',
        5
      );
      return bulletWarrior;
    }
  
    collidesWith(player) {
      if (player.x + player.width > this.x &&
        player.x < this.x + this.width &&
        player.y + player.height > this.y &&
        player.y < this.y + this.height) {
        
        this.collisionImageTimer = this.collisionDuration * 60; // 60 frames por segundo
      
        return true;
      }
      
      return false;
    }
  }
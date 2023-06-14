class Warrior {
    constructor(ctx, speedX, speedY) {
      this.ctx = ctx;
      this.image = new Image();
      this.image.src = './img/warrior.png';
      this.width = 100;
      this.height = 60;
      this.speedX = speedX;
      this.speedY = speedY;
      this.x = 0;
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
        const collisionEnemy = this.isCollided ? this.collisionImage : this.image;
        this.ctx.drawImage(collisionEnemy, this.x, this.y, this.width, this.height);
      }
    }
  
    move() {
      this.x += this.speedX;
      this.y += this.speedY;
    }
  
    /*shoot() {
      const bulletEnemyLvl = new BulletEnemy(
        this.ctx,
        this.x + this.width / 2,
        this.y + this.height,
        6,
        15,
        'White',
        5
      );
      return bulletEnemyLvl;
    }*/
  
    collidesWith(player) {
      return (
        player.x + player.width > this.x &&
        player.x < this.x + this.width &&
        player.y + player.height > this.y &&
        player.y < this.y + this.height
      );
    }
  }
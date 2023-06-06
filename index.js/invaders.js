class Invader {
    constructor(ctx, speedX, speedY, images) {
      this.ctx = ctx;
      this.images = images;
      this.image = new Image(); // Cargar las imagenes desde el game
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
  
      this.setImage();
    }
  
        // Para crear un array de invaders random
    setImage() {
      const randomIndex = Math.floor(Math.random() * this.images.length);
      this.image.src = this.images[randomIndex];
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

    // para que dispare los bullets enemy

    shoot() {
      const bulletEnemy = new BulletEnemy(
        this.ctx,
        this.x + this.width / 2,
        this.y + this.height,
        3,
        15,
        "red",
        5
      );
      return bulletEnemy;
    }
  



 }
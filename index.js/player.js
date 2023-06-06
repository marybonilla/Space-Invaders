class Player {
    constructor (ctx){
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = './img/nave.png';
        this.width = 50;
        this.height = 50;
        this.speedX = 0;
        this.speedY = 0;
        this.x = 400; 
        this.y = 340; 
        this.isReady = false;
        this.collisionImage = new Image();
        this.collisionImage.src = './img/nave_colision.png';
        this.isCollided = false;
    
        this.image.onload = () => {
          this.width = this.height * this.image.width / this.image.height;
          this.isReady = true;
        };

        this.collisionImage.onload = () => {
          this.isReady = true;
        };

    }

    draw (){
      const currentImage = this.isCollided ? this.collisionImage : this.image;
      if (this.isReady) {
        this.ctx.drawImage(
          currentImage,
          this.x,
          this.y,
          this.width,
          this.height
        );
      }

    }


    move (){
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


}
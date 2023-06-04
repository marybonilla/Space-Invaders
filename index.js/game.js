class Game {
    constructor(ctx) {
      this.ctx = ctx;
      this.background = new Background(this.ctx);
      this.player = new Player(this.ctx);
      this.invaders = [];
  
      this.intervalId = null;
  
      this.levelSpeed = 0;
      this.counter = 0;
      this.score = 0;
    }
  
    start() {
      this.intervalId = setInterval(() => {
        this.clear();
        this.move();
        this.draw();
        this.counter++;
  
        if (this.counter % 100 === 0) {
          this.addInvader();
        }
  
        if (this.counter % 10 === 0) {
          this.score++;
        }
  
        if (this.counter === 200) {
          this.levelSpeed += 1;
          this.invaders.forEach((invader) => (invader.speed += 1));
          this.counter = 0;
        }
      }, 4000 / 60);
    }
  
    draw() {
      this.background.draw();
      this.invaders.forEach((invader) => {
        invader.draw();
      });
      this.player.draw();
    }
  
    move() {
      this.invaders.forEach((invader) => {
        invader.move();
      });
      this.player.move();
    }
  
    clear() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.invaders = this.invaders.filter(
        (invader) => invader.x > -invader.width
      );
    }
  
    addInvader() {
        const groupSize = 5; // Tamaño del grupo de invasores
        const groupSpacing = 10; // Espaciado entre los invasores en el grupo
        const invaderWidth = 25;
        const invaderHeight = 25;
        const invaderSpeedX = 0; // Velocidad horizontal
        const invaderSpeedY = 1; // Velocidad vertical
      
        const groupX = Math.floor(Math.random() * (this.ctx.canvas.width - groupSize * (invaderWidth + groupSpacing))); // Posición X inicial del grupo
      
        Array.from({ length: groupSize }).forEach((_, i) => {
            const x = groupX + i * (invaderWidth + groupSpacing);
            const y = 0;
            const invader = new Invader(this.ctx, invaderSpeedX, invaderSpeedY);
            invader.x = x;
            invader.y = y;
            this.invaders.push(invader);
          });
      }
  
    handleKeyDown(event) {
      if (!event.repeat) {
        switch (event.code) {
          case "ArrowLeft":
            this.player.speedX = -5;
            break;
          case "ArrowRight":
            this.player.speedX = 5;
            break;
          case "ArrowUp":
            this.player.speedY = -5;
            break;
          case "ArrowDown":
            this.player.speedY = 5;
            break;
        }
      }
    }
  
    handleKeyUp(event) {
      if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
        this.player.speedX = 0;
      }
      if (event.code === "ArrowUp" || event.code === "ArrowDown") {
        this.player.speedY = 0;
      }
    }
  }
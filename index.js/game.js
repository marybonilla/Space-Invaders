class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.background = new Background(this.ctx);
        this.player = new Player(this.ctx);
        // como voy a poner varios enemy creo un array con las imagenes
        this.invaderImages = [
          './img/enemy1.png',
          './img/enemy2.png',
          './img/enemy3.png'
        ];
        this.invaders = [];
        // bullet de player
        this.bullets = [];
        // bullet de los enemigos
        this.bulletsEnemy = [];


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
        this.checkCollisions();
  
        if (this.counter % 200 === 0) {
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

        if (this.counter % 100 === 0) {
          this.handleInvaderShoot();
        }

        




      }, 1000 / 60);
    }
  
    draw() {
      this.background.draw();
      this.invaders.forEach((invader) => {
        invader.draw();
      });
      this.bullets.forEach((bullet) => {
        bullet.draw();
      });
      this.player.draw();

      this.bulletsEnemy.forEach((bulletEnemy) => {
        bulletEnemy.draw();
      });



      
    }
  
    move() {
      this.invaders.forEach((invader) => {
        invader.move();
      });

      this.player.move();
      
      this.bullets.forEach((bullet) => {
        bullet.move();
      });

      this.bulletsEnemy.forEach((bulletEnemy) => {
        bulletEnemy.move();
      });

    }
  
    clear() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.invaders = this.invaders.filter(
        (invader) => invader.x > -invader.width
      );
      this.bullets = this.bullets.filter((bullet) => bullet.y > 0);

      this.bulletsEnemy = this.bulletsEnemy.filter((bulletEnemy) => bulletEnemy.y < this.ctx.canvas.height);
    } 


  
    addInvader() {
      const groupSize = 20; // Tamaño del grupo de invasores
      const groupSpacing = 10; // Espaciado entre los invasores en el grupo
      const invaderWidth = 15;
      const invaderHeight = 15;
      const invaderSpeedX = 0; // Velocidad horizontal
      const invaderSpeedY = 1; // Velocidad vertical
    
      const numRows = 3; // Número de filas de invasores
      const numCols = 8; // Número de invasores por fila
    
      const groupWidth = numCols * (invaderWidth + groupSpacing) - groupSpacing; // Ancho total del grupo de invasores
      const groupX = Math.floor(Math.random() * (this.ctx.canvas.width - groupWidth)); // Posición X inicial del grupo
    
      Array.from({ length: numRows }).forEach((_, row) => {
        Array.from({ length: numCols }).forEach((_, col) => {
          const x = groupX + col * (invaderWidth + groupSpacing); // Posición X del invasor en la fila actual
          const y = row * (invaderHeight + groupSpacing); // Posición Y del invasor en la fila actual
    
          const invader = new Invader(this.ctx, invaderSpeedX, invaderSpeedY, this.invaderImages);
          invader.x = x;
          invader.y = y;
          this.invaders.push(invader);
        });
      });
    }

      // agregar balas enemigas desde el invasor

      handleInvaderShoot() {
        setInterval(() => {
          const randomIndex = Math.floor(Math.random() * this.invaders.length); // Obtener un índice aleatorio de los invaders
          const invader = this.invaders[randomIndex]; // Obtener el invader correspondiente al índice aleatorio
          const bulletEnemy = invader.shoot(); // Hacer que el invader dispare
          this.bulletsEnemy.push(bulletEnemy); // Agregar la bala enemiga al array de balas enemigas
        }, 2000); // Disparar cada 2 segundos (2000 milisegundos)
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
            case "Space":
              const bullet = new Bullet(this.ctx, this.player.x + 15, this.player.y, -5, 0);
              this.bullets.push(bullet);
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


    checkCollisions() {
      const collision = this.bulletsEnemy.some((bulletEnemy) => bulletEnemy.collidesWith(this.player));
      if (collision) {
        this.player.isCollided = true;
        //clearInterval(this.intervalId);
      }
    }
    

    /*gameOver() {
      clearInterval(this.intervalId);
      setTimeout(() => {
        this.ctx.font = '56px Arial';
        this.ctx.fillStyle = 'red';
        this.ctx.fillText(
          'Game Over',
          this.ctx.canvas.width / 2 - 150,
          this.ctx.canvas.height / 2,
          300);
      }, 0);
    } */

    /*gameOver(){
      clearInterval(this.intervalId);
      setTimeout(() => {
        this.ctx = ctx;
        this.image = new Image();
        console.log(this.gameOver)
        this.image.src = './img/Collision-01.png';
        
      }, 0);
    }*/




}
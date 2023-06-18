class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.levelSelected = 0;
    this.backgrounds = [
      new Background(ctx, LEVELS[0].background),
      new Background(ctx, LEVELS[1].background),
    ];
    this.background = this.backgrounds[this.levelSelected];
    // this.background = new Background(ctx, LEVELS[this.levelSelected].background);
    this.warrior = null;
    this.player = new Player(this.ctx);
    this.heart = new Heart(this.ctx);
    this.invaderImages = [
      "./img/enemy1.png",
      "./img/enemy2.png",
      "./img/enemy3.png",
    ];
    this.invaders = [];
    this.bullets = [];
    this.bulletsEnemy = [];
    this.bulletsWarrior = [];
    // this.warrior = new Warrior(this.ctx);

    this.intervalId = null;
    this.levelSpeed = 0;
    this.counter = 0;
    this.score = 0;
    this.lives = 3;
    this.level = LEVELS[this.levelSelected].levelText;
    this.bulletSound = new Audio("./sound/bulletNave.wav");
    this.explosionPlayer = new Audio("./sound/explosion.wav");
  }

  start() {
    setTimeout(() => {
      this.level = LEVELS[this.levelSelected];
      this.showLevelText = true;
    }, 1000);

    setTimeout(() => {
      this.showLevelText = false;
    }, 3000);

    setTimeout(() => {
      this.addInvader();
    }, 1000);

    this.intervalId = setInterval(() => {
      this.clear();
      this.move();
      this.draw();
      this.checkCollisions();
      this.checkCollisionsE();
      this.counter++;

      if (this.counter % 900 === 0) {
        this.clear();
      }

      if (this.counter % 900 === 0) {
        this.addInvader();
      }

      if (this.counter % 100 === 0) {
        this.handleInvaderShoot();
      }

      if (this.warrior && !this.warrior.isCollided && this.counter % 100 === 0) {
        this.handleWarriorShoot();
      }


      if (this.score >= 80 && !this.warrior) {
        const speedX = 0; // Define el valor de speedX
        const speedY = 0.1; // Define el valor de speedY

        this.addWarrior(speedX, speedY);
      }

      /*if (this.score === 80 && !this.warrior) {
        this.addWarrior();
      }*/
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

    this.bulletsWarrior.forEach((bulletWarrior) => {
      bulletWarrior.draw();
    });

    this.warrior && !this.warrior.isCollided && this.warrior.draw();

    this.drawScore();
    this.drawLives();
    this.heart.draw();
    this.drawLevel();
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

    this.bulletsWarrior.forEach((bulletWarrior) => {
      bulletWarrior.move();
    });

    this.warrior && !this.warrior.isCollided && this.warrior.move();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.invaders = this.invaders.filter(
      (invader) => invader.x > -invader.width
    );
    this.bullets = this.bullets.filter((bullet) => bullet.y > 0);
    this.bulletsEnemy = this.bulletsEnemy.filter(
      (bulletEnemy) => bulletEnemy.y < this.ctx.canvas.height
    );
    this.bulletsWarrior = this.bulletsWarrior.filter(
      (bulletWarrior) => bulletWarrior.y < this.ctx.canvas.height
    );
  }

  addInvader() {
    //const groupSize = 20; // Tamaño del grupo de invasores
    const groupSpacing = 20; // Espaciado entre los invasores en el grupo
    const invaderWidth = 15;
    const invaderHeight = 15;
    const invaderSpeedX = 0; // Velocidad horizontal
    const invaderSpeedY = 1; // Velocidad vertical

    const numRows = LEVELS[this.levelSelected].numRows; // Número de filas de invasores
    const numCols = LEVELS[this.levelSelected].numCols; // Número de invasores por fila

    const groupWidth = numCols * (invaderWidth + groupSpacing) - groupSpacing; // Ancho total del grupo de invasores
    const groupX = Math.floor(
      Math.random() * (this.ctx.canvas.width - groupWidth)
    ); // Posición X inicial del grupo

    Array.from({ length: numRows }).forEach((_, row) => {
      Array.from({ length: numCols }).forEach((_, col) => {
        const x = groupX + col * (invaderWidth + groupSpacing); // Posición X del invasor en la fila actual
        const y = row * (invaderHeight + groupSpacing); // Posición Y del invasor en la fila actual

        const invader = new Invader(
          this.ctx,
          invaderSpeedX,
          0.2,
          this.invaderImages
        );
        invader.x = x;
        invader.y = y;
        this.invaders.push(invader);
      });
    });
    if (this.warrior) {
      return;
    }
  }


  addWarrior(speedX, speedY) {
    this.invaders = [];
    
    const warrior = new Warrior(this.ctx,50, speedX, speedY);
    warrior.x = Math.floor(
      Math.random() * (this.ctx.canvas.width - warrior.width)
    );
    this.warrior = warrior;
  }


  // agregar balas enemigas desde el invasor de forma random

  handleInvaderShoot() {
    setInterval(() => {
      if (this.invaders.length > 0) {
        const randomIndex = Math.floor(Math.random() * this.invaders.length);
        const invader = this.invaders[randomIndex];
        if (invader) {
          const bulletEnemy = invader.shoot();
          this.bulletsEnemy.push(bulletEnemy);
        }
      }
    }, 2000);
  }

  handleWarriorShoot() {
    if (this.warrior) {
      const bulletWarrior = this.warrior.shoot();
      this.bulletsWarrior.push(bulletWarrior);
    }
  }

  handleKeyDown(event) {
    let bulletOffsetX = LEVELS[this.levelSelected].bulletOffsetX;
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
          const bullet = new Bullet(
            this.ctx,
            this.player.x + bulletOffsetX,
            this.player.y,
            LEVELS[this.levelSelected].bullet,
            LEVELS[this.levelSelected].bulletWidth,
            LEVELS[this.levelSelected].bulletHeight,
            0,
            -5
          );
          this.bulletSound.play();
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

  // Cuando el invasor colisiona con el jugados, el jugador muere

  checkCollisions() {
    const invaderCollisionIndex = this.invaders.findIndex((invader) =>
      invader.collidesWith(this.player)
    );
    const bulletECollisionIndex = this.bulletsEnemy.findIndex((bulletEnemy) =>
      bulletEnemy.collidesWith(this.player)
    );
    const warriorCollinsion = this.warrior && this.warrior.collidesWith(this.player);

    const bulletWarriorColision = this.bulletsWarrior.findIndex((bulletWarrior) =>
    bulletWarrior.collidesWith(this.player)
    );

    if (invaderCollisionIndex !== -1 || bulletECollisionIndex !== -1 || (this.warrior && warriorCollinsion) ||  bulletWarriorColision !== -1) {
      this.lives--;

      if (this.lives < 1) {
        this.player.isCollided = true;
        //clearInterval(this.intervalId);
        this.gameOver();
        this.explosionPlayer.play();
      } else {
        if (invaderCollisionIndex !== -1) {
          this.invaders[invaderCollisionIndex].isCollided = true;
        }
        if (bulletECollisionIndex !== -1) {
          this.bulletsEnemy[bulletECollisionIndex].isCollided = true;
          this.player.isCollided = true;
          this.player.collisionBlackTimer = 2;
        }
        if (this.warrior && warriorCollinsion) {
          this.warrior.isCollided = true;
          
        }
        if (bulletWarriorColision !== -1) {
          this.bulletsWarrior[bulletWarriorColision].isCollided = true;
          this.player.isCollided = true;
          this.player.collisionImageTimer = 2;
          
        }
        if(this.warrior && this.warrior.hits === 0){
          this.warrior.isCollided = true
          this.gameOver(isVictory);
        }
      }


      if (this.score >= 1000) {
        this.gameOver(true); // Pasamos `true` como argumento para indicar que es una victoria
        return;
      }
    }
  }



  // Cuando la bala de nave colisiona con un invader, el invader muere

  checkCollisionsE() {
    this.bullets.forEach((bullet) => {
      const bulletCollisionIndex = this.invaders.findIndex((invader) =>
        bullet.collidesWith(invader)
      );
      if (bulletCollisionIndex !== -1) {
        this.invaders[bulletCollisionIndex].isCollided = true;
        bullet.isCollided = true;
        this.score += 2;
        if (this.score === 20) {
          this.levelUp();
        }
        if (this.score === 200) {
          this.gameOver(true); // Pasamos `true` como argumento para indicar que es una victoria
          return;
        }
      }
    });

    this.bullets.forEach((bullet) => {
      const hasCollided = this.warrior && !this.warrior.isCollided && this.warrior.collidesWith(bullet);
      if (hasCollided) {
        this.warrior.hits--;
        bullet.isCollided = true;
        if (this.warrior.hits === 0) {
          this.warrior.isCollided = true;
          console.log("collided");
        }
      }
    })

    // Eliminar los invasores y las balas colisionadas

    this.invaders = this.invaders.filter((invader) => !invader.isCollided);
    this.bullets = this.bullets.filter((bullet) => !bullet.isCollided);
    this.bulletsEnemy = this.bulletsEnemy.filter(
      (bulletEnemy) => !bulletEnemy.isCollided
    );
    this.bulletsWarrior = this.bulletsWarrior.filter(
      (bulletWarrior) => !bulletWarrior.isCollided
    );
  }

  drawScore() {
    this.ctx.font = "15px Press-Start-2P";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Score: ${this.score}`, 10, 30);
  }
  drawLives() {
    this.image = new Image();
    this.image.src = "./img/heart.png";
    this.ctx.font = "18px Press-Start-2P";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`${this.lives}`, 730, 30);
  }

  drawLevel() {
    if (this.showLevelText) {
      this.ctx.font = "18px Press-Start-2P";
      this.ctx.fillStyle = "white";
      this.ctx.fillText(
        // this.level.levelText,
        `Level ${this.levelSelected + 1}`,
        350,
        300
      );
    }
   
  }

  clearGame() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.invaders = [];
    this.level = false;
    // this.background = new Background(ctx, LEVELS[this.levelSelected].background);
    this.background = this.backgrounds[this.levelSelected];
    this.background.draw();
  }


  levelUp() {
    if (this.levelSelected < LEVELS.length - 1) {
      this.levelSelected++;
      this.clearGame();
      this.showLevelText = true;
      setTimeout(() => {
        this.showLevelText = false;
      }, 5000);
    }
  }

  gameOver(isVictory) {
    clearInterval(this.intervalId);
    setTimeout(() => {
      this.player.draw();
      this.ctx.font = "60px Press-Start-2P";
      this.ctx.fillStyle = "white";
      if (isVictory) {
        this.ctx.fillStyle = "Green";
        this.ctx.fillText(
          "¡Victory!",
          this.ctx.canvas.width / 2 - 100,
          this.ctx.canvas.height / 2,
          200
        );
      } else {
        this.ctx.fillText(
          "Game Over",
          this.ctx.canvas.width / 2 - 100,
          this.ctx.canvas.height / 2,
          200
        );
      }
      this.ctx.font = "15px Press-Start-2P";
      this.ctx.fillText(
        `you final Score: ${this.score}`,
        this.ctx.canvas.width / 2 - 140,
        this.ctx.canvas.height / 2 + 30
      );
    }, 0);
  }
}

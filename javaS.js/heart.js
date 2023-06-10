class Heart {
    constructor (ctx){
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = './img/heart.png';
        this.x = 750;
        this.y = 10;
        this.width = 23;
        this.height = 20;
        this.isReady = false;

        this.image.onload = () => {
            this.isReady = true;
            this.draw();
          };
    }

    draw (){
        if (this.isReady){
            this.ctx.drawImage(
                this.image,
                this.x,
                this.y,
                this.width,
                this.height,)
            }
    };

}
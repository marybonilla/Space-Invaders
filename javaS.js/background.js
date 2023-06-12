class Background {
    constructor (ctx, imageSrc){
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
        this.image = new Image();
        this.image.src = imageSrc;
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
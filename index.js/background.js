class Background {
    constructor (ctx){
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
        this.image = new Image();
        this.image.src = 'https://cdn.spacetelescope.org/archives/images/screen/heic1304c.jpg';
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
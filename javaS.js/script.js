
const startButton = document.querySelector("#button");
const canvas = document.querySelector('#my-canvas');
const ctx = canvas.getContext ('2d');





startButton.addEventListener("click", function() {
    startButton.style.display = "none";
    const audio = document.querySelector("audio");
    audio.pause();
    const game = new Game(ctx);
    game.start();   
    document.addEventListener("keydown", game.handleKeyDown.bind(game));

    document.addEventListener("keyup", game.handleKeyUp.bind(game));
    document.addEventListener("keydown", game.handleKeyDown.bind(game)); 
   

});




const canvas = document.querySelector('#my-canvas');
const ctx = canvas.getContext ('2d');

const game = new Game(ctx);
game.start();


document.addEventListener("keydown", game.handleKeyDown.bind(game));

document.addEventListener("keyup", game.handleKeyUp.bind(game));
document.addEventListener("keydown", game.handleKeyDown.bind(game));
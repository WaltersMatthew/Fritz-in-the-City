//const to select items
const canvas = document.querySelector("canvas");
const statusDisplay = document.querySelector("#status");

//color palette
const yellow = "#FFFC40";
const blue = "#143362";
// const button = document.querySelector('button')
//get canvas context
const ctx = canvas.getContext("2d");
//set canvas res to be same as window
canvas.setAttribute("height", getComputedStyle(canvas)["height"]);
canvas.setAttribute("width", getComputedStyle(canvas)["width"]);

//rectangles for buildings

//make class for Fritz
class Fritz {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.alive = true;
    this.speed = 10;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 5.05;
    this.gravitySpeed = 0;
  }
  render() {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  gravFunc() {
    this.gravitySpeed += this.gravity;
    this.y += this.speedY + this.gravitySpeed;
  }
}

let fritz = new Fritz(25, 330, 30, 15, "#AD5E32");

//create movementHandler function
function movementHandler(e) {
  // how many pixels fritz moves
  if (fritz.alive) {
    switch (e.key) {
      case "w":
        //move fritz up
        pressed = true;
        fritz.y -= fritz.speed;
        break;
      case "s":
        //move fritz down
        pressed = true;
        fritz.y += fritz.speed;
        if (fritz.y > canvas.height) {
          endGame();
        }
        break;
      case "a":
        //move fritz left
        pressed = true;
        fritz.x -= fritz.speed;
        if (fritz.x < 0) {
          fritz.x = 0;
        }
        break;
      case "d":
        // move fritz right
        pressed = true;
        fritz.x += fritz.speed;
        if (fritz.x + fritz.width > canvas.width) {
          fritz.x = canvas.width - fritz.width;
        }
        break;
      case " ":
        // make fritz jump
        pressed = true;
        fritz.y -= fritz.speed * 6;
        console.log("jump doggy!");
        break;
    }
  }
}
fritz.gravFunc();
//pass movementHandler to keypress eventListner
document.addEventListener("keydown", movementHandler);

//add collision to stop fritz from falling when on platform
function onPlat(fritz, plat) {
  if (fritz.y + fritz.height <= plat.y) {
    fritz.y = plat.y;
  }
}

//respawn function
function respawn() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fritz = new Fritz(25, 330, 30, 15, "#AD5E32");
}
//respawn button
// button.addEventListener('click', respawn)
//endgame function
function endGame() {
  fritz.alive = false;
  statusDisplay.innerText = "Oh no! Try again to get Fritz home.";
  console.log(":(");
  respawn();
}
//function to create buildings
function makeBulding(x, y, width, height) {
  ctx.lineWidth = 5;
  ctx.strokeStyle = yellow;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = blue;
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = yellow;
  //windows
  ctx.fillRect(x + 5, y + 5, width - 10, 10);
  ctx.fillRect(x + 5, y + 25, width - 10, 10);
  ctx.fillRect(x + 5, y + 45, width - 10, 10);
  ctx.fillRect(x + 5, y + 65, width - 10, 10);
  ctx.fillRect(x + 5, y + 105, width - 10, 10);
  ctx.fillRect(x + 5, y + 125, width - 10, 10);
  ctx.fillRect(x + 5, y + 165, width - 10, 10);
  ctx.fillRect(x + 5, y + 285, width - 10, 10);
  ctx.fillRect(x + 5, y + 305, width - 10, 10);
  ctx.fillRect(x + 5, y + 345, width - 10, 10);
  ctx.fillRect(x + 5, y + 325, width - 10, 10);
  ctx.fillRect(x + 5, y + 345, width - 10, 10);
}
//function for platforms
function makePlat(x, y, width, height, outlineColor, fillColor) {
  ctx.strokeStyle = outlineColor;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = fillColor;
  ctx.fillRect(x, y, width, height);
}
//render buildings
function drawScene() {
  //bldg 1
  makeBulding(0, 350, 100, canvas.height);
  //platform 1
  makePlat(130, 290, 50, 13, blue, yellow);
  //bldg 2
  makeBulding(200, 230, 75, canvas.height);
  //platform 2
  makePlat(325, 250, 75, 15, blue, yellow);
  //bldg 3
  makeBulding(420, 300, 100, canvas.height);
  //platform 3
  makePlat(550, 260, 75, 12, blue, yellow);
  //platform 4
  makePlat(650, 220, 25, 12, blue, yellow);
  //bldg 4
  makeBulding(700, 180, canvas.width, canvas.height);
  // house
  ctx.lineWidth = 2;
  ctx.fillStyle = "#FFFC40";
  ctx.strokeStyle = "black";
  ctx.strokeRect(745, 147, 40, 30);
  ctx.fillRect(745, 147, 40, 30);
  ctx.beginPath();
  ctx.moveTo(765, 120);
  ctx.lineTo(740, 145);
  ctx.lineTo(790, 145);
  ctx.fill();
  ctx.stroke();
}

//gameplay loop
const gameLoopInterval = setInterval(gameLoop, 60);

function gameLoop() {
  //redraw canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //collision check
  onPlat(fritz);
  //draw buildings
  drawScene();
  //render fritz
  fritz.render();
}
gameLoop();

canvas.addEventListener("click", (event) => {
  console.log(event.offsetX, event.offsetY);
});

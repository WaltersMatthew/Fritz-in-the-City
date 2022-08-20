//const to select items
const canvas = document.querySelector("canvas");
const statusDisplay = document.querySelector("#status");
//get canvas context
const ctx = canvas.getContext("2d");
//set canvas res to be same as window
canvas.setAttribute("height", getComputedStyle(canvas)["height"]);
canvas.setAttribute("width", getComputedStyle(canvas)["width"]);

//color palette
const yellow = "#FFFC40";
const blue = "#143362";

// const button = document.querySelector('button')

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
        this.gravity = 0.05;
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

class Platform {
    constructor(x, y, width, height, borderColor, fillColor){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.borderColor = borderColor;
        this.fillColor = fillColor;
    }    
    // makeBuilding(x, y, width, height) 
    makeBuilding(){
        ctx.lineWidth = 5;
        ctx.strokeStyle = yellow;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = blue;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = yellow;
        //windows
        ctx.fillRect(this.x + 5, this.y + 5, this.width - 10, 10);
        ctx.fillRect(this.x + 5, this.y + 25, this.width - 10, 10);
        ctx.fillRect(this.x + 5, this.y + 45, this.width - 10, 10);
        ctx.fillRect(this.x + 5, this.y + 65, this.width - 10, 10);
        ctx.fillRect(this.x + 5, this.y + 105, this.width - 10, 10);
        ctx.fillRect(this.x + 5, this.y + 125, this.width - 10, 10);
        ctx.fillRect(this.x + 5, this.y + 165, this.width - 10, 10);
        ctx.fillRect(this.x + 5, this.y + 285, this.width - 10, 10);
        ctx.fillRect(this.x + 5, this.y + 305, this.width - 10, 10);
        ctx.fillRect(this.x + 5, this.y + 345, this.width - 10, 10);
        ctx.fillRect(this.x + 5, this.y + 325, this.width - 10, 10);
        ctx.fillRect(this.x + 5, this.y + 345, this.width - 10, 10);
    }
    makePlat() {
        ctx.strokeStyle = this.borderColor;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let fritz = new Fritz(25, 20, 30, 15, "#AD5E32");
let building1 = new Platform(0, 350, 100, canvas.height, yellow, blue)
let building2 = new Platform(200, 230, 75, canvas.height)
let building3 = new Platform(420, 300, 100, canvas.height)
let building4 = new Platform(700, 180, canvas.width, canvas.height)
let plat1 = new Platform(130, 290, 50, 13, yellow, blue)
let plat2 = new Platform(325, 250, 75, 15, yellow, blue)
let plat3 = new Platform(550, 260, 75, 12, yellow, blue)
let plat4 = new Platform(650, 220, 25, 12, yellow, blue)



//create movementHandler function
function movementHandler(e) {
    // how many pixels fritz moves
    if (fritz.alive ) {
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
                    winner();
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

//pass movementHandler to keypress eventListner
document.addEventListener("keydown", movementHandler);


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

function winner() {
    fritz.alive = false;
    statusDisplay.innerText = "YOU MADE IT! Time to curl up on the couch!";
    console.log(":)");
}
function house(){
    //main square
    ctx.lineWidth = 2;
    ctx.fillStyle = yellow;
    ctx.strokeStyle = "black";
    ctx.strokeRect(752, 125, 50, 52);
    ctx.fillRect(752, 125, 50, 52);
    //roof
    ctx.fillStyle = "#D0693E"
    ctx.beginPath();
    ctx.moveTo(775, 100);
    ctx.lineTo(740, 125);
    ctx.lineTo(800, 125);
    ctx.lineTo(810, 100)
    //roof styling
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(785, 100);
    ctx.lineTo(750, 125);
    ctx.stroke()
    ctx.beginPath();
    ctx.moveTo(800, 100);
    ctx.lineTo(765, 125);
    ctx.stroke()
    ctx.beginPath();
    ctx.moveTo(815, 100);
    ctx.lineTo(780, 125);
    ctx.stroke();
    //door
    ctx.strokeStyle = "black";
    ctx.strokeRect(782, 140, 22, 37);
    ctx.fillStyle = "white";
    ctx.fillRect(782, 140, 22, 37)
    //doorknob
    ctx.beginPath();
    ctx.arc(786, 160, 2, 0, 2 * Math.PI);
    ctx.stroke();
    //ball
    ctx.fillStyle = "hotpink";
    ctx.beginPath();
    ctx.arc(770, 171, 6, 0, 2 * Math.PI);
    ctx.fill();
}

//add collision to stop fritz from falling when on platform
function platform1check(fritz, plat) {
    if (fritz.y + fritz.height >= plat.y){
        fritz.y == fritz.height + plat.y
        console.log("through the platform") 
    }else{
        console.log("good")
    }
    
}
// onPlat(fritz, platform)

//gameplay loop
const gameLoopInterval = setInterval(gameLoop, 60);

function gameLoop() {
    //redraw canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //collision check
    //   onPlat(fritz);
    //render fritz and all platforms
    fritz.render();
    building1.makeBuilding()
    building2.makeBuilding()
    building3.makeBuilding()
    building4.makeBuilding()
    plat1.makePlat()
    plat2.makePlat()
    plat3.makePlat()
    plat4.makePlat()
    house()
    //platform collision checks
    platform1check(fritz, building1)
    // fritz.gravFunc();
}
gameLoop();
console.log(building1)
console.log(fritz.y)
//find X/Y of click for formatting
// canvas.addEventListener("click", (event) => {
//   console.log(event.offsetX, event.offsetY);
// });

//const to select items
const canvas = document.querySelector("canvas");
const statusDisplay = document.querySelector("#status");
const homeText = document.querySelector("#homeText");
const topText = document.querySelector("#topText");
//get canvas context
this.ctx = canvas.getContext("2d");
//set canvas res to be same as window
canvas.setAttribute("height", getComputedStyle(canvas)["height"]);
canvas.setAttribute("width", getComputedStyle(canvas)["width"]);
//color palette
const fill = "#2A2D41";
const border = "#B7CF6C";
const back = "#617659";

const gravity = 2;
//make class for Fritz
class Fritz {
    constructor(x, y, width, height, color, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
        if (type == "image") {
            this.image = new Image();
            this.image.src = color;
        }
        this.alive = true;
        this.speed = 10;
        this.velocity = {
            x: 0,
            y: 0,
        };
    }
    render() {
        // ctx.lineWidth = 5;
        // ctx.strokeStyle = "black";
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    update() {
        // this.render();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.y += gravity;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}
//class for platforms and buildings
class Platform {
    constructor(x, y, width, height, borderColor, fillColor) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.borderColor = borderColor;
        this.fillColor = fillColor;
    }
    // makeBuilding(x, y, width, height)
    makeBuilding() {
        ctx.globalCompositeOperation = "source-over";
        ctx.lineWidth = 5;
        // ctx.strokeStyle = fill;
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.borderColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.fillColor;
        //windows
        ctx.fillRect(this.x + 5, this.y + 5, this.width - 10, 10);
        ctx.fillRect(this.x + 5, this.y + 25, this.width - 10, 10);
        ctx.fillRect(this.x + 5, this.y + 45, this.width - 10, 10);
        if(this.x > 350){
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
    }
    makePlat() {
        ctx.globalCompositeOperation = "source-over";

        ctx.strokeStyle = this.borderColor;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
//create fritz and buildings
let fritz = new Fritz(25, 250, 65, 25, "./img/8bitty.png", "image");
let building1 = new Platform(0, 310, 100, canvas.height, fill, border);
let building2 = new Platform(220, 130, 50, 65, "#E78DA2", "#FCBEA3");
let building3 = new Platform(444, 320, 89, canvas.height, fill, border);
let building4 = new Platform(700, 180, canvas.width, canvas.height, fill, "#617659");
let plat1 = new Platform(120, 250, 50, 10, back, fill);
let plat2 = new Platform(170, 200, 25, 10, "#E78DA2", "#FCBEA3");
let plat3 = new Platform(345, 240, 25, 10, back, fill);
let plat4 = new Platform(560, 260, 55, 10, back, fill);
let plat5 = new Platform(675, 220, 20, 10, back, fill);

const keys = {
    right: {
        pressed: false,
    },
    left: {
        pressed: false,
    },
    space: {
        pressed: false,
    }
};

//click to play again
document.addEventListener("click", () => {
    respawn();
    topText.innerText = "Get Fritz home to his favorite pink ball!";
    statusDisplay.innerText = "WASD to move, Spacebar to jump!";
});
//respawn function
function respawn() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fritz = new Fritz(25, 250, 65, 25, "./img/8bitty.png", "image")
}
//endgame function
function endGame() {
    fritz.alive = false;
    statusDisplay.innerText = "Oh no! Click anywhere to try again...";
    console.log(":(");
}
//finish map win function
function winner() {
    if(fritz.x > canvas.width - fritz.width){
        fritz.x = canvas.width - fritz.width
        fritz.alive = false;
        statusDisplay.innerText = "YOU MADE IT! Time to curl up on the couch!";
        topText.innerText = "Click anywhere to play again";
        console.log(":)");
    }
}
//Ft to Home function
function homeTrack() {
    distance = canvas.width - (fritz.x + fritz.width - 5);
    if (distance <= 0) {
        distance = 0;
    }
    homeText.innerText = `${distance} Ft to Home`;
}

//draw the house
function house() {
    //main square
    ctx.lineWidth = 2;
    ctx.fillStyle = "#FFFC40";
    ctx.strokeStyle = "black";
    ctx.strokeRect(752, 125, 55, 54);
    ctx.fillRect(752, 125, 55, 54);
    //roof
    ctx.fillStyle = "#D0693E";
    ctx.beginPath();
    ctx.moveTo(775, 100);
    ctx.lineTo(740, 125);
    ctx.lineTo(800, 125);
    ctx.lineTo(810, 100);
    //roof styling
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(785, 100);
    ctx.lineTo(750, 125);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(800, 100);
    ctx.lineTo(765, 125);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(815, 100);
    ctx.lineTo(780, 125);
    ctx.stroke();
    //door
    ctx.strokeStyle = "black";
    ctx.strokeRect(782, 140, 22, 38);
    ctx.fillStyle = "#E4DECB";
    ctx.fillRect(782, 140, 22, 38);
    //doorknob
    ctx.beginPath();
    ctx.arc(786, 160, 2, 0, 2 * Math.PI);
    ctx.stroke();
    //ball
    ctx.fillStyle = "hotpink";
    ctx.beginPath();
    ctx.arc(769, 172, 7, 0, 2 * Math.PI);
    ctx.fill();
}

//add collision to stop fritz from falling when on platform
function platformCheckY(fritz, plat) {
    if (fritz.y + fritz.height <= plat.y && fritz.y + fritz.height + fritz.velocity.y >= plat.y && fritz.x + fritz.width -20 >= plat.x && fritz.x + 10 <= plat.x + plat.width) {
        fritz.velocity.y = 0
    }else if(fritz.x < 0){
        fritz.x = 0
    }
}
 

//gameplay loop
const gameLoopInterval = setInterval(gameLoop, 60);

function gameLoop() {
    //redraw canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //render fritz and all platforms
    building1.makeBuilding();
    building2.makeBuilding();
    building3.makeBuilding();
    building4.makeBuilding();
    plat1.makePlat();
    plat2.makePlat();
    plat3.makePlat();
    plat4.makePlat();
    plat5.makePlat();
    house();
    fritz.update();
    //movement logic
    if (keys.right.pressed) {
        fritz.velocity.x = 10
    }else if (keys.left.pressed){
        fritz.velocity.x = -10
    }else if (keys.space.pressed){
        fritz.velocity.y = -10
    }
    else {
        fritz.velocity.x = 0
    }
    //platform collision checks
    platformCheckY(fritz, building1);
    platformCheckY(fritz, building2);
    platformCheckY(fritz, building3);
    platformCheckY(fritz, building4);
    platformCheckY(fritz, plat1);
    platformCheckY(fritz, plat2);
    platformCheckY(fritz, plat3);
    platformCheckY(fritz, plat4);
    platformCheckY(fritz, plat5);
    if (fritz.y > canvas.height) {
        endGame();
    }
    homeTrack();
    winner();
}
gameLoop();

addEventListener("keydown", ({keyCode}) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = true;
            break;
        case 68:
            keys.right.pressed = true;
            break;
        case 87:
            keys.space.pressed = true;
            break;
    }
});
addEventListener("keyup", ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = false;
            break;
        case 68:
            keys.right.pressed = false;
            break;
        case 87:
            keys.space.pressed = false;
            break;
    }
});

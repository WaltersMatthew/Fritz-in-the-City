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
//gravity
const gravity = 2;
//const sprites
const rightSprite = "./img/8bitty.png"
const leftSprite = "./img/8bittyleft.png"
const jumpRightSprite = "./img/8bittyjump-1.png"
const jumpLeftSprite = "./img/8bittyjumpleft.png"
let currentSprite = rightSprite
//controller
const keys = {
    right: {
        pressed: false,
    },
    left: {
        pressed: false,
    },
    up: {
        pressed: false,
    },
};
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
        this.angle = 0;
        this.velocity = {
            x: 0,
            y: 0,
        };
    }
    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.y += gravity;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

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
        ctx.lineWidth = 5;
        ctx.fillStyle = this.borderColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.fillColor;
        //windows
        ctx.fillRect(this.x + 5, this.y + 5, this.width - 10, 10);
        ctx.fillRect(this.x + 5, this.y + 25, this.width - 10, 10);
        ctx.fillRect(this.x + 5, this.y + 45, this.width - 10, 10);
    }
    makePlat() {
        ctx.strokeStyle = this.borderColor;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    makeHouse() {
        //main square
        ctx.lineWidth = 2;
        ctx.fillStyle = "#FFFC40";
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //roof
        ctx.fillStyle = "#D0693E";
        ctx.beginPath();
        ctx.moveTo(this.x -10, this.y);
        ctx.lineTo(this.x + 210, this.y);
        ctx.lineTo(this.x + 165, 50);
        ctx.lineTo(this.x + 45, 50);
        ctx.lineTo(this.x -10, this.y);
        ctx.fill();
        //roof styling
        ctx.beginPath();
        ctx.moveTo(this.x + 25, this.y);
        ctx.lineTo(this.x + 50, 50);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x + 40, this.y);
        ctx.lineTo(this.x + 65, 50);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x + 55, this.y);
        ctx.lineTo(this.x + 80, 50);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x + 70, this.y);
        ctx.lineTo(this.x + 95, 50);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x + 85, this.y);
        ctx.lineTo(this.x + 110, 50);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x + 100, this.y);
        ctx.lineTo(this.x + 125, 50);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x + 115, this.y);
        ctx.lineTo(this.x + 140, 50);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x + 130, this.y);
        ctx.lineTo(this.x + 155, 50);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x + 145, this.y);
        ctx.lineTo(this.x + 168, 55);
        ctx.stroke();
        //doors
        ctx.fillStyle = "#E4DECB";
        ctx.fillRect(this.x + 100, 130, 20, 50);
        ctx.fillRect(this.x + 80, 130, 20, 50)
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.x + 100, 130, 20, 50);
        ctx.strokeRect(this.x + 80, 130, 20, 50)
        //doorknob
        ctx.beginPath();
        ctx.arc(this.x + 95, 155, 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x + 105, 155, 2, 0, 2 * Math.PI);
        ctx.stroke();
        //left window
        ctx.fillStyle = "white"
        ctx.fillRect(this.x + 15, this.y + 10, 40, 40)
        ctx.strokeRect(this.x + 15, this.y + 10, 40, 40)
        ctx.strokeRect(this.x + 15, this.y + 10, 20, 20)
        ctx.strokeRect(this.x + 35, this.y + 30, 20, 20)
        //right window
        ctx.fillRect(this.x + this.width - 55, this.y + 10, 40, 40)
        ctx.strokeRect(this.x + this.width - 55, this.y + 10, 40, 40)
        ctx.strokeRect(this.x + this.width - 55, this.y + 10, 20, 20)
        ctx.strokeRect(this.x + this.width - 35, this.y + 30, 20, 20)
        //ball
        ctx.fillStyle = "hotpink";
        ctx.beginPath();
        ctx.arc(this.x + 55, 172, 7, 0, 2 * Math.PI);
        ctx.fill();
    }
}
//create fritz and buildings
let fritz = new Fritz(25, 250, 65, 25, currentSprite, "image");
let building1 = new Platform(0, 305, 300, canvas.height, fill, border);
let building2 = new Platform(520, 130, 50, 65, "#E78DA2", "#FCBEA3");
let building3 = new Platform(744, 320, 89, canvas.height, fill, border);
let building4 = new Platform(1400, 180, 500, canvas.height, fill, "#617659");
let plat1 = new Platform(325, 240, 40, 10, back, fill);
let plat2 = new Platform(450, 200, 25, 10, "#FCBEA3", "#E88D9D");
let plat3 = new Platform(680, 240, 25, 10, back, fill);
let plat4 = new Platform(900, 260, 55, 10, back, fill);
let plat5 = new Platform(1050, 220, 40, 10, "#E88D9D", "#C66A87");
let plat6 = new Platform(1200, 170, 50, 10, "#E88D9D", "#C66A87")
let house = new Platform(1700, 100, 200, 80, "yellow", "yellow")

let platforms = []
platforms.push(building1)
platforms.push(building2)
platforms.push(building3)
platforms.push(building4)
platforms.push(plat1)
platforms.push(plat2)
platforms.push(plat3)
platforms.push(plat4)
platforms.push(plat5)
platforms.push(plat6)
platforms.push(house)


//init function to reset entire game
function init(){
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
            this.angle = 0;
            this.velocity = {
                x: 0,
                y: 0,
            };
        }
        update() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.velocity.y += gravity;
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

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
            ctx.lineWidth = 5;
            ctx.fillStyle = this.borderColor;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = this.fillColor;
            //windows
            ctx.fillRect(this.x + 5, this.y + 5, this.width - 10, 10);
            ctx.fillRect(this.x + 5, this.y + 25, this.width - 10, 10);
            ctx.fillRect(this.x + 5, this.y + 45, this.width - 10, 10);
        }
        makePlat() {
            ctx.strokeStyle = this.borderColor;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = this.fillColor;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        makeHouse() {
            //main square
            ctx.lineWidth = 2;
            ctx.fillStyle = "#FFFC40";
            ctx.strokeStyle = "black";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.fillRect(this.x, this.y, this.width, this.height);
            //roof
            ctx.fillStyle = "#D0693E";
            ctx.beginPath();
            ctx.moveTo(this.x -10, this.y);
            ctx.lineTo(this.x + 210, this.y);
            ctx.lineTo(this.x + 165, 50);
            ctx.lineTo(this.x + 45, 50);
            ctx.lineTo(this.x -10, this.y);
            ctx.fill();
            //roof styling
            ctx.beginPath();
            ctx.moveTo(this.x + 25, this.y);
            ctx.lineTo(this.x + 50, 50);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 40, this.y);
            ctx.lineTo(this.x + 65, 50);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 55, this.y);
            ctx.lineTo(this.x + 80, 50);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 70, this.y);
            ctx.lineTo(this.x + 95, 50);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 85, this.y);
            ctx.lineTo(this.x + 110, 50);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 100, this.y);
            ctx.lineTo(this.x + 125, 50);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 115, this.y);
            ctx.lineTo(this.x + 140, 50);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 130, this.y);
            ctx.lineTo(this.x + 155, 50);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 145, this.y);
            ctx.lineTo(this.x + 168, 55);
            ctx.stroke();
            //doors
            ctx.fillStyle = "#E4DECB";
            ctx.fillRect(this.x + 100, 130, 20, 50);
            ctx.fillRect(this.x + 80, 130, 20, 50)
            ctx.strokeStyle = "black";
            ctx.strokeRect(this.x + 100, 130, 20, 50);
            ctx.strokeRect(this.x + 80, 130, 20, 50)
            //doorknob
            ctx.beginPath();
            ctx.arc(this.x + 95, 155, 2, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(this.x + 105, 155, 2, 0, 2 * Math.PI);
            ctx.stroke();
            //left window
            ctx.fillStyle = "white"
            ctx.fillRect(this.x + 15, this.y + 10, 40, 40)
            ctx.strokeRect(this.x + 15, this.y + 10, 40, 40)
            ctx.strokeRect(this.x + 15, this.y + 10, 20, 20)
            ctx.strokeRect(this.x + 35, this.y + 30, 20, 20)
            //right window
            ctx.fillRect(this.x + this.width - 55, this.y + 10, 40, 40)
            ctx.strokeRect(this.x + this.width - 55, this.y + 10, 40, 40)
            ctx.strokeRect(this.x + this.width - 55, this.y + 10, 20, 20)
            ctx.strokeRect(this.x + this.width - 35, this.y + 30, 20, 20)
            //ball
            ctx.fillStyle = "hotpink";
            ctx.beginPath();
            ctx.arc(this.x + 55, 172, 7, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    //create fritz and buildings
    fritz = new Fritz(25, 250, 65, 25, currentSprite, "image");
    building1 = new Platform(0, 305, 300, canvas.height, fill, border);
    building2 = new Platform(520, 130, 50, 65, "#E78DA2", "#FCBEA3");
    building3 = new Platform(744, 320, 89, canvas.height, fill, border);
    building4 = new Platform(1400, 180, 500, canvas.height, fill, "#617659");
    plat1 = new Platform(325, 240, 40, 10, back, fill);
    plat2 = new Platform(450, 200, 25, 10, "#FCBEA3", "#E88D9D");
    plat3 = new Platform(680, 240, 25, 10, back, fill);
    plat4 = new Platform(900, 260, 55, 10, back, fill);
    plat5 = new Platform(1050, 220, 40, 10, "#E88D9D", "#C66A87");
    plat6 = new Platform(1200, 170, 50, 10, "#E88D9D", "#C66A87")
    house = new Platform(1700, 100, 200, 80, "yellow", "yellow")

    platforms = []
    platforms.push(building1)
    platforms.push(building2)
    platforms.push(building3)
    platforms.push(building4)
    platforms.push(plat1)
    platforms.push(plat2)
    platforms.push(plat3)
    platforms.push(plat4)
    platforms.push(plat5)
    platforms.push(plat6)
    platforms.push(house)
}
//click to play again
document.addEventListener("click", () => {
    respawn();
    topText.innerText = "Get Fritz home to his favorite pink ball!";
    statusDisplay.innerText = "A = left, D = right, W = jump!";
});
//respawn function
function respawn() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    init()
    scrollOffset = 0
    fritz = new Fritz(25, 250, 65, 25, "./img/8bitty.png", "image");
    for (let i = 0; i < platforms.length; i++) {
        if(i < 4){
            platforms[i].makeBuilding()
        }
        else if(i < 10){
            platforms[i].makePlat()
        }else{
            platforms[i].makeHouse()
        }
    }
}
//endgame function
function endGame() {
    fritz.alive = false;
    statusDisplay.innerText = "Oh no! Click anywhere to try again...";
    console.log(":(");
}
//finish map win function
function winner() {
    if (homeText.innerText === "0 Ft to Home"){
        fritz.alive = false;
        statusDisplay.innerText = "YOU MADE IT! Time to curl up on the couch!";
        topText.innerText = "Click anywhere to play again";
    }
}
//Ft to Home function
function homeTrack() {
    distance = house.x - (fritz.x + fritz.width);
    if (distance <= 0) {
        distance = 0;
        winner();
    }
    homeText.innerText = `${distance} Ft to Home`;
}
let scrollOffset = 0
//gameplay loop
const gameLoopInterval = setInterval(gameLoop, 60);
function gameLoop() {
    //redraw canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //render all platforms
    for (let i = 0; i < platforms.length; i++) {
        if(i < 4){
            platforms[i].makeBuilding()
        }
        else if(i < 10){
            platforms[i].makePlat()
        }else{
            platforms[i].makeHouse()
        }
    }
    
    //movement and sprite swap logic
    if (keys.right.pressed && fritz.x < 150){
        fritz.image.src = rightSprite;
        currentSprite = rightSprite
        fritz.velocity.x = 10;
    } else if (keys.left.pressed && fritz.x > 50) {
        fritz.velocity.x = -10;
        fritz.image.src = leftSprite;
        currentSprite = leftSprite
    } else if (keys.up.pressed) {
        fritz.velocity.y = -10;
        if(fritz.velocity.y < 0){
            fritz.image.src = jumpRightSprite
            currentSprite = jumpRightSprite
        }else if(fritz.velocity.y < 0){
            fritz.image.src = jumpLeftSprite;
            currentSprite = jumpLeftSprite
        }
    } else {
        fritz.velocity.x = 0;
        for (let i = 0; i < platforms.length; i++) {
            if (keys.right.pressed){
                fritz.image.src = rightSprite
                scrollOffset += 1
                platforms[i].x -= 10
            }else if (keys.left.pressed) {
                fritz.image.src = leftSprite
                scrollOffset -= 1
                platforms[i].x += 10
            }
        }
            
     }

    //platform collision checks
    for (let i = 0; i < platforms.length; i++) {      
        if (
            fritz.y + fritz.height <= platforms[i].y &&
            fritz.y + fritz.height + fritz.velocity.y >= platforms[i].y &&
            fritz.x + fritz.width - 20 >= platforms[i].x &&
            fritz.x + 10 <= platforms[i].x + platforms[i].width)
            {
                fritz.velocity.y = 0; 
        } else if (fritz.x < 0) {
            fritz.x = 0;
        } else if (fritz.y < 0) {
            fritz.y = 0;
        }
    }
    //deathpit condition
    if (fritz.y > canvas.height) {
        endGame();
    }
    //ft to home tracker
    homeTrack();
    //stop game on win condition
    winner();
    //draw Fritz. MUST GO LAST!!
    fritz.update();
}
gameLoop();

//controller event listeners (key down and up)

addEventListener("keydown", ({ keyCode }) => {
    if(fritz.alive){
        switch (keyCode) {
            case 65:
                keys.left.pressed = true;
                break;
            case 68:
                keys.right.pressed = true;
                break;
            case 87:
                keys.up.pressed = true;
                break;
        }
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
            keys.up.pressed = false;
            break;
    }
});

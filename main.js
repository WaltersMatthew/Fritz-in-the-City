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
//Character class
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
    }
    //draw building func
    buildingRender(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black"
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y)
        ctx.stroke()
    }    
    //draw platform func
    platRender(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "black"
        ctx.strokeRect(this.x, this.y, this.width, this.height)
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
        ctx.arc(this.x + 55, 173, 7, 0, 2 * Math.PI);
        ctx.fill();
    }
}

//create fritz and buildings
let fritz = new Fritz(25, 250, 65, 25, currentSprite, "image");
let building1 = new Platform(0, 305, 250, canvas.height,"./img/building.png", "image");
let building3 = new Platform(744, 320, 89, canvas.height, "./img/building2.png", "image");
let building5 = new Platform(1550, 180, 350, canvas.height, "./img/building.png", "image");
let building2 = new Platform(530, 110, 50, 65, "./img/building3.png", "image");
let building4 = new Platform(1350, 110, 50, 65, "./img/building3.png", "image");
let plat1 = new Platform(325, 240, 50, 10, "./img/lowPlat.png", "image");
let plat2 = new Platform(440, 200, 45, 10, "./img/highPlat.png", "image");
let plat3 = new Platform(650, 240, 45, 10, "./img/lowPlat.png", "image");
let plat4 = new Platform(900, 260, 65, 10, "./img/lowPlat.png", "image");
let plat5 = new Platform(1050, 220, 40, 10, "./img/highPlat.png", "image");
let plat6 = new Platform(1200, 170, 50, 10, "./img/highestPlat.png", "image")
let house = new Platform(1700, 100, 200, 80, "yellow", "yellow")

//platforms array to loop for collision and rendering
let platforms = []
platforms.push(building1)
platforms.push(building3)
platforms.push(building5)
platforms.push(building2)
platforms.push(building4)
platforms.push(plat1)
platforms.push(plat2)
platforms.push(plat3)
platforms.push(plat4)
platforms.push(plat5)
platforms.push(plat6)
platforms.push(house)

//function to reset entire game
function reset(){
    //recreate fritz and buildings
    fritz = new Fritz(25, 250, 65, 25, currentSprite, "image");
    building1 = new Platform(0, 305, 250, canvas.height,"./img/building.png", "image");
    building3 = new Platform(744, 320, 89, canvas.height, "./img/building2.png", "image");
    building5 = new Platform(1550, 180, 350, canvas.height, "./img/building.png", "image");
    building2 = new Platform(530, 110, 50, 65, "./img/building3.png", "image");
    building4 = new Platform(1350, 110, 50, 65, "./img/building3.png", "image");
    plat1 = new Platform(325, 240, 50, 10, "./img/lowPlat.png", "image");
    plat2 = new Platform(440, 200, 45, 10, "./img/highPlat.png", "image");
    plat3 = new Platform(650, 240, 45, 10, "./img/lowPlat.png", "image");
    plat4 = new Platform(900, 260, 65, 10, "./img/lowPlat.png", "image");
    plat5 = new Platform(1050, 220, 40, 10, "./img/highPlat.png", "image");
    plat6 = new Platform(1200, 170, 50, 10, "./img/highestPlat.png", "image")
    house = new Platform(1700, 100, 200, 80, "yellow", "yellow")
    //empty array and re-push original coordinates
    platforms = []
    platforms.push(building1)
    platforms.push(building3)
    platforms.push(building5)
    platforms.push(building2)
    platforms.push(building4)
    platforms.push(plat1)
    platforms.push(plat2)
    platforms.push(plat3)
    platforms.push(plat4)
    platforms.push(plat5)
    platforms.push(plat6)
    platforms.push(house)
}
//click window to play again
document.addEventListener("click", () => {
    respawn();
    topText.innerText = "Get Fritz home to his favorite pink ball!";
    statusDisplay.innerText = "A = left, D = right, W = jump!";
});
//respawn function
function respawn() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    reset()
    //loop platforms array to render
    for (let i = 0; i < platforms.length; i++) {
        if(i < 5){
            platforms[i].buildingRender()
        }else if(i < 11){
            platforms[i].platRender()
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

//gameplay loop
const gameLoopInterval = setInterval(gameLoop, 60);
function gameLoop() {
    //redraw canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //loop platforms array to render all platforms
    for (let i = 0; i < platforms.length; i++) {
        if(i < 5){
            platforms[i].buildingRender()
        }else if (i < 11){
            platforms[i].platRender()
        }else{
            platforms[i].makeHouse()
        }
    }
 
    //movement and sprite swap logic

    //right
    if (keys.right.pressed && fritz.x < 150){
        fritz.image.src = rightSprite;
        currentSprite = rightSprite
        fritz.velocity.x = 10;

    //left
    } else if (keys.left.pressed && fritz.x > 50) {
        fritz.velocity.x = -10;
        fritz.image.src = leftSprite;
        currentSprite = leftSprite

    //up    
    } else if (keys.up.pressed) {
        fritz.velocity.y = -15;
        //jump sprite swap
        if(currentSprite == rightSprite){
            fritz.image.src = jumpRightSprite
            currentSprite = jumpRightSprite
            }else if(currentSprite == leftSprite){
            fritz.image.src = jumpLeftSprite;
            currentSprite = jumpLeftSprite
            }
        }    
    else {
        fritz.velocity.x = 0;
        for (let i = 0; i < platforms.length; i++) {
            if (keys.right.pressed){
                fritz.image.src = rightSprite
                platforms[i].x -= 10
            }else if (keys.left.pressed) {
                fritz.image.src = leftSprite
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
                //jump sprite swaps on landing
                if(currentSprite == jumpLeftSprite){
                    fritz.image.src = leftSprite
                    currentSprite = leftSprite
                }else if(currentSprite == jumpRightSprite){
                    fritz.image.src = rightSprite
                    currentSprite = rightSprite
                }
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

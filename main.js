//const to select items
const canvas = document.querySelector("canvas");
const statusDisplay = document.querySelector("#status");
const homeText = document.querySelector("#homeText");
const topText = document.querySelector("#topText")
//set myGameArea obj

//get canvas context
this.ctx = canvas.getContext("2d");
//set canvas res to be same as window
canvas.setAttribute("height", getComputedStyle(canvas)["height"]);
canvas.setAttribute("width", getComputedStyle(canvas)["width"]);

//color palette
const yellow = "#FFFC40";
const blue = "#143362";

//make class for Fritz
class Fritz {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color
        this.alive = true;
        this.speed = 10;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0.15;
        this.gravitySpeed = 0;
        // this.moveRight = this.x += this.speed
        // this.moveLeft = this.x -= this.speed
        // this.jump = this.y -= this.speed * 6
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
//class for platforms and buildings
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
        ctx.globalCompositeOperation = "source-over"
        ctx.lineWidth = 5;
        // ctx.strokeStyle = yellow;
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
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
        ctx.globalCompositeOperation = "source-over"

        ctx.strokeStyle = this.borderColor;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
//create fritz and buildings
let fritz = new Fritz(25, 330, 30, 15, "#5B311C");
let building1 = new Platform(0, 350, 100, canvas.height, '', blue)
let building2 = new Platform(200, 230, 75, canvas.height)
let building3 = new Platform(420, 300, 100, canvas.height)
let building4 = new Platform(700, 180, canvas.width, canvas.height)
let plat1 = new Platform(140, 290, 50, 13, yellow, blue)
let plat2 = new Platform(355, 250, 25, 15, yellow, blue)
let plat3 = new Platform(570, 260, 55, 12, yellow, blue)
let plat4 = new Platform(675, 220, 25, 12, yellow, blue)



// //create movementHandler function
function movementHandler(e) {
    // how many pixels fritz moves
    if (fritz.alive ) {
        switch (e.key) {
            case "w":
                //move fritz up
                fritz.y -= fritz.speed;
                break;
            case "s":
                //move fritz down
                fritz.y += fritz.speed;
                break;
            case "a":
                //move fritz left
                fritz.x -= fritz.speed;
                if (fritz.x < 0) {
                    fritz.x = 0;
                }
                break;
            case "d":
                // move fritz right
                fritz.x += fritz.speed;
                if (fritz.x + fritz.width > canvas.width) {
                    winner();
                }
                break;
            case " ":
                // make fritz jump
                let jumps = 1
                if (jumps > 0){
                fritz.y -= fritz.speed * 6;
                jumps--
                }
                break;
        }
    }
}
// // pass movementHandler to keypress eventListner
document.addEventListener("keydown", movementHandler);


// working out multiple keypress

// attempt 1
// document.addEventListener("keydown", (e) => console.log(e.keyCode))
// const controller = {
//     68: {pressed: false, function: fritz.moveRight},
//     65: {pressed: false, function: fritz.moveLeft},
//     32: {pressed: false, function: fritz.jump}
// }
// document.addEventListener("keydown", (e) => {
//     if(controller[e.keyCode]){
//       controller[e.keyCode].pressed = true
//     }
//   })
//   document.addEventListener("keyup", (e) => {
//     if(controller[e.keyCode]){
//       controller[e.keyCode].pressed = false
//     }
//   })
//   const executeMoves = () => {
//     Object.keys(controller).forEach(key=> {
//       controller[key].pressed && controller[key].func()
//     })
//   }

//attempt 2
// const myGameArea = {
//     start: function() {
//         document.addEventListener('keydown', function (e) {
//         myGameArea.keys = (myGameArea.keys || []);
//         myGameArea.keys[e.keyCode] = true;
//         console.log(myGameArea.keys[e])
//     })
//     document.addEventListener('keyup', function (e) {
//         myGameArea.keys[e.keyCode] = false;
//         console.log(myGameArea.keys[e])
//         })
//     }
// }



//click to play again
document.addEventListener("click", () =>{
    respawn()
    topText.innerText = "Get Fritz home to his favorite pink ball!"
})
//respawn function
function respawn() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fritz = new Fritz(25, 330, 30, 15, "#AD5E32");
}

//endgame function
function endGame() {
    fritz.alive = false;
    statusDisplay.innerText = "Oh no! Try again to get Fritz home.";
    console.log(":(");
    respawn();
}
//finish map win function
function winner() {
    fritz.alive = false;
    statusDisplay.innerText = "YOU MADE IT! Time to curl up on the couch!";
    topText.innerText = "Click anywhere to play again"
    console.log(":)");
}

function homeTrack (){
    distance = canvas.width - (fritz.x + fritz.width - 5)
    if(distance <= 0){
        distance = 0
    }
    homeText.innerText = `${distance} Ft to Home`
}


//draw the house
function house(){
    //main square
    ctx.lineWidth = 2;
    ctx.fillStyle = yellow;
    ctx.strokeStyle = "black";
    ctx.strokeRect(752, 125, 55, 54);
    ctx.fillRect(752, 125, 55, 54);
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
    ctx.strokeRect(782, 140, 22, 38);
    ctx.fillStyle = "#E4DECB";
    ctx.fillRect(782, 140, 22, 38)
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
function platformCheck(fritz, plat) {
    if (fritz.y > plat.y - fritz.height && fritz.y < plat.y && fritz.x > plat.x - fritz.width && fritz.x < plat.x + plat.width - 5){
        fritz.y = plat.y - fritz.height
        fritz.gravitySpeed = 0.05
    }

}


//gameplay loop
const gameLoopInterval = setInterval(gameLoop, 60);

function gameLoop() {
    // executeMoves()
    //redraw canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //render fritz and all platforms
    building1.makeBuilding()
    building2.makeBuilding()
    building3.makeBuilding()
    building4.makeBuilding()
    plat1.makePlat()
    plat2.makePlat()
    plat3.makePlat()
    plat4.makePlat()
    house()
    fritz.render();
   
    //platform collision checks
    platformCheck(fritz, building1)
    platformCheck(fritz, building2)
    platformCheck(fritz, building3)
    platformCheck(fritz, building4)
    platformCheck(fritz, plat1)
    platformCheck(fritz, plat2)
    platformCheck(fritz, plat3)
    platformCheck(fritz, plat4)
    //gravity
    fritz.gravFunc();
    if (fritz.y > canvas.height) {
        endGame();
    }
    homeTrack()
    
//W3Schools attempt
//     if (myGameArea.keys && myGameArea.keys[37]) {fritz.speedX = -10; }
//   if (myGameArea.keys && myGameArea.keys[39]) {fritz.speedX = 10; }
//   if (myGameArea.keys && myGameArea.keys[38]) {fritz.speedY = -10; }
//   if (myGameArea.keys && myGameArea.keys[40]) {fritz.speedY = 10; }
}
gameLoop();

//find X/Y of click for formatting
// canvas.addEventListener("click", (event) => {
//   console.log(event.offsetX, event.offsetY);
// });

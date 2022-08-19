//const to select items
const canvas = document.querySelector('canvas')
const statusDisplay = document.querySelector("#status")
const button = document.querySelector('button')
//get canvas context
const ctx = canvas.getContext('2d')
//set canvas res to be same as window
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])

//rectangles for buildings

//make class for Fritz
class Fritz{
    constructor(x, y, width, height, color){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

//create Fritz on click

const fritz = new Fritz(50, 200, 70, 35, '#AD5E32')


//create movementHandler function
function movementHandler(e){
    let speed = 10 
    // how many pixels fritz moves
    if(fritz.alive){
        switch(e.key){
            case('w'):
                //move fritz up
                pressed = true
                fritz.y -= speed
                break
            case('s'):
                //move fritz down
                pressed = true
                fritz.y += speed
                if(fritz.y > canvas.height){
                    endGame()
                }
                break
            case('a'):
                //move fritz left
                pressed = true
                fritz.x -= speed
                if(fritz.x < 0){
                    fritz.x = 0
                }
                break
            case('d'):
                // move fritz right
                pressed = true
                fritz.x += speed
                if(fritz.x + fritz.width > canvas.width){
                    fritz.x = canvas.width - fritz.width
                }
                break
            case(' '):
                // make fritz jump
                pressed = true
                fritz.y -= speed * 10
                console.log("jump doggy!")
        }
            
    }

}



//pass movementHandler to keypress eventListner
document.addEventListener('keydown', movementHandler)
//add collision to stop fritz from falling when on platform

//respawn function
function respawn(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    Fritz.render()
}

//endgame function
function endGame(){
    fritz.alive = false
    statusDisplay.innerText = "Oh no! Try again to get Fritz home."
    console.log(":(")
    respawn()
    
}

//gameplay loop
const gameLoopInterval = setInterval(gameLoop, 60)

function gameLoop() {
    //redraw canvas
    ctx.clearRect(0,0, canvas.width, canvas.height)
    //render fritz
    fritz.render()
}
gameLoop()
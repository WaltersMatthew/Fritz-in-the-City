//const to select items
const canvas = document.querySelector('canvas')
const statusDisplay = document.querySelector("#status")
// const button = document.querySelector('button')
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
        this.speed = 10
        this.speedX = 0
        this.speedY = 0
        this.gravity = 5.05
        this.gravitySpeed = 0
    }
    render(){
        ctx.lineWidth = 5
        ctx.strokeStyle = 'black'
        ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    gravFunc() {
        this.gravitySpeed += this.gravity;
        this.y += this.speedY + this.gravitySpeed;
        // this.hitBottom();
    }
}
//create Fritz on click

let fritz = new Fritz(50, 200, 30, 15, '#AD5E32')


//create movementHandler function
function movementHandler(e){ 
    // how many pixels fritz moves
    if(fritz.alive){
        switch(e.key){
            case('w'):
                //move fritz up
                pressed = true
                fritz.y -= fritz.speed
                break
            case('s'):
                //move fritz down
                pressed = true
                fritz.y += fritz.speed
                if(fritz.y > canvas.height){
                    endGame()
                }
                break
            case('a'):
                //move fritz left
                pressed = true
                fritz.x -= fritz.speed
                if(fritz.x < 0){
                    fritz.x = 0
                }
                break
            case('d'):
                // move fritz right
                pressed = true
                fritz.x += fritz.speed
                if(fritz.x + fritz.width > canvas.width){
                    fritz.x = canvas.width - fritz.width
                }
                break
            case(' '):
                // make fritz jump
                pressed = true
                fritz.y -= fritz.speed * 5
                console.log("jump doggy!")
                break
        }
               
    }

}
fritz.gravFunc() 
//pass movementHandler to keypress eventListner
document.addEventListener('keydown', movementHandler)
//add collision to stop fritz from falling when on platform

//respawn function
function respawn(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    fritz = new Fritz(50, 200, 30, 15, '#AD5E32')
}
//respawn button
// button.addEventListener('click', respawn)
//endgame function
function endGame(){
    fritz.alive = false
    statusDisplay.innerText = "Oh no! Try again to get Fritz home."
    console.log(":(")
    respawn()
    
}
//render buildings
function drawScene(){
    //bldg 1
    ctx.lineWidth = 5
    ctx.strokeStyle = '#FFFC40'
    ctx.strokeRect(0, 220, 100, canvas.height)
    ctx.strokeStyle = '#143362' 
    ctx.fillRect(0, 220, 100, canvas.height) 
    //platform 1
    ctx.lineWidth = 5
    ctx.strokeStyle = '#FFFC40'
    ctx.strokeRect(150, 180, 50, 25)
    ctx.strokeStyle = '#143362' 
    ctx.fillRect(150, 180, 50, 25)
    //platform 2
    ctx.lineWidth = 5
    ctx.strokeStyle = '#FFFC40'
    ctx.strokeRect(250, 140, 75, 25)
    ctx.strokeStyle = '#143362' 
    ctx.fillRect(250, 140, 75, 25)
    //bldg 2
    ctx.lineWidth = 5
    ctx.strokeStyle = '#FFFC40'
    ctx.strokeRect(200, 230, 75, canvas.height)
    ctx.strokeStyle = '#143362' 
    ctx.fillRect(200, 230, 75, canvas.height)
    //bldg 3
    ctx.lineWidth = 5
    ctx.strokeStyle = '#FFFC40'
    ctx.strokeRect(420, 300, 100, canvas.height)
    ctx.strokeStyle = '#143362' 
    ctx.fillRect(420, 300, 100, canvas.height)   
    //platform 3
    ctx.lineWidth = 5
    ctx.strokeStyle = '#FFFC40'
    ctx.strokeRect(550, 260, 75, 12)
    ctx.strokeStyle = '#143362' 
    ctx.fillRect(550, 260, 75, 12)   
    //platform 4
    ctx.lineWidth = 5
    ctx.strokeStyle = '#FFFC40'
    ctx.strokeRect(650, 220, 25, 12)
    ctx.strokeStyle = '#143362' 
    ctx.fillRect(650, 220, 25, 12)  
    //bldg 4
    ctx.lineWidth = 5
    ctx.strokeStyle = '#FFFC40'
    ctx.strokeRect(700, 180, canvas.width, canvas.height)
    ctx.strokeStyle = '#143362' 
    ctx.fillRect(700, 180, canvas.width, canvas.height)    
}

//gameplay loop
const gameLoopInterval = setInterval(gameLoop, 60)

function gameLoop() {
    //redraw canvas
    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawScene()
    //render fritz
    fritz.render()
}
gameLoop()

canvas.addEventListener('click', (event) => {
    console.log(event.offsetX, event.offsetY)
})
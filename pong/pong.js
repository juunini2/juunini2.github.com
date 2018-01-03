var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
const BARWIDTH = 20
var BARHEIGHT = HEIGHT / 6
const UPKEY = 38//위 화살표
const DOWNKEY = 40//아래 화살표
const BACKGROUND = "#333"
const PLAYERCOLOR = "rgb(124, 238, 213)"
const COMCOLOR = "rgb(243, 112, 188)"
const BALLCOLOR = "#fff"
const SCORECOLOR = "rgb(86, 88, 84)"
var SCORESIZE = WIDTH / 10 + "px sans-serif"

var BALLSIZE = WIDTH / 100
const BALLSPEED = -HEIGHT / 200
const BALLSPEED_LIMIT = 7//해당 배수까지만 빨라짐. 1~7
const PLAYERSPEED = HEIGHT / 100
const COMSPEED = HEIGHT / 100//높으면 높을수록 이길 수 없음. 0으로 두길 바람.

const PLAYERPOSITION = 0
var COMPOSITION = WIDTH - BARWIDTH
var BAR_Y = HEIGHT / 2 - BARHEIGHT / 2

const DIFFICULTY = 1//0.1 ~ 1

const CANVAS = document.getElementById("canvas")
const CTX = CANVAS.getContext('2d')
const ANIMATE = window.requestAnimationFrame || function(callback){window.setTimeout(callback, 1000 / 60)}

function randomOffset(min, max) { return (Math.random() * (max - min)) + min }

function Bar(x, y) {
    this.width = BARWIDTH
    this.height = BARHEIGHT

    this.x = x
    this.y = y
    this.x_speed = 0
    this.y_speed = 0
}
function Com(){
    this.score = 0
    let X = COMPOSITION
    let Y = BAR_Y
    this.bar = new Bar(X, Y)
}
function Player() {
    this.score = 0
    X = PLAYERPOSITION
    Y = BAR_Y
    this.bar = new Bar(X, Y)
}
function Ball(x, y, speedX, speedY, rad){
    this.radius = rad || BALLSIZE

    this.reset = function(){
        this.x = WIDTH / 2
        this.y = HEIGHT / 2
        this.x_speed = BALLSPEED
        this.y_speed = 0
    }

    this.reset()
}

//모양정의

//바
Bar.prototype.render = function (color, ctx) {
    ctx.fillStyle = color//바 색깔
    ctx.fillRect(this.x, this.y, this.width, this.height)//x, y, width, height
    ctx.fill()
}
Player.prototype.render = function(ctx) {
    this.bar.render(PLAYERCOLOR, ctx)//플레이어 바 정의
    ctx.font = SCORESIZE//스코어 크기
    ctx.fillStyle = SCORECOLOR//스코어 색깔
    ctx.fillText(this.score.toString(), WIDTH / 2 - WIDTH / 8, HEIGHT / 5)//스코어 위치
    ctx.fill()
}
Com.prototype.render = function (ctx) {
    this.bar.render(COMCOLOR, ctx)//컴퓨터 바 정의
    ctx.font = SCORESIZE//스코어 크기
    ctx.fillStyle = SCORECOLOR//스코어 색깔
    ctx.fillText(this.score.toString(), WIDTH / 2 + WIDTH / 16, HEIGHT / 5)//스코어 위치
    ctx.fill()
}
//공
Ball.prototype.render = function(ctx) {
    ctx.fillStyle = BALLCOLOR//공 색깔
    ctx.arc(this.x, this.y, this.radius, 2 * Math.PI, false)//x, y, size, 원주율
    ctx.fill()
}
//움직임 정의
//바
Bar.prototype.move = function(y){
    this.y += y
    this.y_speed = y
    if (this.y < 0) {//끝에 닿으면 안움직임
        this.y = 0
        this.y_speed = 0
    } else if (this.y + this.height > HEIGHT) {//끝에 닿으면 안움직임
        this.y = HEIGHT - this.height
        this.y_speed = 0
    }
}
//플레이어
Player.prototype.update = function(keysDown){
    let value
    for (let key in keysDown) {
        value = Number(key)
        if (value === UPKEY) {
            this.bar.move(-PLAYERSPEED)
        } else if (value == DOWNKEY) {
            this.bar.move(PLAYERSPEED)
        } else {
            this.bar.move(0)
        }
    }
}
//컴퓨터
Com.prototype.update = function(ball) {
    let chase = -((this.bar.y + (this.bar.height / 2)) - ball.y)

    if (chase < 0 && chase < -PLAYERSPEED) {//쫒아가다가 안될거같으면 스피드업
        chase = -(PLAYERSPEED + COMSPEED)
    } else if (chase > 0 && chase > PLAYERSPEED) {//쫒아가다가 안될 거 같으면 스피드업
        chase = PLAYERSPEED + COMSPEED
    }

    this.bar.move(chase * randomOffset(DIFFICULTY, 1))

    if (this.bar.y < 0) {
        this.bar.y = 0
    } else if (this.bar.y + this.bar.height > HEIGHT) {
        this.bar.y = HEIGHT - this.bar.height
    }
}
//공
Ball.prototype.update = function(player, com){
    this.x += this.x_speed
    this.y += this.y_speed

    let ball_left = this.x - this.radius
    let ball_right = this.x + this.radius
    let ball_top = this.y - this.radius
    let ball_bottom = this.y + this.radius

    let hitTop = this.y - this.radius < 0
    let hitBottom = this.y + this.radius > HEIGHT

    if (hitTop) {
        this.y = this.radius
        this.y_speed = -this.y_speed
    } else if (hitBottom) {
        this.y = HEIGHT - this.radius
        this.y_speed = -this.y_speed
    }

    let playerWin = this.x - this.radius < 0
    let comWin = this.x + this.radius > WIDTH

    if (playerWin) {
        com.score++
        this.reset()
    }
    if (comWin) {
        player.score++
        this.reset()
    }

    //바에 부딪힐 때
    if (ball_right >= com.bar.x) { // 볼이 컴퓨터쪽으로 넘어갔을 때
        let com_catch_ball = ball_bottom > com.bar.y && ball_top < com.bar.y + com.bar.height

        if (com_catch_ball) {
            if (Math.abs(this.x_speed) < Math.abs(BALLSPEED * BALLSPEED_LIMIT)) {
                let com_min = -(Math.abs(BALLSPEED))
                let com_max = -0.9 * Math.abs(BALLSPEED)
                this.x_speed = -this.x_speed + randomOffset(com_min, com_max)
    
                this.y_speed += (com.bar.y_speed / 2)
                this.x += this.x_speed
            } else {
                this.x_speed = -this.x_speed
                this.x += this.x_speed
            }
        }
    } else if (ball_left <= player.bar.x + player.bar.width) {//볼이 플레이어쪽으로 넘어왔을 때
        let player_catch_ball = ball_bottom > player.bar.y && ball_top < player.bar.y + player.bar.height

        if (player_catch_ball) {
            if (Math.abs(this.x_speed) < Math.abs(BALLSPEED * BALLSPEED_LIMIT)) {
                let player_min = Math.abs(BALLSPEED)
                let player_max = 0.9 * Math.abs(BALLSPEED)
                this.x_speed = -this.x_speed + randomOffset(player_min, player_max)

                this.y_speed += player.bar.y_speed / 2
                this.x += this.x_speed
            } else {
                this.x_speed = -this.x_speed
                this.x += this.x_speed
            }
        }
    }
}

function Pong() {
    CANVAS.width = WIDTH
    CANVAS.height = HEIGHT

    let player = new Player()
    let com = new Com()
    let ball = new Ball()

    let keysDown = {}

    function render(){
        CTX.beginPath()
        CTX.fillStyle = BACKGROUND
        CTX.fillRect(0, 0, WIDTH, HEIGHT)
        CTX.closePath()

        player.render(CTX)
        com.render(CTX)
        ball.render(CTX)
    }

    function update(){
        player.update(keysDown)
        com.update(ball)
        ball.update(player, com)
    }
    
    function step(){
        render(CTX)
        update()
        ANIMATE(step)
    }

    let keydownEvent = function(event) {
        keysDown[event.keyCode] = true
    }
    let keyupEvent = function (event) {
        delete keysDown[event.keyCode]
    }
    let elementDestroyed = function(event) {
        window.removeEventListener('keydown', keydownEvent, false)
        window.removeEventListener('keyup', keyupEvent, false)
    }
    window.addEventListener('keydown', keydownEvent)
    window.addEventListener('keyup', keyupEvent)

    window.onresize = function(event){
        WIDTH = window.innerWidth
        HEIGHT = window.innerHeight
        CANVAS.width = WIDTH
        CANVAS.height = HEIGHT

        com.bar.x = WIDTH - BARWIDTH

        player.bar.height = HEIGHT / 6
        com.bar.height = HEIGHT / 6
        ball.radius = WIDTH / 100
    }

    ANIMATE(step)
}

Pong()
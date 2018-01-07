var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var WIDTH = window.innerWidth; // 화면 너비
var HEIGHT = window.innerHeight; //화면 높이
var EDGE_COLOR = "#fff";
var EDGE_WIDTH = 10;
var EDGE_GOAL_START = HEIGHT / 2 - HEIGHT / 4;
var EDGE_GOAL_END = HEIGHT / 2 + HEIGHT / 4;
var EDGE_MIDDLE_START = HEIGHT / 2 - HEIGHT / 3;
var EDGE_MIDDLE_END = HEIGHT / 2 + HEIGHT / 3;
var BAR_WIDTH = 10; // 바의 넓이
var BAR_HEIGHT = HEIGHT / 6; // 바의 길이
var BAR_RADIUS = 5;
var BAR_Y = HEIGHT / 2 - BAR_HEIGHT / 2; //바의 기본 y축 위치
var BALL_SIZE = WIDTH / 100; // 공 크기
var BALL_SPEED_LIMIT = 3; // 해당 배수까지만 빨라짐
var BALL_COLOR = "#fff"; // 공 색깔
var MINUS_BALL_COLOR = "red";
var UP_KEY = 38; // 위 화살표
var DOWN_KEY = 40; // 아래 화살표
var W_KEY = 87;
var S_KEY = 83;
var PLAYER_COLOR = "rgb(124, 238, 213)"; // 플레이어 바 색
var PLAYER_SPEED = HEIGHT / 100; // 바 속도
var PLAYER_POSITION = 10; // 플레이어 바 x축 위치
var PLAYER_FOWARD_POSITION = WIDTH / 2 - WIDTH / 4;
var COM_COLOR = "rgb(243, 112, 188)"; // 컴퓨터 바 색
var COM_SPEED = HEIGHT / 100; // 높으면 높을수록 이길 수 없음. 0으로 두길 바람.
var COM_POSITION = WIDTH - BAR_WIDTH - PLAYER_POSITION; // 컴퓨터의 바 x축 위치
var COM_FOWARD_POSITION = WIDTH / 2 + WIDTH / 4 - BAR_WIDTH;
var BACKGROUND = "#333"; // 배경색
var SCORE_COLOR = "rgb(86, 88, 84)"; // 스코어 색깔
var SCORE_SIZE = WIDTH / 10 + "px sans-serif";
var SCORE_POSITION = HEIGHT / 3;
var PLAYER_SCORE_POSITION = WIDTH / 2 - WIDTH / 8;
var COM_SCORE_POSITION = WIDTH / 2 + WIDTH / 16;
var DIFFICULTY = 1; // 0.1 ~ 1
var CANVAS = document.getElementById("canvas");
var CTX = CANVAS.getContext("2d");
var ANIMATE = window.requestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };
function BALL_SPEED() {
    var speed = Math.floor(Math.random() * 10) + 1;
    var ball_speed = -HEIGHT / 200;
    if (speed > 5) {
        speed = -(speed - 5) * ball_speed / 2;
    }
    else {
        speed = speed * ball_speed / 2;
    }
    return speed;
}
function EDGE() {
    CTX.beginPath();
    CTX.lineCap = "round";
    CTX.lineWidth = EDGE_WIDTH;
    CTX.strokeStyle = EDGE_COLOR;
    CTX.moveTo(EDGE_WIDTH / 2, EDGE_WIDTH / 2); // 위
    CTX.lineTo(WIDTH - EDGE_WIDTH / 2, EDGE_WIDTH / 2);
    CTX.moveTo(EDGE_WIDTH / 2, HEIGHT - EDGE_WIDTH / 2); // 아래
    CTX.lineTo(WIDTH - EDGE_WIDTH / 2, HEIGHT - EDGE_WIDTH / 2);
    CTX.moveTo(EDGE_WIDTH / 2, EDGE_WIDTH / 2); // 왼쪽 위
    CTX.lineTo(EDGE_WIDTH / 2, EDGE_GOAL_START);
    CTX.moveTo(EDGE_WIDTH / 2, HEIGHT - EDGE_WIDTH / 2); // 왼쪽 아래
    CTX.lineTo(EDGE_WIDTH / 2, EDGE_GOAL_END);
    CTX.moveTo(WIDTH - EDGE_WIDTH / 2, EDGE_WIDTH / 2); // 오른쪽 위
    CTX.lineTo(WIDTH - EDGE_WIDTH / 2, EDGE_GOAL_START);
    CTX.moveTo(WIDTH - EDGE_WIDTH / 2, HEIGHT - EDGE_WIDTH / 2); // 오른쪽 아래
    CTX.lineTo(WIDTH - EDGE_WIDTH / 2, EDGE_GOAL_END);
    CTX.moveTo(WIDTH / 2 - EDGE_WIDTH / 2, EDGE_WIDTH / 2);
    CTX.lineTo(WIDTH / 2 - EDGE_WIDTH / 2, EDGE_MIDDLE_START);
    CTX.moveTo(WIDTH / 2 - EDGE_WIDTH / 2, HEIGHT - EDGE_WIDTH / 2);
    CTX.lineTo(WIDTH / 2 - EDGE_WIDTH / 2, EDGE_MIDDLE_END);
    CTX.stroke();
}
function randomOffset(min, max) {
    return (Math.random() * (max - min) + min);
}
function roundRect(x, y, width, height, fill) {
    var radius = BAR_RADIUS;
    CTX.beginPath();
    CTX.moveTo(x + radius, y);
    CTX.lineTo(x + width - radius, y);
    CTX.quadraticCurveTo(x + width, y, x + width, y + radius);
    CTX.lineTo(x + width, y + height - radius);
    CTX.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    CTX.lineTo(x + radius, y + height);
    CTX.quadraticCurveTo(x, y + height, x, y + height - radius);
    CTX.lineTo(x, y + radius);
    CTX.quadraticCurveTo(x, y, x + radius, y);
    CTX.closePath();
    CTX.fillStyle = fill;
    CTX.fill();
}
var Bar = /** @class */ (function () {
    function Bar(x, y) {
        this.width = BAR_WIDTH;
        this.height = BAR_HEIGHT;
        this.y_speed = 0;
        this.x = x;
        this.y = y;
    }
    Bar.prototype.render = function (color) {
        roundRect(this.x, this.y, this.width, this.height, color); // x, y, width, height
    };
    Bar.prototype.move = function (y) {
        this.y += y;
        this.y_speed = y;
        if (this.y < 0 + EDGE_WIDTH) {
            this.y = EDGE_WIDTH;
            this.y_speed = 0;
        }
        else if (this.y + this.height > HEIGHT - EDGE_WIDTH) {
            this.y = HEIGHT - EDGE_WIDTH - this.height;
            this.y_speed = 0;
        }
    };
    return Bar;
}());
var Player = /** @class */ (function () {
    function Player() {
        this.score = 0;
        this.bar = new Bar(PLAYER_POSITION, BAR_Y);
        this.foward = new Bar(PLAYER_FOWARD_POSITION, BAR_Y);
    }
    Player.prototype.render = function () {
        this.bar.render(PLAYER_COLOR); // 플레이어 바 정의
        this.foward.render(PLAYER_COLOR);
        CTX.font = SCORE_SIZE; // 스코어 크기
        CTX.fillStyle = SCORE_COLOR; // 스코어 색깔
        CTX.fillText(this.score.toString(), PLAYER_SCORE_POSITION, SCORE_POSITION); // 스코어 위치
    };
    Player.prototype.update = function (keysDown) {
        var value;
        for (var key in keysDown) {
            value = Number(key);
            if (value === W_KEY) {
                this.bar.move(-PLAYER_SPEED);
            }
            else if (value === S_KEY) {
                this.bar.move(PLAYER_SPEED);
            }
            else if (value === UP_KEY) {
                this.foward.move(-PLAYER_SPEED);
            }
            else if (value === DOWN_KEY) {
                this.foward.move(PLAYER_SPEED);
            }
            else {
                this.bar.move(0);
            }
        }
    };
    return Player;
}());
var Com = /** @class */ (function () {
    function Com() {
        this.score = 0;
        this.bar = new Bar(COM_POSITION, BAR_Y);
        this.foward = new Bar(COM_FOWARD_POSITION, BAR_Y);
    }
    Com.prototype.render = function () {
        this.bar.render(COM_COLOR);
        this.foward.render(COM_COLOR);
        CTX.font = SCORE_SIZE;
        CTX.fillStyle = SCORE_COLOR;
        CTX.fillText(this.score.toString(), COM_SCORE_POSITION, SCORE_POSITION);
    };
    Com.prototype.update = function (ball) {
        var chase = -((this.bar.y + (this.bar.height / 2)) - ball.y);
        if (chase < 0 && chase < -PLAYER_SPEED) {
            chase = -(PLAYER_SPEED + COM_SPEED);
        }
        else if (chase > 0 && chase > PLAYER_SPEED) {
            chase = PLAYER_SPEED + COM_SPEED;
        }
        this.bar.move(chase * randomOffset(DIFFICULTY / 10, 1));
        this.foward.move(chase * randomOffset(DIFFICULTY, 1));
        if (this.bar.y < EDGE_WIDTH) {
            this.bar.y = EDGE_WIDTH;
            this.foward.y = EDGE_WIDTH;
        }
        else if (this.bar.y + this.bar.height > HEIGHT - EDGE_WIDTH) {
            this.bar.y = HEIGHT - EDGE_WIDTH - this.bar.height;
            this.foward.y = HEIGHT - EDGE_WIDTH - this.foward.height;
        }
    };
    return Com;
}());
var Ball = /** @class */ (function () {
    function Ball() {
        this.radius = BALL_SIZE;
        this.x = WIDTH / 2;
        this.y = HEIGHT / 2;
        this.x_speed = BALL_SPEED();
        this.y_speed = BALL_SPEED();
    }
    Ball.prototype.reset = function () {
        this.x = WIDTH / 2;
        this.y = HEIGHT / 2;
        this.x_speed = BALL_SPEED();
        this.y_speed = BALL_SPEED();
    };
    Ball.prototype.render = function () {
        CTX.beginPath();
        CTX.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        CTX.fillStyle = BALL_COLOR;
        CTX.fill();
    };
    Ball.prototype.update = function (player, com) {
        if (this.y_speed == 0) {
            this.y_speed = BALL_SPEED();
        }
        this.x += this.x_speed;
        this.y += this.y_speed;
        var ball_left = this.x - this.radius;
        var ball_right = this.x + this.radius;
        var ball_top = this.y - this.radius;
        var ball_bottom = this.y + this.radius;
        var hitTop = ball_top < EDGE_WIDTH;
        var hitBottom = ball_bottom > HEIGHT - EDGE_WIDTH;
        var hitLeftEdge = ball_left < EDGE_WIDTH;
        var hitRightEdge = ball_right > WIDTH - EDGE_WIDTH;
        var hitEDGE_top = ball_top <= EDGE_GOAL_START;
        var hitEDGE_bottom = ball_bottom >= EDGE_GOAL_END;
        var hit_EDGE_MIDDLE_LEFT = ball_right >= WIDTH / 2 - EDGE_WIDTH / 2 && ball_right <= WIDTH / 2 + EDGE_WIDTH / 2;
        var hit_EDGE_MIDDLE_RIGHT = ball_left <= WIDTH / 2 + EDGE_WIDTH / 2 && ball_left >= WIDTH / 2 - EDGE_WIDTH / 2;
        var hit_EDGE_MIDDLE_TOP = ball_top <= EDGE_MIDDLE_START;
        var hit_EDGE_MIDDLE_BOTTOM = ball_bottom >= EDGE_MIDDLE_END;
        if (hitTop) {
            this.y = this.radius + EDGE_WIDTH;
            this.y_speed = -this.y_speed;
        }
        else if (hitBottom) {
            this.y = HEIGHT - EDGE_WIDTH - this.radius;
            this.y_speed = -this.y_speed;
        }
        else if (hitLeftEdge && (hitEDGE_top || hitEDGE_bottom)) {
            this.x = this.radius + EDGE_WIDTH;
            this.x_speed = -this.x_speed;
        }
        else if (hitRightEdge && (hitEDGE_top || hitEDGE_bottom)) {
            this.x = WIDTH - EDGE_WIDTH - this.radius;
            this.x_speed = -this.x_speed;
        }
        else if (hit_EDGE_MIDDLE_LEFT && (hit_EDGE_MIDDLE_TOP || hit_EDGE_MIDDLE_BOTTOM)) {
            this.x = WIDTH / 2 - EDGE_WIDTH / 2 - EDGE_WIDTH - this.radius;
            this.x_speed = -this.x_speed;
        }
        else if (hit_EDGE_MIDDLE_RIGHT && (hit_EDGE_MIDDLE_TOP || hit_EDGE_MIDDLE_BOTTOM)) {
            this.x = WIDTH / 2 + EDGE_WIDTH / 2 + EDGE_WIDTH;
            this.x_speed = -this.x_speed;
        }
        var comGet = ball_right > WIDTH && ball_top > EDGE_GOAL_START && ball_bottom < EDGE_GOAL_END;
        var playerGet = ball_left < 0 && ball_top > EDGE_GOAL_START && ball_bottom < EDGE_GOAL_END;
        if (comGet) {
            com.score++;
            this.reset();
        }
        if (playerGet) {
            player.score++;
            this.reset();
        }
        // 바에 부딪힐 때
        if (ball_right >= com.bar.x && ball_right <= com.bar.x + BAR_WIDTH) {
            var com_catch_ball = ball_bottom > com.bar.y && ball_top < com.bar.y + com.bar.height;
            if (com_catch_ball) {
                if (Math.abs(this.x_speed) < Math.abs(BALL_SPEED() * BALL_SPEED_LIMIT)) {
                    var com_min = -(Math.abs(BALL_SPEED()));
                    var com_max = -0.9 * Math.abs(BALL_SPEED());
                    this.x_speed = -this.x_speed + randomOffset(com_min, com_max);
                    this.y_speed += (com.bar.y_speed / 2);
                }
                else {
                    this.x_speed = -this.x_speed;
                    this.x += this.x_speed;
                }
            }
        }
        else if (ball_right >= com.foward.x && ball_left <= com.foward.x + BAR_WIDTH) {
            var com_foward_catch_ball = ball_bottom > com.foward.y && ball_top < com.foward.y + com.foward.height;
            if (com_foward_catch_ball) {
                if (Math.abs(this.x_speed) < Math.abs(BALL_SPEED() * BALL_SPEED_LIMIT)) {
                    var com_min = -(Math.abs(BALL_SPEED()));
                    var com_max = -0.9 * Math.abs(BALL_SPEED());
                    this.x_speed = -this.x_speed + randomOffset(com_min, com_max);
                    this.y_speed += (com.foward.y_speed / 2);
                }
                else {
                    this.x_speed = -this.x_speed;
                    this.x += this.x_speed;
                }
            }
        }
        else if (ball_left <= player.bar.x + player.bar.width && ball_left >= player.bar.x) {
            var player_catch_ball = ball_bottom > player.bar.y && ball_top < player.bar.y + player.bar.height;
            if (player_catch_ball) {
                if (Math.abs(this.x_speed) < Math.abs(BALL_SPEED() * BALL_SPEED_LIMIT)) {
                    var player_min = Math.abs(BALL_SPEED());
                    var player_max = 0.9 * Math.abs(BALL_SPEED());
                    this.x_speed = -this.x_speed + randomOffset(player_min, player_max);
                    this.y_speed += player.bar.y_speed / 2;
                    this.x += this.x_speed;
                }
                else {
                    this.x_speed = -this.x_speed;
                    this.x += this.x_speed;
                }
            }
        }
        else if (ball_left <= player.foward.x + player.foward.width && ball_right >= player.foward.x) {
            var player_foward_catch_ball = ball_bottom > player.foward.y && ball_top < player.foward.y + player.foward.height;
            if (player_foward_catch_ball) {
                if (Math.abs(this.x_speed) < Math.abs(BALL_SPEED() * BALL_SPEED_LIMIT)) {
                    var player_min = Math.abs(BALL_SPEED());
                    var player_max = 0.9 * Math.abs(BALL_SPEED());
                    this.x_speed = -this.x_speed + randomOffset(player_min, player_max);
                    this.y_speed += player.foward.y_speed / 2;
                    this.x += this.x_speed;
                }
                else {
                    this.x_speed = -this.x_speed;
                    this.x += this.x_speed;
                }
            }
        }
    };
    return Ball;
}());
var Minus_Ball = /** @class */ (function (_super) {
    __extends(Minus_Ball, _super);
    function Minus_Ball() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Minus_Ball.prototype.render = function () {
        CTX.beginPath();
        CTX.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        CTX.fillStyle = MINUS_BALL_COLOR;
        CTX.fill();
    };
    Minus_Ball.prototype.update = function (player, com) {
        if (this.y_speed == 0) {
            this.y_speed = BALL_SPEED();
        }
        this.x += this.x_speed;
        this.y += this.y_speed;
        var ball_left = this.x - this.radius;
        var ball_right = this.x + this.radius;
        var ball_top = this.y - this.radius;
        var ball_bottom = this.y + this.radius;
        var hitTop = ball_top < EDGE_WIDTH;
        var hitBottom = ball_bottom > HEIGHT - EDGE_WIDTH;
        var hitLeftEdge = ball_left < EDGE_WIDTH;
        var hitRightEdge = ball_right > WIDTH - EDGE_WIDTH;
        var hitEDGE_top = ball_top <= EDGE_GOAL_START;
        var hitEDGE_bottom = ball_bottom >= EDGE_GOAL_END;
        var hit_EDGE_MIDDLE_LEFT = ball_right >= WIDTH / 2 - EDGE_WIDTH / 2 && ball_right <= WIDTH / 2 + EDGE_WIDTH / 2;
        var hit_EDGE_MIDDLE_RIGHT = ball_left <= WIDTH / 2 + EDGE_WIDTH / 2 && ball_left >= WIDTH / 2 - EDGE_WIDTH / 2;
        var hit_EDGE_MIDDLE_TOP = ball_top <= EDGE_MIDDLE_START;
        var hit_EDGE_MIDDLE_BOTTOM = ball_bottom >= EDGE_MIDDLE_END;
        if (hitTop) {
            this.y = this.radius + EDGE_WIDTH;
            this.y_speed = -this.y_speed;
        }
        else if (hitBottom) {
            this.y = HEIGHT - EDGE_WIDTH - this.radius;
            this.y_speed = -this.y_speed;
        }
        else if (hitLeftEdge && (hitEDGE_top || hitEDGE_bottom)) {
            this.x = this.radius + EDGE_WIDTH;
            this.x_speed = -this.x_speed;
        }
        else if (hitRightEdge && (hitEDGE_top || hitEDGE_bottom)) {
            this.x = WIDTH - EDGE_WIDTH - this.radius;
            this.x_speed = -this.x_speed;
        }
        else if (hit_EDGE_MIDDLE_LEFT && (hit_EDGE_MIDDLE_TOP || hit_EDGE_MIDDLE_BOTTOM)) {
            this.x = WIDTH / 2 - EDGE_WIDTH / 2 - EDGE_WIDTH - this.radius;
            this.x_speed = -this.x_speed;
        }
        else if (hit_EDGE_MIDDLE_RIGHT && (hit_EDGE_MIDDLE_TOP || hit_EDGE_MIDDLE_BOTTOM)) {
            this.x = WIDTH / 2 + EDGE_WIDTH / 2 + EDGE_WIDTH;
            this.x_speed = -this.x_speed;
        }
        var comGet = ball_right > WIDTH && ball_top > EDGE_GOAL_START && ball_bottom < EDGE_GOAL_END;
        var playerGet = ball_left < 0 && ball_top > EDGE_GOAL_START && ball_bottom < EDGE_GOAL_END;
        if (comGet) {
            com.score--;
            this.reset();
        }
        if (playerGet) {
            player.score--;
            this.reset();
        }
        // 바에 부딪힐 때
        if (ball_right >= com.bar.x && ball_right <= com.bar.x + BAR_WIDTH) {
            var com_catch_ball = ball_bottom > com.bar.y && ball_top < com.bar.y + com.bar.height;
            if (com_catch_ball) {
                if (Math.abs(this.x_speed) < Math.abs(BALL_SPEED() * BALL_SPEED_LIMIT)) {
                    var com_min = -(Math.abs(BALL_SPEED()));
                    var com_max = -0.9 * Math.abs(BALL_SPEED());
                    this.x_speed = -this.x_speed + randomOffset(com_min, com_max);
                    this.y_speed += (com.bar.y_speed / 2);
                }
                else {
                    this.x_speed = -this.x_speed;
                    this.x += this.x_speed;
                }
            }
        }
        else if (ball_right >= com.foward.x && ball_left <= com.foward.x + BAR_WIDTH) {
            var com_foward_catch_ball = ball_bottom > com.foward.y && ball_top < com.foward.y + com.foward.height;
            if (com_foward_catch_ball) {
                if (Math.abs(this.x_speed) < Math.abs(BALL_SPEED() * BALL_SPEED_LIMIT)) {
                    var com_min = -(Math.abs(BALL_SPEED()));
                    var com_max = -0.9 * Math.abs(BALL_SPEED());
                    this.x_speed = -this.x_speed + randomOffset(com_min, com_max);
                    this.y_speed += (com.foward.y_speed / 2);
                }
                else {
                    this.x_speed = -this.x_speed;
                    this.x += this.x_speed;
                }
            }
        }
        else if (ball_left <= player.bar.x + player.bar.width && ball_left >= player.bar.x) {
            var player_catch_ball = ball_bottom > player.bar.y && ball_top < player.bar.y + player.bar.height;
            if (player_catch_ball) {
                if (Math.abs(this.x_speed) < Math.abs(BALL_SPEED() * BALL_SPEED_LIMIT)) {
                    var player_min = Math.abs(BALL_SPEED());
                    var player_max = 0.9 * Math.abs(BALL_SPEED());
                    this.x_speed = -this.x_speed + randomOffset(player_min, player_max);
                    this.y_speed += player.bar.y_speed / 2;
                    this.x += this.x_speed;
                }
                else {
                    this.x_speed = -this.x_speed;
                    this.x += this.x_speed;
                }
            }
        }
        else if (ball_left <= player.foward.x + player.foward.width && ball_right >= player.foward.x) {
            var player_foward_catch_ball = ball_bottom > player.foward.y && ball_top < player.foward.y + player.foward.height;
            if (player_foward_catch_ball) {
                if (Math.abs(this.x_speed) < Math.abs(BALL_SPEED() * BALL_SPEED_LIMIT)) {
                    var player_min = Math.abs(BALL_SPEED());
                    var player_max = 0.9 * Math.abs(BALL_SPEED());
                    this.x_speed = -this.x_speed + randomOffset(player_min, player_max);
                    this.y_speed += player.foward.y_speed / 2;
                    this.x += this.x_speed;
                }
                else {
                    this.x_speed = -this.x_speed;
                    this.x += this.x_speed;
                }
            }
        }
    };
    return Minus_Ball;
}(Ball));
var Pong = /** @class */ (function () {
    function Pong() {
        CANVAS.width = WIDTH;
        CANVAS.height = HEIGHT;
        var ball = new Ball();
        var minus_ball = new Minus_Ball();
        var player = new Player();
        var com = new Com();
        var keysDown = {};
        function render() {
            CTX.fillStyle = BACKGROUND;
            CTX.fillRect(0, 0, WIDTH, HEIGHT);
            EDGE();
            player.render();
            com.render();
            ball.render();
            minus_ball.render();
        }
        function update() {
            player.update(keysDown);
            com.update(minus_ball);
            ball.update(player, com);
            minus_ball.update(player, com);
        }
        function step() {
            render();
            update();
            ANIMATE(step);
        }
        var keydownEvent = function (event) {
            keysDown[event.keyCode] = true;
        };
        var keyupEvent = function (event) {
            delete keysDown[event.keyCode];
        };
        window.addEventListener("keydown", keydownEvent);
        window.addEventListener("keyup", keyupEvent);
        ANIMATE(step);
    }
    return Pong;
}());
new Pong();
//# sourceMappingURL=renderer.js.map

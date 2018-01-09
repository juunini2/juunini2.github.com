const WIDTH: number = window.innerWidth;    // 화면 너비
const HEIGHT: number = window.innerHeight;  //화면 높이

const EDGE_COLOR: string = "#fff";
const EDGE_WIDTH: number = 10;
const EDGE_GOAL_START: number = HEIGHT / 2 - HEIGHT / 4;
const EDGE_GOAL_END: number = HEIGHT / 2 + HEIGHT / 4;
const EDGE_MIDDLE_START: number = HEIGHT / 2 - HEIGHT / 3;
const EDGE_MIDDLE_END: number = HEIGHT / 2 + HEIGHT / 3;

const BAR_WIDTH: number = 10;           // 바의 넓이
const BAR_HEIGHT: number = HEIGHT / 6;  // 바의 길이
const BAR_RADIUS: number = 5;
const BAR_Y: number = HEIGHT / 2 - BAR_HEIGHT / 2;  //바의 기본 y축 위치

const BALL_SIZE: number = WIDTH / 100;      // 공 크기
const BALL_SPEED_LIMIT: number = 3;         // 해당 배수까지만 빨라짐
const BALL_COLOR: string = "#fff";          // 공 색깔
const MINUS_BALL_COLOR: string = "red";

const UP_KEY: number = 38;      // 위 화살표
const DOWN_KEY: number = 40;    // 아래 화살표
const W_KEY:number = 87;
const S_KEY:number = 83;

const PLAYER_COLOR: string = "rgb(124, 238, 213)";  // 플레이어 바 색
const PLAYER_SPEED: number = HEIGHT / 100;          // 바 속도
const PLAYER_POSITION: number = 10;  // 플레이어 바 x축 위치
const PLAYER_FOWARD_POSITION: number = WIDTH / 2 - WIDTH / 4;

const COM_COLOR: string = "rgb(243, 112, 188)";     // 컴퓨터 바 색
const COM_SPEED: number = HEIGHT / 100;             // 높으면 높을수록 이길 수 없음. 0으로 두길 바람.
const COM_POSITION: number = WIDTH - BAR_WIDTH - PLAYER_POSITION; // 컴퓨터의 바 x축 위치
const COM_FOWARD_POSITION: number = WIDTH / 2 + WIDTH / 4 - BAR_WIDTH;

const BACKGROUND: string = "#333";                  // 배경색
const SCORE_COLOR: string = "rgb(86, 88, 84)";      // 스코어 색깔
const SCORE_SIZE: string = WIDTH / 10 + "px sans-serif";
const SCORE_POSITION: number = HEIGHT / 3;

const PLAYER_SCORE_POSITION: number = WIDTH / 2 - WIDTH / 8;
const COM_SCORE_POSITION: number = WIDTH / 2 + WIDTH / 16;

const DIFFICULTY: number = 1;   // 0.1 ~ 1

const CANVAS: any = document.getElementById("canvas");
const CTX: any = CANVAS.getContext("2d");
const ANIMATE = window.requestAnimationFrame || function(callback: any) { window.setTimeout(callback, 1000 / 60); };

function BALL_SPEED() {
    let speed: number = Math.floor(Math.random() * 10) + 1;
    let ball_speed: number = -HEIGHT / 200;
    if (speed > 5){
        speed = -(speed - 5) * ball_speed / 2;
    } else {
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
    CTX.moveTo(EDGE_WIDTH / 2, HEIGHT - EDGE_WIDTH / 2);    // 아래
    CTX.lineTo(WIDTH - EDGE_WIDTH / 2, HEIGHT - EDGE_WIDTH / 2);
    CTX.moveTo(EDGE_WIDTH / 2, EDGE_WIDTH / 2); // 왼쪽 위
    CTX.lineTo(EDGE_WIDTH / 2, EDGE_GOAL_START);
    CTX.moveTo(EDGE_WIDTH / 2, HEIGHT - EDGE_WIDTH / 2);    // 왼쪽 아래
    CTX.lineTo(EDGE_WIDTH / 2, EDGE_GOAL_END);
    CTX.moveTo(WIDTH - EDGE_WIDTH / 2, EDGE_WIDTH / 2); // 오른쪽 위
    CTX.lineTo(WIDTH - EDGE_WIDTH / 2, EDGE_GOAL_START);
    CTX.moveTo(WIDTH - EDGE_WIDTH / 2, HEIGHT - EDGE_WIDTH / 2);    // 오른쪽 아래
    CTX.lineTo(WIDTH - EDGE_WIDTH / 2, EDGE_GOAL_END);
    CTX.moveTo(WIDTH / 2 - EDGE_WIDTH / 2, EDGE_WIDTH / 2);
    CTX.lineTo(WIDTH / 2 - EDGE_WIDTH / 2, EDGE_MIDDLE_START);
    CTX.moveTo(WIDTH / 2 - EDGE_WIDTH / 2, HEIGHT - EDGE_WIDTH / 2);
    CTX.lineTo(WIDTH / 2 - EDGE_WIDTH / 2, EDGE_MIDDLE_END);
    CTX.stroke();
}

function randomOffset(min: number, max: number) {
    return (Math.random() * (max - min) + min);
}

function roundRect(x: number, y: number, width: number, height: number, fill: string) {
    let radius: number = BAR_RADIUS;

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

class Bar {
    private width: number = BAR_WIDTH;
    private height: number = BAR_HEIGHT;
    private x: number;
    private y: number;
    private y_speed: number = 0;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public render(color: string) {
        roundRect(this.x, this.y, this.width, this.height, color);  // x, y, width, height
    }

    public move(y: number) {
        this.y += y;
        this.y_speed = y;
        if (this.y < 0 + EDGE_WIDTH) {
            this.y = EDGE_WIDTH;
            this.y_speed = 0;
        } else if (this.y + this.height > HEIGHT - EDGE_WIDTH) {
            this.y = HEIGHT - EDGE_WIDTH - this.height;
            this.y_speed = 0;
        }
    }
}

class Player {
    private score: number = 0;
    private bar: any = new Bar(PLAYER_POSITION, BAR_Y);
    private foward: any = new Bar(PLAYER_FOWARD_POSITION, BAR_Y);

    public render() {
        this.bar.render(PLAYER_COLOR);  // 플레이어 바 정의
        this.foward.render(PLAYER_COLOR);
        CTX.font = SCORE_SIZE;          // 스코어 크기
        CTX.fillStyle = SCORE_COLOR;    // 스코어 색깔
        CTX.fillText(this.score.toString(), PLAYER_SCORE_POSITION, SCORE_POSITION); // 스코어 위치
    }

    public update(keysDown: any) {
        let value: number;
        for (let key in keysDown) {
            value = Number(key);
            if (value === W_KEY) { // 위 화살표 누르면 위로 이동
                this.bar.move(-PLAYER_SPEED);
            } else if (value === S_KEY) { // 아래 화살표 누르면 아래로 이동
                this.bar.move(PLAYER_SPEED);
            } else if (value === UP_KEY) {
                this.foward.move(-PLAYER_SPEED);
            } else if (value === DOWN_KEY) {
                this.foward.move(PLAYER_SPEED);
            } else {    // 다른 키를 누르면 무반응
                this.bar.move(0);
            }
        }
    }
}

class Com {
    private score: number = 0;
    private bar: any = new Bar(COM_POSITION, BAR_Y);
    private foward: any = new Bar(COM_FOWARD_POSITION, BAR_Y);

    public render() {
        this.bar.render(COM_COLOR);
        this.foward.render(COM_COLOR);
        CTX.font = SCORE_SIZE;
        CTX.fillStyle = SCORE_COLOR;
        CTX.fillText(this.score.toString(), COM_SCORE_POSITION, SCORE_POSITION);
    }

    public update(ball: any) {
        let chase = -((this.bar.y + (this.bar.height / 2)) - ball.y);

        if (chase < 0 && chase < -PLAYER_SPEED) {
            chase = -(PLAYER_SPEED + COM_SPEED);
        } else if (chase > 0 && chase > PLAYER_SPEED) {
            chase = PLAYER_SPEED + COM_SPEED;
        }

        this.bar.move(chase * randomOffset(DIFFICULTY / 10, 1));
        this.foward.move(chase * randomOffset(DIFFICULTY, 1));

        if (this.bar.y < EDGE_WIDTH) {
            this.bar.y = EDGE_WIDTH;
            this.foward.y = EDGE_WIDTH;
        } else if (this.bar.y + this.bar.height > HEIGHT - EDGE_WIDTH) {
            this.bar.y = HEIGHT - EDGE_WIDTH - this.bar.height;
            this.foward.y = HEIGHT - EDGE_WIDTH - this.foward.height;
        }
    }
}

class Ball {
    protected radius: number = BALL_SIZE;
    protected x: number = WIDTH / 2;
    protected y: number = HEIGHT / 2;
    protected x_speed: number = BALL_SPEED();
    protected y_speed: number = BALL_SPEED();

    protected reset() {
        this.x = WIDTH / 2;
        this.y = HEIGHT / 2;
        this.x_speed = BALL_SPEED();
        this.y_speed = BALL_SPEED();
    }

    public render() {
        CTX.beginPath();
        CTX.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        CTX.fillStyle = BALL_COLOR;
        CTX.fill();
    }

    public update(player: any, com: any) {
        if (this.y_speed == 0) {
            this.y_speed = BALL_SPEED();
        }
        this.x += this.x_speed;
        this.y += this.y_speed;

        let ball_left = this.x - this.radius;
        let ball_right = this.x + this.radius;
        let ball_top = this.y - this.radius;
        let ball_bottom = this.y + this.radius;

        let hitTop = ball_top < EDGE_WIDTH;
        let hitBottom = ball_bottom > HEIGHT - EDGE_WIDTH;
        let hitLeftEdge = ball_left < EDGE_WIDTH;
        let hitRightEdge = ball_right > WIDTH - EDGE_WIDTH;
        let hitEDGE_top = ball_top <= EDGE_GOAL_START;
        let hitEDGE_bottom = ball_bottom >= EDGE_GOAL_END;
        let hit_EDGE_MIDDLE_LEFT = ball_right >= WIDTH / 2 - EDGE_WIDTH / 2 && ball_right <= WIDTH / 2 + EDGE_WIDTH / 2;
        let hit_EDGE_MIDDLE_RIGHT = ball_left <= WIDTH / 2 + EDGE_WIDTH / 2 && ball_left >= WIDTH / 2 - EDGE_WIDTH / 2;
        let hit_EDGE_MIDDLE_TOP = ball_top <= EDGE_MIDDLE_START;
        let hit_EDGE_MIDDLE_BOTTOM = ball_bottom >= EDGE_MIDDLE_END;

        if (hitTop) {
            this.y = this.radius + EDGE_WIDTH;
            this.y_speed = -this.y_speed;
        } else if (hitBottom) {
            this.y = HEIGHT - EDGE_WIDTH - this.radius;
            this.y_speed = -this.y_speed;
        } else if (hitLeftEdge && (hitEDGE_top || hitEDGE_bottom)) {
            this.x = this.radius + EDGE_WIDTH;
            this.x_speed = -this.x_speed;
        } else if (hitRightEdge && (hitEDGE_top || hitEDGE_bottom)) {
            this.x = WIDTH - EDGE_WIDTH - this.radius;
            this.x_speed = -this.x_speed;
        } else if (hit_EDGE_MIDDLE_LEFT && (hit_EDGE_MIDDLE_TOP || hit_EDGE_MIDDLE_BOTTOM)) {
            this.x = WIDTH / 2 - EDGE_WIDTH / 2 - EDGE_WIDTH - this.radius;
            this.x_speed = -this.x_speed;
        } else if (hit_EDGE_MIDDLE_RIGHT && (hit_EDGE_MIDDLE_TOP || hit_EDGE_MIDDLE_BOTTOM)) {
            this.x = WIDTH / 2 + EDGE_WIDTH / 2 + EDGE_WIDTH;
            this.x_speed = -this.x_speed;
        }

        let comGet = ball_right > WIDTH && ball_top > EDGE_GOAL_START && ball_bottom < EDGE_GOAL_END;
        let playerGet = ball_left < 0 && ball_top > EDGE_GOAL_START && ball_bottom < EDGE_GOAL_END;

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
            let com_catch_ball = ball_bottom > com.bar.y && ball_top < com.bar.y + com.bar.height;

            if (com_catch_ball) {
                if (Math.abs(this.x_speed) < Math.abs(BALL_SPEED() * BALL_SPEED_LIMIT)) {
                    let com_min = -(Math.abs(BALL_SPEED()));
                    let com_max = -0.9 * Math.abs(BALL_SPEED());

                    this.x_speed = -this.x_speed + randomOffset(com_min, com_max);
                    this.y_speed += (com.bar.y_speed / 2);
                } else {
                    this.x_speed = -this.x_speed;
                    this.x += this.x_speed;
                }
            }
        } else if (ball_right >= com.foward.x && ball_left <= com.foward.x + BAR_WIDTH) {
            let com_foward_catch_ball = ball_bottom > com.foward.y && ball_top < com.foward.y + com.foward.height;

            if (com_foward_catch_ball) {
                if (Math.abs(this.x_speed) < Math.abs(BALL_SPEED() * BALL_SPEED_LIMIT)) {
                    let com_min = -(Math.abs(BALL_SPEED()));
                    let com_max = -0.9 * Math.abs(BALL_SPEED());

                    this.x_speed = -this.x_speed + randomOffset(com_min, com_max);
                    this.y_speed += (com.foward.y_speed / 2);
                } else {
                    this.x_speed = -this.x_speed;
                    this.x += this.x_speed;
                }
            }
        } else if (ball_left <= player.bar.x + player.bar.width && ball_left >= player.bar.x) {
            let player_catch_ball = ball_bottom > player.bar.y && ball_top < player.bar.y + player.bar.height;

            if (player_catch_ball) {
                if (Math.abs(this.x_speed) < Math.abs(BALL_SPEED() * BALL_SPEED_LIMIT)) {
                    let player_min = Math.abs(BALL_SPEED());
                    let player_max = 0.9 * Math.abs(BALL_SPEED());

                    this.x_speed = -this.x_speed + randomOffset(player_min, player_max);
                    this.y_speed += player.bar.y_speed / 2;
                    this.x += this.x_speed;
                } else {
                    this.x_speed = -this.x_speed;
                    this.x += this.x_speed;
                }
            }
        } else if (ball_left <= player.foward.x + player.foward.width && ball_right >= player.foward.x) {
            let player_foward_catch_ball = ball_bottom > player.foward.y && ball_top < player.foward.y + player.foward.height;

            if (player_foward_catch_ball) {
                if (Math.abs(this.x_speed) < Math.abs(BALL_SPEED() * BALL_SPEED_LIMIT)) {
                    let player_min = Math.abs(BALL_SPEED());
                    let player_max = 0.9 * Math.abs(BALL_SPEED());

                    this.x_speed = -this.x_speed + randomOffset(player_min, player_max);
                    this.y_speed += player.foward.y_speed / 2;
                    this.x += this.x_speed;
                } else {
                    this.x_speed = -this.x_speed;
                    this.x += this.x_speed;
                }
            }
        }
    }
}

class Minus_Ball extends Ball {
    public render() {
        CTX.beginPath();
        CTX.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        CTX.fillStyle = MINUS_BALL_COLOR;
        CTX.fill();
    }
    public update(player: any, com: any) {
        if (this.y_speed == 0) {
            this.y_speed = BALL_SPEED();
        }
        this.x += this.x_speed;
        this.y += this.y_speed;

        let ball_left = this.x - this.radius;
        let ball_right = this.x + this.radius;
        let ball_top = this.y - this.radius;
        let ball_bottom = this.y + this.radius;

        let hitTop = ball_top < EDGE_WIDTH;
        let hitBottom = ball_bottom > HEIGHT - EDGE_WIDTH;
        let hitLeftEdge = ball_left < EDGE_WIDTH;
        let hitRightEdge = ball_right > WIDTH - EDGE_WIDTH;
        let hitEDGE_top = ball_top <= EDGE_GOAL_START;
        let hitEDGE_bottom = ball_bottom >= EDGE_GOAL_END;
        let hit_EDGE_MIDDLE_LEFT = ball_right >= WIDTH / 2 - EDGE_WIDTH / 2 && ball_right <= WIDTH / 2 + EDGE_WIDTH / 2;
        let hit_EDGE_MIDDLE_RIGHT = ball_left <= WIDTH / 2 + EDGE_WIDTH / 2 && ball_left >= WIDTH / 2 - EDGE_WIDTH / 2;
        let hit_EDGE_MIDDLE_TOP = ball_top <= EDGE_MIDDLE_START;
        let hit_EDGE_MIDDLE_BOTTOM = ball_bottom >= EDGE_MIDDLE_END;

        if (hitTop) {
            this.y = this.radius + EDGE_WIDTH;
            this.y_speed = -this.y_speed;
        } else if (hitBottom) {
            this.y = HEIGHT - EDGE_WIDTH - this.radius;
            this.y_speed = -this.y_speed;
        } else if (hitLeftEdge && (hitEDGE_top || hitEDGE_bottom)) {
            this.x = this.radius + EDGE_WIDTH;
            this.x_speed = -this.x_speed;
        } else if (hitRightEdge && (hitEDGE_top || hitEDGE_bottom)) {
            this.x = WIDTH - EDGE_WIDTH - this.radius;
            this.x_speed = -this.x_speed;
        } else if (hit_EDGE_MIDDLE_LEFT && (hit_EDGE_MIDDLE_TOP || hit_EDGE_MIDDLE_BOTTOM)) {
            this.x = WIDTH / 2 - EDGE_WIDTH / 2 - EDGE_WIDTH - this.radius;
            this.x_speed = -this.x_speed;
        } else if (hit_EDGE_MIDDLE_RIGHT && (hit_EDGE_MIDDLE_TOP || hit_EDGE_MIDDLE_BOTTOM)) {
            this.x = WIDTH / 2 + EDGE_WIDTH / 2 + EDGE_WIDTH;
            this.x_speed = -this.x_speed;
        }

        let comGet = ball_right > WIDTH && ball_top > EDGE_GOAL_START && ball_bottom < EDGE_GOAL_END;
        let playerGet = ball_left < 0 && ball_top > EDGE_GOAL_START && ball_bottom < EDGE_GOAL_END;

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
            let com_catch_ball = ball_bottom > com.bar.y && ball_top < com.bar.y + com.bar.height;

            if (com_catch_ball) {
                if (Math.abs(this.x_speed) < Math.abs(BALL_SPEED() * BALL_SPEED_LIMIT)) {
                    let com_min = -(Math.abs(BALL_SPEED()));
                    let com_max = -0.9 * Math.abs(BALL_SPEED());

                    this.x_speed = -this.x_speed + randomOffset(com_min, com_max);
                    this.y_speed += (com.bar.y_speed / 2);
                } else {
                    this.x_speed = -this.x_speed;
                    this.x += this.x_speed;
                }
            }
        } else if (ball_right >= com.foward.x && ball_left <= com.foward.x + BAR_WIDTH) {
            let com_foward_catch_ball = ball_bottom > com.foward.y && ball_top < com.foward.y + com.foward.height;

            if (com_foward_catch_ball) {
                if (Math.abs(this.x_speed) < Math.abs(BALL_SPEED() * BALL_SPEED_LIMIT)) {
                    let com_min = -(Math.abs(BALL_SPEED()));
                    let com_max = -0.9 * Math.abs(BALL_SPEED());

                    this.x_speed = -this.x_speed + randomOffset(com_min, com_max);
                    this.y_speed += (com.foward.y_speed / 2);
                } else {
                    this.x_speed = -this.x_speed;
                    this.x += this.x_speed;
                }
            }
        } else if (ball_left <= player.bar.x + player.bar.width && ball_left >= player.bar.x) {
            let player_catch_ball = ball_bottom > player.bar.y && ball_top < player.bar.y + player.bar.height;

            if (player_catch_ball) {
                if (Math.abs(this.x_speed) < Math.abs(BALL_SPEED() * BALL_SPEED_LIMIT)) {
                    let player_min = Math.abs(BALL_SPEED());
                    let player_max = 0.9 * Math.abs(BALL_SPEED());

                    this.x_speed = -this.x_speed + randomOffset(player_min, player_max);
                    this.y_speed += player.bar.y_speed / 2;
                    this.x += this.x_speed;
                } else {
                    this.x_speed = -this.x_speed;
                    this.x += this.x_speed;
                }
            }
        } else if (ball_left <= player.foward.x + player.foward.width && ball_right >= player.foward.x) {
            let player_foward_catch_ball = ball_bottom > player.foward.y && ball_top < player.foward.y + player.foward.height;

            if (player_foward_catch_ball) {
                if (Math.abs(this.x_speed) < Math.abs(BALL_SPEED() * BALL_SPEED_LIMIT)) {
                    let player_min = Math.abs(BALL_SPEED());
                    let player_max = 0.9 * Math.abs(BALL_SPEED());

                    this.x_speed = -this.x_speed + randomOffset(player_min, player_max);
                    this.y_speed += player.foward.y_speed / 2;
                    this.x += this.x_speed;
                } else {
                    this.x_speed = -this.x_speed;
                    this.x += this.x_speed;
                }
            }
        }
    }
}

class Pong {
    constructor() {
        CANVAS.width = WIDTH;
        CANVAS.height = HEIGHT;

        let ball: any = new Ball();
        let minus_ball: any = new Minus_Ball();
        let player: any = new Player();
        let com: any = new Com();
        let keysDown: {[key: string] : any} = {};

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

        let keydownEvent = (event: any) => {
            keysDown[event.keyCode] = true;
        }
        let keyupEvent = (event: any) => {
            delete keysDown[event.keyCode];
        }

        window.addEventListener("keydown", keydownEvent);
        window.addEventListener("keyup", keyupEvent);

        ANIMATE(step);
    }
}

new Pong();
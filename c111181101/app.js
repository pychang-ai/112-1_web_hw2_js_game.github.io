const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 8;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakePart = [];
let tailLen = 0;

let appleX = 5;
let appleY = 5;

let xV = 0;
let yV = 0;

let score = 0;

function startGame() {
    snakePosition();
    let lose = isOver();
    if (lose) {
        document.body.addEventListener('keydown', playAgain);
        return;
    }
    clearScreen();

    checkColli();
    let win = isWin();
    if (win) {
        return;
    }
    drawApple();
    drawSnake();
    drawScore();

    setSpeed();

    setTimeout(startGame, 1000 / speed);
}

function setSpeed() {
    if (score == 5) {
        speed = 10;
    }
}

function isWin() {
    let win = false;
    if (score == 25) {
        win = true;
    }
    if (win) {
        ctx.fillStyle = "white";
        ctx.font = "50px Poppins";
        ctx.fillText("你贏了!", canvas.width / 3.3, canvas.height / 2)
    }
    return win;
}

function isOver() {
    let Over = false;
    if (headX < 0 || headX == 20 || headY < 0 || headY == 20) {
        Over = true;
    }
    for (let i = 0; i < snakePart.length; i++) {
        if (headX == snakePart[i].x && headY == snakePart[i].y) {
            Over = true;
        }
    }
    if (Over) {
        ctx.fillStyle = "white";
        ctx.font = "50px Poppins";
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
        ctx.font = "40px Poppins";
        ctx.fillText("再玩一次?", canvas.width / 3.5, canvas.height / 2 + 50);
        ctx.font = "25px Poppins";
        ctx.fillText("按空白鍵", canvas.width / 2.7, canvas.height / 2 + 100);
    }
    return Over;
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);
}

function drawSnake() {

    ctx.fillStyle = "green";
    for (let i = 0; i < snakePart.length; i++) {
        let part = snakePart[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakePart.push(new SnakePart(headX, headY));
    if (snakePart.length > tailLen) {
        snakePart.shift();
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px Poppins";
    ctx.fillText("Score: " + score, canvas.width - 50, 10);
}

function checkColli() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLen++;
        score++;
        if (score > 5 && score % 2 == 0) {
            speed++;
        }
    }
}

function snakePosition() {
    headX = headX + xV;
    headY = headY + yV;
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {

    //go up
    if (event.keyCode == 38) {
        if (yV == 1)
            return;
        yV = -1;
        xV = 0;
    }

    //go down
    if (event.keyCode == 40) {
        if (yV == -1)
            return;
        yV = 1;
        xV = 0;
    }

    //go left
    if (event.keyCode == 37) {
        if (xV == 1)
            return;
        yV = 0;
        xV = -1;
    }

    //go right
    if (event.keyCode == 39) {
        if (xV == -1)
            return;
        yV = 0;
        xV = 1;
    }
}
function playAgain(event) {
    if (event.keyCode == 32) {
        location.reload();
    }
}

startGame();
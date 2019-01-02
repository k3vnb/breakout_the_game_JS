
var ctx = document.getElementById('ctx').getContext('2d');

var WIDTH = 500;
var HEIGHT = 500;
ctx.font = '20 px Calibri';

var ball = {
    x: 0,
    y: 0,
    radius: 5,
    color: 'blue'
};

var base = {
    x: 0,
    y: 400,
    height: 20,
    width: 100,
    color: 'red',
    pressingLeft: false,
    pressingRight: false
};

document.onkeydown = function(event){
    if (event.keyCode == 37){
        base.pressingLeft = true;
        base.pressingRight = false;
    } else if (event.keyCode == 39) {
        base.pressingRight = true;
        base.pressingLeft = false;
    }
}
document.onkeyup = function(event){
    if (event.keyCode == 37){
        base.pressingLeft = false
    } else if (event.keyCode == 39){
        base.pressingRight = false;
    }
}

drawBall = function() {
    ctx.save();
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI);
    ctx.fill();
    ctx.restore();
};

var drawBase = function() {
    ctx.save();
    ctx.fillStyle = base.color;
    ctx.fillRect(base.x, base.y, base.width, base.height);
    ctx.restore();
};

var updateBasePosition = function(){
    if (base.pressingLeft){
        base.x = base.x - 5;
    } else if (base.pressingRight){
        base.x = base.x + 5;
    }
    if (base.x < 0){
        base.x = 0;
    }
    if (base.x > WIDTH-base.width){
        base.x = WIDTH-base.width;
    }
}

var update = function(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    updateBasePosition();
    drawBall();
    drawBase();
}
var startGame = function() {
    base.x = 150;
    ball.x = base.x + 100;
    ball.y = base.y - 100;
    setInterval(update, 20);
}

startGame();

// Setup canvas
var ctx = document.getElementById('ctx').getContext('2d');
var WIDTH = 500;
var HEIGHT = 500;
ctx.font = '20 px Calibri';

//global variables
var numOfTiles;
var tileList;
var score;

//describe elements
var ball = {
    x: 0,
    y: 0,
    radius: 5,
    color: 'blue',
    spdX: -5,
    spdY: -5
};

var base = {
    x: 0,
    y: 400,
    height: 20,
    width: 100,
    color: 'red',
    lives: 3,
    pressingLeft: false,
    pressingRight: false
};


var tile = {
    height: 20,
    width: 40,
    color: 'orange'
}


//create elements in DOM
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

drawTile = function(t, i){
    ctx.save();
    ctx.fillStyle = tile.color;
    ctx.fillRect(t.x, t.y, tile.width, tile.height);
    ctx.restore();
}

//move base left & right
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

//move ball 
var updateBallPosition = function(){
    ball.x += ball.spdX;
    ball.y += ball.spdY;

    if (ball.x > WIDTH || ball.x < 0){
        ball.spdX = -ball.spdX;
    }
    if (ball.y < 0){
        ball.spdY = -ball.spdY;
    }
    if (ball.y > HEIGHT){
        ball.spdY = -ball.spdY;
        base.lives--;
    }
}

var testCollision = function(base,ball){
    let ballBody = 2*ball.radius;
    return ((base.x < ball.x + ballBody) && 
            (ball.x < base.x + base.width) && 
            (base.y < ball.y + ballBody) && 
            (ball.y < base.y + base.height)
            );
};

// when ball hits tile
var testCollisionTile = function(t, ball){
    let ballBody = 2*ball.radius;
    return ((t.x < ball.x + ballBody) && 
            (ball.x < t.x + tile.width) && 
            (t.y < ball.y + ballBody) && 
            (ball.y < t.y + tile.height)
            );
}

var update = function(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    tileList.forEach(drawTile);
    drawBall();
    drawBase();

    if (testCollision(base, ball)){
        ball.spdY = -ball.spdY;
    }

    for(key in tileList){
        if (testCollisionTile(tileList[key], ball)){
            delete tileList[key];
            ball.spdY = -ball.spdY;
            score += 5;
        }
    }

    ctx.fillText('Score: ' + score, 5, 490);
    ctx.fillText('Lives: ' + base.lives, 430, 490);

    updateBasePosition();
    updateBallPosition();
}


// main game function runner
var startGame = function() {
    score = 0;

    //set position of ball and base
    base.x = 150;
    ball.x = base.x + 100;
    ball.y = base.y - 100;
    
    //set position of tiles
    numOfTiles = 0;
    var tileX = 5;
    var tileY = 5;
    tileList = [];
    
    for (var i=1; i<6; i++){
        //each iteration reset val of tileX to 5
        tileX = 5;
        for (var j=1; j<=11; j++){
            tileList[numOfTiles] = {
                x: tileX, 
                y: tileY
            }
            numOfTiles++;
            tileX += 45;
        }
        tileY += 25;
    }
    setInterval(update, 20);
}

startGame();
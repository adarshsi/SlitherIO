

//Initialize player
var dino;
var myObstacles = []


//Create environment
var wild = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 450;
        this.context = this.canvas.getContext("2d");

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 10);
        this.frameNo = 0;
        window.addEventListener('keydown', function (e) {
            wild.key = e.keyCode;
        });
        window.addEventListener('keyup', function (e) {
            wild.key = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }

};


//Master class of player
function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.bounce = 0.6
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = wild.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    };
    this.hitBottom = function() {
        var bottom = wild.canvas.height - this.height;
        if (this.y > bottom) {
            this.y = bottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    };
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}


//Update My game
function updateGameArea() {
    var x, y;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (dino.crashWith(myObstacles[i])) {
            wild.stop();
            return;
        }
    }
    wild.clear();
    wild.frameNo += 1;
    if (wild.frameNo == 1 || everyinterval(150)) {
        x = wild.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacles.push(new component(10, height, "black", x, 0));
        myObstacles.push(new component(10, x - height - gap, "black", x, height + gap));
    }

    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    if (wild.key && wild.key == 32) {
        jump(-0.2)
    }
    else{
        jump(0.1)
    }
    dino.newPos();
    dino.update();

}


//Jump
function jump(x){
    dino.gravity = x
}

function everyinterval(n) {
    if ((wild.frameNo / n) % 1 == 0) {return true;}
    return false;
}

//Trigger function
function startGame() {
    dino = new component(20, 20, "red", 80, 75);
    wild.start();
}


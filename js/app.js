//This provides the speed information (random)
function getRandomSpeed(){
    const min=200; 
    const max=600;  
    return Math.random() * (max - min) + min; 
}


// Enemies our player must avoid
var Enemy = function(x,y,z) {
    //properties of the Enemy class
    this.x = x; //vertical location
    this.y = y; //horizontal location
    this.z = z; //time variable (speed)
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    // change the speed by multipling any movement by the dt parameter
    this.x += this.z * dt;

    //with each update, check the collide with player 
    if (this.checkCollide()) 
        player.reset();

    //if the enemy reaches the end of the game bored do this:
    if(this.x > 500) { 
        this.x = -100;//position befor the game border
        this.z = getRandomSpeed(); //change to a new random speed
    }

};

//Check Collide between the current enemy and player
Enemy.prototype.checkCollide = function(){
    PlayerSize = 50;
    if (this.x < player.x + PlayerSize &&
        this.x + PlayerSize > player.x &&
        this.y < player.y + PlayerSize &&
        this.y + PlayerSize > player.y) return true;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//--------------------------- END of Enemy Class
var Player = function(x = 200,y=380) {
    //properties of the Player class
    this.x = x; //vertical location
    this.y = y; //horizontal location
    this.sprite = 'images/char-cat-girl.png';
};


Player.prototype.update = function() {
    //    no code required here
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(moveType) {

    //identify max and min for dynamic size
    const maxX= ctx.canvas.width - 150;
    const maxY= ctx.canvas.height - 250;
    const stepX = 100;
    const stepY = 80;

    //move up, down, left and right within the play window
    if (moveType == 'left' && this.x > 0)  
        this.x -= stepX;
    if (moveType == 'up' && this.y > 0)  
        this.y -= stepY;

    if (moveType == 'right' && this.x < maxX) 
        this.x += stepX;

    if (moveType == 'down' && this.y < maxY) 
        this.y += stepY;

    this.render();

    if(this.y < 0) //reached the top
        this.reset(true);
};

// reset the player to its original location and update the win strike info
Player.prototype.reset = function(win = false){
    this.x = 200;
    this.y = 380;

    //update the win strike count
    const winStrikeNode = document.getElementById("win-strike");
    if(win) // if reset because of win
        winStrikeNode.innerHTML = Number(winStrikeNode.innerHTML) + 1;
    else  // if reset becasue of collide
        winStrikeNode.innerHTML = 0;

};

//--------------------------- END of Player Class

// objects instantiation:
// enemy objects
let allEnemies = [];
for(let i = 1 ; i <= 3; i++){
    const enemy = new Enemy(0,i * 73, getRandomSpeed());
    allEnemies.push(enemy);
}

// player object
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

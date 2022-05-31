// Define canvas, context, and keys variables
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var pixelFont = new FontFace('pixelFont', 'url(css/04B_03__.woff2)');
var currentRoom; //keeps track of which room we are in

pixelFont.load().then(function(font) {
  document.fonts.add(font);
  ctx.font = "16px pixelFont"; // set font
  ctx.textAlign = "center";
})
//sizes the canvas based on window size
function sizeCanvas(){
  var header = $("#header");
  var footer = $("#footer");
  var inHeight = innerHeight;//innerHeight of the window
  var inWidth = innerWidth; //innerWidth of the window
  var headerHeight = header.outerHeight(true); //height of our header
  var footerHeight = footer.outerHeight(true); //height of our header
  if((inHeight-headerHeight-footerHeight)<=inWidth){ //if the height is less than the width
    var remainder = (inHeight-headerHeight-footerHeight)%64;
    canvas.width = inHeight-headerHeight-footerHeight-remainder;
    canvas.height = canvas.width;
  }
  else {
    var remainder = (inWidth)%64;
    canvas.height = inWidth-remainder;
    canvas.width = canvas.height;
  }
  tileSize = canvas.width/8;
  playerSize = tileSize;
  playerYPos = playerRow*tileSize;
  playerXPos = playerCol*tileSize;
  moveSpeed = canvas.height/64;
  ctx.font = "16px pixelFont"; // set font
  ctx.textAlign = "center";
};
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

var current_image = new Image();
current_image.src = 'images/LAB.png';

text_image = new Image();
text_image.src = 'images/text_box.png';

function drawText() {
  ctx.drawImage(text_image, 0, 0, canvas.width,canvas.height);
  ctx.fillText('hello!', canvas.width/2,canvas.width/2);
}

// Initial Player position and size

var playerSize = canvas.width/16;

var levelCols=8;                           // level width, in tiles
var levelRows=8;                            // level height, in tiles
var tileSize= canvas.width/8;                            // tile size, in pixels
var playerCol=1;                                  // player starting column
var playerRow=3;                                  // player starting row
var spacebarPressed=false                         // are we pressing spacebar?
var leftPressed=false;                            // are we pressing LEFT arrow key?
var rightPressed=false;                           // are we pressing RIGHT arrow key?
var upPressed=false;                              // are we pressing UP arrow key?
var downPressed=false;                            // are we pressing DOWN arrow key?
var playerDirection = 'w';                        //what cardinal direction is the player facing
var playerYPos=playerRow*tileSize;   // converting Y player position from tiles to pixels
var playerXPos=playerCol*tileSize;  // converting X player position from tiles to pixels
var moveSpeed = canvas.height/64;
var inDialogue = true; //keeps track of if dialogue is taking place


function Room(image, objects, doors, map){
  this.image = image;
  this.objects = objects;
  this.doors = doors;
  this.map = map;
}

var room1 = new Room ();
room1.image = current_image;
//1 is a boundary, 2 is walkable interactions 3 is nonwalkable interactions and 5 is doors
room1.map = [
  [1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1],
  [1,1,1,1,1,0,0,0],
  [1,0,3,0,2,0,0,0],
  [1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0]
]

currentRoom = room1;

// Initializes full program
function init() {
  var playerCol = 1;
  var playerRow = 3;
}



// Loops every interval
function loop() {
  draw();
  update();
}

// Draws the player and interactive object
function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
  //drawBackground(currentRoom.src); //draw background with designated path
  ctx.drawImage(currentRoom.image, 0, 0, canvas.width,canvas.height);
  ctx.fillStyle = "red";
  //this code shows test map
  for(i=0;i<levelRows;i++){
    for(j=0;j<levelCols;j++){
      if(currentRoom.map[i][j]==3){
        ctx.fillStyle = "red";
        ctx.fillRect(j*tileSize,i*tileSize,tileSize,tileSize);
      } else if (currentRoom.map[i][j]==2) {
        ctx.fillStyle = "black";
        ctx.fillRect(j*tileSize,i*tileSize,tileSize,tileSize);
      }
    }
  }
  // player = green box
  ctx.fillStyle = "#00ff00";
  ctx.fillRect(playerXPos+tileSize*.25, playerYPos+tileSize*.25, tileSize*.5, tileSize*.5);
  ctx.fillStyle = "white";
  ctx.fillText(playerDirection,playerXPos+(tileSize/2),playerYPos+(tileSize/2),tileSize);

  if (inDialogue) {
    drawText();
  }
}

// this function will do its best to make stuff work at 60FPS - please notice I said "will do its best"

window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000/60);
  };
})();

// simple WASD listeners

document.addEventListener("keydown", function(e){
  switch(e.keyCode){
    case 32:
    spacebarPressed=true;
    break;

    case 65:
    leftPressed=true;
    break;
    case 87:
    upPressed=true;
    break;
    case 68:
    rightPressed=true;
    break;
    case 83:
    downPressed=true;
    break;
  }
}, false);

document.addEventListener("keyup", function(e){
  switch(e.keyCode){
    case 32:
    spacebarPressed=false;
    break;
    case 65:
    leftPressed=false;
    break;
    case 87:
    upPressed=false;
    break;
    case 68:
    rightPressed=false;
    break;
    case 83:
    downPressed=false;
    break;
  }
}, false);



function update() {
  //first checks if the player is done moving before allowing the rows and columns to update
  if (! ( (playerYPos==(playerRow*tileSize))&&(playerXPos==(playerCol*tileSize)) ) ) {
    movePlayer();
  }
  //if the player is done moving then do the updating
  else if(rightPressed){
    playerDirection='e';
    if (isPathTile(playerRow,playerCol+1)) {
      playerCol+=1;
    }else {
      //we could add little bump sound effects here if we wanted
    }
  }
  else if(leftPressed){
    playerDirection='w';
    if (isPathTile(playerRow,playerCol-1)) {
      playerCol-=1;
    }else {

    }
  }
  else if(upPressed){
    playerDirection='n';
    if (isPathTile(playerRow-1,playerCol)) {
      playerRow-=1;
    }else {
    }
  }
  else if(downPressed){
    playerDirection='s';
    if (isPathTile(playerRow+1,playerCol)) {
      playerRow+=1;
    }else {
    }
  }
  else if(spacebarPressed){

    if(!inDialogue){
      interact();
    }else {
      advanceText();
    }
  }else if (currentRoom.map[playerRow][playerCol]==5) {
    //transition room
  }

}

//Check if tile is a path
function isPathTile(row, col) {
  if( ( (row>=0)&&(row<levelRows) ) && ( (col>=0)&&(col<levelCols) ) ){
    if((currentRoom.map[row][col] !== 1)&&(currentRoom.map[row][col] !== 3)){
      return true;
    }
  }
  else {
    return false;
  }
}

//Handles smooth movement for the player
function movePlayer(){
  if (( playerDirection == 'e' )||(playerDirection== 'w')){
    if (playerXPos>playerCol*tileSize) {
      playerXPos-=moveSpeed;
    } else {
      playerXPos+=moveSpeed;
    }
  } else {
    if (playerYPos>playerRow*tileSize) {
      playerYPos-=moveSpeed;
    } else {
      playerYPos+=moveSpeed;
    }
  }
}

function interact() {
  //check if the player is standing on interactable tile
  if(currentRoom.map[playerRow][playerCol]==2){
    console.log("interaction detected");
  }
  //do something

  //check if the player is facing an interactable (non walkable) tile
  if (( playerDirection == 'e' )&&(currentRoom.map[playerRow][playerCol+1]==3)) {
    console.log("interaction detected");

  } else if(( playerDirection == 'w' )&&(currentRoom.map[playerRow][playerCol-1]==3)){
    console.log("interaction detected");
  } else if (( playerDirection == 'n' )&&(currentRoom.map[playerRow-1][playerCol]==3)) {
    console.log("interaction detected");
  } else if (( playerDirection == 's' )&&(currentRoom.map[playerRow+1][playerCol]==3)) {
    console.log("interaction detected");
  }
  //do something
  //if we only want the thing to be interactable once, update the space to 0 or 1
}

function advanceText() {
  //not sure what to do here but will ponder it
}

// Refreshes State, so site doesn't crash (Calls Loop function every 1000/60 milliseconds)
window.setInterval(loop, 1000/60);
init();

// Define canvas, context, and keys variables
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var pixelFont = new FontFace('pixelFont', 'url(css/04B_03__.woff2)');
var currentRoom; //keeps track of which room we are in

// DONE (?)
//sizes the canvas based on window size
//i would just collapse this if i were you bc oh god why
function sizeCanvas(){
  let header = $("#header"); //use jQuery to get header
  let footer = $("#footer"); //use jQuery to get footer
  let inHeight = innerHeight;//innerHeight of the window
  let inWidth = innerWidth; //innerWidth of the window
  let headerHeight = header.outerHeight(true); //height of our header
  let footerHeight = footer.outerHeight(true); //height of our header
  if((inHeight-headerHeight-footerHeight)<=inWidth){ //if the height is less than the width
    remainder = (inHeight-headerHeight-footerHeight)%64;// do this math
    canvas.width = inHeight-headerHeight-footerHeight-remainder;//and then set the width using math
    canvas.height = canvas.width; //do the same here because its a square
  }
  else { //if the witcth is less than or equal to height
    remainder = (inWidth)%64;
    canvas.height = inWidth-remainder; // do the same thing essentially
    canvas.width = canvas.height;
  }
  //recalculate all these variables ;-;
  tileSize = canvas.width/8;
  playerSize = tileSize;
  playerYPos = playerRow*tileSize;
  playerXPos = playerCol*tileSize;
  moveSpeed = canvas.height/64;

  textAreax = (canvas.height/64)*7;
  textAreaY1 = (canvas.height/64)*42;
  textAreaY2 = (canvas.height/64)*46;
  textAreaY3 = (canvas.height/64)*50;
  textAreaY4 = (canvas.height/64)*54;

  let fontsize = Math.trunc((canvas.height/64)*2.5);//quick maths
  ctx.font = fontsize+"px pixelFont"; // set font
  ctx.textBaseline = "top"; //set
}

sizeCanvas();

// DONE
//when every dom element on the page loads
window.addEventListener('load',function(){
  console.log('loaded');
  //set the font
  pixelFont.load().then(function(font) {
    document.fonts.add(font);
//annalivia test here
    let fontsize = Math.trunc((canvas.height/64)*1.8);
    ctx.font = fontsize+"px pixelFont"; // set font
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
  });
  //initialize
  init();
});
//when the user resizes the page resize the canvas
window.addEventListener('resize', sizeCanvas);


var current_image = new Image();
current_image.src = 'images/LAB.png';

text_box = new Image();
text_box.src = 'images/text_box.png';



// YIKES
var playerSize = canvas.width/16;//playerSize in pixels

const levelCols=8;// level width, in tiles
const levelRows=8; // level height, in tiles
var tileSize= canvas.width/8; // tile size, in pixels
var playerCol=0;// player starting column
var playerRow=5; // player starting row
var spacebarPressed=false; // are we pressing spacebar?
var leftPressed=false; // are we pressing LEFT arrow key?
var rightPressed=false;// are we pressing RIGHT arrow key?
var upPressed=false; // are we pressing UP arrow key?
var downPressed=false; // are we pressing DOWN arrow key?
var playerDirection = 'w';//what cardinal direction is the player facing
var playerYPos=playerRow*tileSize;   // converting Y player position from tiles to pixels
var playerXPos=playerCol*tileSize;  // converting X player position from tiles to pixels
var moveSpeed = canvas.height/64;
var inDialogue = true; //keeps track of if dialogue is taking place
var textAreax = (canvas.height/64)*7;
var textAreaY1 = (canvas.height/64)*42;
var textAreaY2 = (canvas.height/64)*46;
var textAreaY3 = (canvas.height/64)*50;
var textAreaY4 = (canvas.height/64)*54;
var shownString = "";
var hiddenString = "";
var pageCount = 1;
var currentPage = 1;
var frameCount = 0;


//room object template
function Room(image, items, doors, map){
  this.image = image;
  this.items = items;
  this.doors = doors;
  this.map = map;
}

var room1 = new Room();
room1.image = current_image;
//1 is a boundary, 2 is walkable interactions, 3 is nonwalkable interactions and 5 is doors
room1.map = [
  [1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,5,1],
  [0,1,0,0,1,0,0,0],
  [0,1,3,0,2,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0]
]

currentRoom = room1;
//item object template
function Item(image, text, interacted, row, col, walkable) {
  this.image = image;
  this.text = text;
  this.interacted = interacted;
  this.row = row;
  this.col = col;
  this.walkable = walkable;
}
//this is a test
var blackSquare = new Item();
blackSquare.text = "this is a nice big long string so you can do all your fun operations on it bla bla bla hey bla bla bla hey bla bla bla hey bla bla bla hey look bla bla bla wow you made it to the very very end of the string!";
blackSquare.row =3;
blackSquare.col =4;

//this is a test too
var redSquare = new Item();
redSquare.text= "red";
redSquare.row=3;
redSquare.col=2;
currentRoom.items=[redSquare,blackSquare]

// Initializes full program
function init() {
  var playerCol = 1;
  var playerRow = 3;
  console.log('initialized');
}



// Loops every interval
function loop() {
  draw();
  update();
}

// NOT DONE
//draws text box and text
function drawText(pageStr){
  ctx.drawImage(text_box, 0, 0, canvas.width,canvas.height);
  //here were gonna seperate the string which already has /n in for the lines, this only takes the string for one "page" on the text box
  ctx.fillText("this is a nice big long string so ", textAreax,textAreaY1);
  ctx.fillText("help", textAreax,textAreaY2);
  ctx.fillText("help", textAreax,textAreaY3);
  ctx.fillText("help", textAreax,textAreaY4);

}

// WILL IT EVER BE DONE
// Draws the player and interactive object
function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
  ctx.drawImage(currentRoom.image, 0, 0, canvas.width,canvas.height);//draw current room background
  ctx.fillStyle = "red";
  //this code shows test map
  for(var i=0;i<levelRows;i++){
    for(var j=0;j<levelCols;j++){
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
  //player direction
  ctx.fillStyle = "white";
  ctx.fillText(playerDirection,playerXPos+tileSize*.25,playerYPos+tileSize*.25);
  //check if player is in dialogue and draw text
  if (inDialogue) {
    drawText(shownString);
  }
  frameCount++;
}


// DONE
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
// DONE
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


// WILL IT EVER BE DONE
//updates game variables, runs every frame
function update() {
  //first checks if the player is done moving before allowing the rows and columns to update
  if (! ( (playerYPos==(playerRow*tileSize))&&(playerXPos==(playerCol*tileSize)) ) ) {
    movePlayer();
  }
  //if the player is done moving then do the updating

  else{
    let fasterText = false;
    if(spacebarPressed){

      if(!inDialogue){
        //check if the player is standing on interactable tile
        if(currentRoom.map[playerRow][playerCol]==2){
          interact(currentRoom.items.find( (ite) => ite.row ==playerRow&&ite.col==playerCol));
        }

        //check if the player is facing an interactable (non walkable) tile
        else if ( (playerDirection == 'e') && (currentRoom.map[playerRow][playerCol+1] == 3) ) {
          //call the interact function on the item in the proper position
          interact(currentRoom.items.find( (ite) => ite.row ==playerRow&&ite.col==(playerCol+1)));
        } else if(( playerDirection == 'w' )&&(currentRoom.map[playerRow][playerCol-1]==3)){
          interact(currentRoom.items.find( (ite) => ite.row ==playerRow&&ite.col==(playerCol-1)));
        } else if (( playerDirection == 'n' )&&(currentRoom.map[playerRow-1][playerCol]==3)) {
          interact(currentRoom.items.find( (ite) => ite.row ==(playerRow-1)&&ite.col==playerCol));
        } else if (( playerDirection == 's' )&&(currentRoom.map[playerRow+1][playerCol]==3)) {
          interact(currentRoom.items.find( (ite) => ite.row ==(playerRow+1)&&ite.col==playerCol));
        }

        //if we only want the thing to be interactable once, update the space to 0 or 1


      }else if(inDialogue){
        fasterText=advanceText();
      }
    }

    if (inDialogue) {
      if(true){//condition for this is if the character at the top of the hidden string is not the new page character
        if(!fasterText){
          //move one letter from hiddenString to shownString
        }else {
          //move one letter from hiddenString to shownString but faster
        }
      }
    }else if(rightPressed){
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
        //we could add little bump sound effects here if we wanted
      }
    }
    else if(upPressed){
      playerDirection='n';
      if (isPathTile(playerRow-1,playerCol)) {
        playerRow-=1;
      }else {
        //we could add little bump sound effects here if we wanted
      }
    }
    else if(downPressed){
      playerDirection='s';
      if (isPathTile(playerRow+1,playerCol)) {
        playerRow+=1;
      }else {
        //we could add little bump sound effects here if we wanted
      }
    }
    else if (currentRoom.map[playerRow][playerCol]==5) {
      //transition room
    }
  }
}

//DONE
//Check if the designated tile is walkable
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

//DONE
//Handles smooth movement for the player
function movePlayer(){
  if (( playerDirection == 'e' )||(playerDirection== 'w')){ //if the player is facing left or right
    if (playerXPos>playerCol*tileSize) {//is the player has to move left
      playerXPos-=moveSpeed;//change the pixel position
    } else {//if the player has to move right
      playerXPos+=moveSpeed;//change the pixel position
    }
  } else {//if the player is facing up or down
    if (playerYPos>playerRow*tileSize) {//if the player has to move up
      playerYPos-=moveSpeed;//change the pixel position
    } else {//if the player has to move down
      playerYPos+=moveSpeed;//change the pixel position
    }
  }
}


// NOT DONE
//interacts with the specified item
function interact(item) {
  inDialogue=true;
  currentPage = 1;
  pageCount = formatText(item.text);
  console.log(item.text);

  //if we only want the thing to be interactable once, update the space to 0 or 1
}
//takes a string, adds newlines and carriage returns where lines and pages should end so that they fit in the text box
function formatText(string){
  var lines=1;
  var pages=1;
  var startingIndex=0;
  for(var i=1; i<=string.length; i++){
    let builder = "";
    if((ctx.measureText(string.substring(startingIndex, i)).width)>((canvas.width/64)*47)){
      if((lines%4)==0){
        builder = string.slice(startingIndex,i)+"~";
        console.log(builder);
        startingIndex= i;
        if(string.charAt(startingIndex)==" "){
          startingIndex++;
        }
        lines++;
        pages++;
      }else if (ctx.measureText(string.substring(startingIndex,i)).width>((canvas.width/64)*50)) {
        builder = string.slice(startingIndex,i)+"^";
        startingIndex= i;
        if(string.charAt(startingIndex)==" "){
          startingIndex++;
        }
        lines++;
      }
    }else if(i ==string.length){
      builder = string.slice(startingIndex, i)+"~";
    }
    hiddenString = hiddenString.concat(builder);
  }
  console.log(string.length);
  console.log(hiddenString);
  console.log(pages);
  return pages;
}
// NOT DONE
function advanceText() {
  //if hiddenString char at 0 is equal to newpage char then set shownstring to empty and increment currentPage

  if (hiddenString=="") {
    shownString="";
    currentPage=1;
    pageCount=1;
    inDialogue=false;

  }

  return true;
}

// Refreshes State, so site doesn't crash (Calls Loop function every 1000/30 milliseconds(30fps))
window.setInterval(loop, 1000/30);

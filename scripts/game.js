// Define canvas, context, and keys variables
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var pixelFont = new FontFace('pixelFont', 'url(css/quan.ttf)');
var currentRoom; //keeps track of which room we are in

//game data wholy moly
var first_image = new Image();
first_image.src = 'images/environments/LAB.png';
var second_image = new Image();
second_image.src = 'images/environments/town1.png';
var third_image = new Image();
third_image.src = 'images/environments/town2.png';
var fourth_image = new Image();
fourth_image.src = 'images/environments/house.png';
var fifth_image = new Image();
fifth_image.src = 'images/environments/LAB.png';

text_box = new Image();
text_box.src = 'images/text_box.png';

var interactable_object = new Image();
interactable_object.src = 'images/interactable_objectmovingPADDED8frames.png';

var yuu_walk_up = new Image();
yuu_walk_up.src='images/yuu_backwalk.png'
var yuu_walk_down = new Image();
yuu_walk_down.src='images/yuu_frontwalk.png'
var yuu_walk_left = new Image();
yuu_walk_left.src ='images/yuu_leftwalk.png'
var yuu_walk_right = new Image();
yuu_walk_right.src='images/yuu_rightwalk.png'

// YIKES
const levelCols=8;// level width, in tiles
const levelRows=8; // level height, in tiles
var playerCol=4;// player starting column
var playerRow=4; // player starting row
var spacebarPressed=false; // are we pressing spacebar?
var leftPressed=false; // are we pressing LEFT arrow key?
var rightPressed=false;// are we pressing RIGHT arrow key?
var upPressed=false; // are we pressing UP arrow key?
var downPressed=false; // are we pressing DOWN arrow key?
var ePressed=false; // are we pressing e? Adding a temporary key for user input.
var message = false;
var playerDirection = 's';//what cardinal direction is the player facing
var inDialogue = false; //keeps track of if dialogue is taking place

var shownString = "";
var hiddenString = "";
var pageCount = 1;
var currentPage = 1;
var stringFrameIndex = 0;
var interactionCooldownFrames = 20;
var frameIndex = 1;

var audioPlay =false;


//room object template
function Room(image, items, doors, map){
  this.image = image;
  this.items = items;
  this.doors = doors;
  this.map = map;
}

//item object template
function Item(text,  row, col, ) {
  this.text = text;
  this.row = row;
  this.col = col;
}

var room1 = new Room();
var room2 = new Room();
var room3 = new Room();
var room4 = new Room();
var room5 = new Room();
room1.image = first_image;
room2.image = second_image;
room3.image = third_image;
room4.image = fourth_image;
room5.image = fifth_image;

//1 is a boundary, 2 is walkable interactions, 3 is nonwalkable interactions and 5 is doors
room1.map = [
  [1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,5,1],
  [0,1,0,0,3,0,0,0],
  [0,0,3,0,0,0,0,0],
  [1,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1],
  [1,0,1,1,1,1,0,1],
  [0,0,0,0,0,0,0,0]
]
//this is a test
var tvRoom1 = new Item();
tvRoom1.text = "Yuu: What's happening on TV right now? *'Now on News Today, 25 years since New Earth Corp dominated the world. What is next?'*Yuu:...What??....";
tvRoom1.row =2;
tvRoom1.col =4;

//this is a test too
var redSquare = new Item();
redSquare.text= "Yuu: I can't believe I'm the first person on earth to travel into the future!";
redSquare.row=3;
redSquare.col=2;

room1.items=[redSquare,tvRoom1]

// for room2, 6 is backward doors, 7 is forward doors
room2.map = [
  [6,6,0,1,1,1,1,1],
  [0,0,0,1,1,1,1,1],
  [0,0,0,1,3,1,1,1],
  [0,0,0,0,0,0,0,7],
  [0,0,0,0,0,0,0,7],
  [0,0,0,0,0,3,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0]
]
var graffitiRoom2 = new Item();
graffitiRoom2.text="'New Earth = New Evil'*'Plastic ruined us all'";
graffitiRoom2.row=2;
graffitiRoom2.col=4;

var randomRoom2 = new Item();
randomRoom2.text="Yuu: What is going on? I thought New Earth Corp was doing good!*Their plastic technology was supposed to make our lives easier...";
randomRoom2.row=5;
randomRoom2.col=5;

room2.items=[graffitiRoom2,randomRoom2]

// for room3, 8 is backward doors, 9 is forward doors
room3.map = [
  [1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1],
  [1,3,1,1,1,1,1,1],
  [0,0,0,0,0,9,0,0],
  [8,0,0,0,0,0,0,0],
  [8,0,0,0,0,0,0,0],
  [0,0,0,0,0,2,0,0],
  [0,0,0,0,0,0,0,0]
]
var cityRoom3 = new Item();
cityRoom3.text="Yuu: I just can't believe the world looks like this...*There's so much smog and everything is so broken down...*I thought the future would look colorful and full of flying cars...*New Earth Corp did this?...";
cityRoom3.row=2;
cityRoom3.col=1;

var plantRoom3 = new Item();
plantRoom3.text="Yuu: Even a simple weed struggles to grow in this world.*[Yuu proceed to cough]*I can see why...";
plantRoom3.row=6;
plantRoom3.col=5;

room3.items=[cityRoom3,plantRoom3]

// for room4, 10 is backward doors
room4.map = [
  [1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,10,1],
  [1,1,0,0,1,0,0,0],
  [3,1,0,0,0,0,0,0],
  [0,1,0,1,1,1,1,1],
  [0,1,0,0,0,0,1,1],
  [0,0,0,0,0,0,1,1],
  [0,0,0,0,0,0,0,0]
]
var paperRoom4 = new Item();
paperRoom4.text="'Date: January 7, 2040'*'Day 6,423 since the End of the World'*'I feel like as each day passes, the air is getting worse. The vet said Tabitha might not make it and the ol'dog isn't even 6 yet.'*'If only New Earth's plan to replace every item on this earth with plastic wasn't approved, life would've been different...'*'I wish I could go back in time and do something...maybe protest against those scheming corporations or talk to our reps about environmental concerns...'*'Heck even just usin a glass mug at the coffee shop could've been good, but New Earth didn't want that!'*Somebody save us...'*'-M.Wodes'*...*Yuu: All of this desolation just because of plastic...*I think I know what I have to do now.";
paperRoom4.row=3;
paperRoom4.col=0;

room4.items=[paperRoom4]


// for room5, 4 is the user input option
room5.map = [
  [1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,5,1],
  [0,1,0,0,3,0,0,0],
  [0,1,3,0,0,0,0,0],
  [0,0,0,0,0,0,0,1],
  [0,0,1,0,1,4,0,1],
  [0,0,1,0,1,1,0,1],
  [0,0,0,0,0,0,0,0]
]
currentRoom = room1;

// Initializes start screen
function init() {
  var startScreen1 = new Image();
  startScreen1.src = 'images/startscreen.png'
  ctx.drawImage(startScreen1,0,0,canvas.width,canvas.height);
  console.log('initialized');
}

// Loops every interval
function loop() {
  draw();
  update();
  userInput();
}

// WILL IT EVER BE DONE
// Draws the player and interactive object
function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
  ctx.drawImage(currentRoom.image, 0, 0, canvas.width,canvas.height);//draw current room background
  //this code shows the interactable objects

  for(var i=0;i<levelRows;i++){
    for(var j=0;j<levelCols;j++){
      if((currentRoom.map[i][j]==3||currentRoom.map[i][j]==2)||currentRoom.map[i][j]==4){
        //draw the sprite here
        var sx = (frameIndex-1)*63;
        ctx.drawImage(interactable_object, sx, 0, 63, 63, j*tileSize, i*tileSize, tileSize, tileSize);
      }
    }
  }

  if (playerDirection=='n') {//
    var sx = 0;
    if(!((playerYPos==(playerRow*tileSize))&&(playerXPos==(playerCol*tileSize)))){
      sx=(frameIndex-1)*72;
    }
    ctx.drawImage(yuu_walk_up,sx,0,72,104,playerXPos,playerYPos-tileSize,tileSize,2*tileSize);
  }
  else if (playerDirection=='s') {
    var sx = 0;
    if(!((playerYPos==(playerRow*tileSize))&&(playerXPos==(playerCol*tileSize)))){
      sx=(frameIndex-1)*72;
    }
    ctx.drawImage(yuu_walk_down,sx,0,72,104,playerXPos,playerYPos-tileSize,tileSize,2*tileSize);
  }
  else if (playerDirection=='e') {
    var sx = 0;
    if(!((playerYPos==(playerRow*tileSize))&&(playerXPos==(playerCol*tileSize)))){
      sx=(frameIndex-1)*72;
    }
    ctx.drawImage(yuu_walk_right,sx,0,72,104,playerXPos,playerYPos-tileSize,tileSize,2*tileSize);
  }
  else if (playerDirection=='w') {
    var sx = 0;
    if(!((playerYPos==(playerRow*tileSize))&&(playerXPos==(playerCol*tileSize)))){
      sx=(frameIndex-1)*72;
    }
    ctx.drawImage(yuu_walk_left,sx,0,72,104,playerXPos,playerYPos-tileSize,tileSize,2*tileSize);
  }
  // player = green box
  ctx.fillStyle = "#00ff00";
//  ctx.fillRect(playerXPos+tileSize*.25, playerYPos+tileSize*.25, tileSize*.5, tileSize*.5);
  //player direction
  ctx.fillStyle = "black";
  ctx.fillText(playerDirection,playerXPos+tileSize*.25,playerYPos+tileSize*.25);
  //check if player is in dialogue and draw text
  if (inDialogue) {
    drawText(shownString);
  }
  frameIndex ++;
  if (frameIndex==9) {
    frameIndex=1;
  }
}
//  DONE
//draws text box and text
function drawText(pageStr){
  ctx.drawImage(text_box, 0, 0, canvas.width,canvas.height);
  //here were gonna seperate the string which already has ^ in for the lines, this only takes the string for one "page" on the text box
  var string1="";
  var string2="";
  var string3="";
  var string4="";
  var startingIndex=0;
  var stringIndex=1;
  for (var i = 1; i <= pageStr.length; i++) {
    if (pageStr.charAt(i)=='^') {
      switch (stringIndex) {
        case 1:
        string1= pageStr.slice(startingIndex, i);
        startingIndex=i+1;
        stringIndex++;
        break;
        case 2:
        string2= pageStr.slice(startingIndex, i);
        startingIndex=i+1;
        stringIndex++;
        break;
        case 3:
        string3= pageStr.slice(startingIndex, i);
        startingIndex=i+1;
        stringIndex++;
        break;
        default:
      }
    }else if (i==pageStr.length) {
      switch (stringIndex) {
        case 1:
        string1= pageStr.slice(startingIndex, i-1);
        break;
        case 2:
        string2= pageStr.slice(startingIndex, i-1);
        break;
        case 3:
        string3= pageStr.slice(startingIndex, i-1);
        break;
        default:
      }
    }
  }
  ctx.fillText(string1, textAreax,textAreaY1);
  ctx.fillText(string2, textAreax,textAreaY2);
  ctx.fillText(string3, textAreax,textAreaY3);

}

function forwardTownOne() {
  playerCol = 1;
  playerRow = 1;
  playerXPos = playerCol*tileSize;
  playerYPos =playerRow*tileSize;
  currentRoom = room2;

  playerDirection = 's';
}

function forwardTownTwo() {
  playerCol = 1;
  playerRow = 5;
  playerXPos = playerCol*tileSize;
  playerYPos =playerRow*tileSize;
  currentRoom = room3;
  playerDirection = 'e';
}

function forwardHouse() {
  playerCol = 7;
  playerRow = 2;
  playerXPos = playerCol*tileSize;
  playerYPos =playerRow*tileSize;
  currentRoom = room4;
  playerDirection = 's';
}

function backwardTownTwo() {
  playerCol = 5;
  playerRow = 5;
  playerXPos = playerCol*tileSize;
  playerYPos =playerRow*tileSize;
  currentRoom=room3
  playerDirection = 's';
}

function backwardTownOne() {
  playerCol = 6;
  playerRow = 4;
  playerXPos = playerCol*tileSize;
  playerYPos =playerRow*tileSize;
  currentRoom=room2;
  playerDirection = 'w';
}

function backwardLab() {
  playerCol = 6;
  playerRow = 2;
  playerXPos = playerCol*tileSize;
  playerYPos = playerRow*tileSize;
  currentRoom = room5;
  playerDirection = 's';
}
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

      if(!inDialogue&& interactionCooldownFrames==0){//if the player is not in dialogue and the interaction cooldown window has passed
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

    if (inDialogue) {//move character from shownString to hiddenString
      if(hiddenString.charAt(0)!=='~'){//condition for this is if the character at the top of the hidden string is not the new page character
        if(fasterText){//if the player wants the text fast
          if (stringFrameIndex==1) {//move one character to the shownString every other frame
            shownString = shownString.concat(hiddenString.charAt(0));
            hiddenString = hiddenString.slice(1);
            stringFrameIndex=0;
          }
        }
        else {//move one character to the shownString every third frame
          shownString =shownString.concat(hiddenString.charAt(0));
          hiddenString = hiddenString.slice(1);
          stringFrameIndex=0;
        }
      }
      if (stringFrameIndex%2==0) {//catch runaway index
        stringFrameIndex=0;
      }
      stringFrameIndex++;
    }


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
      forwardTownOne();
    }
    else if (currentRoom.map[playerRow][playerCol]==7){
      forwardTownTwo();
    }
    else if (currentRoom.map[playerRow][playerCol]==9){
      forwardHouse();
    }
    else if (currentRoom.map[playerRow][playerCol]==10){
      backwardTownTwo();
    }
    else if (currentRoom.map[playerRow][playerCol]==8){
      backwardTownOne();
    }
    else if (currentRoom.map[playerRow][playerCol]==6){
      backwardLab();
    }
    if (interactionCooldownFrames>0) {
      interactionCooldownFrames--;
    }
  }
}


//DONE
//Check if the designated tile is walkable
function isPathTile(row, col) {
  if( ( (row>=0)&&(row<levelRows) ) && ( (col>=0)&&(col<levelCols) ) ){
    if(((currentRoom.map[row][col] !== 1)&&(currentRoom.map[row][col] !== 3))&&(currentRoom.map[row][col] !== 4)){
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


// DONE
//interacts with the specified item
function interact(item) {
  inDialogue=true;
  currentPage = 1;
  pageCount = formatText(item.text);

  //if we only want the thing to be interactable once, update the space to 0 or 1
}

//DONE
//takes a string, adds newlines and carriage returns where lines and pages should end so that they fit in the text box
function formatText(string){
  var lines=1;
  var pages=1;
  var startingIndex=0;
  for(var i=1; i<=string.length; i++){//reads through the string character by character, measuring if the string will fit in our text box
    let builder = "";
    if(string.charAt(i)=='*'){
      builder = string.slice(startingIndex,i)+"^~";
      startingIndex=i+1;
      lines = 1
      pages++;
    }
    if((ctx.measureText(string.substring(startingIndex, i)).width)>((canvas.width/64)*56)){
      if((lines%3)==0){
        while(string.charAt(i-1)!==" "){
          i--;
        }
        builder = string.slice(startingIndex,i)+"^~";
        startingIndex= i;

        lines=1;
        pages++;
      }else{
        while(string.charAt(i-1)!==" "){
          i--;
        }
        builder = string.slice(startingIndex,i)+"^";
        startingIndex= i;

      }
      lines++;
    }else if(i==string.length){
      builder = string.slice(startingIndex, i)+"^~";
    }
    hiddenString = hiddenString.concat(builder);
  }
  return pages;
}
// DONE
//if there is no more text to show it clears the strings and closes the textbox, otherwise it moves to the next page
function advanceText() {
  //if hiddenString char at 0 is equal to newpage char then set shownstring to empty and increment currentPage

  if ((hiddenString.charAt(0))=='~'&&(currentPage==pageCount)) {// ic there is no more to print, clear and close
    shownString="";
    hiddenString="";
    currentPage=1;
    pageCount=1;
    inDialogue=false;
    interactionCooldownFrames=15;
  }
  else if ((hiddenString.charAt(0))=='~') {//otherwise go to the next page
    shownString="";
    hiddenString=hiddenString.slice(1);
    currentPage++;
  }
  return true;//always returns true so that we knoe if this function is called even if it does nothing the player wants the text to be faster
}

function userInput() {
	if (spacebarPressed == true && message == false && currentRoom == room5 && currentRoom.map[playerRow][playerCol]==4) {
		var userMessage = window.prompt("What can we do to help prevent Climate Change?");
		document.write(userMessage + "... That is a great idea!");
		message = true;
	}
}

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
    let remainder = (inHeight-headerHeight-footerHeight)%64;// do this math
    canvas.width = inHeight-headerHeight-footerHeight-remainder;//and then set the width using math
    canvas.height = canvas.width; //do the same here because its a square
  }
  else { //if the witcth is less than or equal to height
    let remainder = (inWidth)%64;
    canvas.height = inWidth-remainder; // do the same thing essentially
    canvas.width = canvas.height;
  }
  //recalculate all these variables ;-;
  tileSize = canvas.width/8;
  playerSize = tileSize/2;
  playerYPos = playerRow*tileSize;
  playerXPos = playerCol*tileSize;
  moveSpeed = canvas.height/64;

  textAreax = (canvas.height/64)*3;
  textAreaY1 = (canvas.height/64)*50;
  textAreaY2 = Math.trunc((canvas.height/64)*(50+(11/3)));
  textAreaY3 = Math.trunc((canvas.height/64)*(50+(22/3)));

  let fontsize = Math.trunc((canvas.height/64)*1.8);//quick maths
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
  sizeCanvas();
  //initialize

});


//when the user resizes the page resize the canvas
window.addEventListener('resize', sizeCanvas);
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
	case 69:
	ePressed=true;
  break;
  case 80:
  audioPlay = !audioPlay;
  const audio = document.querySelector("audio");
   if(audioPlay)
   {
     audio.play();
     audio.volume = 0.2;

   }
   if (!audioPlay) {
     audio.pause();
   }
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
	case 69:
	ePressed=false;
	break;
  }
}, false);

// Refreshes State, so site doesn't crash (Calls Loop function every 1000/30 milliseconds(30fps))
window.setInterval(loop, 1000/30);

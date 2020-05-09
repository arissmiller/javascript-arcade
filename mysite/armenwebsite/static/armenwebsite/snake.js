var canvas = document.getElementById("snakeCanvas");
var ctx = canvas.getContext("2d");

let gridHeight = 50;
let gridWidth = 50;

//canvas should always be h by 2*h
let squareSize = canvas.height/gridHeight;

//need to get these from user choice in document, choosing between themes
var snakeColor = "#FF0040";
var backgroundColor = "#00000";
//selectable difficulty, this controls how fast the loop goes, since it always moves by 1 each tick
//between ticks direction can be changed
var speed = 20;

//snake is an array of coordinates on game board
let snake = [[1,1]];

let size = 1;

//always 1 food on board, unless the game is over, just random coordinates
let food = [];

//pick the start point of the snake at random on the board, if on edge of the board always point inward


let direction = "";
let nextDirection = "";
//place first food at random on board
document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    nextDirection = "Right";
  }
  if(e.key == "Left" || e.key == "ArrowLeft") {
    nextDirection = "Left";
  }
  if(e.key == "Up" || e.key == "ArrowUp") {
    nextDirection = "Up";
  }
  if(e.key == "Down" || e.key == "ArrowDown") {
      nextDirection = "Down";
  }
}

function placeFood() {
  //place food randomly where there is no snake
  food = [];
  let foodX = Math.floor(Math.random() * gridWidth);
  let foodY = Math.floor(Math.random() * gridHeight);
  let flag = true;
  while (flag) {
    for (var i in snake) {
      if (i[0] == foodX && i[1] == foodY) {
        foodX = Math.floor(Math.random() * gridWidth);
        foodY = Math.floor(Math.random() * gridHeight);
        continue;
      }
    }
    flag = false;
  }
  food[0] = foodX;
  food[1] = foodY;
  //console.log("Food x = " + foodX + "Food y = " + foodY);
}

function startGame() {
  //place snake one in from top right corner, direction not initialized yet
  //clear snake
  snake = [[1,1]];
  size = 1;
  placeFood();
}

function moveSnake() {
  if(direction == "") {
    direction = nextDirection;
  }
  if(direction == "Up") {
    if(nextDirection != "Down" || size == 1) {
      direction = nextDirection;
    }
  }
  if(direction == "Down") {
    if(nextDirection != "Up" || size == 1) {
      direction = nextDirection;
    }
  }
  if(direction == "Left") {
    if(nextDirection != "Right" || size == 1) {
      direction = nextDirection;
    }
  }
  if(direction == "Right") {
    if(nextDirection != "Left" || size == 1) {
      direction = nextDirection;
    }
  }

  let head = snake[0];
  if(direction == "Up") {
    head = [snake[0][0], snake[0][1] - 1];
  }
  if(direction == "Down") {
    head = [snake[0][0], snake[0][1] + 1];
  }
  if(direction == "Left") {
    head = [snake[0][0] - 1, snake[0][1]];
  }
  if(direction == "Right") {
    head = [snake[0][0] + 1, snake[0][1]];
  }

  //found food?
  if(food[0] == head[0] && food[1] == head[1]) {
    //snake stays same length with food as new head
    for(var i = size; i > 0; i --) {
      snake[i] = snake[i - 1];
    }
    snake[0] = head;
    size ++;
    placeFood();
    return;
  }
  //check for imminent wall collision, end game

  for(var i = 1; i < size; i++) {
    //console.log("i =" + i + " " + typeof i);
    if(head[0] == snake[i][0] && head[1] == snake[i][1]) {
      gameOver();
      location.reload();
    }
  }

  if(head[0] >= gridWidth || head[0] < 0) {
    //x collision
    gameOver();
    location.reload();
  }
  if(head[1] >= gridHeight || head[1] < 0) {
    //y collision
    gameOver();
    location.reload();
  }
  //update array with new coordinates
  //cascade update, e.g. head gets new position, each other povar gets position of point ahead of it
  let newsnake = [];
  newsnake[0] = head;
  for(var i = 0; i < size; i ++) {
    newsnake[i + 1] = snake[i];
  }
  snake = newsnake;
}

function checkForVictory() {
  if (size == gridHeight * gridWidth) {
    gameOver();
    location.reload();
  }
}

function drawSnake() {
    for(i = 0; i < size; i ++) {
      let x = snake[i][0];
      let y = snake[i][1];
      /*
      console.log("x = " + x + "y = " + y + typeof snake[0]);
      console.log(snake[0]);
      console.log(snake.length);
      ctx.beginPath();
      */
      //TODO: Watch for off by one error here
      ctx.beginPath();
      ctx.rect(x * squareSize, y * squareSize, squareSize, squareSize);
      ctx.fillStyle = snakeColor;
      ctx.fill();
      ctx.closePath();
    }
    ctx.beginPath();
    ctx.rect(food[0] * squareSize, food[1]* squareSize, squareSize * .75, squareSize * .75);
    ctx.fillStyle = snakeColor;
    ctx.fill();
    ctx.closePath();
}

function getColorScheme() {
  let sel = document.getElementById("themes");
  if(sel.value == "redblack") {
    snakeColor = "#DF0101";
    backgroundColor = "#1C1C1C";
  }
  if(sel.value == "blueyellow") {
    backgroundColor = "#2E2EFE";
    snakeColor = "#FFFF00";
  }
  if(sel.value == "orangeslate") {
    snakeColor = "#FF8000";
    backgroundColor ="#585858";
  }
  if(sel.value == "purplemidnight") {
    snakeColor = "#BE81F7";
    backgroundColor = "#0B0B3B";
  }
}

function gameOver() {
  //let name = prompt("Please enter your name");
  alert("Game Over! Score:" + size);

}

startGame();
function draw() {
  getColorScheme();
  //clear to background color
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  moveSnake();
  document.getElementById("score").innerHTML = "Score: " +size
  drawSnake();
  checkForVictory();
}

draw()
setInterval(draw, 40);

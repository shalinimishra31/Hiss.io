var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 16;
var count = 0;
  
var score = document.querySelector("p");
score.className = "score";

var snake = {
  x: 160,
  y: 160,
  
  dx: grid,
  dy: 0,
  
  cells: [],
  
  maxCells: 4
};
var apple = {
  x: 320,
  y: 320
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    hello = document.querySelector(".hello");
    hello.innerHTML = `<a href="index.html"><button class="nextlevel">Play again </button></a>`;
  }
  else if (snake.x >= canvas.width) {
    hello = document.querySelector(".hello");
    hello.innerHTML = `<a href="index.html"><button class="nextlevel">Play again </button></a>`;
  }
  
  if (snake.y < 0) {
    hello = document.querySelector(".hello");
    hello.innerHTML = `<a href="index.html"><button class="nextlevel">Play again </button></a>`;
  }
  else if (snake.y >= canvas.height) {
    hello = document.querySelector(".hello");
    hello.innerHTML = `<a href="index.html"><button class="nextlevel">Play again </button></a>`;
  }

  snake.cells.unshift({x: snake.x, y: snake.y});

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  context.fillStyle = 'yellow';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);

  // draw snake one cell at a time
  context.fillStyle = 'pink';
  snake.cells.forEach(function(cell, index) {
    
    context.fillRect(cell.x, cell.y, grid-1, grid-1);  
    
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      score.innerHTML = `score : ${snake.maxCells-4}`;
      if(snake.maxCells > 23)
      {
        hello = document.querySelector(".hello");
        hello.innerHTML = `<h1 class="winner"> Congratulations, Well played </h1>`;
        setTimeout(() => {
        }, 5000);
      }
      // canvas is 400x400 which is 25x25 grids 
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }

    // check collision with all cells after this one (modified bubble sort)
    for (var i = index + 1; i < snake.cells.length; i++) {
      
      // snake occupies same space as a body part. reset game
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) 
      {
        snake.x = 0;
        snake.y = 0;
        // hello = document.querySelector(".hello");
        // hello.innerHTML = `<a href="intro.html"><button class="nextlevel">Home page</button></a>`;
        // snake.x = 160;
        // snake.y = 160;
        // snake.cells = [];
        // snake.maxCells = 4;
        // snake.dx = grid;
        // snake.dy = 0;

        // apple.x = getRandomInt(0, 25) * grid;
        // apple.y = getRandomInt(0, 25) * grid;
      }
    }
  });
}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
  // prevent snake from backtracking on itself by checking that it's 
  // not already moving on the same axis (pressing left while moving
  // left won't do anything, and pressing right while moving left
  // shouldn't let you collide with your own body)
  
  // left arrow key
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // up arrow key
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // right arrow key
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // down arrow key
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

// start the game
requestAnimationFrame(loop);

// Hämta canvas elementet från DOM:en
var canvas = document.getElementById("gameCanvas");
// Skapa en 2D-kontext för canvasen
var ctx = canvas.getContext("2d");
var paused = false;

// Sätt bredden och höjden på canvasen
canvas.width = 1270;
canvas.height = 600;

// Skapa en boll-objekt med initiala egenskaper
var ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 12,
  dx: 6,
  dy: -6
};

// Skapa egenskaper för vänster racket
var paddleHeight = 100;
var paddleWidth = 10;
var leftPaddle = {
  x: 0,
  y: (canvas.height - paddleHeight) / 2
};
// Skapa egenskaper för höger racket
var rightPaddle = {
  x: canvas.width - paddleWidth,
  y: (canvas.height - paddleHeight) / 2
};

// Sätt startpoäng för vänster och höger spelare
var leftScore = 0;
var rightScore = 0;

// Skapa en objekt för att hålla koll på vilka tangenter som är nedtryckta
var keysPressed = {};
// Lyssna på keydown händelser och sätt motsvarande tangent i keysPressed-objektet till true
document.addEventListener("keydown", function(event) {
  keysPressed[event.key] = true;
});
// Lyssna på keyup händelser och sätt motsvarande tangent i keysPressed-objektet till false
document.addEventListener("keyup", function(event) {
  keysPressed[event.key] = false;
});

// Funktion för att uppdatera spelets tillstånd
function update() {
  
  // Uppdatera vänster racket position om w-tangenten är nedtryckt och racketen inte är utanför canvasen
  if (keysPressed["w"] && leftPaddle.y > 0) {
    leftPaddle.y -= 5;
  }
  // Uppdatera vänster racket position om s-tangenten är nedtryckt och racketen inte är utanför canvasen
  if (keysPressed["s"] && leftPaddle.y < canvas.height - paddleHeight) {
    leftPaddle.y += 5;
  }
  // Uppdatera höger racket position om upp-piltangenten är nedtryckt och racketen inte är utanför canvasen
  if (keysPressed["ArrowUp"] && rightPaddle.y > 0) {
    rightPaddle.y -= 5;
  }
  // Uppdatera höger racket position om ner-piltangenten är nedtryckt och racketen inte är utanför canvasen
  if (keysPressed["ArrowDown"] && rightPaddle.y < canvas.height - paddleHeight) {
    rightPaddle.y += 5;
  }

  // Uppdatera bollens position
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Kolla om bollen träffar taket eller golvet och ändra rörelseriktningen om så är fallet
  if (ball.y + ball.dy < ball.radius || ball.y + ball.dy > canvas.height - ball.radius) {
    ball.dy = -ball.dy;
  }

  // Kolla om bollen träffar vänster racket
  if (ball.x + ball.dx < ball.radius + paddleWidth && ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) {
    ball.dx = -ball.dx;
  }

  // Kolla om bollen träffar höger racket
  if (ball.x + ball.dx > canvas.width - ball.radius - paddleWidth && ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight) {
    ball.dx = -ball.dx;
  }

  // Kontrollera om bollen har gått utanför på vänster eller höger sida, och uppdatera poängen och återställ bollen
  if (ball.x < 0) {
    rightScore++;
    resetBall();
  }
  if (ball.x > canvas.width) {
    leftScore++;
    resetBall();
  }
}

function draw() {
  // Rensa canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Rita bollen som en ifylld cirkel
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();

  // Rita vänster och höger paddlar som ifyllda rektanglar
  ctx.fillRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight);
  ctx.fillRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight);

  // Rita poängen
  ctx.font = "24px Arial";
  ctx.fillText(leftScore, 100, 50);
  ctx.fillText(rightScore, canvas.width - 100, 50);
  if (!paused) {
    requestAnimationFrame(draw);
  }
}

function resetBall() {
  // Återställ bollen till mitten 
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = -ball.dx;
}

function gameLoop() {
  // Uppdatera och ritar elementen i en loop
  update();
  draw();
}

// Kallar på gameLoop funktion varje 10 millisekunder med hjälp av setInterval
setInterval(gameLoop, 10);





// https://stackoverflow.com/questions/43814422/how-to-pause-simple-canvas-game-made-with-js-and-html5

window.addEventListener('keydown', pauseGameKeyHandler, false);

            function pauseGameKeyHandler(e) {
                var keyCode = e.keyCode;
                switch(keyCode){
                    case 80: //p
                    togglePause();
                    break;
                }

            }

            function togglePause() {
                paused = !paused;
                draw();
            }
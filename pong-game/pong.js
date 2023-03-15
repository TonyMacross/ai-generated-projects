// Obtener el lienzo y el contexto
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Variables del juego
var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var ballRadius = 10;
var ballSpeedX = 3;
var ballSpeedY = -3;
var paddleHeight = 75;
var paddleWidth = 10;
var paddleOffset = 2;
var playerPaddleY = (canvas.height - paddleHeight) / 2;
var computerPaddleY = (canvas.height - paddleHeight) / 2;
var scorePlayer = 0;
var scoreComputer = 0;
var bgImage = new Image();

// Dibujar el tablero
function drawBoard() {
	bgImage.src = "https://free4kwallpapers.com/uploads/wallpaper/dark-desktop-backgrounds-wallpapers-space-640x480-mobile-wallpaper.jpg";
ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

  
  // Líneas divisorias blancas
  ctx.fillStyle = "#fff";
  ctx.fillRect((canvas.width - 2) / 2, 0, 2, canvas.height);
  // Puntuaciones
  ctx.font = "30px Arial";
  ctx.fillText(scorePlayer, canvas.width / 4, 50);
  ctx.fillText(scoreComputer, 3 * canvas.width / 4, 50);
}

// Dibujar la pelota
function drawBall() {
  // Dibujar la pelota
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, false);
  ctx.closePath();
  
  // Aplicar efecto 3D
  var gradient = ctx.createRadialGradient(ballX - 3, ballY - 3, 1, ballX - 3, ballY - 3, ballRadius);
  gradient.addColorStop(0, "#fff");
  gradient.addColorStop(1, "#aaa");
  ctx.fillStyle = gradient;
  ctx.fill();
}

// Dibujar las paletas
function drawPaddles() {

  // Dibujar la paleta del jugador
  ctx.beginPath();
  ctx.rect(0, playerPaddleY, paddleWidth, paddleHeight);
  
  // Aplicar efecto de tubo de acero
  ctx.shadowColor = "#ccc";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 10;
  var gradient = ctx.createLinearGradient(0, canvas.height - paddleOffset - paddleHeight, 0, canvas.height - paddleOffset);
  gradient.addColorStop(0, "#bbb");
  gradient.addColorStop(1, "#ddd");
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();
  
  // Dibujar la paleta del computador
  ctx.beginPath();
  ctx.rect(canvas.width - paddleWidth, computerPaddleY, paddleWidth, paddleHeight);
  
  // Aplicar efecto de tubo de acero
  ctx.shadowColor = "#ccc";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 10;
  var gradient = ctx.createLinearGradient(0, paddleOffset, 0, paddleOffset + paddleHeight);
  gradient.addColorStop(0, "#bbb");
  gradient.addColorStop(1, "#ddd");
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();
}

// Detectar colisiones
function checkCollision() {
  // Con la paleta del jugador
  if (ballX - ballRadius < paddleWidth && ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }
  // Con la paleta de la computadora
  if (ballX + ballRadius > canvas.width - paddleWidth && ballY > computerPaddleY && ballY < computerPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }
  // Con los bordes del tablero
  if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
  // Si la pelota llega a la izquierda o derecha del tablero
  if (ballX - ballRadius < 0) {
    scoreComputer++;
    reset();
  } else if (ballX + ballRadius > canvas.width) {
    scorePlayer++;
    reset();
  }
}

// Reiniciar el juego
function reset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
}

// Actualizar el juego
function update() {
  // Actualizar la posición de la pelota
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  // Controlar la paleta del jugador con las teclas de flecha
  if (keyState[38]) { // Flecha hacia arriba
    playerPaddleY -= 7;
  } else if (keyState[40]) { // Flecha hacia abajo
playerPaddleY += 7;
}
// Controlar la paleta del jugador con el ratón
canvas.addEventListener("mousemove", function(event) {
var mousePos = getMousePos(canvas, event);
playerPaddleY = mousePos.y - paddleHeight / 2;
});
// Controlar la paleta de la computadora
computerPaddleY += (ballY - (computerPaddleY + paddleHeight / 2)) * 0.1;
// Dibujar el tablero, la pelota y las paletas
drawBoard();
drawBall();
drawPaddles();
// Detectar colisiones
checkCollision();
// Solicitar el siguiente cuadro de animación
requestAnimationFrame(update);
}

// Iniciar el juego
function startGame() {
// Solicitar el primer cuadro de animación
requestAnimationFrame(update);
}

// Obtener la posición del ratón en el lienzo
function getMousePos(canvas, event) {
var rect = canvas.getBoundingClientRect();
return {
x: event.clientX - rect.left,
y: event.clientY - rect.top
};
}

// Escuchar las teclas de flecha
var keyState = {};
window.addEventListener("keydown", function(event) {
keyState[event.keyCode] = true;
});
window.addEventListener("keyup", function(event) {
delete keyState[event.keyCode];
});

// Iniciar el juego cuando se carga la página
window.addEventListener("load", function() {
startGame();
});

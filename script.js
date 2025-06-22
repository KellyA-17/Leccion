const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10, paddleHeight = 80;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

let ballX = canvas.width / 2, ballY = canvas.height / 2;
const ballSize = 10;
let ballSpeedX = 4, ballSpeedY = 4;

// Movimiento de paleta izquierda
document.addEventListener('keydown', function (e) {
  const speed = 10;
  if (e.key === 'w' || e.key === 'W') {
    leftPaddleY = Math.max(0, leftPaddleY - speed);
  } else if (e.key === 's' || e.key === 'S') {
    leftPaddleY = Math.min(canvas.height - paddleHeight, leftPaddleY + speed);
  }
});

function gameLoop() {
  // Actualizar posición de la pelota
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Rebote contra techo y piso
  if (ballY <= 0 || ballY + ballSize >= canvas.height) {
    ballSpeedY *= -1;
  }

  // Limpiar pantalla
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('Juego Pong - Proyecto inicial', 10, 30);

  // Dibujar paletas
  ctx.fillRect(10, leftPaddleY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - 20, rightPaddleY, paddleWidth, paddleHeight);

  // Dibujar pelota
  ctx.fillRect(ballX, ballY, ballSize, ballSize);

  // Llamar el siguiente frame
  requestAnimationFrame(gameLoop);
}

gameLoop(); // Iniciar animación

//Contador variables
let playerScore = 0;
let aiScore = 0;
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
const aiSpeed = 3;

    if (ballY + ballSize / 2 < rightPaddleY + paddleHeight / 2) {
    rightPaddleY -= aiSpeed;
    } else if (ballY + ballSize / 2 > rightPaddleY + paddleHeight / 2) {
    rightPaddleY += aiSpeed;
    }

// Limitar la paleta dentro del canvas
rightPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddleY));
  // Rebote contra techo y piso
  if (ballY <= 0 || ballY + ballSize >= canvas.height) {
    ballSpeedY *= -1;
  }
  // Colisión con paleta izquierda
    if (
    ballX <= 20 && // 10 (posición) + 10 (ancho paleta)
    ballY + ballSize >= leftPaddleY &&
    ballY <= leftPaddleY + paddleHeight
    ) {
    ballSpeedX *= -1;
    ballX = 20; // Reposicionar para evitar rebote continuo
    }
    // Colisión con paleta derecha
    if (
    ballX + ballSize >= canvas.width - 20 &&
    ballY + ballSize >= rightPaddleY &&
    ballY <= rightPaddleY + paddleHeight
    ) {
    ballSpeedX *= -1;
    ballX = canvas.width - 20 - ballSize;
    }
    // Verificar si alguien falla y reiniciar pelota
    if (ballX < 0) {
    aiScore++;
    resetBall();
    } else if (ballX > canvas.width) {
    playerScore++;
    resetBall();
    }

  // Limpiar pantalla
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('Jugador: ' + playerScore, 50, 30);
  ctx.fillText('IA: ' + aiScore, canvas.width - 150, 30);

  // Dibujar paletas
  ctx.fillRect(10, leftPaddleY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - 20, rightPaddleY, paddleWidth, paddleHeight);

  // Dibujar pelota
  ctx.fillRect(ballX, ballY, ballSize, ballSize);

  // Llamar el siguiente frame
  requestAnimationFrame(gameLoop);
}
    function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX *= -1;
    ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * 4;
    }


gameLoop(); // Iniciar animación

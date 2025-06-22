const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Juego Pong - Proyecto inicial', 10, 30);
}

draw();

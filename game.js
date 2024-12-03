const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

let ball = {
  x: 50,
  y: 50,
  radius: 15,
  dx: 4,
  dy: 3,
  color: "red",
};
let score = 0;

// Ekranga moslash uchun o'lchamni sozlash
function resizeCanvas() {
  canvas.width = Math.min(window.innerWidth * 0.9, 600);
  canvas.height = canvas.width * 0.6; // 3:2 nisbat
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Tasodifiy rang
function getRandomColor() {
  return `hsl(${Math.random() * 360}, 70%, 60%)`;
}

// Ballni chizish
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.shadowBlur = 15;
  ctx.shadowColor = ball.color;
  ctx.fill();
  ctx.closePath();
}

// Ballni harakatlantirish
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx *= -1;
  }
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }
}

// Ochko hisoblash
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  const dist = Math.sqrt((clickX - ball.x) ** 2 + (clickY - ball.y) ** 2);
  if (dist < ball.radius) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    ball.color = getRandomColor();
    ball.dx += 0.5;
    ball.dy += 0.5;
  }
});

// O'yin tsikli
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  moveBall();
  requestAnimationFrame(gameLoop);
}

gameLoop();

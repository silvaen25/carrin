const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let car = {
    width: 50,
    height: 100,
    x: canvas.width / 2 - 25,
    y: canvas.height - 120,
    speed: 5
};

let obstacles = [];
let gameInterval;
let score = 0;

// Fun��o para desenhar o carro
function drawCar() {
    ctx.fillStyle = "red";
    ctx.fillRect(car.x, car.y, car.width, car.height);
}

// Fun��o para criar obst�culos
function createObstacle() {
    const obstacleWidth = Math.random() * 150 + 50;
    const obstacleX = Math.random() * (canvas.width - obstacleWidth);
    const obstacleHeight = 20;
    obstacles.push({
        x: obstacleX,
        y: -obstacleHeight,
        width: obstacleWidth,
        height: obstacleHeight,
    });
}

// Fun��o para desenhar os obst�culos
function drawObstacles() {
    ctx.fillStyle = "green";
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        obstacle.y += 5; // Velocidade de queda dos obst�culos
    });
}

// Fun��o para detectar colis�o
function checkCollision() {
    for (let i = 0; i < obstacles.length; i++) {
        const o = obstacles[i];
        if (
            car.x < o.x + o.width &&
            car.x + car.width > o.x &&
            car.y < o.y + o.height &&
            car.y + car.height > o.y
        ) {
            clearInterval(gameInterval); // Colis�o detectada, para o jogo
            alert("Game Over! Sua pontua��o foi: " + score);
            return true;
        }
    }
    return false;
}

// Fun��o para atualizar o jogo
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
    drawCar();
    drawObstacles();
    score++;
    if (score % 50 === 0) {
        createObstacle(); // Cria novo obst�culo a cada 50 pontos
    }
    if (checkCollision()) {
        return;
    }
}

// Fun��o para mover o carro
function moveCar(event) {
    if (event.key === "ArrowLeft" && car.x > 0) {
        car.x -= car.speed;
    }
    if (event.key === "ArrowRight" && car.x < canvas.width - car.width) {
        car.x += car.speed;
    }
}

// Inicia o jogo
document.addEventListener("keydown", moveCar);
gameInterval = setInterval(updateGame, 1000 / 60); // Atualiza o jogo 60 vezes por segundo

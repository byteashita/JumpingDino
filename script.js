let score = 0;
const gameMusic = document.getElementById('gameMusic');
const gameOverMusic = document.getElementById('gameOverMusic');
const welcomeMessage = document.querySelector('.welcomeMessage');
const gameOver = document.querySelector('.gameOver');
const obstacle = document.querySelector('.obstacle');
const scoreCont = document.querySelector('.scoreCont');

// Play game music and loop it
gameMusic.loop = true;

// Function to play music
function playGameMusic() {
    gameMusic.play().catch(error => {
        console.error("Error playing music:", error);
    });
}

// Start playing music when the game starts
let gameStarted = false;
document.addEventListener('keydown', function() {
    if (!gameStarted) {
        playGameMusic(); // Start the game music
        gameStarted = true; // Set gameStarted to true to prevent multiple calls
    }
});

// Initialize the game loop
document.onkeydown = function(e) {
    const dino = document.querySelector('.dino');

    // Move the dino up (jump)
    if (e.key === "ArrowUp") {
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }

    // Move dino left or right
    if (e.key === 'ArrowRight') {
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX + 90) + "px";
    }

    if (e.key === 'ArrowLeft') {
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 90) + "px";
    }
};

// Game loop to check for collision
const gameLoop = setInterval(() => {
    const dino = document.querySelector('.dino');

    // Get positions of dino and obstacle
    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    // Collision detection
    if (offsetX < 93 && offsetY < 52) {
        // If collision occurs
        gameOver.style.visibility = 'visible'; // Show Game Over message
        welcomeMessage.style.visibility = 'hidden'; // Hide Welcome message
        obstacle.classList.remove('obstacleAni'); // Stop the obstacle animation

        // Stop game music and play game over music
        gameMusic.pause(); // Stop the game music
        gameOverMusic.currentTime = 0; // Reset game over music
        gameOverMusic.play(); // Play game over music

        clearInterval(gameLoop); // Stop the game loop
    } else {
        score += 1; // Increment score
        updateScore(score);
    }
}, 100);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
}

// Start obstacle animation after 2 seconds
setTimeout(() => {
    obstacle.classList.add('obstacleAni'); // Start the animation
}, 2000);

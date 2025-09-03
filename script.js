const videoElement = document.getElementById('meditation-video');
const beachSound = new Audio('Sounds/beach.mp3');
const rainSound = new Audio('Sounds/rain.mp3');
let currentSound = beachSound;

document.getElementById('beach-sound').addEventListener('click', () => {
    currentSound.pause();
    currentSound = beachSound;
    currentSound.play();
});

document.getElementById('rain-sound').addEventListener('click', () => {
    currentSound.pause();
    currentSound = rainSound;
    currentSound.play();
});

document.querySelectorAll('#time-select button').forEach(button => {
    button.addEventListener('click', () => {
        // Set timer logic here
        // Update time-display based on button clicked
    });
});

document.querySelector('.play').addEventListener('click', () => {
    if (currentSound.paused) {
        currentSound.play();
    } else {
        currentSound.pause();
    }
});
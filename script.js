const videoElement = document.getElementById('meditation-video');
const beachSound = new Audio('Sounds/beach.mp3');
const rainSound = new Audio('Sounds/rain.mp3');
let currentSound = beachSound;
let timer;

document.querySelector('.play').addEventListener('click', () => {
    if (currentSound.paused) {
        currentSound.play();
        videoElement.play();
    } else {
        currentSound.pause();
        videoElement.pause();
    }
});

document.querySelectorAll('.sound-picker button').forEach(button => {
    button.addEventListener('click', () => {
        currentSound.pause();
        if (button.id === 'beach-sound') {
            currentSound = beachSound;
        } else {
            currentSound = rainSound;
        }
        currentSound.play();
    });
});

document.querySelectorAll('#time-select button').forEach(button => {
    button.addEventListener('click', () => {
        clearInterval(timer);
        const duration = parseInt(button.getAttribute('data-time'));
        startTimer(duration);
    });
});

function startTimer(duration) {
    let remainingTime = duration;
    const timeDisplay = document.querySelector('.time-display');

    timer = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timer);
            currentSound.pause();
            videoElement.pause();
            return;
        }
        remainingTime--;
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}
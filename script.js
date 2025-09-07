let audio = new Audio('Sounds/beach.mp3');
let timer;
let timeDisplay = document.querySelector('.time-display');

document.getElementById('beach-sound').addEventListener('click', () => {
    audio.src = 'Sounds/beach.mp3';
    audio.play();
});

document.getElementById('rain-sound').addEventListener('click', () => {
    audio.src = 'Sounds/rain.mp3';
    audio.play();
});

document.getElementById('smaller-mins').addEventListener('click', () => {
    setTimer(2);
});

document.getElementById('medium-mins').addEventListener('click', () => {
    setTimer(5);
});

document.getElementById('long-mins').addEventListener('click', () => {
    setTimer(10);
});

document.querySelector('.play').addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

function setTimer(minutes) {
    clearInterval(timer);
    let timeLeft = minutes * 60;
    timeDisplay.textContent = `${minutes}:0`;
    
    timer = setInterval(() => {
        timeLeft--;
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        timeDisplay.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            audio.pause();
        }
    }, 1000);
}
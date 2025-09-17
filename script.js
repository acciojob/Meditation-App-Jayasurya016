document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const video = document.querySelector('.video');
    const soundtrack = document.querySelector('.sound-track');
    const playButton = document.querySelector('.play-btn');
    const playIcon = playButton.querySelector('.play-icon');
    const timeDisplay = document.querySelector('.time-display');
    const timeButtons = document.querySelectorAll('.time-btn');
    const soundButtons = document.querySelectorAll('.sound-picker button');

    let isPlaying = false;
    let duration = 600; // Initial duration in seconds (10 minutes)
    let countdownInterval;

    // Set initial timer display
    timeDisplay.textContent = '10:00';

    // Play/Pause functionality
    playButton.addEventListener('click', () => {
        if (isPlaying) {
            pauseMedia();
        } else {
            playMedia();
        }
    });

    function playMedia() {
        video.play();
        soundtrack.play();
        isPlaying = true;
        playIcon.src = 'pause-icon.svg';
        startTimer();
    }

    function pauseMedia() {
        video.pause();
        soundtrack.pause();
        isPlaying = false;
        playIcon.src = 'play-icon.svg';
        stopTimer();
    }

    // Time selection
    timeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons and add to the clicked one
            timeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Set duration and update display
            duration = parseInt(button.dataset.time, 10);
            updateTimeDisplay(duration);

            // If already playing, reset and start with new duration
            if (isPlaying) {
                pauseMedia();
                playMedia();
            }
        });
    });

    // Sound and video switching
    soundButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all sound buttons and add to the clicked one
            soundButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update video and sound source
            video.src = button.dataset.video;
            soundtrack.src = button.dataset.sound;

            // If playing, restart media with new sources
            if (isPlaying) {
                pauseMedia();
                playMedia();
            }
        });
    });

    // Timer logic
    function startTimer() {
        let timeLeft = duration;
        countdownInterval = setInterval(() => {
            timeLeft--;
            updateTimeDisplay(timeLeft);
            if (timeLeft <= 0) {
                stopTimer();
                pauseMedia();
                // Optionally reset the timer to the selected duration
                updateTimeDisplay(duration);
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(countdownInterval);
    }

    function updateTimeDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timeDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
});
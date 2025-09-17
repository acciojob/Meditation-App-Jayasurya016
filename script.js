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
    updateTimeDisplay(duration);

    // Initial silent autoplay fix for browsers with autoplay policies
    soundtrack.volume = 0;
    video.volume = 0;

    // Play/Pause functionality
    playButton.addEventListener('click', () => {
        if (isPlaying) {
            pauseMedia();
        } else {
            // First user interaction, now we can set volume to 1
            soundtrack.volume = 1;
            video.volume = 1;
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
            timeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            duration = parseInt(button.dataset.time, 10);
            updateTimeDisplay(duration);
            if (isPlaying) {
                pauseMedia();
                playMedia();
            }
        });
    });

    // Sound and video switching
    soundButtons.forEach(button => {
        button.addEventListener('click', () => {
            soundButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            video.src = button.dataset.video;
            soundtrack.src = button.dataset.sound;
            if (isPlaying) {
                video.load();
                soundtrack.load();
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
                // Reset the timer display to the selected duration
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
        // The fix is here:
        const displaySeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
        timeDisplay.textContent = `${minutes}:${displaySeconds}`;
    }
});
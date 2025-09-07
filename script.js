 document.addEventListener('DOMContentLoaded', () => {
            // Select all necessary DOM elements
            const video = document.querySelector(".vid-container video");
            const song = document.querySelector(".song");
            const playBtn = document.querySelector(".play");
            const timeDisplay = document.querySelector(".time-display");
            const timeButtons = document.querySelectorAll("#time-select button");
            const soundButtons = document.querySelectorAll(".sound-picker button");

            let fakeDuration = 600; // Default meditation time in seconds (10 mins)
            let timerInterval = null;

            // Function to update the time display
            const updateTimeDisplay = (seconds) => {
                const mins = Math.floor(seconds / 60);
                const secs = seconds % 60;
                timeDisplay.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
            };

            // Function to toggle play/pause
            const togglePlay = () => {
                if (song.paused) {
                    song.play();
                    video.play();
                    startTimer();
                    playBtn.textContent = "⏸️";
                } else {
                    song.pause();
                    video.pause();
                    clearInterval(timerInterval);
                    playBtn.textContent = "▶️";
                }
            };

            // Function to start the countdown timer
            const startTimer = () => {
                let remaining = fakeDuration;
                clearInterval(timerInterval);

                timerInterval = setInterval(() => {
                    remaining--;
                    updateTimeDisplay(remaining);
                    if (remaining < 0) {
                        song.pause();
                        video.pause();
                        playBtn.textContent = "▶️";
                        clearInterval(timerInterval);
                        song.currentTime = 0;
                    }
                }, 1000);
            };

            // Add event listener to the play/pause button
            playBtn.addEventListener("click", togglePlay);

            // Add event listeners for time selection buttons
            timeButtons.forEach((btn) => {
                btn.addEventListener("click", function () {
                    fakeDuration = parseInt(this.dataset.time, 10);
                    updateTimeDisplay(fakeDuration);
                    if (!song.paused) {
                        // Reset timer if already playing
                        song.currentTime = 0;
                        togglePlay();
                        togglePlay();
                    } else {
                        song.currentTime = 0;
                    }
                });
            });

            // Add event listeners for sound selection buttons
            soundButtons.forEach((btn) => {
                btn.addEventListener("click", function () {
                    const sound = this.dataset.sound;
                    song.src = `Sounds/${sound}.mp3`;
                    video.src = `video/${sound}.mp4`;
                    
                    // Pause and reset if already playing
                    if (!song.paused) {
                        song.pause();
                        video.pause();
                        clearInterval(timerInterval);
                        playBtn.textContent = "▶️";
                    }
                    
                    // Auto-play the new sound/video
                    song.play();
                    video.play();
                    startTimer();
                    playBtn.textContent = "⏸️";
                });
            });
        });
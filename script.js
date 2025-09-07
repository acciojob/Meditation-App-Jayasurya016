 window.onload = function() {
            const app = document.getElementById('app');
            const song = document.querySelector('.song');
            const video = document.querySelector('.vid-container video');
            const playButton = document.querySelector('.play-button');
            const playIcon = document.querySelector('.play');
            const pauseIcon = document.querySelector('.pause');
            const timeDisplay = document.querySelector('.time-display');
            const timeSelectButtons = document.querySelectorAll('.time-select button');
            const soundPickerButtons = document.querySelectorAll('.sound-picker button');
            
            // Note: Replace these with your actual file paths for local development.
            // These are provided to make the code run and demonstrate functionality.
            const soundSources = {
                'beach.mp3': 'http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg',
                'rain.mp3': 'http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg'
            };

            const videoSources = {
                'beach.mp4': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                'rain.mp4': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
            };

            let duration = 600; // Initial duration in seconds (10 minutes)
            let timerId = null;

            // Function to update the time display
            function updateTimeDisplay(time) {
                const minutes = Math.floor(time / 60);
                const seconds = Math.floor(time % 60);
                timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            }

            // Function to play the audio and video
            function playMedia() {
                if (song.paused) {
                    song.play();
                    video.play();
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';

                    // Start the timer
                    if (!timerId) {
                        timerId = setInterval(() => {
                            duration--;
                            if (duration >= 0) {
                                updateTimeDisplay(duration);
                            } else {
                                stopMedia();
                                updateTimeDisplay(duration);
                                showMessage('Meditation complete!', 'success');
                                duration = 600;
                            }
                        }, 1000);
                    }
                }
            }

            // Function to pause the audio and video
            function stopMedia() {
                song.pause();
                video.pause();
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
                clearInterval(timerId);
                timerId = null;
            }

            // Play/Pause button event listener
            playButton.addEventListener('click', () => {
                if (song.paused) {
                    playMedia();
                } else {
                    stopMedia();
                }
            });

            // Time select buttons
            timeSelectButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    timeSelectButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to the clicked button
                    button.classList.add('active');
                    
                    duration = parseInt(button.getAttribute('data-time'));
                    updateTimeDisplay(duration);
                    
                    // Stop media and reset if already playing
                    if (!song.paused) {
                        stopMedia();
                    }
                });
            });

            // Sound picker buttons
            soundPickerButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    soundPickerButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to the clicked button
                    button.classList.add('active');

                    const soundName = button.getAttribute('data-sound');
                    const videoName = button.getAttribute('data-video');

                    // Set new sources
                    song.src = soundSources[soundName];
                    video.src = videoSources[videoName];
                    
                    // Stop media and reset if already playing
                    if (!song.paused) {
                        stopMedia();
                    }
                    // Since a new video is loaded, we need to unmute it
                    video.muted = false;
                    
                    // Reset to initial time
                    duration = parseInt(document.querySelector('.time-select .active').getAttribute('data-time'));
                    updateTimeDisplay(duration);
                });
            });

            // Set initial sound and video
            song.src = soundSources['beach.mp3'];
            video.src = videoSources['beach.mp4'];

            // Initial display
            updateTimeDisplay(duration);
        };
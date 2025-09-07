const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    // Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    
    // Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    // Get the length of the outline
    const outlineLength = outline.getTotalLength();
    
    // Duration
    let fakeDuration = 600;

    outline.style.strokeDashoffset = outlineLength;
    outline.style.strokeDasharray = outlineLength;

    // Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    // Play sound
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = 'svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = 'svg/play.svg';
        }
    };

    // We can use a button to toggle between play and pause
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // Select time
    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time');
            // FIX: Ensure minutes and seconds are correctly formatted to match tests
            const minutes = Math.floor(fakeDuration / 60);
            const seconds = Math.floor(fakeDuration % 60);
            timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            song.currentTime = 0; // Reset song time when a new duration is selected
        });
    });

    // We can animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Animate the progress bar
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // Animate the text
        // FIX: Ensure seconds are always two digits
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        timeDisplay.textContent = `${minutes}:${formattedSeconds}`;

        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = 'svg/play.svg';
            video.pause();
        }
    };
};

app();
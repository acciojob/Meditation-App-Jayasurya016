document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector(".vid-container video");
  const song = document.querySelector(".song");
  const playBtn = document.querySelector(".play");
  const timeDisplay = document.querySelector(".time-display");
  const timeButtons = document.querySelectorAll(".time-select button");
  const soundButtons = document.querySelectorAll(".sound-picker button");

  let fakeDuration = 600; // default 10 min
  let timerInterval = null;

  // Play & Pause functionality
  function togglePlay() {
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
  }

  playBtn.addEventListener("click", togglePlay);

  // Time selection
  timeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      fakeDuration = this.dataset.time;
      updateTimeDisplay(fakeDuration);
      song.currentTime = 0;
    });
  });

  // Sound selection
  soundButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      song.src = `Sounds/${this.dataset.sound}.mp3`;
      video.src = `video/${this.dataset.sound}.mp4`;
      
      // If audio is playing, reset and play the new one
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

  // Timer function
  function startTimer() {
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
  }

  // Update display
  function updateTimeDisplay(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timeDisplay.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
});
const app = document.getElementById("app");
const video = document.getElementById("video");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll("#time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let fakeDuration = 600; // default 10 minutes
let currentTime = fakeDuration;

const audio = new Audio("Sounds/beach.mp3");

// Format time display
function updateDisplay(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  timeDisplay.textContent = `${minutes}:${seconds}`;
}

// Play/Pause functionality
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    video.play();
    playBtn.textContent = "⏸️";
    countdown();
  } else {
    audio.pause();
    video.pause();
    playBtn.textContent = "▶️";
    clearInterval(timer);
  }
});

let timer;
function countdown() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      updateDisplay(currentTime);
    } else {
      audio.pause();
      video.pause();
      playBtn.textContent = "▶️";
      clearInterval(timer);
      currentTime = fakeDuration;
      updateDisplay(currentTime);
    }
  }, 1000);
}

// Change time
timeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.id === "smaller-mins") fakeDuration = 120;
    if (btn.id === "medium-mins") fakeDuration = 300;
    if (btn.id === "long-mins") fakeDuration = 600;

    currentTime = fakeDuration;
    updateDisplay(currentTime);
  });
});

// Switch sound & video
soundButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    audio.src = btn.getAttribute("data-sound");
    video.src = btn.getAttribute("data-video");
    audio.play();
    video.play();
    playBtn.textContent = "⏸️";
    countdown();
  });
});

// Initialize
updateDisplay(currentTime);

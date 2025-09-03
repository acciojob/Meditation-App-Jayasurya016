//your JS code here. If required.
let duration = 600; // default 10 minutes
let remaining = duration;
let timerInterval;
let currentSound = null;

const timeDisplay = document.getElementById("timeDisplay");
const ring = document.querySelector(".ring-progress");
const rainSound = document.getElementById("rainSound");
const sunSound = document.getElementById("sunSound");

function setDuration(mins) {
  clearInterval(timerInterval);
  duration = mins * 60;
  remaining = duration;
  updateDisplay();
  startTimer();
}

function setSound(type) {
  if (currentSound) currentSound.pause();
  currentSound = type === "rain" ? rainSound : sunSound;
  currentSound.currentTime = 0;
  currentSound.play();
}

function updateDisplay() {
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  timeDisplay.textContent = `${mins}:${secs.toString().padStart(2, "0")}`;
  const progress = 565.48 * (1 - remaining / duration);
  ring.style.strokeDashoffset = progress;
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (remaining > 0) {
      remaining--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      if (currentSound) currentSound.pause();
    }
  }, 1000);
}

updateDisplay();
startTimer();
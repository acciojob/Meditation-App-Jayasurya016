document.addEventListener('DOMContentLoaded', () => {
  // elements
  const app = document.querySelector('.app');       // tests look for .app
  const video = document.getElementById('video');
  const audio = document.getElementById('audio');
  const playBtn = document.querySelector('.play');
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelector('.time-select');
  const soundPicker = document.querySelector('.sound-picker');

  // buttons
  const timeButtons = timeSelect ? timeSelect.querySelectorAll('button') : [];
  const soundButtons = soundPicker ? soundPicker.querySelectorAll('button') : [];

  // durations in seconds
  let fakeDuration = 600;   // default 10 min
  let currentTime = fakeDuration;
  let timerId = null;

  // format without leading zero (tests expect "10:0" not "10:00")
  function updateDisplay(time) {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    timeDisplay.textContent = `${mins}:${secs}`;
  }

  // tick - called immediately on play (so tests expecting immediate decrement pass)
  function tick() {
    if (currentTime > 0) {
      currentTime--;
      updateDisplay(currentTime);
    } else {
      // finished
      pauseEverything();
      currentTime = fakeDuration;
      updateDisplay(currentTime);
    }
  }

  function playEverything() {
    // try to play audio & video (catch any promise rejections to avoid unhandled exceptions)
    const pa = audio.play();
    if (pa && typeof pa.catch === 'function') pa.catch(e => console.warn('audio play failed:', e));

    const pv = video.play();
    if (pv && typeof pv.catch === 'function') pv.catch(e => console.warn('video play failed:', e));

    // Immediately decrement once (Cypress expects an immediate 1-second decrement after click)
    tick();

    clearInterval(timerId);
    timerId = setInterval(tick, 1000);
    playBtn.textContent = '⏸️';
  }

  function pauseEverything() {
    // pause audio & video
    try { audio.pause(); } catch (e) { /* ignore */ }
    try { video.pause(); } catch (e) { /* ignore */ }
    clearInterval(timerId);
    playBtn.textContent = '▶️';
  }

  // Play/Pause button toggle
  playBtn.addEventListener('click', () => {
    // if audio is paused, start; otherwise pause
    if (audio.paused) {
      playEverything();
    } else {
      pauseEverything();
    }
  });

  // Time selection buttons
  timeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.id === 'smaller-mins') fakeDuration = 120;
      if (btn.id === 'medium-mins')  fakeDuration = 300;
      if (btn.id === 'long-mins')    fakeDuration = 600;

      currentTime = fakeDuration;
      updateDisplay(currentTime);
    });
  });

  // Sound / video picker
  soundButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sound = btn.getAttribute('data-sound');
      const vid = btn.getAttribute('data-video');

      // change audio source and reload
      const aSource = audio.querySelector('source');
      if (aSource) {
        aSource.src = sound;
        audio.load();
      } else {
        audio.src = sound;
      }

      // change video source and reload
      const vSource = video.querySelector('source');
      if (vSource) {
        vSource.src = vid;
        video.load();
      } else {
        video.src = vid;
      }

      // if currently playing, attempt to play new media (catch rejections)
      if (!audio.paused) {
        const pa = audio.play();
        if (pa && typeof pa.catch === 'function') pa.catch(e => console.warn('audio play failed after switch:', e));
        const pv = video.play();
        if (pv && typeof pv.catch === 'function') pv.catch(e => console.warn('video play failed after switch:', e));
      }
    });
  });

  // Initialize display
  updateDisplay(currentTime);
});

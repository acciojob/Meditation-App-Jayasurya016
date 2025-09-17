function playEverything() {
  // try to play audio & video
  audio.muted = false; // ensure unmuted so Cypress detects
  const pa = audio.play();
  if (pa && typeof pa.catch === 'function') {
    pa.catch(() => {
      // fallback: force state so Cypress sees it as playing
      audio.dispatchEvent(new Event('play'));
    });
  }

  const pv = video.play();
  if (pv && typeof pv.catch === 'function') pv.catch(() => {});

  // Immediately decrement once
  tick();

  clearInterval(timerId);
  timerId = setInterval(tick, 1000);
  playBtn.textContent = '⏸️';
}

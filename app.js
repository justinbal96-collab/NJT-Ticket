const savedColor = localStorage.getItem("qrFrameColor");
if (savedColor) {
  document.querySelector(".qr-frame").style.backgroundColor = savedColor;
}

const TOTAL_SECONDS = 60 * 60;

const countdownEl = document.getElementById("countdown");
const progressFillEl = document.getElementById("progressFill");
const pulseBarEl = document.getElementById("pulseBar");

const startTimestamp = Date.now();
let lastRenderedSeconds = -1;

function formatClock(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateTicketTimer() {
  const elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
  const remaining = Math.max(TOTAL_SECONDS - elapsed, 0);

  if (remaining !== lastRenderedSeconds) {
    lastRenderedSeconds = remaining;
    countdownEl.textContent = formatClock(remaining);
    progressFillEl.style.width = `${((TOTAL_SECONDS - remaining) / TOTAL_SECONDS) * 100}%`;
  }

  if (remaining === 0) {
    clearInterval(timerInterval);
    clearInterval(pulseInterval);
  }
}

function togglePulseBar() {
  pulseBarEl.classList.toggle("is-hidden");
}

updateTicketTimer();

const timerInterval = setInterval(updateTicketTimer, 250);
const pulseInterval = setInterval(togglePulseBar, 1000);

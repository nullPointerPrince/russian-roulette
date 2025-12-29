const spinBtn = document.getElementById("spinBtn");
const resetBtn = document.getElementById("resetBtn");
const resultEl = document.getElementById("result");
const revolver = document.getElementById("revolver");

const totalPullsEl = document.getElementById("totalPulls");
const gamesPlayedEl = document.getElementById("gamesPlayed");
const bestStreakEl = document.getElementById("bestStreak");

let bulletChamber;
let currentChamber;
let gameOver;

// 🔢 Session-only stats (reset on refresh)
let totalPulls = 0;
let gamesPlayed = 0;
let bestStreak = 0;

// 🔊 Sound helpers (Web Audio API)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playClick() {
  const osc = audioCtx.createOscillator();
  osc.frequency.value = 200;
  osc.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}

function playBang() {
  const osc = audioCtx.createOscillator();
  osc.frequency.value = 80;
  osc.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}

// 🔄 Update stats UI
function updateStats() {
  totalPullsEl.textContent = totalPulls;
  gamesPlayedEl.textContent = gamesPlayed;
  bestStreakEl.textContent = bestStreak;
}

// 🎮 Reset game round
function resetGame() {
  bulletChamber = Math.floor(Math.random() * 6) + 1; // 1–6
  currentChamber = 1;
  gameOver = false;
  gamesPlayed++;

  resultEl.textContent = "🔄 New game started. Pull the trigger.";
  resultEl.style.color = "white";

  updateStats();
}

// 🔫 Trigger pull
spinBtn.addEventListener("click", () => {
  if (gameOver) return;

  revolver.classList.add("spin");
  setTimeout(() => revolver.classList.remove("spin"), 400);

  totalPulls++;

  if (currentChamber === bulletChamber) {
    playBang();
    resultEl.textContent = `💥 Bang! You got shot on pull #${currentChamber}.`;
    resultEl.style.color = "red";
    gameOver = true;
  } else {
    playClick();
    resultEl.textContent = `😅 Click... survived pull #${currentChamber}.`;
    resultEl.style.color = "lime";

    bestStreak = Math.max(bestStreak, currentChamber);
    currentChamber++;
  }

  updateStats();
});

// 🔁 Manual reset
resetBtn.addEventListener("click", resetGame);

// 🚀 Start fresh on every app load
updateStats();
resetGame();

window.onload = function () {
  const startBtn = document.querySelector(".start");
  const pauseBtn = document.querySelector(".pause");
  const resetBtn = document.querySelector(".reset");

  let seconds = 0;
  let minutes = 0;

  let interval;

  let secondsLabel = document.querySelector(".seconds");
  let minutesLabel = document.querySelector(".minutes");

  function updateDisplay() {
    secondsLabel.textContent = seconds < 10 ? `0${seconds}` : seconds;
    minutesLabel.textContent = minutes < 10 ? `0${minutes}` : minutes;
  }

  function displayButtons() {
    pauseBtn.classList.remove("hidden");
    resetBtn.classList.remove("hidden");
    startBtn.classList.add("hidden");

    setTimeout(() => {
      pauseBtn.classList.add("visible");
    }, 0);
  }

  startBtn.addEventListener("click", () => {
    displayButtons();
    clearInterval(interval);
    interval = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
      updateDisplay();
    }, 1000);
  });

  pauseBtn.addEventListener("click", () => {
    clearInterval(interval);
  });

  resetBtn.addEventListener("click", () => {
    location.reload();
  });
};

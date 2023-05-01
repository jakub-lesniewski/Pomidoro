"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector(".start");
  const pauseBtn = document.querySelector(".pause");
  const resetBtn = document.querySelector(".reset");
  const pomodoros = document.querySelectorAll(".pomodoro-container .pomodoro");
  const secondsLabel = document.querySelector(".seconds");
  const minutesLabel = document.querySelector(".minutes");

  const audio = new Audio("ding.mp3");

  let seconds = 0;
  let minutes = 0;
  let currentPomodoro = 0;
  let interval;

  let isPaused = false;
  let isShortBreak = false;
  let isLongBreak = false;

  const displayButtons = () => {
    pauseBtn.classList.remove("hidden");
    resetBtn.classList.remove("hidden");
    startBtn.classList.add("hidden");
  };

  const shortBreak = () => {
    audio.play();
    currentPomodoro++;
    isShortBreak = true;

    document.title = "Take a break! 🍅";

    seconds = 0;
    minutes = 0;
  };

  const longBreak = () => {
    audio.play();
    isLongBreak = true;

    pomodoros.forEach(function (element) {
      element.classList.remove("pomodoro-active");
    });

    document.title = "Take a long break! 🍅";

    seconds = 0;
    minutes = 0;
    currentPomodoro = 0;
  };

  const updateDisplay = () => {
    secondsLabel.textContent = seconds < 10 ? `0${seconds}` : seconds;
    minutesLabel.textContent = minutes < 10 ? `0${minutes}` : minutes;

    if (
      seconds === 2 &&
      isShortBreak === false &&
      currentPomodoro <= pomodoros.length
    ) {
      pomodoros[currentPomodoro].classList.add("pomodoro-active");
      shortBreak();
    }

    if (isShortBreak && seconds === 1) {
      isShortBreak = false;
      audio.play();
      document.title = "Pomodoro Timer 🍅";
      seconds = 0;
      minutes = 0;
    }

    if (
      currentPomodoro === pomodoros.length &&
      isLongBreak === false &&
      seconds === 5
    ) {
      longBreak();
    }

    if (isLongBreak && seconds === 5) {
      isLongBreak = false;
      audio.play();
      document.title = "Pomodoro Timer 🍅";
      seconds = 0;
      minutes = 0;
    }
  };

  const startWatch = () => {
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
  };

  const toggleWatch = () => {
    if (!isPaused) {
      clearInterval(interval);
      isPaused = true;
      pauseBtn.textContent = "Resume";
    } else {
      startWatch();
      isPaused = false;
      pauseBtn.textContent = "Pause";
    }
  };

  startBtn.addEventListener("click", startWatch);
  pauseBtn.addEventListener("click", toggleWatch);
  resetBtn.addEventListener("click", () => {
    location.reload();
  });
});

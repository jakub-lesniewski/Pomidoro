"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector(".start");
  const pauseBtn = document.querySelector(".pause");
  const resetBtn = document.querySelector(".reset");
  const pomodoros = document.querySelectorAll(".pomodoro-container .pomodoro");
  const secondsLabel = document.querySelector(".seconds");
  const minutesLabel = document.querySelector(".minutes");

  const audio = new Audio("ding.mp3");
  audio.play();

  let seconds = 0;
  let minutes = 0;
  let interval;
  let isPaused = false;

  let currentPomodoro = 0;
  let isBreak = false;

  const displayButtons = () => {
    pauseBtn.classList.remove("hidden");
    resetBtn.classList.remove("hidden");
    startBtn.classList.add("hidden");
  };

  const breakTime = () => {
    pomodoros[currentPomodoro].classList.add("pomodoro-active");
    audio.play();
    currentPomodoro++;
    isBreak = true;

    document.title = "Take a break! 🍅";

    seconds = 0;
    minutes = 0;

    if (seconds === 5) {
      isBreak = false;
    }
  };

  const updateDisplay = () => {
    secondsLabel.textContent = seconds < 10 ? `0${seconds}` : seconds;
    minutesLabel.textContent = minutes < 10 ? `0${minutes}` : minutes;

    if (seconds === 2 && isBreak === false) {
      breakTime();
    }

    if (isBreak && seconds === 1) {
      isBreak = false;
      audio.play();
      document.title = "Pomodoro Timer 🍅";
      seconds = 0;
      minutes = 0;
    }

    if (currentPomodoro === pomodoros.length + 1) {
      pomodoroHalt();
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

  const pomodoroHalt = () => {
    audio.play();
    toggleWatch();

    seconds = 0;
    minutes = 0;

    pomodoros.forEach((pomodoro) => {
      pomodoro.classList.remove("pomodoro-active");
    });
  };

  startBtn.addEventListener("click", startWatch);
  pauseBtn.addEventListener("click", toggleWatch);
  resetBtn.addEventListener("click", () => {
    location.reload();
  });
});

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector(".start");
  const pauseBtn = document.querySelector(".pause");
  const resetBtn = document.querySelector(".reset");
  const closeBtn = document.querySelector(".close");
  const settingsBtn = document.querySelector(".settings");

  const pomodoros = document.querySelectorAll(".pomodoro-container .pomodoro");

  const secondsLabel = document.querySelector(".seconds");
  const minutesLabel = document.querySelector(".minutes");

  const settingsContainer = document.querySelector(".container-left");
  const workDurationInput = document.querySelector(".work-duration");
  const shortBreakDurationInput = document.querySelector(
    ".short-break-duration"
  );
  const longBreakDurationInput = document.querySelector(".long-break-duration");
  const settingsForm = document.querySelector(".settings-form");

  const audio = new Audio("ding.mp3");

  let seconds = 0;
  let minutes = 0;

  let workTime = 25;
  let shortBreakTime = 5;
  let longBreakTime = 20;

  let currentPomodoro = 0;

  let interval;

  let isPaused = false;
  let isBreak = false;

  // Pomodoro functionality
  const resetTimer = () => {
    seconds = 0;
    minutes = 0;
  };

  const displayButtons = () => {
    pauseBtn.classList.remove("hidden");
    resetBtn.classList.remove("hidden");
    startBtn.classList.add("hidden");
  };

  const takeBreak = () => {
    audio.play();
    pomodoros[currentPomodoro].classList.add("pomodoro-active");
    currentPomodoro++;

    if (currentPomodoro === pomodoros.length) {
      isBreak = true;
      document.title = "🍅 Long break";
      resetTimer();

      setTimeout(() => {
        pomodoros.forEach((pomodoro) => {
          pomodoro.classList.remove("pomodoro-active");
        });
        currentPomodoro = 0;
        resetTimer();
        isBreak = false;
        document.title = "🍅 Pomodoro";
        audio.play();
      }, longBreakTime * 1000 * 60);
    } else {
      isBreak = true;
      document.title = "🍅 Short break";
      resetTimer();
      setTimeout(() => {
        pomodoros.forEach((pomodoro) => {});
        isBreak = false;
        resetTimer();
        document.title = "🍅 Pomodoro";
        audio.play();
      }, shortBreakTime * 1000 * 60);
    }
  };

  const updateDisplay = () => {
    secondsLabel.textContent = seconds < 10 ? `0${seconds}` : seconds;
    minutesLabel.textContent = minutes < 10 ? `0${minutes}` : minutes;

    if (minutes === workTime && isBreak === false) {
      takeBreak();
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

  // Settings
  const toggleSettings = () => {
    settingsContainer.classList.toggle("hidden");
    settingsBtn.classList.toggle("hidden");
  };
  settingsBtn.addEventListener("click", toggleSettings);

  closeBtn.addEventListener("click", toggleSettings);

  settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    workTime = parseInt(workDurationInput.value);
    shortBreakTime = parseInt(shortBreakDurationInput.value);
    longBreakTime = parseInt(longBreakDurationInput.value);
  });
});

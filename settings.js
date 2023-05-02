"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const settingsBtn = document.querySelector(".settings");
  const closeBtn = document.querySelector(".close");

  const darkBtn = document.querySelector(".dark");
  const lightBtn = document.querySelector(".light");
  let isDark = false;
  const body = document.body;

  const settingsContainer = document.querySelector(".container-left");
  const workDurationInput = document.querySelector(".work-duration");
  const shortBreakDurationInput = document.querySelector(
    ".short-break-duration"
  );
  const longBreakDurationInput = document.querySelector(".long-break-duration");
  const settingsForm = document.querySelector(".settings-form");

  let workTime = 25;
  let shortBreakTime = 5;
  let longBreakTime = 20;

  // Toggle settings visibility
  const toggleSettings = () => {
    settingsContainer.classList.toggle("hidden");
    settingsBtn.classList.toggle("hidden");
  };

  settingsBtn.addEventListener("click", toggleSettings);
  closeBtn.addEventListener("click", toggleSettings);

  // Update settings values and localStorage
  const updateLocalStorage = () => {
    localStorage.setItem("workTime", workTime);
    localStorage.setItem("shortBreakTime", shortBreakTime);
    localStorage.setItem("longBreakTime", longBreakTime);

    workDurationInput.value = workTime;
    shortBreakDurationInput.value = shortBreakTime;
    longBreakDurationInput.value = longBreakTime;
  };

  const updateSettings = () => {
    workTime = parseInt(workDurationInput.value);
    shortBreakTime = parseInt(shortBreakDurationInput.value);
    longBreakTime = parseInt(longBreakDurationInput.value);

    updateLocalStorage();
  };

  settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateSettings();
  });

  // Retrieve settings from localStorage
  if (localStorage.getItem("workTime")) {
    workTime = parseInt(localStorage.getItem("workTime"));
    workDurationInput.value = workTime;
  }

  if (localStorage.getItem("shortBreakTime")) {
    shortBreakTime = parseInt(localStorage.getItem("shortBreakTime"));
    shortBreakDurationInput.value = shortBreakTime;
  }

  if (localStorage.getItem("longBreakTime")) {
    longBreakTime = parseInt(localStorage.getItem("longBreakTime"));
    longBreakDurationInput.value = longBreakTime;
  }

  // Dark mode
  const toggleDarkMode = () => {
    isDark = !isDark;
    darkBtn.classList.toggle("hidden");
    lightBtn.classList.toggle("hidden");
    document.documentElement.style.setProperty(
      "--bg-color",
      isDark ? "#333333" : "#fafcff"
    );
    document.documentElement.style.setProperty(
      "--gray-color",
      isDark ? "#fafcff" : "#333333"
    );
  };

  darkBtn.addEventListener("click", toggleDarkMode);
  lightBtn.addEventListener("click", toggleDarkMode);
});

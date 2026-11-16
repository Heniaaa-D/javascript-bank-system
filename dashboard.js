import { getDataLocalStorage } from "./localStorage.js";
import { toogleCardNumber } from "./toogleCardNumber.js";

document.addEventListener("DOMContentLoaded", () => {
  const usersName = document.querySelector(".users-name");
  const profile = document.querySelector(".profile");
  const cardHolder = document.querySelector(".card-holder");
  const dashboard = document.querySelector(".dashboard");
  const cards = document.querySelector(".cards");
  const greetingUser = document.querySelector(".greeting");
  const eyeButton = document.querySelector(".eye-button");
  const cardNumber = document.querySelector(".card-number");
  const settings = document.querySelector(".settings");
  const people = document.querySelector(".people");
  const sendMoneyBtn = document.querySelector(".send-money-button");
  const transfer = document.querySelector(".transfer");

  const users = getDataLocalStorage("usersData");

  dashboard.addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });

  const currentPage = window.location.pathname;

  if (currentPage.includes("dashboard.html")) {
    document
      .querySelector(".dashboard-icon")
      .classList.add("active-background");
    document.querySelector(".dashboard-text").classList.add("active-text");
  }

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  profile.addEventListener("click", () => {
    window.location.href = `settings.html?id=${id}`;
  });

  cards.addEventListener("click", () => {
    window.location.href = `cards.html?id=${id}`;
  });

  settings.addEventListener("click", () => {
    window.location.href = `settings.html?id=${id}`;
  });

  people.addEventListener("click", () => {
    window.location.href = `people.html?id=${id}`;
  });

  transfer.addEventListener("click", () => {
    window.location.href = `transfer.html?id=${id}`;
  });

  sendMoneyBtn.addEventListener("click", () => {
    window.location.href = `transfer.html?id=${id}`;
  });

  toogleCardNumber(eyeButton, cardNumber);
  console.log(eyeButton);
  console.log(cardNumber);

  const user = users.find((user) => user.id === id);
  const initials = `${user.name[0]}${user.lastname[0]}`.toUpperCase();

  profile.textContent = initials;

  const hour = new Date().getHours();

  let greeting;

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  greetingUser.textContent = greeting;
  usersName.textContent = user.name;
  cardHolder.textContent = user.name;
});

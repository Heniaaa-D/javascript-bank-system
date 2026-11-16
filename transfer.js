import { getDataLocalStorage } from "./localStorage.js";
import { saveDataLocalStorage } from "./localStorage.js";

const transfer = document.querySelector(".transfer");
const dashboard = document.querySelector(".dashboard");
const cards = document.querySelector(".cards");
const people = document.querySelector(".people");
const settings = document.querySelector(".settings");
const cardsNumber = document.querySelector(".cards-number");
const currentPage = window.location.pathname;

if (currentPage.includes("transfer.html")) {
  document.querySelector(".transfer-icon").classList.add("active-background");
  document.querySelector(".transfer-text").classList.add("active-text");
}

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

dashboard.addEventListener("click", () => {
  window.location.href = `dashboard.html?id=${id}`;
});

cards.addEventListener("click", () => {
  window.location.href = `cards.html?id=${id}`;
});

people.addEventListener("click", () => {
  window.location.href = `people.html?id=${id}`;
});

settings.addEventListener("click", () => {
  window.location.href = `settings.html?id=${id}`;
});

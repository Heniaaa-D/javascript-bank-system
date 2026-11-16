import { getDataLocalStorage } from "./localStorage.js";
import { saveDataLocalStorage } from "./localStorage.js";

const dashboard = document.querySelector(".dashboard");
const cards = document.querySelector(".cards");
const settings = document.querySelector(".settings");
const usersName = document.querySelector(".users-name");
const usersPhone = document.querySelector(".users-phone");
const usersEmail = document.querySelector(".users-email");
const logOutBtn = document.querySelector(".logout-button");
const addPerson = document.querySelector(".add-person");
const personsContainer = document.querySelector(".person-container");
const peopleCounter = document.querySelector(".people-counter");
const transfer = document.querySelector(".transfer");

const currentPage = window.location.pathname;

if (currentPage.includes("people.html")) {
  document.querySelector(".people-icon").classList.add("active-background");
  document.querySelector(".people-text").classList.add("active-text");
}

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const users = getDataLocalStorage("usersData");

const user = users.find((user) => user.id === id);

dashboard.addEventListener("click", () => {
  window.location.href = `dashboard.html?id=${id}`;
});

cards.addEventListener("click", () => {
  window.location.href = `cards.html?id=${id}`;
});

settings.addEventListener("click", () => {
  window.location.href = `settings.html?id=${id}`;
});

transfer.addEventListener("click", () => {
  window.location.href = `transfer.html?id=${id}`;
});

function getInitials(firstName, lastName) {
  return `${firstName[0]}${lastName ? lastName[0] : ""}`.toUpperCase();
}

function getRandomColor() {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A8",
    "#A833FF",
    "#33FFF6",
    "#FFC300",
    "#FF6F61",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}

function getCurrentDateTime() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function addSinglePerson(user) {
  const div = document.createElement("div");
  const el = `
          <div
            class="border border-border bg-white rounded-[20px] p-4 flex items-center justify-between "
          >
            <div class="flex items-center gap-5">
              <div  style="background-color: ${getRandomColor()}" class="rounded-full  p-4">${getInitials(user.name, user.lastname)}</div>
              <div class="flex flex-col gap-2">
                <p class="text-black font-semibold">${user.name}</p>
                <p class="text-black/40 font-light">${user.email}</p>
                <p class="text-black/40 font-light">${getCurrentDateTime()}</p>
              </div>
            </div>
            <div
              class="border border-border bg-background py-2 px-3 rounded-full"
            >
              <i class="fa-regular fa-paper-plane text-terracotta"></i>
            </div>
          </div>
  `;
  div.innerHTML = el;
  personsContainer.appendChild(div);
}

document.addEventListener("DOMContentLoaded", () => {
  const users = getDataLocalStorage("usersData");

  users.forEach((person) => addSinglePerson(person));

  peopleCounter.textContent = `${users.length} people`;
});

addPerson.addEventListener("click", () => {
  const users = getDataLocalStorage("usersData");

  if (personsContainer.children.length === users.length) {
    alert("There are no more people to add.");
    return;
  }

  users.forEach((person) => {
    addSinglePerson(person);
  });

  peopleCounter.textContent = `${users.length} people`;
});

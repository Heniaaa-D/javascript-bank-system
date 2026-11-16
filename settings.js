import { getDataLocalStorage } from "./localStorage.js";
import { saveDataLocalStorage } from "./localStorage.js";

const dashboard = document.querySelector(".dashboard");
const cards = document.querySelector(".cards");
const usersName = document.querySelector(".users-name");
const usersPhone = document.querySelector(".users-phone");
const usersEmail = document.querySelector(".users-email");
const logOutBtn = document.querySelector(".logout-button");
const people = document.querySelector(".people");
const settingsLeftArrow = document.querySelector(".settings-left-arrow");
const changePasswordModal = document.querySelector(".change-password-modal");
const changePasswordBtn = document.querySelector(".change-password-button");
const closeModal = document.querySelector(".close-modal");
const saveChangesBtn = document.querySelector(".save-changes-button");
const currentPswInput = document.querySelector(".current-psw-input");
const newPswInput = document.querySelector(".new-psw-input");
const confirmNewPswInput = document.querySelector(".confirm-new-psw-input");
const profile = document.querySelector(".profile");
const usersNameLname = document.querySelector(".name-lastname");
const memberSince = document.querySelector(".member-since");
const cancelBtn = document.querySelector(".cancel-button ");
const transfer = document.querySelector(".transfer");

const users = getDataLocalStorage("usersData");

const currentPage = window.location.pathname;

if (currentPage.includes("settings.html")) {
  document.querySelector(".settings-icon").classList.add("active-background");
  document.querySelector(".settings-text").classList.add("active-text");
}

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const user = users.find((user) => user.id === id);
const initials = `${user.name[0]}${user.lastname[0]}`.toUpperCase();

profile.textContent = initials;

function getCurrentYear() {
  return new Date().getFullYear();
}

usersNameLname.textContent = `${user.name} ${user.lastname}`;
memberSince.textContent = `Member since ${getCurrentYear()}`;

dashboard.addEventListener("click", () => {
  window.location.href = `dashboard.html?id=${id}`;
});

transfer.addEventListener("click", () => {
  window.location.href = `transfer.html?id=${id}`;
});

cards.addEventListener("click", () => {
  window.location.href = `cards.html?id=${id}`;
});

people.addEventListener("click", () => {
  window.location.href = `people.html?id=${id}`;
});

usersName.textContent = `${user.name} ${user.lastname}`;
usersEmail.textContent = `${user.email}`;

logOutBtn.addEventListener("click", () => {
  window.location.href = "sign-in-account.html";
});

settingsLeftArrow.addEventListener("click", () => {
  history.back();
});

changePasswordBtn.addEventListener("click", () => {
  changePasswordModal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
  changePasswordModal.classList.add("hidden");
});

cancelBtn.addEventListener("click", () => {
  changePasswordModal.classList.add("hidden");
});

saveChangesBtn.addEventListener("click", () => {
  if (currentPswInput.value !== user.password) {
    document.querySelector(".incorrect-password").classList.remove("hidden");
    return;
  }

  if (newPswInput.value.length < 8) {
    document.querySelector(".psw-length").classList.remove("hidden");
    return;
  } else {
    document.querySelector(".psw-length").classList.add("hidden");
  }
  if (newPswInput.value !== confirmNewPswInput.value) {
    document.querySelector(".psw-dont-match").classList.remove("hidden");
    return;
  }

  if (
    (currentPswInput.value === user.password) &
    (newPswInput.value === confirmNewPswInput.value)
  ) {
    user.password = newPswInput.value;
    saveDataLocalStorage("usersData", users);
  }
});

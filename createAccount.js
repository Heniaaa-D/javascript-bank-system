import { setupPasswordToggle } from "./passwordToggle.js";
import { getDataLocalStorage } from "./localStorage.js";
import { saveDataLocalStorage } from "./localStorage.js";
const createAccountBtn = document.querySelector(".create-account-button");
const usersName = document.querySelector(".firstname-input");
const usersLastname = document.querySelector(".lastname-input");
const usersEmailAddress = document.querySelector(".email-address-input");
const usersPassword = document.querySelector(".password-input");
const usersConfirmPassword = document.querySelector(".confirm-password-input");
const noName = document.querySelector(".noName");
const noLname = document.querySelector(".noLname");
const noEmail = document.querySelector(".noEmail");
const noPsw = document.querySelector(".noPsw");
const noConfirmPsw = document.querySelector(".noConfirmPsw");
const emailExistsError = document.querySelector(".email-exists-error");

const pswError = document.querySelector(".psw-error");
const authInput = document.querySelector(".auth-input");

const users = getDataLocalStorage("usersData");

setupPasswordToggle();

const checkInput = (input, requiredElement) => {
  if (!input.value) {
    input.classList.add("error");
    requiredElement.classList.remove("hidden");
  } else {
    input.classList.remove("error");
    requiredElement.classList.add("hidden");
  }
};

createAccountBtn.addEventListener("click", () => {
  checkInput(usersName, noName);
  checkInput(usersLastname, noLname);
  checkInput(usersEmailAddress, noEmail);
  checkInput(usersPassword, noPsw);
  checkInput(usersConfirmPassword, noConfirmPsw);

  if (usersConfirmPassword.value !== usersPassword.value) {
    pswError.classList.remove("hidden");
    return;
  } else {
    pswError.classList.add("hidden");
  }

  if (
    !usersName.value ||
    !usersLastname.value ||
    !usersEmailAddress.value ||
    !usersPassword.value ||
    !usersConfirmPassword.value
  ) {
    return;
  }

  const id = Date.now();

  const usersCredintials = {
    id,
    name: usersName.value,
    lastname: usersLastname.value,
    email: usersEmailAddress.value,
    password: usersPassword.value,
  };

  const existingUser = users.some(
    (user) => user.email === usersEmailAddress.value,
  );

  if (existingUser) {
    return emailExistsError.classList.remove("hidden");
  }

  users.push(usersCredintials);
  saveDataLocalStorage("usersData", users);
  window.location.href = "sign-in-account.html";
});

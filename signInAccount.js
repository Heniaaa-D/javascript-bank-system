import { setupPasswordToggle } from "./passwordToggle.js";
import { getDataLocalStorage } from "./localStorage.js";
const signInBtn = document.querySelector(".sign-in-button");
const signInEmail = document.querySelector(".signIn-email-input");
const signInPsw = document.querySelector(".signIn-psw-input");
const noEmail = document.querySelector(".noEmail");
const noPsw = document.querySelector(".noPsw");
const invalidCredintials = document.querySelector(".invalid-credintials");
const usersData = getDataLocalStorage("usersData");

const checkInput = (input, requiredElement) => {
  if (!input.value) {
    input.classList.add("error");
    requiredElement.classList.remove("hidden");
  } else {
    input.classList.remove("error");
    requiredElement.classList.add("hidden");
  }
};

setupPasswordToggle();

signInBtn.addEventListener("click", () => {
  checkInput(signInEmail, noEmail);
  checkInput(signInPsw, noPsw);

  if (!signInEmail.value || !signInPsw.value) {
    return;
  }

  const loggedInUser = usersData.find((user) => {
    return (
      user.email === signInEmail.value && user.password === signInPsw.value
    );
  });

  const userId = loggedInUser?.id;

  if (!userId) {
    invalidCredintials.classList.remove("hidden");
    return;
  }

  window.location.href = `dashboard.html?id=${userId}`;
});

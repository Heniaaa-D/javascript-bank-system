export function setupPasswordToggle() {
  const passwordFields = document.querySelectorAll(".password-field");
  passwordFields.forEach((div) => {
    const input = div.querySelector("input");
    const eyeOpen = div.querySelector(".eye-open");
    const eyeClose = div.querySelector(".eye-closed");
    eyeClose.addEventListener("click", () => {
      eyeClose.classList.add("hidden");
      eyeOpen.classList.remove("hidden");
      input.type = "text";
    });
    eyeOpen.addEventListener("click", () => {
      eyeOpen.classList.add("hidden");
      eyeClose.classList.remove("hidden");
      input.type = "password";
    });
  });
}

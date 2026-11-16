export function toogleCardNumber(eyeButton, cardNumber) {
  const eyeOpen = eyeButton.querySelector(".eye-open");
  const eyeClosed = eyeButton.querySelector(".eye-closed");
  eyeOpen.addEventListener("click", () => {
    eyeOpen.classList.add("hidden");
    eyeClosed.classList.remove("hidden");
  });

  eyeClosed.addEventListener("click", () => {
    eyeClosed.classList.add("hidden");
    eyeOpen.classList.remove("hidden");
  });

  eyeButton.addEventListener("click", () => {
    const fullNumber = cardNumber.dataset.id;

    if (eyeOpen.classList.contains("hidden")) {
      cardNumber.textContent = `•••• •••• •••• ${fullNumber.slice(-4)}`;
    } else {
      cardNumber.textContent = fullNumber;
    }
  });
}

import { getDataLocalStorage } from "./localStorage.js";
import { saveDataLocalStorage } from "./localStorage.js";
import { toogleCardNumber } from "./toogleCardNumber.js";

const dashboard = document.querySelector(".dashboard");
const addCardButton = document.querySelector(".add-card-button");
const cardsContainer = document.querySelector(".cards-container");
const cardsCounter = document.querySelector(".cards-counter");
const cardLimit = document.querySelector(".card-limit");
const threeCardsLimit = document.querySelector(".three-cards-limit");
const removeOneCard = document.querySelector(".remove-one-card");
const addCardText = document.querySelector(".add-card-text");
const addText = document.querySelector(".add-text");
const addCardIcon = document.querySelector(".add-card-icon");
const addCardSection = document.getElementById("add-card-section");
const people = document.querySelector(".people");
const transfer = document.querySelector(".transfer");

const settings = document.querySelector(".settings");

const users = getDataLocalStorage("usersData");

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const user = users.find((user) => user.id === id);

dashboard.addEventListener("click", () => {
  window.location.href = `dashboard.html?id=${id}`;
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

function addSingleCard(card) {
  const div = document.createElement("div");
  const el = `
            <div
              id=${card.id}
              class="bg-white border border-border w-full rounded-[20px] p-5 flex flex-col gap-6 relative card-wrapper"
            >
              <div class="card-shadow frozen hidden"></div>
              <div data-gradient="${card.BgColor}"
                class="${card.BgColor} w-full card-gradient flex flex-col gap-5 p-4 rounded-[20px]"
              >
                <div class="flex justify-between items-center relative">
                  <div class="flex items-center gap-2">
                    <i class="fa-solid fa-fire text-white/80"></i>
                    <p class="text-white/90 text-[12px] font-semibold">
                      Ember Checking
                    </p>
                  </div>
                  <div  class="bg-transparent border border-white/10 w-6 h-4 rounded-xs"></div>
                  <div class="flex items-center p-2 rounded-full bg-black/35 text-white text-[12px] gap-2 absolute right-1 hidden frozen-text">
                  <i class="fa-solid fa-snowflake"></i>
                  <p class=" font-medium">Frozen</p>
                  </div>
                </div>

                <p data-id="${card.cardNumber}" class="text-white/90 card-number tracking-widest">${card.cardNumber}</p>
                <div class="flex justify-between items-center">
                  <div class="flex flex-col gap-0.5 card-holder-first">
                  <p class="text-[10px] text-white/80 font-light">CARD HOLDER</p>
                  <p class="text-white/90">${user.name}</p>
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <p class="text-[10px] text-white/80 font-light">EXPIRES</p>
                    <p class="text-white/90">${card.expireAt}</p>
                  </div>
                  <div  data-id="${card.id}"
                    class=" bg-transparent border border-white/10 p-1 rounded-md flex items-center justify-center eye-button"
                  >
                    <i  class="fa-solid fa-eye text-white/70 text-[10px] eye-open"></i>
                    <i class="fa-solid fa-eye-slash text-white/70 text-[10px] eye-closed hidden"></i>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-3 text-ink-text/60">
                <div class="flex justify-between">
                  <p class="font-semibold text-[10px]">LINKED BALANCE</p>
                  <p class="font-bold text-ink-text tracking-wider">
                    $0
                  </p>
                </div>
                  <p class="font-semibold text-[10px]">${card.status}</p>
                <div class="w-full h-2 bg-background rounded-md"></div>
                <div
                  class="border-b border-t border-border py-2 flex justify-between"
                >
                  <div class="flex items-center gap-1.5">
                    <i class="fa-solid fa-snowflake text-[12px]"></i>
                    <p class="font-bold text-[12px] text-ink-text">
                      Freeze card
                    </p>
                  </div>
                  <div
                    class="w-9 py-0.5 px-0.5 bg-background rounded-full relative card first-card z-20"
                  >
                    <div
                      class="rounded-full bg-white w-4 h-4 hidden absolute right-0.5 first-card switch-on cursor-pointer"
                    ></div>
                    <div
                      class="rounded-full bg-white w-4 h-4 switch-left absolute left-0.5 first-card switch-off cursor-pointer"
                    ></div>
                  </div>
                </div>
                <div
                  class="flex gap-2 items-center justify-center cursor-pointer"
                >
                  <i
                    class="fa-regular fa-trash-can text-ink-text/50 text-[10px]"
                  ></i>
                  <button data-id="${card.id}" class="text-ink-text/50 delete-card text-[10px] font-bold cursor-pointer">
                    Remove card
                  </button>
                </div>
              </div>
            </div>
    `;
  div.innerHTML = el;
  const addCardSection = document.getElementById("add-card-section");
  cardsContainer.insertBefore(div, addCardSection);
  const deleteButton = div.querySelector(".delete-card");
  deleteButton.addEventListener("click", () => {
    deleteCard(card.id);
  });

  const eyeButton = div.querySelector(".eye-button");
  const cardNumber = div.querySelector(".card-number");

  toogleCardNumber(eyeButton, cardNumber);

  const switchContainer = div.querySelector(".card-wrapper");
  const left = switchContainer.querySelector(".switch-left");
  const right = switchContainer.querySelector(".switch-on");
  const gradient = switchContainer.querySelector(".card-gradient");
  const shadow = switchContainer.querySelector(".card-shadow");
  const frozenText = switchContainer.querySelector(".frozen-text");

  left.addEventListener("click", () => {
    left.classList.add("hidden");
    right.classList.remove("hidden");

    shadow.classList.remove("hidden");

    gradient.classList.remove(
      "from-brick-primary",
      "to-brick-deep",
      "from-olive-positive",
      "to-olive",
    );

    frozenText.classList.remove("hidden");

    gradient.classList.add("from-[#6B3E26]", "to-[#3B1F12]");
  });

  right.addEventListener("click", () => {
    right.classList.add("hidden");
    left.classList.remove("hidden");

    shadow.classList.add("hidden");
    frozenText.classList.add("hidden");

    gradient.className = `${gradient.dataset.gradient} w-full card-gradient flex flex-col gap-5 p-4 rounded-[20px]`;
  });
}

function updateCardsUI() {
  const cards = getDataLocalStorage("cardsData");

  cardsCounter.textContent = `${cards.length} CARDS`;

  if (cards.length >= 3) {
    // Disable button
    addCardButton.disabled = true;
    addCardButton.classList.add("opacity-50", "cursor-not-allowed");

    // Change + to lock
    addCardIcon.classList.remove("fa-plus");
    addCardIcon.classList.add("fa-lock");

    // Show limit messages
    cardLimit.classList.remove("hidden");
    threeCardsLimit.classList.remove("hidden");
    removeOneCard.classList.remove("hidden");

    // Hide add text
    addCardText.classList.add("hidden");
    addText.classList.add("hidden");
  } else {
    // Enable button
    addCardButton.disabled = false;
    addCardButton.classList.remove("opacity-50", "cursor-not-allowed");

    // Change lock back to +
    addCardIcon.classList.remove("fa-lock");
    addCardIcon.classList.add("fa-plus");

    // Hide limit messages
    cardLimit.classList.add("hidden");
    threeCardsLimit.classList.add("hidden");
    removeOneCard.classList.add("hidden");

    // Show add text
    addCardText.classList.remove("hidden");
    addText.classList.remove("hidden");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname;

  if (page.includes("cards.html")) {
    document.querySelector(".cards-icon").classList.add("active-background");
    document.querySelector(".cards-text").classList.add("active-text");
  }

  const cards = getDataLocalStorage("cardsData");
  cards.forEach((card) => addSingleCard(card));
  updateCardsUI();
});

addCardButton.addEventListener("click", () => {
  function generate16DigitNumber() {
    let digits = "";
    for (let i = 0; i < 16; i++) {
      digits += Math.floor(Math.random() * 10);
    }
    return digits.match(/.{1,4}/g).join(" ");
  }

  const cardNumber = generate16DigitNumber();

  function generateBgColor() {
    const gradients = [
      "bg-linear-to-r from-brick-primary to-brick-deep",
      "bg-linear-to-r from-olive-positive to-olive",
    ];

    return gradients[Math.floor(Math.random() * gradients.length)];
  }

  const BgColor = generateBgColor();

  function generateExpireDate() {
    const today = new Date();

    const expireDate = new Date(today);
    expireDate.setFullYear(today.getFullYear() + 4);

    const month = String(expireDate.getMonth() + 1).padStart(2, "0");
    const year = String(expireDate.getFullYear()).slice(-2);

    return `${month}/${year}`;
  }

  const expireAt = generateExpireDate();

  const id = Date.now();

  const cardsData = {
    id,
    cardNumber,
    expireAt,
    BgColor,
    status: "active",
  };
  const cards = getDataLocalStorage("cardsData");
  cards.push(cardsData);
  saveDataLocalStorage("cardsData", cards);
  addSingleCard(cardsData);
  updateCardsUI();
});

const deleteCard = (id) => {
  const currentCard = document.getElementById(id);
  currentCard.parentElement.remove();
  const cards = getDataLocalStorage("cardsData");
  const filteredCards = cards.filter((card) => card.id != id);
  saveDataLocalStorage("cardsData", filteredCards);
  updateCardsUI();
};

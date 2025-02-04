"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_NO_CLICKS = 12; // Number of "No" clicks before "Yes" covers screen

let play = true;
let noCount = 0;

yesButton.addEventListener("click", function () {
  handleYesClick();
  sendWebhookMessage(); // Sends message to Discord webhook
});

noButton.addEventListener("click", function () {
  if (play) {
    noCount++;
    changeImage(noCount);
    resizeYesButton();
    updateNoButtonText();
    moveNoButton(); // Move "No" button to a new location

    if (noCount === MAX_NO_CLICKS) {
      play = false; // Stop further clicks
    }
  }
});

function handleYesClick() {
  titleElement.innerHTML = "Yayyy!! :3";
  buttonsContainer.classList.add("hidden");
  changeImage("yes");
  makeYesButtonFullScreen();
}

// Webhook function to send message to Discord
function sendWebhookMessage() {
  const webhookURL = "https://discordapp.com/api/webhooks/1336293436491567157/YduRmTT0NcJM6gUWO4rnyKROdv4ctD75NSFUbdrYS6IqeI39qbDNJvElnANEUsm-B23o"; // Replace with actual webhook URL

  const message = {
    content: "@everyone Someone clicked 'Yes' on your Valentine page! ❤️",
    username: "Valentine Bot",
    avatar_url: "https://your-image-url.com/avatar.png", // Optional
  };

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  })
    .then(response => {
      if (!response.ok) {
        console.error("Failed to send webhook:", response.statusText);
      }
    })
    .catch(error => console.error("Error sending webhook:", error));
}

// Makes the Yes button grow gradually until it covers the whole screen
function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.5;

  yesButton.style.fontSize = `${newFontSize}px`;

  // Increase padding so the button visually grows
  const padding = parseFloat(computedStyle.getPropertyValue("padding"));
  yesButton.style.padding = `${padding * 1.3}px ${padding * 1.5}px`;

  // On final click, make Yes button full screen
  if (noCount === MAX_NO_CLICKS) {
    makeYesButtonFullScreen();
  }
}

// Expands the Yes button to cover the entire screen
function makeYesButtonFullScreen() {
  yesButton.style.position = "fixed";
  yesButton.style.top = "0";
  yesButton.style.left = "0";
  yesButton.style.width = "100vw";
  yesButton.style.height = "100vh";
  yesButton.style.fontSize = "5rem"; // Make text visible
  yesButton.style.display = "flex";
  yesButton.style.alignItems = "center";
  yesButton.style.justifyContent = "center";
}

// Moves the "No" button to a random location to avoid being clicked too easily
function moveNoButton() {
  const screenWidth = window.innerWidth - noButton.offsetWidth;
  const screenHeight = window.innerHeight - noButton.offsetHeight;

  const randomX = Math.floor(Math.random() * screenWidth);
  const randomY = Math.floor(Math.random() * screenHeight);

  noButton.style.position = "absolute";
  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
}

// Generates new messages as "No" is clicked more times
function generateMessage(noCount) {
  const messages = [
    "No",
    "Are you sure?",
    "please",
    "Don't do this to me :(",
    "luh sakit",
    "I'm gonna cry...",
    "💔",
    "1+1=11",
    "maawa ka naman uwu",
    "i still see ur shadows in my room",
    "😭"
  ];

  const messageIndex = Math.min(noCount, messages.length - 1);
  return messages[messageIndex];
}

function changeImage(image) {
  catImg.src = `img/cat-${image}.jpg`;
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}

"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const FINAL_MESSAGE = "😭"; // Clicking this triggers full-screen "Yes"
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
    moveNoButton(); // Move "No" button randomly

    // If the crying emoji is shown, make the Yes button cover the screen
    if (noButton.innerHTML === FINAL_MESSAGE) {
      noButton.addEventListener("click", function () {
        makeYesButtonFullScreen();
        noButton.style.display = "none"; // Hide "No" button
        play = false;
      });
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
  const webhookURL = "YOUR_DISCORD_WEBHOOK_URL"; // Replace with actual webhook URL

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

// Makes the Yes button grow gradually
function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.5;

  yesButton.style.fontSize = `${newFontSize}px`;

  // Increase padding so the button visually grows
  const padding = parseFloat(computedStyle.getPropertyValue("padding"));
  yesButton.style.padding = `${padding * 1.3}px ${padding * 1.5}px`;
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

// Moves the "No" button to a random location
function moveNoButton() {
  const screenWidth = window.innerWidth - noButton.offsetWidth;
  const screenHeight = window.innerHeight - noButton.offsetHeight;

  const randomX = Math.floor(Math.random() * screenWidth);
  const randomY = Math.floor(Math.random() * screenHeight);

  noButton.style.position = "absolute";
  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
}

// Generates messages until the crying emoji (😭)
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
    "😭" // Final message that triggers full-screen "Yes"
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

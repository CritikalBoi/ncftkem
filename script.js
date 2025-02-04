"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_IMAGES = 5;

let play = true;
let noCount = 0;

yesButton.addEventListener("click", function () {
  handleYesClick();
  sendWebhookMessage(); // Added webhook function call
});

noButton.addEventListener("click", function () {
  if (play) {
    noCount++;
    const imageIndex = Math.min(noCount, MAX_IMAGES);
    changeImage(imageIndex);
    resizeYesButton();
    updateNoButtonText();
    if (noCount === MAX_IMAGES) {
      play = false;
    }
  }
});

function handleYesClick() {
  titleElement.innerHTML = "Yayyy!! :3";
  buttonsContainer.classList.add("hidden");
  changeImage("yes");
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

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.6;

  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messages = [
    "No",
    "Are you sure?",
    "Pookie please",
    "Don't do this to me :(",
    "You're breaking my heart",
    "I'm gonna cry...",
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

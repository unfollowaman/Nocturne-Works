const BOT_TOKEN = "8119956447:AAETYb4RgEuhll5J4SX4LsK24saiKm8NrJ0";
const CHAT_ID = "5432088118";

document.getElementById("messageForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const message = document.getElementById("message").value;

  const telegramURL =
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  fetch(telegramURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: `📩 New message:\n\n${message}`
    })
  })
  .then(response => {
    if (response.ok) {
      alert("Message sent.");
      e.target.reset();
    } else {
      alert("Failed to send message.");
    }
  })
  .catch(() => {
    alert("Network error.");
  });
});
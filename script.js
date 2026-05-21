const BOT_TOKEN = "actual bot token";
const CHAT_ID = "actual chat id";

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

// Logic to draw red string connections dynamically
function updateConnections() {
  const svg = document.getElementById('connections');
  if (!svg) return;

  svg.innerHTML = ''; // clear existing lines

  const heroText = document.getElementById('hero-center');
  const navBtns = document.querySelectorAll('.nav-btn');

  if (!heroText || navBtns.length === 0) return;

  const heroRect = heroText.getBoundingClientRect();
  const heroX = heroRect.left + heroRect.width / 2;
  const heroY = heroRect.top + heroRect.height / 2;

  const scrollY = window.scrollY;

  navBtns.forEach(btn => {
    // Attempt to find the pin inside the button to connect to
    const pin = btn.querySelector('.pin');
    let targetX, targetY;

    if (pin) {
      const pinRect = pin.getBoundingClientRect();
      targetX = pinRect.left + pinRect.width / 2;
      targetY = pinRect.top + pinRect.height / 2;
    } else {
      const btnRect = btn.getBoundingClientRect();
      targetX = btnRect.left + btnRect.width / 2;
      targetY = btnRect.top + btnRect.height / 2;
    }

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', heroX);
    line.setAttribute('y1', heroY + scrollY);
    line.setAttribute('x2', targetX);
    line.setAttribute('y2', targetY + scrollY);

    // Slight random bow/curve by making it a polyline or path could be done,
    // but a straight dashed line looks good for stretched thread too.
    svg.appendChild(line);
  });

  // Connect name label if it exists
  const nameLabel = document.getElementById('name-label');
  if (nameLabel) {
    const pin = nameLabel.querySelector('.pin');
    if (pin) {
      const pinRect = pin.getBoundingClientRect();
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', heroX);
      line.setAttribute('y1', heroY + scrollY);
      line.setAttribute('x2', pinRect.left + pinRect.width / 2);
      line.setAttribute('y2', pinRect.top + pinRect.height / 2 + scrollY);
      svg.appendChild(line);
    }
  }

  // Set SVG dimensions to full document height
  svg.setAttribute('width', document.documentElement.scrollWidth);
  svg.setAttribute('height', document.documentElement.scrollHeight);
}

// Ensure the functions are available globally if index.html calls them inline
window.updateConnections = updateConnections;

// Initialize connections after layout
window.addEventListener('load', () => {
  // small delay to ensure fonts and layout are ready
  setTimeout(updateConnections, 100);
});

// Update on resize or scroll if layout changes significantly
window.addEventListener('resize', updateConnections);
// window.addEventListener('scroll', updateConnections); // if absolute positioning breaks, but SVG is fixed/absolute at top

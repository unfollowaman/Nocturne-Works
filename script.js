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

    // Create cubic bezier curve for the rope
    const startX = heroX;
    const startY = heroY + scrollY;
    const endX = targetX;
    const endY = targetY + scrollY;

    // Control points for a slight natural droop
    const midX = (startX + endX) / 2;
    const droop = 30; // amount of droop in pixels
    const cp1X = startX + (endX - startX) * 0.25;
    const cp1Y = startY + (endY - startY) * 0.25 + droop;
    const cp2X = startX + (endX - startX) * 0.75;
    const cp2Y = startY + (endY - startY) * 0.75 + droop;

    const pathD = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;

    // Create shadow layer
    const shadowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    shadowPath.setAttribute('d', pathD);
    shadowPath.setAttribute('class', 'rope-shadow');
    svg.appendChild(shadowPath);

    // Create base layer
    const basePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    basePath.setAttribute('d', pathD);
    basePath.setAttribute('class', 'rope-base');
    svg.appendChild(basePath);

    // Create highlight layer
    const highlightPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    highlightPath.setAttribute('d', pathD);
    highlightPath.setAttribute('class', 'rope-highlight');
    svg.appendChild(highlightPath);

    // Create knot at the pin
    const knot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    knot.setAttribute('cx', endX);
    knot.setAttribute('cy', endY);
    knot.setAttribute('r', '5'); // 10px diameter
    knot.setAttribute('class', 'rope-knot');
    svg.appendChild(knot);
  });

  // Connect name label if it exists
  const nameLabel = document.getElementById('name-label');
  if (nameLabel) {
    const pin = nameLabel.querySelector('.pin');
    if (pin) {
      const pinRect = pin.getBoundingClientRect();
      const targetX = pinRect.left + pinRect.width / 2;
      const targetY = pinRect.top + pinRect.height / 2 + scrollY;

      const startX = heroX;
      const startY = heroY + scrollY;
      const endX = targetX;
      const endY = targetY;

      const midX = (startX + endX) / 2;
      const droop = 30;
      const cp1X = startX + (endX - startX) * 0.25;
      const cp1Y = startY + (endY - startY) * 0.25 + droop;
      const cp2X = startX + (endX - startX) * 0.75;
      const cp2Y = startY + (endY - startY) * 0.75 + droop;

      const pathD = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;

      // Create shadow layer
      const shadowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      shadowPath.setAttribute('d', pathD);
      shadowPath.setAttribute('class', 'rope-shadow');
      svg.appendChild(shadowPath);

      // Create base layer
      const basePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      basePath.setAttribute('d', pathD);
      basePath.setAttribute('class', 'rope-base');
      svg.appendChild(basePath);

      // Create highlight layer
      const highlightPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      highlightPath.setAttribute('d', pathD);
      highlightPath.setAttribute('class', 'rope-highlight');
      svg.appendChild(highlightPath);

      // Create knot at the pin
      const knot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      knot.setAttribute('cx', endX);
      knot.setAttribute('cy', endY);
      knot.setAttribute('r', '5');
      knot.setAttribute('class', 'rope-knot');
      svg.appendChild(knot);
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

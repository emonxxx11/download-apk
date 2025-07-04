const userRawUrl = 'https://raw.githubusercontent.com/emon606-tech/usr/main/user.txt';
const downloadLink = '/download'; // Backend route to download the zip file

function startDownload() {
  window.open(downloadLink, '_blank');
}

fetch(userRawUrl)
  .then(response => response.text())
  .then(data => {
    const count = (data.match(/user\s*=\s*/gi) || []).length;
    document.getElementById("user-count").textContent = `📊 Total Users: ${count}`;
  })
  .catch(() => {
    document.getElementById("user-count").textContent = '⚠️ Failed to load user data.';
  });

function openEmailModal() {
  document.getElementById('emailModal').style.display = 'flex';
}
function closeEmailModal() {
  document.getElementById('emailModal').style.display = 'none';
}
function copyEmail() {
  const email = document.getElementById('emailAddress').textContent;
  navigator.clipboard.writeText(email);
  const btn = document.getElementById('copyBtn');
  btn.textContent = 'Copied!';
  setTimeout(() => btn.textContent = 'Copy Email', 2000);
}

// Rain effect
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

function createRainDrop() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const length = Math.random() * 20 + 10;
  const speed = Math.random() * 2 + 2;
  return { x, y, length, speed };
}

for (let i = 0; i < 100; i++) {
  particles.push(createRainDrop());
}

function drawRain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1;

  particles.forEach(p => {
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x, p.y + p.length);
    ctx.stroke();
    p.y += p.speed;
    if (p.y > canvas.height) {
      p.y = -p.length;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawRain);
}

drawRain();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const userRawUrl = 'https://raw.githubusercontent.com/emon606-tech/usr/main/user.txt';
const downloadLink = 'https://missionpay-backend-production.up.railway.app/download';

const downloadBtn = document.getElementById('downloadBtn');
const gmailIcon = document.getElementById('gmailIcon');
const emailModal = document.getElementById('emailModal');
const closeModalBtn = document.getElementById('closeModal');
const copyBtn = document.getElementById('copyBtn');

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = downloadLink;
  link.download = '';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

fetch(userRawUrl)
  .then(response => response.text())
  .then(data => {
    const count = (data.match(/user\s*=\s*/gi) || []).length;
    document.getElementById("user-count").textContent = `📊 Total Users: ${count}`;
  })
  .catch(() => {
    document.getElementById("user-count").textContent = '⚠️ Failed to load user data.';
  });

gmailIcon.addEventListener('click', (e) => {
  e.preventDefault();
  emailModal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
  emailModal.style.display = 'none';
});

copyBtn.addEventListener('click', () => {
  const email = document.getElementById('emailAddress').textContent;
  navigator.clipboard.writeText(email);
  copyBtn.textContent = 'Copied!';
  setTimeout(() => copyBtn.textContent = 'Copy Email', 2000);
});

// Rain animation
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = Array.from({ length: 100 }, () => createRainDrop());

function createRainDrop() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const length = Math.random() * 20 + 10;
  const speed = Math.random() * 2 + 2;
  return { x, y, length, speed };
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

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const container = document.querySelector(".container");

/* ---------- Magnet-like repulsion logic ---------- */
function repel(x, y) {
    const rect = noBtn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    const dx = btnX - x;
    const dy = btnY - y;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = 120;

    if (distance < minDistance) {
        const force = (minDistance - distance) / minDistance;
        const moveX = dx * force * 2;
        const moveY = dy * force * 2;

        let newLeft = noBtn.offsetLeft + moveX;
        let newTop = noBtn.offsetTop + moveY;

        // Keep button inside viewport
        const maxX = window.innerWidth - noBtn.offsetWidth;
        const maxY = window.innerHeight - noBtn.offsetHeight;

        newLeft = Math.max(0, Math.min(maxX, newLeft));
        newTop = Math.max(0, Math.min(maxY, newTop));

        noBtn.style.left = newLeft + "px";
        noBtn.style.top = newTop + "px";
    }
}

/* Desktop mouse movement */
document.addEventListener("mousemove", (e) => {
    repel(e.clientX, e.clientY);
});

/* Mobile touch movement */
document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    repel(touch.clientX, touch.clientY);
}, { passive: false });

/* ---------- Yes button ---------- */
yesBtn.addEventListener("click", () => {
    container.innerHTML = `<div class="success">Yay! 💖🥰</div>`;
    createHearts();
});

/* ---------- Hearts ---------- */
function createHearts() {
    for (let i = 0; i < 18; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = "💖";
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.bottom = "0px";
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 3000);
    }
}

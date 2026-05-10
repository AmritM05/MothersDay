const openMessageBtn = document.getElementById("open-message");
const messageSection = document.getElementById("message");
const surpriseBtn = document.getElementById("surprise-btn");
const surpriseMessage = document.getElementById("surprise-message");
const burstContainer = document.getElementById("surprise-burst");
const surpriseRevealTargets = document.querySelectorAll(".surprise-reveal-target");
const floatingContainer = document.getElementById("floating-elements");

// Customize animation density here if you want more or fewer floating hearts.
const FLOATING_HEART_COUNT = 24;

if (openMessageBtn && messageSection) {
  openMessageBtn.addEventListener("click", () => {
    messageSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -30px 0px",
  }
);

revealElements.forEach((el) => observer.observe(el));

if (surpriseBtn && surpriseMessage && burstContainer) {
  surpriseBtn.addEventListener("click", () => {
    surpriseMessage.classList.add("show");
    surpriseRevealTargets.forEach((el) => el.classList.add("show"));
    runSurpriseBurst(36);

    surpriseBtn.textContent = "Surprise Opened";
    surpriseBtn.disabled = true;
    surpriseBtn.style.opacity = "0.85";
    surpriseBtn.style.cursor = "default";
  });
}

function runSurpriseBurst(count) {
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.className = "burst-heart";
    heart.innerHTML = "&#10084;";

    // Random offsets create a confetti-like scatter from the center.
    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 190;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    heart.style.setProperty("--x", `${x}px`);
    heart.style.setProperty("--y", `${y}px`);
    heart.style.fontSize = `${10 + Math.random() * 16}px`;
    heart.style.animationDelay = `${Math.random() * 180}ms`;
    heart.style.color = randomHeartColor();

    burstContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1200);
  }
}

function createFloatingHearts() {
  if (!floatingContainer) {
    return;
  }

  for (let i = 0; i < FLOATING_HEART_COUNT; i += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.innerHTML = "&#10084;";

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${8 + Math.random() * 12}s`;
    heart.style.animationDelay = `${Math.random() * 11}s`;
    heart.style.fontSize = `${10 + Math.random() * 14}px`;
    heart.style.opacity = `${0.15 + Math.random() * 0.45}`;

    floatingContainer.appendChild(heart);
  }
}

function randomHeartColor() {
  const palette = [
    "rgba(139,79,213,0.96)",
    "rgba(106,58,178,0.96)",
    "rgba(231,76,159,0.94)",
    "rgba(216,168,255,0.95)",
    "rgba(175,100,220,0.95)",
  ];
  return palette[Math.floor(Math.random() * palette.length)];
}

createFloatingHearts();

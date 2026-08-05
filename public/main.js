/* ---------------- ASTRONAUT MODULE ---------------- */

const astroLines = [
  "Space is cold. Send snacks.",
  "Nolan, I drift therefore I am.",
  "Zero gravity? More like zero motivation.",
  "I saw a space whale once. It winked.",
  "This flag is heavy emotionally.",
  "I’m not lost. I’m exploring.",
];

function showAstronautBubble() {
  const bubble = document.getElementById("astro-bubble");
  const line = astroLines[Math.floor(Math.random() * astroLines.length)];
  bubble.textContent = line;
  bubble.style.opacity = 1;
  setTimeout(() => {
    bubble.style.opacity = 0;
  }, 5000);
}

setInterval(showAstronautBubble, 25000);


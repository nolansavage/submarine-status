// Simple helper
function $(id) {
  return document.getElementById(id);
}

/* ---------------- ASTRONAUT ---------------- */

const astroLines = [
  "Space is cold. Send snacks.",
  "Nolan, I drift therefore I am.",
  "Zero gravity? More like zero motivation.",
  "I saw a space whale once. It winked.",
  "This flag is heavy emotionally.",
  "I’m not lost. I’m exploring.",
];

function showAstronautBubble() {
  const bubble = $("astro-bubble");
  const line = astroLines[Math.floor(Math.random() * astroLines.length)];
  bubble.textContent = line;
  bubble.style.opacity = 1;
  setTimeout(() => {
    bubble.style.opacity = 0;
  }, 5000);
}

setInterval(showAstronautBubble, 25000);

/* ---------------- MUSIC VISUALIZER ---------------- */

const bars = Array.from(document.querySelectorAll("#visualizerBars .bar"));

function pulseVisualizer() {
  bars.forEach(bar => {
    const h = 10 + Math.random() * 50;
    bar.style.height = `${h}px`;
  });
}

setInterval(pulseVisualizer, 300);

/* ---------------- BREAKING NEWS ---------------- */

// NOTE: Replace this with a real news API + key if you want live headlines.
const mockNews = [
  "NASA announces new lunar EVA schedule.",
  "Ontario issues updated weather advisory.",
  "Major tech firm reveals new AI hardware.",
  "International summit begins in Geneva.",
  "Markets react to sector volatility.",
];

function updateNews() {
  const body = $("newsBody");
  body.innerHTML = "";
  mockNews.forEach(h => {
    const p = document.createElement("p");
    p.textContent = "• " + h;
    body.appendChild(p);
  });
}

updateNews();

/* ---------------- SYSTEM GLITCHES ---------------- */

const glitchMessages = [
  "Quantum flux spike detected.",
  "Temporal echo from future self.",
  "Hull resonance anomaly.",
  "Ghost packet in network buffer.",
  "Unclassified subspace interference.",
];

function addGlitch() {
  const log = $("glitchLog");
  const msg = glitchMessages[Math.floor(Math.random() * glitchMessages.length)];
  const p = document.createElement("p");
  p.textContent = msg;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
}

setInterval(addGlitch, 45000);

/* ---------------- TRANSMISSIONS ---------------- */

const transmissions = [
  "Encrypted message received. Decoding…",
  "Message: Stay hydrated.",
  "Message: The universe is watching.",
  "Message: You’re doing great, Nolan.",
  "Message: Do not feed the reactor.",
];

function updateTransmission() {
  const body = $("transmissionBody");
  const msg = transmissions[Math.floor(Math.random() * transmissions.length)];
  body.innerHTML = `<p>${msg}</p>`;
}

setInterval(updateTransmission, 60000);

/* ---------------- CREW SYSTEM ---------------- */

const crew = [
  {
    id: "nolan",
    name: "Captain Nolan",
    role: "Command",
    mood: "calm",
    portrait: "img/crew_nolan.png",
  },
  {
    id: "ai",
    name: "AI Core Unit‑7",
    role: "Ship AI",
    mood: "annoyed",
    portrait: "img/crew_ai.png",
  },
  {
    id: "marla",
    name: "Chief Marla",
    role: "Engineering",
    mood: "stressed",
    portrait: "img/crew_marla.png",
  },
  {
    id: "jax",
    name: "Officer Jax",
    role: "Sonar",
    mood: "chill",
    portrait: "img/crew_jax.png",
  },
  {
    id: "pip",
    name: "Janitor Pip",
    role: "Maintenance",
    mood: "missing",
    portrait: "img/crew_pip.png",
  },
];

// Simple mood rotation
const moods = ["calm", "annoyed", "stressed", "confused", "excited", "bored", "panicking", "suspicious", "sleepy"];

function randomMood() {
  return moods[Math.floor(Math.random() * moods.length)];
}

function renderCrewStatus() {
  const list = $("crewStatusList");
  list.innerHTML = "";
  crew.forEach(member => {
    const li = document.createElement("li");
    li.textContent = `${member.name} ........ ${member.mood.toUpperCase()}`;
    list.appendChild(li);
  });
}

function renderCrewPortraitRow() {
  const row = $("crewPortraitRow");
  row.innerHTML = "";
  crew.forEach(member => {
    const div = document.createElement("div");
    div.className = "crew-portrait";

    const img = document.createElement("img");
    img.src = member.portrait; // add your 32x32 Stardew-style sprites here

    const info = document.createElement("div");
    const name = document.createElement("div");
    name.textContent = member.name;
    const role = document.createElement("div");
    role.textContent = member.role;
    const mood = document.createElement("div");
    mood.className = "crew-mood";
    mood.textContent = `Mood: ${member.mood}`;

    info.appendChild(name);
    info.appendChild(role);
    info.appendChild(mood);

    div.appendChild(img);
    div.appendChild(info);
    row.appendChild(div);
  });
}

function addCrewLine(member, text) {
  const log = $("crewLog");
  const line = document.createElement("div");
  line.className = "crew-line";

  const img = document.createElement("img");
  img.src = member.portrait;

  const nameSpan = document.createElement("span");
  nameSpan.className = "name";
  nameSpan.textContent = member.name + ":";

  const textSpan = document.createElement("span");
  textSpan.textContent = " " + text;

  line.appendChild(img);
  line.appendChild(nameSpan);
  line.appendChild(textSpan);
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}

// Hybrid personality: some canned flavor + simple dynamic generation
function generateCrewResponse(member, userText) {
  const lower = userText.toLowerCase();
  const mood = member.mood;

  // Simple intent detection
  const askingStatus = lower.includes("status") || lower.includes("report");
  const askingWhere = lower.includes("where");
  const askingReactor = lower.includes("reactor");
  const askingGlitch = lower.includes("glitch");
  const askingSonar = lower.includes("sonar");

  if (member.id === "marla") {
    if (askingReactor || askingStatus) {
      if (mood === "stressed" || mood === "panicking") {
        return "The reactor is humming in a way I don’t like. If it explodes, I’m blaming Pip.";
      }
      return "Reactor’s stable-ish. I wouldn’t bet my lunch on it.";
    }
    if (askingGlitch) {
      return "Every glitch is just the universe screaming at our wiring.";
    }
    return "I’m busy keeping this bucket of bolts together with duct tape and spite.";
  }

  if (member.id === "ai") {
    if (askingGlitch || askingStatus) {
      return "I have detected multiple anomalies. None are fatal. Yet.";
    }
    if (lower.includes("malfunction")) {
      return "I do not malfunction. I simply exceed expectations in unconventional ways.";
    }
    return "Statistically, most of our problems are human-made. I am merely observing.";
  }

  if (member.id === "jax") {
    if (askingSonar || askingStatus) {
      return "Sonar picked up something big and weird. I’m pretending I didn’t hear it.";
    }
    return "If the universe is infinite, so are my problems.";
  }

  if (member.id === "pip") {
    if (askingWhere) {
      return "In the vents. I found a sandwich. It winked at me.";
    }
    return "I saw the astronaut again. He waved. I think we’re friends now.";
  }

  if (member.id === "nolan") {
    if (askingStatus || askingReport) {
      return "We’re fine. Probably. I choose to believe that.";
    }
    return "Command is calm. Or pretending to be.";
  }

  // Fallback generic
  return "I’m thinking about that and choosing not to panic.";
}

// group chatter
function crewAmbientChatter() {
  const member = crew[Math.floor(Math.random() * crew.length)];
  const lines = {
    nolan: [
      "If anyone touches my coffee mug again, I swear.",
      "We are not lost. We are exploring.",
    ],
    ai: [
      "Sarcasm detected. Logging it as a threat.",
      "I am not malfunctioning. I am improvising.",
    ],
    marla: [
      "If it explodes, that’s on you.",
      "I need more duct tape. And snacks.",
    ],
    jax: [
      "I swear I heard a space whale.",
      "Something is out there. Probably friendly.",
    ],
    pip: [
      "Someone spilled cosmic goo again.",
      "I found a sandwich in the ventilation shaft.",
    ],
  };

  const pool = lines[member.id] || ["I have thoughts. They are chaotic."];
  const text = pool[Math.floor(Math.random() * pool.length)];
  addCrewLine(member, text);
}

setInterval(crewAmbientChatter, 40000);

/* ---------------- CREW CHAT INPUT ---------------- */

$("crewSend").addEventListener("click", handleCrewInput);
$("crewInput").addEventListener("keydown", e => {
  if (e.key === "Enter") handleCrewInput();
});

function handleCrewInput() {
  const input = $("crewInput");
  const raw = input.value.trim();
  if (!raw) return;

  // Echo user line
  const log = $("crewLog");
  const userLine = document.createElement("div");
  userLine.className = "crew-line";
  const userName = document.createElement("span");
  userName.className = "name";
  userName.textContent = "You:";
  const userText = document.createElement("span");
  userText.textContent = " " + raw;
  userLine.appendChild(userName);
  userLine.appendChild(userText);
  log.appendChild(userLine);
  log.scrollTop = log.scrollHeight;

  input.value = "";

  // Parse target
  const lower = raw.toLowerCase();
  let target = null;
  if (lower.startsWith("crew ")) {
    const afterCrew = lower.slice(5);
    if (afterCrew.startsWith("all")) {
      target = "all";
    } else if (afterCrew.startsWith("nolan")) {
      target = "nolan";
    } else if (afterCrew.startsWith("ai")) {
      target = "ai";
    } else if (afterCrew.startsWith("marla")) {
      target = "marla";
    } else if (afterCrew.startsWith("jax")) {
      target = "jax";
    } else if (afterCrew.startsWith("pip")) {
      target = "pip";
    }
  }

  const messagePart = raw.split(":").slice(1).join(":").trim() || raw;

  if (target === "all") {
    crew.forEach(member => {
      member.mood = randomMood();
      const text = generateCrewResponse(member, messagePart);
      addCrewLine(member, text);
    });
  } else {
    const member = crew.find(c => c.id === target) || crew[0];
    member.mood = randomMood();
    const text = generateCrewResponse(member, messagePart);
    addCrewLine(member, text);
  }

  renderCrewStatus();
  renderCrewPortraitRow();
}

/* ---------------- INIT ---------------- */

renderCrewStatus();
renderCrewPortraitRow();

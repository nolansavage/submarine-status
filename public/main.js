// Clock + uptime
let startTime = Date.now();

function pad(n) {
  return n < 10 ? "0" + n : "" + n;
}

function updateClock() {
  const now = new Date();
  const h = pad(now.getHours());
  const m = pad(now.getMinutes());
  const s = pad(now.getSeconds());
  document.getElementById("clock").textContent = `${h}:${m}:${s}`;
}

function updateUptime() {
  const diff = Date.now() - startTime;
  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  document.getElementById("uptime").textContent =
    `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

// Diagnostics
function populateDiagnostics() {
  const nav = navigator;
  document.getElementById("os").textContent = nav.userAgent;

  document.getElementById("browser").textContent = nav.userAgentData
    ? nav.userAgentData.brands.map(b => b.brand).join(", ")
    : "Unknown";

  document.getElementById("cores").textContent =
    nav.hardwareConcurrency || "N/A";

  if (nav.deviceMemory) {
    document.getElementById("memory").textContent = nav.deviceMemory.toFixed(1);
  } else {
    document.getElementById("memory").textContent = "N/A";
  }

  document.getElementById("screen").textContent =
    `${window.screen.width} x ${window.screen.height}`;

  if (nav.getBattery) {
    nav.getBattery().then(battery => {
      const pct = Math.round(battery.level * 100);
      const status = battery.charging ? "CHARGING" : "DISCHARGING";
      document.getElementById("battery").textContent = `${pct}% (${status})`;
    }).catch(() => {
      document.getElementById("battery").textContent = "N/A";
    });
  } else {
    document.getElementById("battery").textContent = "N/A";
  }
}

// Alerts
const alertMessages = [
  "Hull integrity nominal.",
  "Pressure stable across all compartments.",
  "Sonar sweep complete. No hostiles detected.",
  "Thermal vents detected off port side.",
  "Navigation buoy acquired.",
  "Communications link stable.",
  "Ballast tanks balanced.",
  "Engine output within safe parameters.",
  "External temperature within expected range.",
  "Radiation levels nominal."
];

function pushAlert(msg) {
  const log = document.getElementById("alerts-log");
  const li = document.createElement("li");
  const ts = new Date().toLocaleTimeString();
  li.textContent = `[${ts}] ${msg}`;
  log.insertBefore(li, log.firstChild);
  while (log.children.length > 12) {
    log.removeChild(log.lastChild);
  }
}

function startAlerts() {
  pushAlert("System startup complete. All stations nominal.");
  setInterval(() => {
    const msg = alertMessages[Math.floor(Math.random() * alertMessages.length)];
    pushAlert(msg);
  }, 7000);
}

// Terminal
function pushTerminal(text) {
  const out = document.getElementById("terminal-output");
  const line = document.createElement("div");
  line.textContent = text;
  out.appendChild(line);
  out.scrollTop = out.scrollHeight;
}

function handleCommand(cmd) {
  const c = cmd.trim().toLowerCase();
  if (!c) return;

  pushTerminal("> " + cmd);

  switch (c) {
    case "help":
      pushTerminal("Commands: status, diagnostics, sonar, map, gps, clear, help");
      break;
    case "status":
      pushTerminal("All systems nominal. Mission time increasing.");
      break;
    case "diagnostics":
      pushTerminal("Diagnostics panel shows current system status.");
      break;
    case "sonar":
      pushTerminal("Sonar sweep active. No anomalies detected.");
      break;
    case "map":
      pushTerminal("Tactical map tracking current position or Oshawa fallback.");
      break;
    case "gps":
      pushTerminal("Attempting GPS lock via navigation control...");
      forceGPSLock();
      break;
    case "clear":
      document.getElementById("terminal-output").innerHTML = "";
      break;
    default:
      pushTerminal("Unknown command. Type 'help' for list.");
  }
}

// Weather (mocked for Oshawa)
function loadWeather() {
  const conditions = [
    "Overcast with lake-effect clouds.",
    "Cold, clear night over Oshawa.",
    "Rain showers moving in from the west.",
    "Fog rolling in over the shoreline.",
    "Windy with scattered clouds.",
    "Calm skies, high visibility."
  ];
  const cond = conditions[Math.floor(Math.random() * conditions.length)];
  const temp = (Math.random() * 15 - 5).toFixed(1);
  const wind = (Math.random() * 30).toFixed(0);
  const humidity = (60 + Math.random() * 30).toFixed(0);

  document.getElementById("weather-condition").textContent = cond;
  document.getElementById("weather-temp").textContent = `${temp} °C`;
  document.getElementById("weather-wind").textContent = `${wind} km/h`;
  document.getElementById("weather-humidity").textContent = `${humidity}%`;
}

// Reddit placeholder
function loadRedditPlaceholder() {
  const list = document.getElementById("reddit-trending");
  list.innerHTML = "";

  const items = [
    "r/AskReddit — \"What’s a subtle sign someone is not okay?\"",
    "r/technology — \"New GPU architecture shakes up the market.\"",
    "r/gaming — \"Underrated indie games you should try.\"",
    "r/canada — \"Lake-effect weather stories from Ontario.\"",
    "r/programming — \"Show off your side projects.\""
  ];

  items.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    list.appendChild(li);
  });
}

// Engine status
function randomEngineStatus() {
  const heatStates = ["NORMAL", "ELEVATED", "HIGH", "CRITICAL"];
  const thrustStates = ["STABLE", "INCREASING", "DECREASING"];
  document.getElementById("engine-heat").textContent =
    heatStates[Math.floor(Math.random() * heatStates.length)];
  document.getElementById("engine-thrust").textContent =
    thrustStates[Math.floor(Math.random() * thrustStates.length)];
}

// GPS Map
let map;
let gpsMarker;

function initMap(lat, lon) {
  if (!map) {
    map = L.map("map").setView([lat, lon], 13);
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19 }
    ).addTo(map);
  } else {
    map.setView([lat, lon], 13);
  }

  if (gpsMarker) gpsMarker.remove();

  gpsMarker = L.circleMarker([lat, lon], {
    radius: 6,
    color: "#00ffff",
    fillColor: "#00ffff",
    fillOpacity: 0.8
  }).addTo(map);
}

function setupGPSMapInitial() {
  initMap(43.8971, -78.8658);
  document.getElementById("gps-last-fix").textContent = "OSHAWA (FALLBACK)";
}

function forceGPSLock() {
  if (!navigator.geolocation) {
    pushTerminal("GPS not available on this device.");
    document.getElementById("engine-nav").textContent = "OFFLINE";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      initMap(latitude, longitude);
      const fixText = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
      document.getElementById("gps-last-fix").textContent = fixText;
      document.getElementById("engine-nav").textContent = "LOCKED";
      pushTerminal(`GPS lock acquired: ${fixText}.`);
    },
    () => {
      pushTerminal("GPS denied or unavailable. Holding position over Oshawa.");
      document.getElementById("engine-nav").textContent = "OFFLINE";
      document.getElementById("gps-last-fix").textContent = "OSHAWA (FALLBACK)";
      initMap(43.8971, -78.8658);
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
}

// Crew deck
const crew = [
  { name: "Nolan", role: "Commander", status: "FOCUSED" },
  { name: "Mira", role: "Navigator", status: "PLOTTING COURSE" },
  { name: "Jax", role: "Engineer", status: "TUNING REACTOR" },
  { name: "Sol", role: "Comms", status: "LISTENING IN" },
  { name: "Pip", role: "AI Assistant", status: "ONLINE" }
];

function renderCrewRoster() {
  const roster = document.getElementById("crew-roster");
  if (!roster) return;
  roster.innerHTML = "";
  crew.forEach(member => {
    const li = document.createElement("li");

    const nameSpan = document.createElement("span");
    nameSpan.className = "crew-name";
    nameSpan.textContent = member.name;

    const roleSpan = document.createElement("span");
    roleSpan.className = "crew-role";
    roleSpan.textContent = member.role;

    const statusSpan = document.createElement("span");
    statusSpan.className = "crew-status";
    statusSpan.textContent = member.status;

    li.appendChild(nameSpan);
    li.appendChild(roleSpan);
    li.appendChild(statusSpan);
    roster.appendChild(li);
  });
}

function pushCrewLog(text) {
  const log = document.getElementById("crew-log");
  if (!log) return;
  const line = document.createElement("div");
  const ts = new Date().toLocaleTimeString();
  line.textContent = `[${ts}] ${text}`;
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}

// Crew chatter
const crewChatter = {
  Nolan: [
    "All systems holding steady.",
    "Crew morale looks good.",
    "Let’s keep this mission clean."
  ],
  Mira: [
    "Course plotted. No anomalies.",
    "Stars look calm tonight.",
    "Navigation grid is stable."
  ],
  Jax: [
    "Reactor hum is perfect.",
    "I tightened the plasma coupler again.",
    "If something explodes, it wasn’t me."
  ],
  Sol: [
    "Comms are quiet… too quiet.",
    "Picking up faint signals.",
    "I swear I heard whispering in the static."
  ],
  Pip: [
    "Hello Nolan! Pip online!",
    "I am monitoring all systems!",
    "I detected a 0.00001% anomaly. Probably nothing!",
    "Beep boop! Crew status nominal!"
  ]
};

function randomCrewMessage() {
  const names = Object.keys(crewChatter);
  const speaker = names[Math.floor(Math.random() * names.length)];
  const lines = crewChatter[speaker];
  const line = lines[Math.floor(Math.random() * lines.length)];
  pushCrewLog(`${speaker}: ${line}`);
}

// Astronaut speech
const astroLines = [
  "Space is cold. Send snacks.",
  "Nolan, I drift therefore I am.",
  "Zero gravity, maximum vibes.",
  "I’m not lost. Just exploring.",
  "Crew looks solid from up here.",
  "Submarine in space? Sure, why not."
];

function showAstronautBubble() {
  const bubble = document.getElementById("astro-bubble");
  if (!bubble) return;
  const line = astroLines[Math.floor(Math.random() * astroLines.length)];
  bubble.textContent = line;
  bubble.style.opacity = 1;
  setTimeout(() => {
    bubble.style.opacity = 0;
  }, 5000);
}

// Deep space navigation
function updateStarTracker() {
  const headingEl = document.getElementById("star-heading");
  const driftEl = document.getElementById("star-drift");
  if (!headingEl || !driftEl) return;

  const heading = Math.floor(Math.random() * 360);
  const driftStates = ["STABLE", "MINOR", "MODERATE", "WILD"];
  const drift = driftStates[Math.floor(Math.random() * driftStates.length)];

  headingEl.textContent = `${heading.toString().padStart(3, "0")}°`;
  driftEl.textContent = drift;
}

function pushAsteroidPing(msg) {
  const log = document.getElementById("asteroid-radar-log");
  if (!log) return;
  const li = document.createElement("li");
  const ts = new Date().toLocaleTimeString();
  li.textContent = `[${ts}] ${msg}`;
  log.insertBefore(li, log.firstChild);
  while (log.children.length > 10) {
    log.removeChild(log.lastChild);
  }
}

function updateAsteroidRadar() {
  const distances = ["CLOSE", "NEAR", "MID-RANGE", "DISTANT"];
  const sizes = ["SMALL", "MEDIUM", "LARGE", "CLUSTER"];
  const dist = distances[Math.floor(Math.random() * distances.length)];
  const size = sizes[Math.floor(Math.random() * sizes.length)];
  pushAsteroidPing(`Asteroid contact: ${size}, ${dist}.`);
}

const galaxySectors = [
  { sector: "A-01", status: "CALM" },
  { sector: "B-12", status: "MINOR STORMS" },
  { sector: "C-07", status: "ASTEROID DENSE" },
  { sector: "D-44", status: "SOLAR FLARE RISK" },
  { sector: "E-99", status: "UNKNOWN SIGNALS" }
];

function updateGalaxyMap() {
  const sectorEl = document.getElementById("galaxy-sector");
  const statusEl = document.getElementById("galaxy-status");
  if (!sectorEl || !statusEl) return;

  const pick = galaxySectors[Math.floor(Math.random() * galaxySectors.length)];
  sectorEl.textContent = pick.sector;
  statusEl.textContent = pick.status;
}

// Aerial Traffic Monitor — Live Aircraft
function pushAirTraffic(msg) {
  const log = document.getElementById("air-traffic-log");
  if (!log) return;

  const li = document.createElement("li");
  const ts = new Date().toLocaleTimeString();
  li.textContent = `[${ts}] ${msg}`;

  log.insertBefore(li, log.firstChild);

  while (log.children.length > 15) {
    log.removeChild(log.lastChild);
  }
}

async function updateAirTraffic() {
  try {
    // Oshawa bounding box (approx)
    const url =
      "https://opensky-network.org/api/states/all?lamin=43.8&lomin=-79.1&lamax=44.1&lomax=-78.7";

    const res = await fetch(url);
    const data = await res.json();

    if (!data.states || data.states.length === 0) {
      pushAirTraffic("No aircraft detected in local airspace.");
      return;
    }

    const plane = data.states[0]; // first plane

    const callsign = plane[1] ? plane[1].trim() : "UNKNOWN";
    const altitude = plane[13] ? Math.round(plane[13]) + " m" : "N/A";
    const velocity = plane[9] ? Math.round(plane[9]) + " m/s" : "N/A";
    const heading = plane[10] ? Math.round(plane[10]) + "°" : "N/A";

    pushAirTraffic(
      `Plane ${callsign} — Alt: ${altitude}, Speed: ${velocity}, Heading: ${heading}`
    );
  } catch (err) {
    pushAirTraffic("Airspace scan failed — connection issue.");
  }
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  updateClock();
  updateUptime();
  setInterval(updateClock, 1000);
  setInterval(updateUptime, 1000);

  populateDiagnostics();
  startAlerts();
  loadWeather();
  loadRedditPlaceholder();
  randomEngineStatus();
  setupGPSMapInitial();

  const input = document.getElementById("terminal-input");
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleCommand(input.value);
        input.value = "";
      }
    });
  }

  const gpsBtn = document.getElementById("gps-lock-btn");
  if (gpsBtn) {
    gpsBtn.addEventListener("click", () => {
      pushTerminal("Navigation control: attempting GPS lock...");
      forceGPSLock();
    });
  }

  // Crew deck
  renderCrewRoster();
  const crewInput = document.getElementById("crew-chat-input");
  if (crewInput) {
    crewInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && crewInput.value.trim()) {
        pushCrewLog(`Nolan: ${crewInput.value.trim()}`);
        crewInput.value = "";
      }
    });
  }

  // Crew chatter
  setInterval(randomCrewMessage, 30000);

  // Astronaut chatter
  setInterval(showAstronautBubble, 25000);

  // Deep space navigation
  updateStarTracker();
  updateGalaxyMap();
  setInterval(updateStarTracker, 20000);
  setInterval(updateAsteroidRadar, 25000);
  setInterval(updateGalaxyMap, 30000);

  // Aerial Traffic Monitor
  updateAirTraffic();
  setInterval(updateAirTraffic, 20000);

  pushCrewLog("Crew deck online. All hands accounted for.");
  pushTerminal("Submarine command console online.");
  pushTerminal("Type 'help' for available commands.");
});

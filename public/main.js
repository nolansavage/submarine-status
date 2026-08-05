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
  const clockEl = document.getElementById("clock");
  if (clockEl) clockEl.textContent = `${h}:${m}:${s}`;
}

function updateUptime() {
  const diff = Date.now() - startTime;
  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const uptimeEl = document.getElementById("uptime");
  if (uptimeEl) uptimeEl.textContent =
    `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

// Diagnostics
function populateDiagnostics() {
  const nav = navigator;

  const osEl = document.getElementById("os");
  if (osEl) osEl.textContent = nav.userAgent;

  const browserEl = document.getElementById("browser");
  if (browserEl) {
    browserEl.textContent = nav.userAgentData
      ? nav.userAgentData.brands.map(b => b.brand).join(", ")
      : "Unknown";
  }

  const coresEl = document.getElementById("cores");
  if (coresEl) coresEl.textContent = nav.hardwareConcurrency || "N/A";

  const memEl = document.getElementById("memory");
  if (memEl) {
    if (nav.deviceMemory) {
      memEl.textContent = nav.deviceMemory.toFixed(1);
    } else {
      memEl.textContent = "N/A";
    }
  }

  const screenEl = document.getElementById("screen");
  if (screenEl) {
    screenEl.textContent = `${window.screen.width} x ${window.screen.height}`;
  }

  const batteryEl = document.getElementById("battery");
  if (nav.getBattery && batteryEl) {
    nav.getBattery().then(battery => {
      const pct = Math.round(battery.level * 100);
      const status = battery.charging ? "CHARGING" : "DISCHARGING";
      batteryEl.textContent = `${pct}% (${status})`;
    }).catch(() => {
      batteryEl.textContent = "N/A";
    });
  } else if (batteryEl) {
    batteryEl.textContent = "N/A";
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
  if (!log) return;
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
  if (!out) return;
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
      const out = document.getElementById("terminal-output");
      if (out) out.innerHTML = "";
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

  const condEl = document.getElementById("weather-condition");
  const tempEl = document.getElementById("weather-temp");
  const windEl = document.getElementById("weather-wind");
  const humEl = document.getElementById("weather-humidity");

  if (condEl) condEl.textContent = cond;
  if (tempEl) tempEl.textContent = `${temp} °C`;
  if (windEl) windEl.textContent = `${wind} km/h`;
  if (humEl) humEl.textContent = `${humidity}%`;
}

// Reddit placeholder
function loadRedditPlaceholder() {
  const list = document.getElementById("reddit-trending");
  if (!list) return;
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

  const heatEl = document.getElementById("engine-heat");
  const thrustEl = document.getElementById("engine-thrust");

  if (heatEl) {
    heatEl.textContent =
      heatStates[Math.floor(Math.random() * heatStates.length)];
  }
  if (thrustEl) {
    thrustEl.textContent =
      thrustStates[Math.floor(Math.random() * thrustStates.length)];
  }
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
  const fixEl = document.getElementById("gps-last-fix");
  if (fixEl) fixEl.textContent = "OSHAWA (FALLBACK)";
}

function forceGPSLock() {
  const navStatusEl = document.getElementById("engine-nav");
  const fixEl = document.getElementById("gps-last-fix");

  if (!navigator.geolocation) {
    pushTerminal("GPS not available on this device.");
    if (navStatusEl) navStatusEl.textContent = "OFFLINE";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      initMap(latitude, longitude);
      const fixText = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
      if (fixEl) fixEl.textContent = fixText;
      if (navStatusEl) navStatusEl.textContent = "LOCKED";
      pushTerminal(`GPS lock acquired: ${fixText}.`);
    },
    () => {
      pushTerminal("GPS denied or unavailable. Holding position over Oshawa.");
      if (navStatusEl) navStatusEl.textContent = "OFFLINE";
      if (fixEl) fixEl.textContent = "OSHAWA (FALLBACK)";
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

// Aerial Traffic Monitor — ADS-B Exchange, Southern Ontario
let airTrafficMap;
let airTrafficMarkers = [];

function initAirTrafficMap() {
  const mapDiv = document.getElementById("air-traffic-map");
  if (!mapDiv) return;

  if (!airTrafficMap) {
    airTrafficMap = L.map("air-traffic-map").setView([43.9, -78.9], 8);
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19 }
    ).addTo(airTrafficMap);
  }
}

function clearAirTrafficMarkers() {
  airTrafficMarkers.forEach(m => m.remove());
  airTrafficMarkers = [];
}

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
  initAirTrafficMap();

  try {
    // ADS-B Exchange JSON feed
    const url = "https://adsbexchange.com/api/aircraft/json/";
    const res = await fetch(url);
    const data = await res.json();

    if (!data.aircraft || data.aircraft.length === 0) {
      pushAirTraffic("No aircraft detected in regional airspace.");
      clearAirTrafficMarkers();
      return;
    }

    // Southern Ontario bounding box
    const minLat = 42.5;
    const maxLat = 45.0;
    const minLon = -81.0;
    const maxLon = -76.0;

    const regional = data.aircraft.filter(a => {
      return (
        typeof a.lat === "number" &&
        typeof a.lon === "number" &&
        a.lat >= minLat &&
        a.lat <= maxLat &&
        a.lon >= minLon &&
        a.lon <= maxLon
      );
    });

    clearAirTrafficMarkers();

    if (regional.length === 0) {
      pushAirTraffic("No aircraft currently over Southern Ontario.");
      return;
    }

    regional.slice(0, 15).forEach(a => {
      const callsign = a.flight || "UNKNOWN";
      const lat = a.lat;
      const lon = a.lon;
      const altitude = a.alt_baro ? Math.round(a.alt_baro) : null;
      const speed = a.gs ? Math.round(a.gs) : null;
      const heading = a.track ? Math.round(a.track) : null;

      const marker = L.circleMarker([lat, lon], {
        radius: 4,
        color: "#00ffff",
        fillColor: "#00ffff",
        fillOpacity: 0.8
      }).addTo(airTrafficMap);

      const altText = altitude !== null ? `${altitude} ft` : "N/A";
      const spdText = speed !== null ? `${speed} kt` : "N/A";
      const headText = heading !== null ? `${heading}°` : "N/A";

      marker.bindTooltip(
        `${callsign}<br>Alt: ${altText}<br>Speed: ${spdText}<br>Heading: ${headText}`,
        { permanent: false, direction: "top" }
      );

      airTrafficMarkers.push(marker);

      pushAirTraffic(
        `Plane ${callsign} — Alt: ${altText}, Speed: ${spdText}, Heading: ${headText}`
      );
    });
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
  initAirTrafficMap();
  updateAirTraffic();
  setInterval(updateAirTraffic, 20000);

  pushCrewLog("Crew deck online. All hands accounted for.");
  pushTerminal("Submarine command console online.");
  pushTerminal("Type 'help' for available commands.");
});

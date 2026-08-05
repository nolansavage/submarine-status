// Clock +*uptime
let startTime = Date.now();*
function pad(n) {
  return n < 10*? "0" + n : "" + n;
}

function up*ateClock() {
  const now = new Dat*();
  const clockEl = document.get*lementById("clock");

  if (clockE*) {
    clockEl.textContent =
    * `${pad(now.getHours())}:${pad(now*getMinutes())}:${pad(now.getSecond*())}`;
  }
}

function updateUptim*() {
  const diff = Date.now() - s*artTime;
  const total = Math.floo*(diff / 1000);
  const h = Math.fl*or(total / 3600);
  const m = Math*floor((total % 3600) / 60);
  cons* s = total % 60;
  const upEl = do*ument.getElementById("uptime");

 *if (upEl) {
    upEl.textContent =*`${pad(h)}h ${pad(m)}m ${pad(s)}s`*
  }
}

// Diagnostics
function po*ulateDiagnostics() {
  const nav =*navigator;
  const osEl = document*getElementById("os");
  const brEl*= document.getElementById("browser*);
  const coresEl = document.getE*ementById("cores");
  const memEl * document.getElementById("memory")*
  const scrEl = document.getEleme*tById("screen");
  const batEl = d*cument.getElementById("battery");
*  if (osEl) {
    osEl.textContent*= nav.userAgent;
  }

  if (brEl) *
    brEl.textContent = nav.userAg*ntData
      ? nav.userAgentData.b*ands.map(b => b.brand).join(", ")
*     : "Unknown";
  }

  if (cores*l) {
    coresEl.textContent = nav*hardwareConcurrency || "N/A";
  }
*  if (memEl) {
    memEl.textConte*t = nav.deviceMemory ? nav.deviceM*mory.toFixed(1) : "N/A";
  }

  if*(scrEl) {
    scrEl.textContent = *${window.screen.width} x ${window.*creen.height}`;
  }

  if (nav.get*attery && batEl) {
    nav.getBatt*ry()
      .then(b => {
        ba*El.textContent =
          `${Math*round(b.level * 100)}% (${b.chargi*g ? "CHARGING" : "DISCHARGING"})`;*      })
      .catch(() => {
    *   batEl.textContent = "N/A";
    * });
  }
}

// Alerts
const alertM*ssages = [
  "Hull integrity nomin*l.",
  "Pressure stable across all*compartments.",
  "Sonar sweep com*lete. No hostiles detected.",
  "T*ermal vents detected off port side*",
  "Navigation buoy acquired.",
* "Communications link stable.",
  *Ballast tanks balanced.",
  "Engin* output within safe parameters.",
* "External temperature within expe*ted range.",
  "Radiation levels n*minal."
];

function pushAlert(msg* {
  const log = document.getEleme*tById("alerts-log");

  if (!log) *eturn;

  const li = document.crea*eElement("li");
  li.textContent =*`[${new Date().toLocaleTimeString(*}] ${msg}`;
  log.insertBefore(li,*log.firstChild);

  while (log.chi*dren.length > 12) {
    log.remove*hild(log.lastChild);
  }
}

functi*n startAlerts() {
  pushAlert("Sys*em startup complete. All stations *ominal.");

  setInterval(() => {
*   pushAlert(alertMessages[Math.fl*or(Math.random() * alertMessages.l*ngth)]);
  }, 7000);
}

// Termina*
function pushTerminal(text) {
  c*nst out = document.getElementById(*terminal-output");

  if (!out) re*urn;

  const line = document.crea*eElement("div");
  line.textConten* = text;
  out.appendChild(line);
* out.scrollTop = out.scrollHeight;*}

function handleCommand(cmd) {
 *const c = cmd.trim().toLowerCase()*

  if (!c) return;

  pushTermina*("> " + cmd);

  switch (c) {
    *ase "help":
      pushTerminal("Co*mands: status, diagnostics, sonar,*map, gps, poketch, pokemon, crew, *lear, help");
      break;

    ca*e "status":
      pushTerminal("Al* systems nominal. Mission time inc*easing.");
      break;

    case *diagnostics":
      pushTerminal("*iagnostics panel shows current sys*em status.");
      break;

    ca*e "sonar":
      pushTerminal("Son*r sweep active. No anomalies detec*ed.");
      break;

    case "map*:
      pushTerminal("Tactical map*tracking current position or Oshaw* fallback.");
      break;

    ca*e "gps":
      pushTerminal("Attem*ting GPS lock via navigation contr*l...");
      forceGPSLock();
    * break;

    case "poketch":
     *pushTerminal("POKÉTCH APPS: Clock,*Calculator, Memo Pad, Coin Toss, D*ce, Friendship, Pokémon Radar, Bad*e Case, Crew Checker.");
      bre*k;

    case "pokemon":
      rend*rSpecificPoketchApp("Pokémon Radar*);
      pushTerminal("Pokémon Rad*r app opened.");
      break;

   *case "crew":
      renderSpecificP*ketchApp("Crew Checker");
      pu*hTerminal("Crew Checker app opened*");
      break;

    case "clear"* {
      const out = document.getE*ementById("terminal-output");
    * if (out) out.innerHTML = "";
    * break;
    }

    case "giratina"*
      pushTerminal("WARNING: Dist*rtion signature detected.");
     *pushTerminal("Reality stability: u*stable.");
      showAstronautLine("Nolan... this sector shouldn't exist.");
      break;

    case "cynthia":
      pushTerminal("Champion Cynthia detected. Threat level: EXTREME.");
      break;

    default:
      pushTerminal("Unknown command. Type 'help' for list.");
  }
}

// Weather
function loadWeather() {
  const conditions = [
    "Overcast with lake-effect clouds.",
    "Cold, clear night over Oshawa.",
    "Rain showers moving in from the west.",
    "Fog rolling in over the shoreline.",
    "Windy with scattered clouds.",
    "Calm skies, high visibility."
  ];

  const condEl = document.getElementById("weather-condition");
  const tempEl = document.getElementById("weather-temp");
  const windEl = document.getElementById("weather-wind");
  const humEl = document.getElementById("weather-humidity");

  if (condEl) {
    condEl.textContent = conditions[Math.floor(Math.random() * conditions.length)];
  }

  if (tempEl) {
    tempEl.textContent = `${(Math.random() * 15 - 5).toFixed(1)} °C`;
  }

  if (windEl) {
    windEl.textContent = `${(Math.random() * 30).toFixed(0)} km/h`;
  }

  if (humEl) {
    humEl.textContent = `${(60 + Math.random() * 30).toFixed(0)}%`;
  }
}

// Reddit placeholder
function loadRedditPlaceholder() {
  const list = document.getElementById("reddit-trending");

  if (!list) return;

  list.innerHTML = "";

  [
    "r/AskReddit — What is a subtle sign someone is not okay?",
    "r/technology — New GPU architecture shakes up the market.",
    "r/gaming — Underrated indie games you should try.",
    "r/canada — Lake-effect weather stories from Ontario.",
    "r/programming — Show off your side projects."
  ].forEach(text => {
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
    heatEl.textContent = heatStates[Math.floor(Math.random() * heatStates.length)];
  }

  if (thrustEl) {
    thrustEl.textContent = thrustStates[Math.floor(Math.random() * thrustStates.length)];
  }
}

// GPS map
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

  if (gpsMarker) {
    gpsMarker.remove();
  }

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

  if (fixEl) {
    fixEl.textContent = "OSHAWA (FALLBACK)";
  }
}

function forceGPSLock() {
  const navStatusEl = document.getElementById("engine-nav");
  const fixEl = document.getElementById("gps-last-fix");

  if (!navigator.geolocation) {
    pushTerminal("GPS not available on this device.");

    if (navStatusEl) {
      navStatusEl.textContent = "OFFLINE";
    }

    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude, longitude } = pos.coords;
      initMap(latitude, longitude);

      const fixText = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

      if (fixEl) {
        fixEl.textContent = fixText;
      }

      if (navStatusEl) {
        navStatusEl.textContent = "LOCKED";
      }

      pushTerminal(`GPS lock acquired: ${fixText}.`);
    },
    () => {
      pushTerminal("GPS denied or unavailable. Holding position over Oshawa.");

      if (navStatusEl) {
        navStatusEl.textContent = "OFFLINE";
      }

      if (fixEl) {
        fixEl.textContent = "OSHAWA (FALLBACK)";
      }

      initMap(43.8971, -78.8658);
    },
    {
      enableHighAccuracy: true,
      timeout: 8000
    }
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

    li.innerHTML =
      `<span class="crew-name">${member.name}</span>
       <span class="crew-role">${member.role}</span>
       <span class="crew-status">${member.status}</span>`;

    roster.appendChild(li);
  });
}

function pushCrewLog(text) {
  const log = document.getElementById("crew-log");

  if (!log) return;

  const line = document.createElement("div");
  line.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
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
    "Comms are quiet... too quiet.",
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

function showAstronautLine(line) {
  const bubble = document.getElementById("astro-bubble");

  if (!bubble) return;

  bubble.textContent = line;
  bubble.style.opacity = 1;

  setTimeout(() => {
    bubble.style.opacity = 0;
  }, 5000);
}

function showAstronautBubble() {
  const line = astroLines[Math.floor(Math.random() * astroLines.length)];
  showAstronautLine(line);
}

// Poketch
let poketchApp = 0;
let memoText = localStorage.getItem("poketchMemo") || "";

const poketchApps = [
  {
    name: "Digital Clock",
    render() {
      return `
        <div class="poketch-app-title">DIGITAL CLOCK</div>
        <div class="poketch-big">${new Date().toLocaleTimeString()}</div>
        <div class="poketch-note">Sinnoh standard time</div>
      `;
    }
  },

  {
    name: "Calculator",
    render() {
      return `
        <div class="poketch-app-title">CALCULATOR</div>
        <div class="poketch-big">2 + 2 = 4</div>
        <div class="poketch-note">Advanced tactical math online</div>
      `;
    }
  },

  {
    name: "Memo Pad",
    render() {
      return `
        <div class="poketch-app-title">MEMO PAD</div>
        <textarea id="poketch-memo" class="poketch-memo" placeholder="write a mission note...">${memoText}</textarea>
      `;
    }
  },

  {
    name: "Coin Toss",
    render() {
      return `
        <div class="poketch-app-title">COIN TOSS</div>
        <div id="coin-result" class="poketch-big">?</div>
        <button class="poketch-button" onclick="flipCoin()">FLIP</button>
      `;
    }
  },

  {
    name: "Dice",
    render() {
      return `
        <div class="poketch-app-title">DICE</div>
        <div id="dice-result" class="poketch-big">🎲</div>
        <button class="poketch-button" onclick="rollDice()">ROLL</button>
      `;
    }
  },

  {
    name: "Friendship Checker",
    render() {
      return `
        <div class="poketch-app-title">FRIENDSHIP</div>

        <div class="friend-row">
          <span>Nolan</span>
          <div class="friend-bar"><div class="friend-fill" style="width:100%"></div></div>
        </div>

        <div class="friend-row">
          <span>Pip</span>
          <div class="friend-bar"><div class="friend-fill" style="width:92%"></div></div>
        </div>

        <div class="friend-row">
          <span>Jax</span>
          <div class="friend-bar"><div class="friend-fill" style="width:75%"></div></div>
        </div>
      `;
    }
  },

  {
    name: "Pokémon Radar",
    render() {
      const pokemon = [
        "Bidoof",
        "Shinx",
        "Staravia",
        "Luxio",
        "Floatzel",
        "Gible",
        "Lucario",
        "Spiritomb",
        "Garchomp",
        "Giratina"
      ];

      const poke = pokemon[Math.floor(Math.random() * pokemon.length)];
      const distance = (Math.random() * 100).toFixed(1);

      return `
        <div class="poketch-app-title">POKÉMON RADAR</div>
        <div class="poketch-big">${poke}</div>
        <div class="poketch-note">Distance: ${distance}m</div>
      `;
    }
  },

  {
    name: "Badge Case",
    render() {
      return `
        <div class="poketch-app-title">SINNOH BADGES</div>
        <div class="poketch-badge-grid">
          <div class="poketch-badge">COAL</div>
          <div class="poketch-badge">FOREST</div>
          <div class="poketch-badge">COBBLE</div>
          <div class="poketch-badge">FEN</div>
          <div class="poketch-badge">RELIC</div>
          <div class="poketch-badge">MINE</div>
          <div class="poketch-badge">ICICLE</div>
          <div class="poketch-badge">BEACON</div>
        </div>
      `;
    }
  },

  {
    name: "Crew Checker",
    render() {
      return `
        <div class="poketch-app-title">CREW CHECKER</div>
        Nolan ✅<br>
        Mira ✅<br>
        Jax ✅<br>
        Sol ✅<br>
        Pip ✅
      `;
    }
  }
];

function renderPoketch() {
  const screen = document.getElementById("poketch-screen");
  const title = document.getElementById("poketch-title");

  if (!screen || !title) return;

  title.textContent = poketchApps[poketchApp].name;
  screen.innerHTML = poketchApps[poketchApp].render();

  const memo = document.getElementById("poketch-memo");

  if (memo) {
    memo.addEventListener("input", () => {
      memoText = memo.value;
      localStorage.setItem("poketchMemo", memoText);
    });
  }
}

function nextPoketch() {
  poketchApp++;

  if (poketchApp >= poketchApps.length) {
    poketchApp = 0;
  }

  renderPoketch();
}

function previousPoketch() {
  poketchApp--;

  if (poketchApp < 0) {
    poketchApp = poketchApps.length - 1;
  }

  renderPoketch();
}

function renderSpecificPoketchApp(appName) {
  const index = poketchApps.findIndex(app => app.name === appName);

  if (index !== -1) {
    poketchApp = index;
    renderPoketch();
  }
}

function flipCoin() {
  const result = Math.random() < 0.5 ? "HEADS" : "TAILS";
  const el = document.getElementById("coin-result");

  if (el) {
    el.textContent = result;
  }

  pushTerminal(`Pokétch Coin Toss: ${result}`);
}

function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  const el = document.getElementById("dice-result");

  if (el) {
    el.textContent = roll;
  }

  pushTerminal(`Pokétch Dice Roll: ${roll}`);
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
  li.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
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

// Aerial Traffic Monitor
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
  li.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
  log.insertBefore(li, log.firstChild);

  while (log.children.length > 15) {
    log.removeChild(log.lastChild);
  }
}

async function updateAirTraffic() {
  initAirTrafficMap();
  pushAirTraffic("Airspace scan placeholder — module online, data source pending.");
}

// Earthquake Monitor
let quakeMap;
let quakeMarkers = [];

function initQuakeMap() {
  const mapDiv = document.getElementById("quake-map");

  if (!mapDiv) return;

  if (!quakeMap) {
    quakeMap = L.map("quake-map").setView([20, 0], 2);

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 8 }
    ).addTo(quakeMap);
  }
}

function clearQuakeMarkers() {
  quakeMarkers.forEach(m => m.remove());
  quakeMarkers = [];
}

function pushQuake(msg) {
  const log = document.getElementById("quake-log");

  if (!log) return;

  const li = document.createElement("li");
  li.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
  log.insertBefore(li, log.firstChild);

  while (log.children.length > 20) {
    log.removeChild(log.lastChild);
  }
}

async function updateEarthquakes() {
  initQuakeMap();

  try {
    const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
    const res = await fetch(url);
    const data = await res.json();

    if (!data.features || data.features.length === 0) {
      pushQuake("No seismic activity detected in the last hour.");
      clearQuakeMarkers();
      return;
    }

    clearQuakeMarkers();

    data.features.slice(0, 15).forEach(feature => {
      const props = feature.properties;
      const coords = feature.geometry.coordinates;
      const mag = props.mag != null ? props.mag.toFixed(1) : "N/A";
      const place = props.place || "Unknown location";
      const depth = coords[2] != null ? coords[2].toFixed(1) : "N/A";
      const lat = coords[1];
      const lon = coords[0];

      let level = "GREEN";

      if (props.mag >= 4) {
        level = "YELLOW";
      }

      if (props.mag >= 6) {
        level = "RED";
      }

      const marker = L.circleMarker([lat, lon], {
        radius: 4,
        color: level === "RED" ? "#ff0044" :
               level === "YELLOW" ? "#ffcc00" : "#00ff88",
        fillColor: level === "RED" ? "#ff0044" :
                   level === "YELLOW" ? "#ffcc00" : "#00ff88",
        fillOpacity: 0.8
      }).addTo(quakeMap);

      marker.bindTooltip(
        `M${mag} — ${place}<br>Depth: ${depth} km<br>Level: ${level}`,
        {
          permanent: false,
          direction: "top"
        }
      );

      quakeMarkers.push(marker);
      pushQuake(`M${mag} — ${place} — Depth ${depth} km — Level ${level}`);
    });
  } catch (err) {
    pushQuake("Seismic scan failed — connection issue.");
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
    input.addEventListener("keydown", e => {
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

  renderCrewRoster();

  const crewInput = document.getElementById("crew-chat-input");

  if (crewInput) {
    crewInput.addEventListener("keydown", e => {
      if (e.key === "Enter" && crewInput.value.trim()) {
        pushCrewLog(`Nolan: ${crewInput.value.trim()}`);
        crewInput.value = "";
      }
    });
  }

  renderPoketch();

  const poketchNext = document.getElementById("poketch-next");
  const poketchPrev = document.getElementById("poketch-prev");
  const poketchScreen = document.getElementById("poketch-screen");

  if (poketchNext) {
    poketchNext.addEventListener("click", nextPoketch);
  }

  if (poketchPrev) {
    poketchPrev.addEventListener("click", previousPoketch);
  }

  if (poketchScreen) {
    poketchScreen.addEventListener("wheel", e => {
      e.preventDefault();

      if (e.deltaY > 0) {
        nextPoketch();
      } else {
        previousPoketch();
      }
    });
  }

  setInterval(() => {
    if (poketchApps[poketchApp].name === "Digital Clock") {
      renderPoketch();
    }
  }, 1000);

  setInterval(randomCrewMessage, 30000);
  setInterval(showAstronautBubble, 25000);

  updateStarTracker();
  updateGalaxyMap();

  setInterval(updateStarTracker, 20000);
  setInterval(updateAsteroidRadar, 25000);
  setInterval(updateGalaxyMap, 30000);

  initAirTrafficMap();
  updateAirTraffic();
  setInterval(updateAirTraffic, 20000);

  initQuakeMap();
  updateEarthquakes();
  setInterval(updateEarthquakes, 30000);

  pushCrewLog("Crew deck online. All hands accounted for.");
  pushTerminal("Submarine command console online.");
  pushTerminal("Pokétch module installed.");
  pushTerminal("Type 'help' for available commands.");
});

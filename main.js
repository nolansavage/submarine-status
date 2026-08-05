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
      pushTerminal("Available commands: status, diagnostics, sonar, help, clear");
      break;
    case "status":
      pushTerminal("All systems nominal. Mission time increasing.");
      break;
    case "diagnostics":
      pushTerminal("Diagnostics: OS, browser, cores, memory, battery, screen updated in panel.");
      break;
    case "sonar":
      pushTerminal("Sonar sweep active. No anomalies detected.");
      break;
    case "clear":
      document.getElementById("terminal-output").innerHTML = "";
      break;
    default:
      pushTerminal("Unknown command. Type 'help' for list.");
  }
}

// Weather (mocked for Oshawa so it always works)
function loadWeather() {
  // Simple fake data so it never breaks on CORS
  const conditions = [
    "Overcast with lake-effect clouds.",
    "Light snow flurries over the harbour.",
    "Cold, clear night over Oshawa.",
    "Rain showers moving in from the west.",
    "Fog rolling in over the shoreline.",
    "Windy with scattered clouds.",
    "Calm skies, high visibility."
  ];
  const cond = conditions[Math.floor(Math.random() * conditions.length)];
  const temp = (Math.random() * 15 - 5).toFixed(1); // -5 to +10
  const wind = (Math.random() * 30).toFixed(0); // 0–30 km/h
  const humidity = (60 + Math.random() * 30).toFixed(0); // 60–90%

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

  const input = document.getElementById("terminal-input");
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleCommand(input.value);
      input.value = "";
    }
  });

  pushTerminal("Submarine command console online.");
  pushTerminal("Type 'help' for available commands.");
});

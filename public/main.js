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

function startAlerts()

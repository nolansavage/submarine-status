body {
  background: #0a0f0f;
  color: #c8f7dc;
  font-family: "Courier New", monospace;
  margin: 0;
}

.container {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 16px 40px;
}

.title {
  text-align: center;
  font-size: 32px;
  letter-spacing: 0.3em;
  margin-bottom: 24px;
  color: #7fffd4;
  text-shadow: 0 0 8px #00ffaa;
}

.panel {
  border: 2px solid #00ffff;
  background: rgba(0, 20, 40, 0.7);
  padding: 12px 16px;
  margin-bottom: 18px;
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.3);
}

.panel h2 {
  margin: 0 0 8px;
  font-size: 16px;
  letter-spacing: 0.2em;
  color: #00ffff;
  text-shadow: 0 0 6px #00ffff;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
}

.label {
  color: #7fffd4;
}

.log {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 140px;
  overflow-y: auto;
  font-size: 13px;
}

.log li {
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
  padding: 2px 0;
}

/* CRT effect */
.crt {
  position: relative;
}

.crt::after {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    rgba(0, 255, 0, 0.03),
    rgba(0, 255, 0, 0.03) 2px,
    transparent 2px,
    transparent 4px
  );
}

/* Sonar */
.sonar-wrapper {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 8px auto;
  border-radius: 50%;
  border: 2px solid #00ffff;
  overflow: hidden;
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.5);
}

.sonar-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(0, 255, 255, 0.3), transparent 60%);
}

.sonar-ping {
  position: absolute;
  width: 4px;
  height: 90px;
  background: #00ffff;
  left: 50%;
  top: 0;
  transform-origin: bottom center;
  animation: sonar-rotate 4s linear infinite;
  box-shadow: 0 0 10px #00ffff;
}

@keyframes sonar-rotate {
  from {
    transform: translateX(-50%) rotate(0deg);
  }
  to {
    transform: translateX(-50%) rotate(360deg);
  }
}

/* Terminal */
.terminal-output {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(0, 255, 255, 0.3);
  padding: 6px 8px;
  height: 120px;
  overflow-y: auto;
  font-size: 13px;
}

.terminal-input-row {
  display: flex;
  align-items: center;
  margin-top: 6px;
}

.prompt {
  color: #00ffff;
  margin-right: 6px;
}

#terminal-input {
  flex: 1;
  background: #020607;
  border: 1px solid #00ffff;
  color: #c8f7dc;
  padding: 4px 6px;
  font-family: "Courier New", monospace;
  font-size: 13px;
}

#terminal-input:focus {
  outline: none;
  box-shadow: 0 0 6px #00ffff;
}

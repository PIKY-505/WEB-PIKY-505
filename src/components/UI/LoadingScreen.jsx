import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/LoadingScreen.scss";

// --- PERFECTLY ALIGNED ASCII PRESETS (Exact 7-line frame + 1 label line = 8 lines) ---
const ASCII_PRESETS = [
  {
    name: "3D_CUBE",
    frames: [
      `+-----------------------+
|        +------+       |
|       /      /|       |
|      +------+ |       |
|      |  .   | |       |
|      |      |/        |
|      +------+         |
+-----------------------+
[ ENGINE // 3D_CUBE_01 ]`,
      `+-----------------------+
|         /------+      |
|        /      /|      |
|       +------+ |      |
|       |  |   | |      |
|       |      |/       |
|       +------+        |
+-----------------------+
[ ENGINE // 3D_CUBE_02 ]`,
      `+-----------------------+
|          +------+     |
|         /|     /|     |
|        + |----+ |     |
|        | | .  | |     |
|        |/     |/      |
|        +------+       |
+-----------------------+
[ ENGINE // 3D_CUBE_03 ]`,
      `+-----------------------+
|       +------+        |
|       |\\     |\\       |
|       | +----+ |      |
|       | |  . | |      |
|       \\|     \\|       |
|        +------+       |
+-----------------------+
[ ENGINE // 3D_CUBE_04 ]`
    ]
  },
  {
    name: "ROTATING_GLOBE",
    frames: [
      `+-----------------------+
|         .---.         |
|       ./     \\.       |
|      /  .---.  \\      |
|     |  (  ●  )  |     |
|      \\  '---'  /      |
|       '\\     /'       |
+-----------------------+
[ NET_NODE // GLOBE_WEST ]`,
      `+-----------------------+
|         .---.         |
|       ./     \\.       |
|      /   .---. \\      |
|     |   ( ●   ) |     |
|      \\   '---' /      |
|       '\\     /'       |
+-----------------------+
[ NET_NODE // GLOBE_CORE ]`,
      `+-----------------------+
|         .---.         |
|       ./     \\.       |
|      / .---.   \\      |
|     | (   ● )   |     |
|      \\ '---'   /      |
|       '\\     /'       |
+-----------------------+
[ NET_NODE // GLOBE_EAST ]`,
      `+-----------------------+
|         .---.         |
|       ./     \\.       |
|      /  .---.  \\      |
|     |  (   ● )  |     |
|      \\  '---'  /      |
|       '\\     /'       |
+-----------------------+
[ NET_NODE // GLOBE_SYNC ]`
    ]
  },
  {
    name: "RADAR_SWEEP",
    frames: [
      `+-----------------------+
|       +---/---+       |
|      /   /     \\      |
|     |   /  o    |     |
|     |  /        |     |
|      \\          /     |
|       +--------+      |
+-----------------------+
[ SCANNER // RADAR_000° ]`,
      `+-----------------------+
|       +---|---+       |
|      /    |    \\      |
|     |     | o   |     |
|     |     |     |     |
|      \\          /     |
|       +--------+      |
+-----------------------+
[ SCANNER // RADAR_090° ]`,
      `+-----------------------+
|       +---\\---+       |
|      /     \\   \\      |
|     |    o  \\   |     |
|     |        \\  |     |
|      \\          /     |
|       +--------+      |
+-----------------------+
[ SCANNER // RADAR_180° ]`,
      `+-----------------------+
|       +-------+       |
|      /         \\      |
|     |    o      |     |
|     |-------    |     |
|      \\          /     |
|       +--------+      |
+-----------------------+
[ SCANNER // RADAR_270° ]`
    ]
  },
  {
    name: "DONUT_TORUS",
    frames: [
      `+-----------------------+
|        .-'""'-.       |
|       /  (o)   \\      |
|      |    |     |     |
|       \\  (o)   /      |
|        '-....-'       |
|                       |
+-----------------------+
[ GEOMETRY // TORUS_AXIS_X ]`,
      `+-----------------------+
|        .-'""'-.       |
|       /   /     \\     |
|      |   (o)    |     |
|       \\   \\    /      |
|        '-....-'       |
|                       |
+-----------------------+
[ GEOMETRY // TORUS_AXIS_Y ]`,
      `+-----------------------+
|        .-'""'-.       |
|       /   --    \\     |
|      |   (o)    |     |
|       \\   --   /      |
|        '-....-'       |
|                       |
+-----------------------+
[ GEOMETRY // TORUS_AXIS_Z ]`,
      `+-----------------------+
|        .-'""'-.       |
|       /   \\     \\     |
|      |   (o)    |     |
|       \\   \\    /      |
|        '-....-'       |
|                       |
+-----------------------+
[ GEOMETRY // TORUS_AXIS_W ]`
    ]
  },
  {
    name: "MATRIX_STREAM",
    frames: [
      `+-----------------------+
|    [ 0101001011001 ]  |
|    [ 1100101001010 ]  |
|    [ 0011010111001 ]  |
|    [ 1010110000110 ]  |
|    [ 0110011010101 ]  |
|                       |
+-----------------------+
[ BUFFER // MATRIX_01 ]`,
      `+-----------------------+
|    [ 1010110000110 ]  |
|    [ 0101001011001 ]  |
|    [ 1100101001010 ]  |
|    [ 0011010111001 ]  |
|    [ 0110011010101 ]  |
|                       |
+-----------------------+
[ BUFFER // MATRIX_02 ]`,
      `+-----------------------+
|    [ 0011010111001 ]  |
|    [ 1010110000110 ]  |
|    [ 0101001011001 ]  |
|    [ 1100101001010 ]  |
|    [ 0110011010101 ]  |
|                       |
+-----------------------+
[ BUFFER // MATRIX_03 ]`,
      `+-----------------------+
|    [ 1100101001010 ]  |
|    [ 0011010111001 ]  |
|    [ 1010110000110 ]  |
|    [ 0101001011001 ]  |
|    [ 0110011010101 ]  |
|                       |
+-----------------------+
[ BUFFER // MATRIX_04 ]`
    ]
  }
];

const LINUX_BOOT_LOGS = [
  "[  0.000000] Linux version 6.8.0-generic (gcc 13.2.0) #42-Ubuntu SMP PREEMPT_DYNAMIC",
  "[  0.004120] BIOS-provided physical RAM map: 0x0000000000000000 - 0x0000000800000000",
  "[  0.012450] Zone ranges: DMA32 [0x0000000000001000 - 0x00000000ffffffff]",
  "[  0.024890] ACPI: Core revision 20230628",
  "[  0.045120] CPU0: Thermal monitoring enabled (TM1)",
  "[  0.089400] Memory: 32768MB available (1024MB kernel code, 2048MB reserved)",
  "[  0.120510] Secure Boot: Disabled (User Override)",
  "[  0.184320] PCI: Probing PCI hardware (bus 00)",
  "[  0.250100] nvme0n1: p1 p2 p3 p4",
  "[  0.312040] EXT4-fs (nvme0n1p2): mounted filesystem with ordered data mode",
  "[  0.410920] systemd[1]: Inserted module 'autofs4'",
  "[  0.512300] systemd[1]: Set hostname to <raven-workstation>",
  "[  0.641020] systemd[1]: Reached target Local File Systems (Pre)",
  "[  0.780110] systemd[1]: Started Network Time Synchronization",
  "[  0.890450] systemd[1]: Starting User Manager for UID 1000...",
  "[  0.999120] systemd[1]: Started User Manager for UID 1000.",
  "[  1.120440] systemd[1]: Initializing WebGL Renderer & Three.js Canvas...",
  "[  1.250000] systemd[1]: Reached target Graphical Interface."
];

// Maximum number of log lines visible in console before old ones exit top
const MAX_VISIBLE_LOGS = 5;

const LoadingScreen = ({ progress }) => {
  const [presetIndex, setPresetIndex] = useState(() => Math.floor(Math.random() * ASCII_PRESETS.length));
  const [frameIndex, setFrameIndex] = useState(0);
  const [allLogs, setAllLogs] = useState([]);
  const [logStep, setLogStep] = useState(0);

  // Cycle ASCII Art animation frames
  useEffect(() => {
    const artTimer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % ASCII_PRESETS[presetIndex].frames.length);
    }, 160);
    return () => clearInterval(artTimer);
  }, [presetIndex]);

  // Progressive Linux Boot Logs (Appends new line)
  useEffect(() => {
    const logTimer = setInterval(() => {
      setLogStep((prev) => {
        if (prev < LINUX_BOOT_LOGS.length) {
          setAllLogs((current) => [...current, LINUX_BOOT_LOGS[prev]]);
          return prev + 1;
        }
        return prev;
      });
    }, 450);
    return () => clearInterval(logTimer);
  }, []);

  // Rolling buffer: slice only the last MAX_VISIBLE_LOGS so top lines exit screen cleanly
  const visibleLogs = allLogs.slice(-MAX_VISIBLE_LOGS);
  const currentPreset = ASCII_PRESETS[presetIndex];

  return (
    <motion.div
      className="loading-screen terminal-style"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}>
      
      <div className="terminal-content">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "-8px" }}>
          <span style={{ fontSize: "0.7rem", color: "#888888", fontFamily: "var(--font-mono)" }}>
            MODE: {currentPreset.name}
          </span>
          <button
            onClick={() => setPresetIndex((prev) => (prev + 1) % ASCII_PRESETS.length)}
            style={{
              background: "#000000",
              border: "1px solid #444444",
              color: "#ffffff",
              fontSize: "0.7rem",
              padding: "2px 8px",
              cursor: "pointer",
              fontFamily: "var(--font-mono)"
            }}>
            CYCLE_ASCII [NEXT]
          </button>
        </div>

        <pre className="ascii-art">{currentPreset.frames[frameIndex]}</pre>
        
        {/* ROLLING CONSOLE WINDOW */}
        <div className="boot-logs-window">
          <div className="boot-logs-container">
            <AnimatePresence initial={false}>
              {visibleLogs.map((log) => (
                <motion.div
                  layout
                  key={log}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className={`log-line ${log.includes("systemd") ? "ok" : "info"}`}>
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="log-line blink-cursor ok">
              {progress < 100
                ? `[ .... ] LOADING SYSTEM MODULES (${progress.toFixed(0)}%)`
                : `[  OK  ] SYSTEM BOOT COMPLETE. INITIALIZING WORKSPACE.`}
            </div>
          </div>
        </div>

        <div className="terminal-progress-wrapper">
          <div className="progress-info">
            <span className="loading-label">BOOT_STATUS</span>
            <span className="loading-percent">{progress.toFixed(1)}%</span>
          </div>

          <div className="progress-bar-bg">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "tween", ease: "linear", duration: 0.1 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;

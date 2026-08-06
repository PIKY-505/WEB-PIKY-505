import React, { useState, useRef, useEffect } from "react";
import DraggableWindow from "./DraggableWindow";
import { useStore } from "../../store/useStore";

const INITIAL_WELCOME = [
  "Linux Portfolio Terminal v2.4.0 (x86_64-pc-linux-gnu)",
  "Type 'help' to display available commands.",
  "--------------------------------------------------"
];

const HELP_TEXT = [
  "AVAILABLE COMMANDS:",
  "  help         - Show this menu",
  "  about        - View developer profile summary",
  "  ls           - List directory files",
  "  cat <file>   - Read file content (e.g., 'cat cv', 'cat projects')",
  "  whoami       - Print user identity",
  "  date         - Print current system date",
  "  open <sec>   - Open section (cv, projects, certs, customizer)",
  "  clear        - Clear terminal screen",
  "  exit         - Close terminal session"
];

const TerminalModal = ({ onClose }) => {
  const [history, setHistory] = useState(INITIAL_WELCOME);
  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  
  const openModal = useStore((state) => state.openModal);
  const openWindow = useStore((state) => state.openWindow);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const trimmed = inputVal.trim();
      const promptLine = `user@raven-station:~$ ${trimmed}`;
      
      if (!trimmed) {
        setHistory((prev) => [...prev, promptLine]);
        setInputVal("");
        return;
      }

      setCommandHistory((prev) => [...prev, trimmed]);
      setCmdIndex(-1);

      const parts = trimmed.split(" ");
      const cmd = parts[0].toLowerCase();
      const arg = parts[1] ? parts[1].toLowerCase() : "";

      let output = [];

      switch (cmd) {
        case "help":
          output = HELP_TEXT;
          break;
        case "about":
          output = [
            "DEVELOPER PROFILE:",
            "  Name: Raven / Piky",
            "  Role: Full Stack & Creative Web Developer",
            "  Stack: React, Vite, Three.js, Node.js, Linux",
            "  Status: Available for innovative projects & web applications."
          ];
          break;
        case "ls":
          output = [
            "DRWX------ 2 raven raven 4096 Aug  6 20:30 .",
            "-RW-R--R-- 1 raven raven 2048 Aug  6 20:30 cv.txt",
            "-RW-R--R-- 1 raven raven 3120 Aug  6 20:30 projects.txt",
            "-RW-R--R-- 1 raven raven 1500 Aug  6 20:30 certs.txt",
            "-RW-R--R-- 1 raven raven  512 Aug  6 20:30 system.log"
          ];
          break;
        case "cat":
          if (arg === "cv" || arg === "cv.txt") {
            output = [
              "=== CURRICULUM VITAE ===",
              "EXPERIENCE: Fullstack Developer (React, Node, Python, Linux)",
              "EDUCATION: Computer Science & Systems Engineering",
              "SKILLS: JavaScript, Three.js, UI/UX Architecture, Shell Scripting"
            ];
          } else if (arg === "projects" || arg === "projects.txt") {
            output = [
              "=== FEATURED PROJECTS ===",
              "1. WEB-PIKY-505 - Minimalist Terminal & WebGL Interactive Portfolio",
              "2. OnlyGame-2026 - Web Engine & Custom Interactive Environment",
              "3. AGY Autonomous Systems - Google Antigravity Integration Framework"
            ];
          } else if (arg === "certs" || arg === "certs.txt") {
            output = [
              "=== CERTIFICATIONS ===",
              "- Web Development & Advanced Frontend Architecture",
              "- Linux Systems Administration & Security",
              "- Fullstack JavaScript Ecosystem Specialist"
            ];
          } else {
            output = [`cat: ${arg || "file"}: No such file or directory`];
          }
          break;
        case "whoami":
          output = ["raven@portfolio (UID 1000, GID 1000)"];
          break;
        case "date":
          output = [new Date().toString()];
          break;
        case "open":
          if (arg === "cv") {
            openModal("cv");
            output = ["[  OK  ] Opening CV modal..."];
          } else if (arg === "projects") {
            openModal("projects");
            output = ["[  OK  ] Opening Projects modal..."];
          } else if (arg === "certs") {
            openModal("certs");
            output = ["[  OK  ] Opening Certificates modal..."];
          } else {
            output = [`open: unknown section '${arg}'. Try 'open cv', 'open projects', 'open certs'`];
          }
          break;
        case "clear":
          setHistory([]);
          setInputVal("");
          return;
        case "exit":
          onClose();
          return;
        default:
          output = [`bash: command not found: ${cmd}. Type 'help' for available commands.`];
      }

      setHistory((prev) => [...prev, promptLine, ...output]);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      if (commandHistory.length > 0) {
        const nextIdx = cmdIndex === -1 ? commandHistory.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      if (cmdIndex !== -1) {
        const nextIdx = cmdIndex + 1;
        if (nextIdx >= commandHistory.length) {
          setCmdIndex(-1);
          setInputVal("");
        } else {
          setCmdIndex(nextIdx);
          setInputVal(commandHistory[nextIdx]);
        }
      }
    }
  };

  return (
    <DraggableWindow
      id="terminal-window"
      title="Linux Terminal (bash)"
      onClose={onClose}
      initialPosition={{ x: window.innerWidth / 2 - 300, y: 100 }}
      defaultWidth="640px"
      defaultHeight="420px">
      
      <div
        onClick={() => inputRef.current?.focus()}
        style={{
          flex: 1,
          padding: "15px",
          overflowY: "auto",
          background: "#000000",
          color: "#ffffff",
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          lineHeight: "1.4",
          display: "flex",
          flexDirection: "column",
          gap: "4px"
        }}>
        {history.map((line, idx) => (
          <div key={idx} style={{ whiteSpace: "pre-wrap" }}>
            {line}
          </div>
        ))}

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
          <span style={{ color: "#ffffff", fontWeight: "bold" }}>user@raven-station:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#ffffff",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              padding: 0
            }}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </DraggableWindow>
  );
};

export default TerminalModal;

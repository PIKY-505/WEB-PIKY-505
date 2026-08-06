import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiMinus, FiMaximize2, FiMinimize2 } from "react-icons/fi";

const DraggableWindow = ({
  id,
  title = "Terminal Window",
  children,
  onClose,
  initialPosition = { x: 50, y: 50 },
  defaultWidth = "600px",
  defaultHeight = "400px"
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (isMinimized) {
    return (
      <div
        onClick={() => setIsMinimized(false)}
        style={{
          position: "fixed",
          bottom: "70px",
          left: "20px",
          zIndex: 1000,
          background: "#000000",
          border: "1px solid #ffffff",
          color: "#ffffff",
          padding: "6px 12px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          cursor: "pointer",
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)"
        }}>
        [ Terminal: {title} ]
      </div>
    );
  }

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      initial={{ x: initialPosition.x, y: initialPosition.y, opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{
        position: "fixed",
        top: isMaximized ? 0 : undefined,
        left: isMaximized ? 0 : undefined,
        width: isMaximized ? "100vw" : defaultWidth,
        height: isMaximized ? "100vh" : defaultHeight,
        maxWidth: isMaximized ? "100vw" : "90vw",
        maxHeight: isMaximized ? "100vh" : "80vh",
        zIndex: 900,
        background: "#050505",
        border: "1px solid #ffffff",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 255, 255, 0.1)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "var(--font-mono)"
      }}>
      {/* Title Bar / Drag Handle */}
      <div
        style={{
          background: "#111111",
          borderBottom: "1px solid #333333",
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: isMaximized ? "default" : "grab",
          userSelect: "none"
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "0.8rem", color: "#ffffff", fontWeight: "bold", letterSpacing: "1px" }}>
            ROOT_OS // {title.toUpperCase()}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <button
            onClick={() => setIsMinimized(true)}
            style={btnStyle}
            title="Minimize">
            <FiMinus size={12} />
          </button>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            style={btnStyle}
            title="Maximize">
            {isMaximized ? <FiMinimize2 size={12} /> : <FiMaximize2 size={12} />}
          </button>
          <button
            onClick={onClose}
            style={{ ...btnStyle, borderColor: "#ff5555", color: "#ff5555" }}
            title="Close">
            <FiX size={12} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </motion.div>
  );
};

const btnStyle = {
  background: "#000000",
  border: "1px solid #444444",
  color: "#ffffff",
  width: "22px",
  height: "22px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "0.75rem",
  transition: "all 0.15s ease"
};

export default DraggableWindow;

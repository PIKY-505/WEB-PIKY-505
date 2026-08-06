import React, { useState } from "react";
import "../../styles/Dock.scss";

function DockItem({ icon, label, onClick, className = "" }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`dock-item ${className}`}
      aria-haspopup="true">
      
      <div className="dock-icon">{icon}</div>

      {isHovered && (
        <div className="dock-label" role="tooltip">
          {label}
        </div>
      )}
    </div>
  );
}

export default function Dock({ items, className = "" }) {
  return (
    <div className="dock-outer">
      <div
        className={`dock-panel ${className}`}
        role="toolbar"
        aria-label="Application dock">
        {items.map((item, index) => (
          <DockItem
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            className={item.className || ""}
          />
        ))}
      </div>
    </div>
  );
}

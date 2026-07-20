import React from 'react';

export function CustomCursor() {
  return (
    <div className="custom-cursor" style={{ position: 'fixed', top: 0, left: 0, width: '20px', height: '20px', border: '2px solid #0f0', borderRadius: '50%', pointerEvents: 'none', zIndex: 9999 }}>
      {/* Lógica del cursor aquí más adelante */}
    </div>
  );
}

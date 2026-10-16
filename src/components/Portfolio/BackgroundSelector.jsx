import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheck, FiLayers } from "react-icons/fi";
import { useStore } from "../../store/useStore";
import "../../styles/Portfolio.scss";

// Background GIF previews
import bgGalaxy from "../../assets/img/bkg/galaxy.gif";
import bgSilk from "../../assets/img/bkg/silk.gif";
import bgBallpit from "../../assets/img/bkg/ballpit.gif";
import bgFloating from "../../assets/img/bkg/floatinglines.gif";
import bgPillars from "../../assets/img/bkg/lightpillar.gif";
import bgSnow from "../../assets/img/bkg/pixel-snow.gif";
import bgHyperspeed from "../../assets/img/bkg/hyperspeed.gif";

const BACKGROUNDS = [
  {
    id: "floatinglines",
    name: "Líneas Flotantes",
    description: "Ondas de energía vectoriales interactivas en WebGL.",
    image: bgFloating,
  },
  {
    id: "lightpillars",
    name: "Pilares de Luz",
    description: "Haces de luz etéreos y niebla volumétrica 3D.",
    image: bgPillars,
  },
  {
    id: "galaxy",
    name: "Galaxia Espacial",
    description: "Cúmulo estelar 3D dinámico con polvo cósmico.",
    image: bgGalaxy,
  },
  {
    id: "hyperspeed",
    name: "Hipervelocidad",
    description: "Túnel de aceleración lumínica y distorsión de campo.",
    image: bgHyperspeed,
  },
  {
    id: "silk",
    name: "Seda Fluida",
    description: "Malla generativa con deformación orgánica suave.",
    image: bgSilk,
  },
  {
    id: "pixelsnow",
    name: "Nieve Píxel",
    description: "Partículas en caída retro con estética pixel-art.",
    image: bgSnow,
  },
  {
    id: "ballpit",
    name: "Físicas 3D",
    description: "Simulación de colisiones elásticas y esferas.",
    image: bgBallpit,
  },
  {
    id: "gradient",
    name: "Gradiente Minimalista",
    description: "Degradado ambiental oscuro, sobrio y elegante.",
    previewColor: "linear-gradient(135deg, #111114, #1a1a24)",
  },
];

export default function BackgroundSelector() {
  const { activeModal, closeModal, activeBackground, setBackground } = useStore();

  return (
    <AnimatePresence>
      {activeModal === "themes" && (
        <motion.div
          className="portfolio-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="portfolio-modal themes-modal"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>
                <FiLayers style={{ marginRight: "10px", verticalAlign: "middle" }} />
                Temas Visuales
              </h2>
              <button className="close-btn" onClick={closeModal} aria-label="Cerrar modal">
                <FiX size={24} />
              </button>
            </div>

            <div className="modal-content">
              <p className="modal-intro">
                Selecciona el entorno gráfico y shader 3D activo para el fondo del portfolio:
              </p>
              <div className="themes-grid">
                {BACKGROUNDS.map((bg) => {
                  const isSelected = activeBackground === bg.id;
                  return (
                    <div
                      key={bg.id}
                      className={`theme-card ${isSelected ? "selected" : ""}`}
                      onClick={() => setBackground(bg.id)}
                    >
                      <div
                        className="theme-preview"
                        style={{ background: bg.previewColor || "#0a0a0c" }}
                      >
                        {bg.image && (
                          <img
                            src={bg.image}
                            alt={bg.name}
                            className="theme-preview-img"
                            loading="lazy"
                          />
                        )}
                        {isSelected && (
                          <div className="active-badge">
                            <FiCheck /> Activo
                          </div>
                        )}
                      </div>
                      <div className="theme-info">
                        <h3>{bg.name}</h3>
                        <p>{bg.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


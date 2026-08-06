import React, { useState, useEffect } from "react";
import { useStore } from "../../store/useStore";
import {
  FiX,
  FiCheck,
  FiImage,
  FiMousePointer,
  FiHeart
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/ShopContainer.scss";
import { CURSOR_CONFIG } from "../Layout/CursorController";

// --- BACKGROUND GIFS ---
import bgGalaxy from "../../assets/img/bkg/galaxy.gif";
import bgSilk from "../../assets/img/bkg/silk.gif";
import bgBallpit from "../../assets/img/bkg/ballpit.gif";
import bgFloating from "../../assets/img/bkg/floatinglines.gif";
import bgPillars from "../../assets/img/bkg/lightpillar.gif";
import bgSnow from "../../assets/img/bkg/pixel-snow.gif";
import bgHyperspeed from "../../assets/img/bkg/hyperspeed.gif";

// --- DYNAMIC TRAILS LOADING ---
const trailAssets = import.meta.glob("../../assets/trails/*.{gif,png,jpg,jpeg,webp}", { eager: true });

const generatePastelColor = (id) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 70%, 85%)`;
};

const TRAIL_METADATA = {
  "apple-cat": { name: "Gato Manzana", description: "Un gatito adorable en una manzana.", previewColor: "#ffadad" },
  "jump-cat": { name: "Gato Saltarín", description: "Siempre lleno de energía.", previewColor: "#a89c8d" },
  "rolling-cat": { name: "Gato Rodante", description: "Rodando hacia tu corazón.", previewColor: "#ffecb6" },
  "duck": { name: "Pato", description: "Cuack cuack.", previewColor: "#ebe371" },
  "pompom": { name: "Pompom", description: "Suave y esponjoso.", previewColor: "#e3e4b2" },
  "skeleton-run": { name: "Esqueleto", description: "Spooky scary skeletons.", previewColor: "#a3a3a3" },
  "nugget": { name: "Nugget", description: "Tan rico como siempre.", previewColor: "#e3a857" },
  "spin": { name: "Spin", previewColor: "#add8e6" },
  "fatduck": { name: "Pato Gordito", description: "Tan gordo como la chuchu.", previewColor: "#ffe082" },
  "penguin": { name: "Pingüino", description: "ClubPenguin", previewColor: "#81d4fa" },
  "frog": { name: "Ranita", description: "Croac croac.", previewColor: "#a5d6a7" },
  "banana": { name: "Banana", description: "¡No falta potasio.", previewColor: "#fff59d" },
};

const dynamicTrails = Object.entries(trailAssets)
  .map(([path, mod]) => {
    const id = path.split("/").pop().split(".")[0];
    const meta = TRAIL_METADATA[id] || {};
    const name = meta.name || id.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

    return {
      id,
      name,
      description: meta.description || name,
      type: "trail",
      previewColor: meta.previewColor || generatePastelColor(id),
      icon: <img src={mod.default} alt={name} style={{ width: "40px" }} />,
    };
  })
  .filter((item) => item.id !== "ghost");

// --- SHOP DATA ---
export const SHOP_DATA = {
  backgrounds: [
    {
      id: "gradient",
      name: "Gradiente Original",
      description: "El clásico gradiente.",
      type: "background",
      previewColor: "linear-gradient(45deg, #8629b1, #f700ff)",
    },
    {
      id: "silk",
      name: "Seda",
      description: "Suavidad y elegancia.",
      type: "background",
      previewColor: "#ff99cc",
      image: bgSilk,
    },
    {
      id: "lightpillars",
      name: "Pilares de Luz",
      description: "Pilares de luz etéreos.",
      type: "background",
      previewColor: "#00ffff",
      image: bgPillars,
    },
    {
      id: "pixelsnow",
      name: "Nieve Píxel",
      description: "Nevada retro pixelada.",
      type: "background",
      previewColor: "#ffffff",
      image: bgSnow,
    },
    {
      id: "floatinglines",
      name: "Líneas Flotantes",
      description: "Ondas de energía interactivas.",
      type: "background",
      previewColor: "#bd71ff",
      image: bgFloating,
    },
    {
      id: "galaxy",
      name: "Galaxia",
      description: "Un viaje por las estrellas.",
      type: "background",
      previewColor: "#000",
      image: bgGalaxy,
    },
    {
      id: "hyperspeed",
      name: "Hipervelocidad",
      description: "Velocidad luz y distorsión.",
      type: "background",
      previewColor: "#d856bf",
      image: bgHyperspeed,
    },
    {
      id: "ballpit",
      name: "Piscina de Bolas",
      description: "Un parque de bolas!!",
      type: "background",
      previewColor: "#29b1ff",
      image: bgBallpit,
    },
  ],
  cursors: [
    {
      id: "default",
      name: "Ratón Estándar",
      description: "El cursor de toda la vida.",
      type: "cursor",
      previewColor: "transparent",
      icon: <FiMousePointer />,
    },
    ...Object.entries(CURSOR_CONFIG).map(([id, config]) => ({
      id: id,
      name: config.name,
      description: config.desc,
      type: "cursor",
      previewColor: "transparent",
      icon: config.icon,
    })),
  ],
  trails: [
    {
      id: "none",
      name: "Ninguno",
      description: "Sin rastro, limpio y rápido.",
      type: "trail",
      previewColor: "transparent",
      icon: <FiX />,
    },
    ...dynamicTrails.sort((a, b) => a.name.localeCompare(b.name)),
  ],
};

const TABS = [
  { id: "backgrounds", label: "Fondos", icon: <FiImage /> },
  { id: "cursors", label: "Cursores", icon: <FiMousePointer /> },
  { id: "trails", label: "Mascotas", icon: <FiHeart /> },
];

const ShopContainer = () => {
  const {
    activeShop,
    openShop,
    closeShop,
    activeBackground,
    setBackground,
    activeCursor,
    setCursor,
    activeTrail,
    setTrail,
  } = useStore();

  const [displayShop, setDisplayShop] = useState(activeShop);

  useEffect(() => {
    if (activeShop) {
      setDisplayShop(activeShop);
    }
  }, [activeShop]);

  const currentItems = SHOP_DATA[displayShop] || [];

  const handleItemClick = (item) => {
    if (activeShop === "backgrounds") setBackground(item.id);
    if (activeShop === "cursors") setCursor(item.id);
    if (activeShop === "trails") setTrail(item.id);
  };

  const isEquipped = (itemId) => {
    if (activeShop === "backgrounds") return activeBackground === itemId;
    if (activeShop === "cursors") return activeCursor === itemId;
    if (activeShop === "trails") return activeTrail === itemId;
    return false;
  };

  return (
    <AnimatePresence>
      {activeShop && (
        <motion.div
          className="shop-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}>
          <div
            className="click-outside-layer"
            onClick={closeShop}
            style={{ position: "absolute", inset: 0, pointerEvents: "auto" }}
          />

          <motion.div
            className="shop-window"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}>
            
            {/* --- HEADER --- */}
            <div className="shop-header-row">
              <div className="shop-tabs">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => openShop(tab.id)}
                    className={`tab-btn ${activeShop === tab.id ? "active" : ""}`}>
                    {tab.icon}
                    <span>{tab.label}</span>
                    {activeShop === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="active-line"
                      />
                    )}
                  </button>
                ))}
              </div>

              <button onClick={closeShop} className="close-btn">
                <FiX />
              </button>
            </div>

            <div className="shop-section-title">
              Selector de{" "}
              {displayShop === "backgrounds"
                ? "Fondos"
                : displayShop === "cursors"
                  ? "Cursores"
                  : "Mascotas"}
            </div>

            {/* --- GRID --- */}
            <div className="shop-grid">
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayShop}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "20px",
                    width: "100%",
                  }}>
                  {currentItems.map((item) => (
                    <div
                      key={item.id}
                      className={`shop-item ${isEquipped(item.id) ? "equipped" : ""}`}
                      onClick={() => handleItemClick(item)}>
                      <div
                        className={`item-preview ${item.type}`}
                        style={{
                          background: item.previewColor,
                        }}>
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              position: "absolute",
                              top: 0,
                              left: 0,
                            }}
                          />
                        )}
                        {item.icon && (
                          <div className="preview-icon" style={{ zIndex: 1 }}>
                            {item.icon}
                          </div>
                        )}

                        {isEquipped(item.id) && (
                          <div className="check-badge">
                            <FiCheck />
                          </div>
                        )}
                      </div>

                      <div className="item-info">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <span
                          className="price-tag"
                          style={{
                            color: isEquipped(item.id) ? "#00e676" : "#bd71ff",
                            background: isEquipped(item.id) ? "rgba(0, 230, 118, 0.15)" : "rgba(189, 113, 255, 0.15)",
                          }}>
                          {isEquipped(item.id) ? "Equipado" : "Seleccionar"}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShopContainer;

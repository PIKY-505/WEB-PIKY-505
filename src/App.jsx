import React, { useState, useEffect } from "react";
import { useStore } from "./store/useStore";
import BackgroundController from "./components/Backgrounds/BackgroundController";
import StaggeredMenu from "./components/UI/StaggeredMenu";
import { AnimatePresence, motion } from "framer-motion";
import "./styles/main.scss";
import BackgroundCustomizer from "./components/UI/BackgroundCustomizer";
import Dock from "./components/UI/Dock";
import LoadingScreen from "./components/UI/LoadingScreen";
import MusicPlayer from "./components/UI/MusicPlayer";
import {
  FiBriefcase,
  FiAward,
  FiUser,
  FiLayers,
  FiSliders,
  FiMusic,
} from "react-icons/fi";

// Portfolio Modals
import Projects from "./components/Portfolio/Projects";
import Resume from "./components/Portfolio/Resume";
import Certificates from "./components/Portfolio/Certificates";
import BackgroundSelector from "./components/Portfolio/BackgroundSelector";

const menuItems = [
  { id: "projects", label: "Proyectos", ariaLabel: "Ver Proyectos Personales" },
  { id: "certificates", label: "Certificados", ariaLabel: "Ver Certificados y Cursos" },
  { id: "resume", label: "Currículum", ariaLabel: "Ver Currículum y Experiencia" },
  { id: "themes", label: "Temas Visuales", ariaLabel: "Selector de Fondos" },
  { id: "customizer", label: "Ajustes de Fondo", ariaLabel: "Personalizar Fondo Activo" },
];

function App() {
  const {
    activeModal,
    openModal,
    closeModal,
    activeBackground,
  } = useStore();

  const [showBackgroundSettings, setShowBackgroundSettings] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [floatingLinesConfig, setFloatingLinesConfig] = useState(null);
  const [lightPillarsConfig, setLightPillarsConfig] = useState(null);
  const [ballpitConfig, setBallpitConfig] = useState(null);
  const [silkConfig, setSilkConfig] = useState(null);
  const [galaxyConfig, setGalaxyConfig] = useState(null);
  const [gradientConfig, setGradientConfig] = useState(null);
  const [pixelSnowConfig, setPixelSnowConfig] = useState(null);
  const [hyperspeedConfig, setHyperspeedConfig] = useState(null);

  // --- MOBILE & VIEWPORT FIX ---
  useEffect(() => {
    const setMetaTag = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.name = name;
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };
    setMetaTag("viewport", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover");
    setMetaTag("apple-mobile-web-app-capable", "yes");
    setMetaTag("mobile-web-app-capable", "yes");
    setMetaTag("apple-mobile-web-app-status-bar-style", "black-translucent");
  }, []);

  const handleMenuClick = (itemId) => {
    if (itemId === "customizer") {
      toggleBackgroundSettings();
    } else if (itemId) {
      openModal(itemId);
      setShowBackgroundSettings(false);
    }
    setIsMenuOpen(false);
  };

  const toggleBackgroundSettings = () => {
    if (!showBackgroundSettings) {
      setIsMenuOpen(false);
      closeModal();
      setShowBackgroundSettings(true);
    } else {
      setShowBackgroundSettings(false);
    }
  };

  const dockItems = [
    {
      icon: <FiBriefcase size={22} />,
      label: "Proyectos",
      onClick: () => {
        openModal("projects");
        setIsMenuOpen(false);
        setShowBackgroundSettings(false);
      },
    },
    {
      icon: <FiAward size={22} />,
      label: "Certificados",
      onClick: () => {
        openModal("certificates");
        setIsMenuOpen(false);
        setShowBackgroundSettings(false);
      },
    },
    {
      icon: <FiUser size={22} />,
      label: "Currículum",
      onClick: () => {
        openModal("resume");
        setIsMenuOpen(false);
        setShowBackgroundSettings(false);
      },
    },
    {
      icon: <FiLayers size={22} />,
      label: "Temas Visuales",
      onClick: () => {
        openModal("themes");
        setIsMenuOpen(false);
        setShowBackgroundSettings(false);
      },
    },
    {
      icon: <FiSliders size={22} />,
      label: "Ajustes de Fondo",
      onClick: toggleBackgroundSettings,
    },
    {
      icon: <FiMusic size={22} />,
      label: "Música",
      onClick: () => {
        setShowMusicPlayer((prev) => !prev);
        setIsMenuOpen(false);
      },
    },
  ];

  // --- LOADING LOGIC ---
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 12) + 5;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 200);
          return 100;
        }
        return next;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
      }}>
      
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" progress={progress} />}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            key="main-content"
            className="app-content"
            initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              scale: 1.05,
              filter: "blur(8px)",
              transition: { duration: 0.8 },
            }}
            transition={{ duration: 0.8 }}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}>
            
            {/* 3D WEBGL BACKGROUND CONTROLLER */}
            <BackgroundController
              floatingLinesConfig={floatingLinesConfig}
              lightPillarsConfig={lightPillarsConfig}
              ballpitConfig={ballpitConfig}
              silkConfig={silkConfig}
              galaxyConfig={galaxyConfig}
              gradientConfig={gradientConfig}
              pixelSnowConfig={pixelSnowConfig}
              hyperspeedConfig={hyperspeedConfig}
            />

            {/* MAIN HERO WELCOME OVERLAY (Visible when no modal is open) */}
            <AnimatePresence>
              {!activeModal && !showBackgroundSettings && (
                <div className="portfolio-hero-container">
                  <motion.div
                    className="portfolio-hero-banner"
                    initial={{ opacity: 0, y: 25, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -25, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <span className="hero-badge">CYBERSECURITY & SYSTEMS // ASIR</span>
                    <h1 className="hero-title">PIKY-505</h1>
                    <p className="hero-subtitle">
                      Portfolio personal enfocado en ciberseguridad, administración de infraestructuras en red y desarrollo web interactivo.
                    </p>
                    <div className="hero-actions">
                      <button
                        onClick={() => openModal("projects")}
                        className="hero-btn primary"
                      >
                        <FiBriefcase /> Ver Proyectos
                      </button>
                      <button
                        onClick={() => openModal("certificates")}
                        className="hero-btn secondary"
                      >
                        <FiAward /> Certificados
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* STAGGERED SIDE MENU */}
            <StaggeredMenu
              isOpen={isMenuOpen}
              onToggle={(val) => {
                setIsMenuOpen(val);
                if (val) {
                  setShowBackgroundSettings(false);
                }
              }}
              items={menuItems}
              isFixed={true}
              position="right"
              onItemClick={handleMenuClick}
              colors={["#ffffff", "#aaaaaa", "#555555"]}
              accentColor="#ffffff"
              menuButtonColor="#ffffff"
              openMenuButtonColor="#ffffff"
              displayItemNumbering={true}
              logoUrl={null}
            />

            {/* PORTFOLIO SECTIONS */}
            <Projects />
            <Certificates />
            <Resume />
            <BackgroundSelector />

            {/* BACKGROUND CONTROLS CUSTOMIZER */}
            <AnimatePresence>
              {showBackgroundSettings &&
                [
                  "floatinglines",
                  "lightpillars",
                  "ballpit",
                  "silk",
                  "galaxy",
                  "gradient",
                  "pixelsnow",
                  "hyperspeed",
                ].includes(activeBackground) && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      zIndex: 200,
                      height: "100%",
                      pointerEvents: "auto",
                    }}>
                    <div style={{ height: "100%" }}>
                      <BackgroundCustomizer
                        onClose={toggleBackgroundSettings}
                        floatingLinesConfig={floatingLinesConfig}
                        setFloatingLinesConfig={setFloatingLinesConfig}
                        lightPillarsConfig={lightPillarsConfig}
                        setLightPillarsConfig={setLightPillarsConfig}
                        ballpitConfig={ballpitConfig}
                        setBallpitConfig={setBallpitConfig}
                        silkConfig={silkConfig}
                        setSilkConfig={setSilkConfig}
                        galaxyConfig={galaxyConfig}
                        setGalaxyConfig={setGalaxyConfig}
                        gradientConfig={gradientConfig}
                        setGradientConfig={setGradientConfig}
                        pixelSnowConfig={pixelSnowConfig}
                        setPixelSnowConfig={setPixelSnowConfig}
                        hyperspeedConfig={hyperspeedConfig}
                        setHyperspeedConfig={setHyperspeedConfig}
                      />
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>

            {/* AMBIENT MUSIC PLAYER */}
            <MusicPlayer
              visible={showMusicPlayer}
              onClose={() => setShowMusicPlayer(false)}
            />

            {/* BOTTOM NAVIGATION DOCK */}
            <Dock
              items={dockItems}
              panelHeight={60}
              baseItemSize={45}
              magnification={60}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;

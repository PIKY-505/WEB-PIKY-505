import React, { useState, useEffect } from "react";
import { useStore } from "./store/useStore";
import BackgroundController from "./components/Backgrounds/BackgroundController";
import StaggeredMenu from "./components/UI/StaggeredMenu";
import { AnimatePresence, motion } from "framer-motion";
import "./styles/main.scss";
import BackgroundCustomizer from "./components/UI/BackgroundCustomizer";
import Dock from "./components/UI/Dock";
import {
  FiEdit,
  FiShoppingCart,
  FiBriefcase,
  FiUser,
  FiAward,
  FiTerminal
} from "react-icons/fi";
import ShopContainer from "./components/Shop/ShopContainer";
import TrailSystem from "./components/Effects/TrailSystem";
import LoadingScreen from "./components/UI/LoadingScreen";
import CursorController from "./components/Layout/CursorController";
import TerminalModal from "./components/UI/TerminalModal";

// Portfolio Modals
import Projects from "./components/Portfolio/Projects";
import Resume from "./components/Portfolio/Resume";
import Certificates from "./components/Portfolio/Certificates";

const shopItems = [
  { id: "backgrounds", label: "Fondos", ariaLabel: "Galería de Fondos" },
  { id: "cursors", label: "Cursores", ariaLabel: "Personalizar Cursor" },
  { id: "trails", label: "Mascotas", ariaLabel: "Personalizar Mascota" },
  { id: "terminal", label: "Terminal", ariaLabel: "Abrir Terminal" }
];

function App() {
  const {
    openShop,
    closeShop,
    activeBackground,
    activeShop,
    openModal,
    isTerminalOpen,
    openTerminal,
    closeTerminal,
  } = useStore();

  const [showBackgroundSettings, setShowBackgroundSettings] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [floatingLinesConfig, setFloatingLinesConfig] = useState(null);
  const [lightPillarsConfig, setLightPillarsConfig] = useState(null);
  const [ballpitConfig, setBallpitConfig] = useState(null);
  const [silkConfig, setSilkConfig] = useState(null);
  const [galaxyConfig, setGalaxyConfig] = useState(null);
  const [gradientConfig, setGradientConfig] = useState(null);
  const [pixelSnowConfig, setPixelSnowConfig] = useState(null);
  const [hyperspeedConfig, setHyperspeedConfig] = useState(null);

  // --- IOS & MOBILE VIEWPORT FIX ---
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
    if (itemId === "terminal") {
      openTerminal();
      setIsMenuOpen(false);
    } else if (itemId) {
      openShop(itemId);
    }
  };

  const toggleBackgroundSettings = () => {
    if (!showBackgroundSettings) {
      setIsMenuOpen(false);
      closeShop();
      setShowBackgroundSettings(true);
    } else {
      setShowBackgroundSettings(false);
    }
  };

  const dockItems = [
    {
      icon: <FiTerminal size={22} />,
      label: "Terminal",
      onClick: () => {
        openTerminal();
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
      icon: <FiShoppingCart size={22} />,
      label: "Personalizar",
      onClick: () => {
        if (activeShop) closeShop();
        setIsMenuOpen(!isMenuOpen);
      },
    },
    {
      icon: <FiEdit size={22} />,
      label: "Fondo",
      onClick: toggleBackgroundSettings,
    },
  ];

  // --- LOADING LOGIC ---
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 10) + 3;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 200);
          return 100;
        }
        return next;
      });
    }, 300);
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
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              scale: 1.1,
              filter: "blur(10px)",
              transition: { duration: 1 },
            }}
            transition={{ duration: 1 }}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}>
            
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

            <StaggeredMenu
              isOpen={isMenuOpen}
              onToggle={(val) => {
                setIsMenuOpen(val);
                if (val) {
                  setShowBackgroundSettings(false);
                }
              }}
              items={shopItems}
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

            <CursorController />
            <ShopContainer />
            <TrailSystem />

            {/* INTERACTIVE DRAGGABLE TERMINAL */}
            <AnimatePresence>
              {isTerminalOpen && <TerminalModal onClose={closeTerminal} />}
            </AnimatePresence>

            {/* PORTFOLIO SECTIONS */}
            <Projects />
            <Resume />
            <Certificates />

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

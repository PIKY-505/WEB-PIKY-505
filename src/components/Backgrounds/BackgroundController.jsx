import React from "react";
import { useGameStore } from "../../store/useStore";
import GradientBackground from "./GradientBackground";
import Galaxy from "./Galaxy";
import Silk from "./Silk";
import Ballpit from "./Ballpit";
import FloatingLines from "./FloatingLines";
import LightPillars from "./LightPillars";
import PixelSnow from "./PixelSnow";
import Hyperspeed from "./Hyperspeed";
import { AnimatePresence, motion } from "framer-motion";

const BackgroundController = ({
  floatingLinesConfig: propFlConfig,
  lightPillarsConfig: propLpConfig,
  ballpitConfig: propBpConfig,
  silkConfig: propSilkConfig,
  galaxyConfig: propGalaxyConfig,
  gradientConfig: propGradientConfig,
  pixelSnowConfig: propPixelSnowConfig,
  hyperspeedConfig: propHyperspeedConfig,
}) => {
  // --- STORE CONFIG ---
  const {
    activeBackground,
    floatingLinesConfig: storeFlConfig,
    lightPillarsConfig: storeLpConfig,
    ballpitConfig: storeBpConfig,
    silkConfig: storeSilkConfig,
    galaxyConfig: storeGalaxyConfig,
    gradientConfig: storeGradientConfig,
    pixelSnowConfig: storePixelSnowConfig,
    hyperspeedConfig: storeHyperspeedConfig,
  } = useGameStore();

  // --- CONFIG RESOLUTION ---
  const floatingLinesConfig = propFlConfig || storeFlConfig;
  const lightPillarsConfig = propLpConfig || storeLpConfig;
  const ballpitConfig = propBpConfig || storeBpConfig;
  const silkConfig = propSilkConfig || storeSilkConfig;
  const galaxyConfig = propGalaxyConfig || storeGalaxyConfig;
  const gradientConfig = propGradientConfig || storeGradientConfig;
  const pixelSnowConfig = propPixelSnowConfig || storePixelSnowConfig;
  const hyperspeedConfig = propHyperspeedConfig || storeHyperspeedConfig;

  // --- DEFAULTS ---
  const flConfig = floatingLinesConfig || {
    colors: ["#ffffff", "#666666"],
    count: 6,
    distance: 5,
    bendRadius: 5,
    bendStrength: -0.5,
    enabledWaves: ["top", "middle", "bottom"],
    interactive: false,
    amplitude: 1.0,
    rainbow: false,
  };

  const lpConfig = lightPillarsConfig || {
    topColor: "#ffffff",
    bottomColor: "#333333",
    intensity: 1,
    rotationSpeed: 0.3,
    pillarWidth: 3,
    pillarHeight: 0.4,
    noiseIntensity: 0.5,
    pillarRotation: 293,
    interactive: false,
    glowAmount: 0.002,
    quality: "high",
  };

  const bpConfig = ballpitConfig || {
    colors: ["#ffffff", "#aaaaaa", "#444444"],
    count: 60,
    gravity: 0.1,
    friction: 0.995,
    wallBounce: 0.9,
    followCursor: false,
    enableExplosion: false,
    rainbow: false,
  };

  const sConfig = silkConfig || {
    color: "#ffffff",
    speed: 4,
    scale: 1,
    noiseIntensity: 1.5,
    rotation: 0,
  };

  const gConfig = galaxyConfig || {
    density: 1,
    glowIntensity: 0.5,
    saturation: 0,
    hueShift: 0,
    twinkleIntensity: 0.3,
    rotationSpeed: 0.1,
    starSpeed: 0.5,
    speed: 0.5,
    rainbow: false,
    warp: false,
  };

  const gradConfig = gradientConfig || {
    color1: "#ffffff",
    color2: "#050505",
    speed: 20,
  };

  const psConfig = pixelSnowConfig || {
    color: "#ffffff",
    flakeSize: 0.021,
    minFlakeSize: 0.6,
    pixelResolution: 800,
    speed: 0.9,
    density: 0.6,
    direction: 100,
    brightness: 1.5,
    depthFade: 3,
    farPlane: 100,
    gamma: 0.4545,
    variant: "snowflake",
    rainbow: false,
    storm: false,
  };

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      <AnimatePresence mode="wait">
        {/* --- GRADIENT --- */}
        {activeBackground === "gradient" && (
          <motion.div
            key="gradient"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ position: "absolute", inset: 0 }}>
            <GradientBackground
              color1={gradConfig.color1}
              color2={gradConfig.color2}
              speed={gradConfig.speed}
            />
          </motion.div>
        )}

        {/* --- GALAXY --- */}
        {activeBackground === "galaxy" && (
          <motion.div
            key="galaxy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ position: "absolute", inset: 0, background: "#050010" }}>
            <Galaxy
              density={gConfig.density}
              glowIntensity={gConfig.glowIntensity}
              saturation={gConfig.saturation}
              hueShift={gConfig.hueShift}
              twinkleIntensity={gConfig.twinkleIntensity}
              rotationSpeed={gConfig.rotationSpeed}
              starSpeed={gConfig.starSpeed}
              speed={gConfig.speed}
              rainbow={gConfig.rainbow}
              warp={gConfig.warp}
            />
          </motion.div>
        )}

        {/* --- SILK --- */}
        {activeBackground === "silk" && (
          <motion.div
            key="silk"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ position: "absolute", inset: 0 }}>
            <Silk
              speed={sConfig.speed}
              scale={sConfig.scale}
              color={sConfig.color}
              noiseIntensity={sConfig.noiseIntensity}
              rotation={sConfig.rotation}
            />
          </motion.div>
        )}

        {/* --- BALLPIT --- */}
        {activeBackground === "ballpit" && (
          <motion.div
            key="ballpit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ position: "absolute", inset: 0, background: "#111111" }}>
            <Ballpit
              count={bpConfig.count}
              gravity={bpConfig.gravity}
              friction={bpConfig.friction}
              wallBounce={bpConfig.wallBounce}
              followCursor={bpConfig.followCursor}
              colors={bpConfig.colors}
              enableExplosion={bpConfig.enableExplosion}
              rainbow={bpConfig.rainbow}
            />
          </motion.div>
        )}

        {/* --- FLOATING LINES --- */}
        {activeBackground === "floatinglines" && (
          <motion.div
            key="floatinglines"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ position: "absolute", inset: 0, background: "#000" }}>
            <FloatingLines
              linesGradient={flConfig.colors}
              lineCount={flConfig.count}
              lineDistance={flConfig.distance}
              animationSpeed={0.5}
              bendRadius={flConfig.bendRadius}
              bendStrength={flConfig.bendStrength}
              enabledWaves={flConfig.enabledWaves}
              interactive={flConfig.interactive ?? false}
              parallax={flConfig.parallax ?? false}
              amplitude={flConfig.amplitude ?? 1.0}
              rainbow={flConfig.rainbow}
            />
          </motion.div>
        )}
        {/* --- LIGHT PILLARS --- */}
        {activeBackground === "lightpillars" && (
          <motion.div
            key="lightpillars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ position: "absolute", inset: 0, background: "#000" }}>
            <LightPillars
              topColor={lpConfig.topColor}
              bottomColor={lpConfig.bottomColor}
              intensity={lpConfig.intensity}
              rotationSpeed={lpConfig.rotationSpeed}
              glowAmount={lpConfig.glowAmount ?? 0.002}
              pillarWidth={lpConfig.pillarWidth}
              pillarHeight={lpConfig.pillarHeight}
              noiseIntensity={lpConfig.noiseIntensity}
              pillarRotation={lpConfig.pillarRotation}
              interactive={lpConfig.interactive ?? true}
              quality={lpConfig.quality ?? "high"}
            />
          </motion.div>
        )}

        {/* --- PIXEL SNOW --- */}
        {activeBackground === "pixelsnow" && (
          <motion.div
            key="pixelsnow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ position: "absolute", inset: 0, background: "#000" }}>
            <PixelSnow
              color={psConfig.color}
              flakeSize={psConfig.flakeSize}
              minFlakeSize={psConfig.minFlakeSize}
              pixelResolution={psConfig.pixelResolution}
              speed={psConfig.speed}
              density={psConfig.density}
              direction={psConfig.direction}
              brightness={psConfig.brightness}
              variant={psConfig.variant}
              rainbow={psConfig.rainbow}
              storm={psConfig.storm}
            />
          </motion.div>
        )}

        {/* --- HYPERSPEED --- */}
        {activeBackground === "hyperspeed" && (
          <motion.div
            key="hyperspeed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ position: "absolute", inset: 0, background: "#000" }}>
            <Hyperspeed effectOptions={hyperspeedConfig} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BackgroundController;

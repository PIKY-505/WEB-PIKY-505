import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiGithub, FiExternalLink } from "react-icons/fi";
import { useStore } from "../../store/useStore";
import "../../styles/Portfolio.scss";

const MOCK_PROJECTS = [
  {
    title: "OnlyGame 2026",
    description: "Una experiencia interactiva construida en React y Three.js",
    tech: ["React", "Three.js", "Zustand"],
    link: "#",
    github: "#"
  },
  {
    title: "Portfolio Piky",
    description: "Portfolio minimalista con entorno dinámico.",
    tech: ["Vite", "Framer Motion", "SCSS"],
    link: "#",
    github: "#"
  },
];

export default function Projects() {
  const { activeModal, closeModal } = useStore();

  return (
    <AnimatePresence>
      {activeModal === "projects" && (
        <motion.div
          className="portfolio-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="portfolio-modal"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
          >
            <div className="modal-header">
              <h2>Proyectos Destacados</h2>
              <button className="close-btn" onClick={closeModal}>
                <FiX size={24} />
              </button>
            </div>
            <div className="modal-content">
              <div className="projects-grid">
                {MOCK_PROJECTS.map((p, i) => (
                  <div key={i} className="project-card">
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <div className="tech-stack">
                      {p.tech.map((t, idx) => (
                        <span key={idx} className="tech-badge">{t}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      <a href={p.github} target="_blank" rel="noreferrer"><FiGithub /> Repo</a>
                      <a href={p.link} target="_blank" rel="noreferrer"><FiExternalLink /> Live</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

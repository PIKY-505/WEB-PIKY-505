import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiBriefcase, FiAward, FiBook } from "react-icons/fi";
import { useStore } from "../../store/useStore";
import "../../styles/Portfolio.scss";

export default function Resume() {
  const { activeModal, closeModal } = useStore();

  return (
    <AnimatePresence>
      {activeModal === "resume" && (
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
              <h2>Currículum Vitae</h2>
              <button className="close-btn" onClick={closeModal}>
                <FiX size={24} />
              </button>
            </div>
            <div className="modal-content resume-content">
              
              <section className="resume-section">
                <h3><FiBriefcase /> Experiencia</h3>
                <div className="timeline">
                  <div className="timeline-item">
                    <h4>Desarrollador Frontend</h4>
                    <span>Empresa XYZ | 2024 - Presente</span>
                    <p>Desarrollo de interfaces interactivas y optimización de rendimiento web.</p>
                  </div>
                </div>
              </section>

              <section className="resume-section">
                <h3><FiBook /> Educación</h3>
                <div className="timeline">
                  <div className="timeline-item">
                    <h4>Ingeniería Informática</h4>
                    <span>Universidad de Ejemplo | 2020 - 2024</span>
                    <p>Especialidad en Ingeniería de Software.</p>
                  </div>
                </div>
              </section>

              <section className="resume-section">
                <h3><FiAward /> Habilidades Técnicas</h3>
                <div className="skills-grid">
                  <span className="skill-item">HTML/CSS</span>
                  <span className="skill-item">JavaScript</span>
                  <span className="skill-item">React</span>
                  <span className="skill-item">Three.js</span>
                  <span className="skill-item">Node.js</span>
                  <span className="skill-item">Git</span>
                </div>
              </section>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

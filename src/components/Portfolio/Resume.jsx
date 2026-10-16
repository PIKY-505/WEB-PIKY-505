import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiBriefcase, FiBook, FiCpu } from "react-icons/fi";
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
          onClick={closeModal}
        >
          <motion.div
            className="portfolio-modal"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>
                <FiBriefcase style={{ marginRight: "10px", verticalAlign: "middle" }} />
                Currículum Vitae & Perfil Profesional
              </h2>
              <button className="close-btn" onClick={closeModal} aria-label="Cerrar modal">
                <FiX size={24} />
              </button>
            </div>

            <div className="modal-content resume-content">
              {/* Profile Header */}
              <div className="resume-hero">
                <div className="hero-text">
                  <h3>Piky // Raven</h3>
                  <p className="hero-tagline">
                    Estudiante de Ciberseguridad & Administración de Sistemas (ASIR) | Full Stack & Creative Developer
                  </p>
                  <p className="hero-bio">
                    Especializado en la administración y seguridad de infraestructuras Linux/redes, combinando rigor técnico en sistemas con el desarrollo de aplicaciones web interactivas y arquitecturas frontend modernas.
                  </p>
                </div>
              </div>

              {/* Experiencia / Proyectos Clave */}
              <section className="resume-section">
                <h3>
                  <FiBriefcase /> Experiencia & Proyectos Técnicos
                </h3>
                <div className="timeline">
                  <div className="timeline-item">
                    <h4>Desarrollo de Plataformas Web & Auditoría</h4>
                    <span className="timeline-meta">Proyectos Personales & Académicos | 2024 - Presente</span>
                    <p>
                      Diseño e implementación de plataformas web completas (TROYANET, Red-XTART, Geo-s-Corp) aplicando estándares de seguridad, metodologías BEM, CSS Grid y optimización para navegadores modernos.
                    </p>
                  </div>

                  <div className="timeline-item">
                    <h4>Desarrollo Frontend Interactivo & WebGL</h4>
                    <span className="timeline-meta">Entornos Creativos | 2024 - Presente</span>
                    <p>
                      Construcción de interfaces con React, Vite, Framer Motion y Three.js, integrando shaders interactivos y experiencias visuales fluidas manteniendo rendimiento de 60 FPS.
                    </p>
                  </div>
                </div>
              </section>

              {/* Educación */}
              <section className="resume-section">
                <h3>
                  <FiBook /> Educación & Formación
                </h3>
                <div className="timeline">
                  <div className="timeline-item">
                    <h4>Ciclo Formativo de Grado Superior en ASIR</h4>
                    <span className="timeline-meta">Centro XTART | 2024 - 2026</span>
                    <p>
                      Administración de Sistemas Informáticos en Red: seguridad de redes, servicios de infraestructura, bases de datos relacionales, virtualización y gestión avanzada de entornos Linux y Windows.
                    </p>
                  </div>
                </div>
              </section>

              {/* Habilidades Técnicas */}
              <section className="resume-section">
                <h3>
                  <FiCpu /> Áreas de Especialización & Habilidades
                </h3>
                <div className="skills-categories">
                  <div className="skill-category">
                    <h5>Sistemas & DevOps</h5>
                    <div className="skills-grid">
                      <span className="skill-item">Linux (Debian/Ubuntu/Kali)</span>
                      <span className="skill-item">Bash Scripting</span>
                      <span className="skill-item">Docker</span>
                      <span className="skill-item">Git / GitHub</span>
                      <span className="skill-item">Systemd & Servicios</span>
                    </div>
                  </div>

                  <div className="skill-category">
                    <h5>Redes & Ciberseguridad</h5>
                    <div className="skills-grid">
                      <span className="skill-item">Cisco Networking</span>
                      <span className="skill-item">IPv4 / IPv6 Subnetting</span>
                      <span className="skill-item">VLANs & Routing</span>
                      <span className="skill-item">OWASP Top 10</span>
                      <span className="skill-item">CTF / Hacking Ético</span>
                      <span className="skill-item">Firewalls / iptables</span>
                    </div>
                  </div>

                  <div className="skill-category">
                    <h5>Desarrollo Web & Frontend</h5>
                    <div className="skills-grid">
                      <span className="skill-item">HTML5 Semántico</span>
                      <span className="skill-item">CSS3 (Grid, Flexbox, BEM)</span>
                      <span className="skill-item">JavaScript (ES6+)</span>
                      <span className="skill-item">React & Vite</span>
                      <span className="skill-item">Three.js & WebGL</span>
                      <span className="skill-item">Framer Motion</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

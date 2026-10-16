import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiAward, FiCheckCircle, FiExternalLink, FiCalendar, FiBookOpen } from "react-icons/fi";
import { useStore } from "../../store/useStore";
import "../../styles/Portfolio.scss";

const CERTIFICATES_DATA = [
  {
    title: "Administración de Sistemas Informáticos en Red (ASIR)",
    issuer: "Centro XTART",
    year: "2024 - 2026",
    category: "Formación Oficial",
    description:
      "Formación especializada en administración de sistemas operativos (Linux/Windows Server), gestión de servicios de red, seguridad informática, virtualización, bases de datos y arquitectura de infraestructuras.",
    skills: ["Linux Server", "Redes & Protocolos", "Seguridad en Redes", "Virtualización", "Bash Scripting"],
  },
  {
    title: "Cisco Networking & Infrastructure Fundamentals",
    issuer: "Cisco Networking Academy",
    year: "2025",
    category: "Redes & Comunicaciones",
    description:
      "Fundamentos de conmutación y enrutamiento, direccionamiento IPv4/IPv6, topologías de red, segmentación VLAN, configuración de routers y switches Cisco y resolución de incidencias en capa de enlace y red.",
    skills: ["Cisco IOS", "VLANs", "Routing & Switching", "IPv4/IPv6", "Subnetting"],
  },
  {
    title: "Linux Systems Administration & Security Hardening",
    issuer: "Formación Especializada en Sistemas",
    year: "2025",
    category: "Sistemas & Seguridad",
    description:
      "Gestión de permisos, seguridad del kernel, cortafuegos (iptables/ufw), gestión de servicios systemd, automatización de tareas y directivas de seguridad en distribuciones Debian/Ubuntu y Red Hat.",
    skills: ["Linux Hardening", "Systemd", "iptables/ufw", "SSH Security", "Permisos POSIX"],
  },
  {
    title: "Fundamentos de Ciberseguridad & Hacking Ético",
    issuer: "Certificación en Seguridad Informática",
    year: "2024",
    category: "Ciberseguridad",
    description:
      "Metodologías de análisis de vulnerabilidades, auditorías de seguridad web (OWASP Top 10), resolución de retos en entornos CTF (Capture The Flag) y defensa contra vectores de ataque habituales.",
    skills: ["OWASP Top 10", "CTF Challenges", "Análisis de Vulnerabilidades", "Criptografía Básica"],
  },
  {
    title: "Desarrollo Frontend Moderno & WebGL",
    issuer: "Certificación de Desarrollo Web",
    year: "2024",
    category: "Desarrollo Web",
    description:
      "Creación de aplicaciones web interactivas con React, frameworks de animación como Framer Motion y renderizado 3D acelerado por hardware mediante Three.js y WebGL.",
    skills: ["React", "Three.js", "WebGL", "Framer Motion", "JavaScript ES6+"],
  },
  {
    title: "Docker & Containerization Essentials",
    issuer: "DevOps Learning Path",
    year: "2024",
    category: "DevOps & Cloud",
    description:
      "Creación de imágenes optimizadas con Dockerfile, orquestación de servicios multicontenedor mediante Docker Compose, gestión de volúmenes persistentes y redes aisladas.",
    skills: ["Docker", "Docker Compose", "Microservicios", "Aislamiento de Entornos"],
  },
];

const CATEGORIES = ["Todos", "Formación Oficial", "Redes & Comunicaciones", "Sistemas & Seguridad", "Ciberseguridad", "Desarrollo Web"];

export default function Certificates() {
  const { activeModal, closeModal } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredCerts =
    selectedCategory === "Todos"
      ? CERTIFICATES_DATA
      : CERTIFICATES_DATA.filter((c) => c.category === selectedCategory);

  return (
    <AnimatePresence>
      {activeModal === "certificates" && (
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
                <FiAward style={{ marginRight: "10px", verticalAlign: "middle" }} />
                Certificados y Formación Técnica
              </h2>
              <button className="close-btn" onClick={closeModal} aria-label="Cerrar modal">
                <FiX size={24} />
              </button>
            </div>

            <div className="modal-content">
              <p className="modal-intro">
                Certificaciones, cursos y titulaciones académicas en administración de sistemas, ciberseguridad, redes y tecnologías web:
              </p>

              {/* Categorías */}
              <div className="filter-pills">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`filter-pill ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="certificates-list">
                {filteredCerts.map((cert, idx) => (
                  <div key={idx} className="certificate-item">
                    <div className="cert-badge-wrapper">
                      <FiAward className="cert-icon" />
                    </div>

                    <div className="cert-details">
                      <div className="cert-header-meta">
                        <span className="cert-category-tag">{cert.category}</span>
                        <span className="cert-year">
                          <FiCalendar size={13} style={{ marginRight: 4 }} />
                          {cert.year}
                        </span>
                      </div>

                      <h3>{cert.title}</h3>
                      <p className="cert-issuer">
                        <FiBookOpen size={14} style={{ marginRight: 6 }} />
                        {cert.issuer}
                      </p>

                      <p className="cert-desc">{cert.description}</p>

                      <div className="cert-skills">
                        {cert.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="cert-skill-tag">
                            <FiCheckCircle size={12} style={{ marginRight: 4 }} />
                            {skill}
                          </span>
                        ))}
                      </div>
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

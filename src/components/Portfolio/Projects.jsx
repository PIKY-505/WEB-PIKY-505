import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiGithub, FiExternalLink, FiFolder, FiCode } from "react-icons/fi";
import { useStore } from "../../store/useStore";
import "../../styles/Portfolio.scss";

const FEATURED_PROJECTS = [
  {
    title: "TROYANET",
    category: "Ciberseguridad & Web",
    description:
      "Plataforma web para una convención de ciberseguridad y hacking ético. Diseñada para hospedar retos CTF, agenda de conferencias por franjas, ponentes destacados y estructura responsive construida con CSS Grid avanzado.",
    tech: ["HTML5", "CSS Grid", "Responsive Design", "Ciberseguridad"],
    github: "https://github.com/PIKY-505/TROYANET",
    link: "https://github.com/PIKY-505/TROYANET",
  },
  {
    title: "Geo-s-Corp",
    category: "Sistemas & Redes",
    description:
      "Proyecto intermodular de administración de sistemas y servicios en red (ASIR). Integra despliegue de infraestructura corporativa, configuración de servicios web y arquitectura orientada a entornos productivos.",
    tech: ["Linux", "Redes", "Sistemas", "Arquitectura Web"],
    github: "https://github.com/PIKY-505/Geo-s-Corp",
    link: "https://github.com/PIKY-505/Geo-s-Corp",
  },
  {
    title: "Red-XTART",
    category: "Frontend Architecture",
    description:
      "Plataforma web para el centro tecnológico XTART. Desarrollada con HTML5 semántico estricto, metodología BEM para estilos modulares y escalables, y sistemas de maquetación basados en Flexbox y CSS Grid.",
    tech: ["HTML5 Semántico", "CSS3 BEM", "Flexbox", "CSS Grid"],
    github: "https://github.com/PIKY-505/Red-XTART",
    link: "https://github.com/PIKY-505/Red-XTART",
  },
  {
    title: "WEB-PIKY-505",
    category: "Desarrollo Web & 3D",
    description:
      "Portfolio interactivo de alto rendimiento con shaders WebGL en tiempo real (Three.js), animaciones reactivas con Framer Motion y arquitectura SPA optimizada en React y Vite.",
    tech: ["React", "Vite", "Three.js", "WebGL", "Framer Motion", "SCSS"],
    github: "https://github.com/PIKY-505/WEB-PIKY-505",
    link: "https://github.com/PIKY-505/WEB-PIKY-505",
  },
  {
    title: "PIKY-505 Environment & Tooling",
    category: "DevOps & Seguridad",
    description:
      "Colección de entornos de trabajo en Linux, scripts de automatización en Bash, contenedores Docker para aislamiento de servicios y utilidades orientadas a auditorías de seguridad informática.",
    tech: ["Linux", "Bash", "Docker", "Git", "Seguridad"],
    github: "https://github.com/PIKY-505/PIKY-505",
    link: "https://github.com/PIKY-505/PIKY-505",
  },
];

const CATEGORIES = ["Todos", "Ciberseguridad & Web", "Sistemas & Redes", "Frontend Architecture", "Desarrollo Web & 3D", "DevOps & Seguridad"];

export default function Projects() {
  const { activeModal, closeModal } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProjects =
    selectedCategory === "Todos"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <AnimatePresence>
      {activeModal === "projects" && (
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
                <FiFolder style={{ marginRight: "10px", verticalAlign: "middle" }} />
                Proyectos Personales & Informáticos
              </h2>
              <button className="close-btn" onClick={closeModal} aria-label="Cerrar modal">
                <FiX size={24} />
              </button>
            </div>

            <div className="modal-content">
              <p className="modal-intro">
                Selección de proyectos informáticos destacados que abarcan ciberseguridad, administración de sistemas, desarrollo frontend y experiencias gráficas interactivas:
              </p>

              {/* Categorías / Filtros */}
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

              <div className="projects-grid">
                {filteredProjects.map((p, i) => (
                  <div key={i} className="project-card">
                    <div className="project-header-row">
                      <span className="project-category">{p.category}</span>
                      <FiCode className="project-corner-icon" />
                    </div>

                    <h3>{p.title}</h3>
                    <p>{p.description}</p>

                    <div className="tech-stack">
                      {p.tech.map((t, idx) => (
                        <span key={idx} className="tech-badge">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="project-links">
                      <a href={p.github} target="_blank" rel="noreferrer">
                        <FiGithub /> Repositorio
                      </a>
                      <a href={p.link} target="_blank" rel="noreferrer">
                        <FiExternalLink /> Ver Proyecto
                      </a>
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

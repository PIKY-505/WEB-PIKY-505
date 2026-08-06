import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiAward } from "react-icons/fi";
import { useStore } from "../../store/useStore";
import "../../styles/Portfolio.scss";

export default function Certificates() {
  const { activeModal, closeModal } = useStore();

  return (
    <AnimatePresence>
      {activeModal === "certificates" && (
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
              <h2>Certificados y Cursos</h2>
              <button className="close-btn" onClick={closeModal}>
                <FiX size={24} />
              </button>
            </div>
            <div className="modal-content">
              
              <div className="certificates-list">
                <div className="certificate-item">
                  <FiAward className="cert-icon" />
                  <div className="cert-details">
                    <h3>React - The Complete Guide</h3>
                    <p>Udemy - 2024</p>
                  </div>
                </div>

                <div className="certificate-item">
                  <FiAward className="cert-icon" />
                  <div className="cert-details">
                    <h3>Three.js Journey</h3>
                    <p>Bruno Simon - 2025</p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

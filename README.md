# WEB-PIKY-505 - Personal Web Portfolio

A high-performance personal portfolio web application showcasing IT projects, certifications, technical resume, and interactive 3D WebGL backgrounds.

## 🚀 Overview

**WEB-PIKY-505** is built with modern frontend technologies to deliver a fast, responsive, and visually compelling experience. It highlights software engineering, systems administration (ASIR), cybersecurity, and frontend development projects.

## 🛠️ Tech Stack

- **React 19**: Component architecture and stateful UI workflows.
- **Vite**: Next-generation frontend tooling and development server with Hot Module Replacement (HMR).
- **Three.js & @react-three/fiber**: Hardware-accelerated 3D shaders, particle fields, and interactive WebGL canvas backgrounds.
- **Framer Motion & GSAP**: Smooth modal transitions, spring animations, and staggered menu dynamics.
- **Zustand**: Lightweight global state management for theme selection and modal navigation.
- **Sass (SCSS)**: Modular, maintainable styling structure.

## 📂 Project Structure

```text
src/
├── assets/                  # Background GIFs and ambient media assets
├── components/
│   ├── Backgrounds/         # WebGL/Three.js interactive 3D background controllers
│   ├── Portfolio/           # Projects, Certificates, Resume, and Visual Theme selector
│   └── UI/                  # Dock, StaggeredMenu, LoadingScreen, BackgroundCustomizer
├── store/                   # Zustand global store (useStore.js)
└── styles/                  # SCSS stylesheets
```

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```
Optimized static files will be generated in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

## 📜 Featured Sections

- **Projects**: Comprehensive catalog of featured software and infrastructure projects (TROYANET, Geo-s-Corp, Red-XTART, WEB-PIKY-505, PIKY-505 tooling) with GitHub repository links and stack tags.
- **Certificates**: Formal education (ASIR) and technical certifications in Linux systems, Cisco networking, cybersecurity, web development, and Docker.
- **Resume**: Technical background, education, and domain expertise across systems, networking, and modern frontend engineering.
- **Visual Themes**: Switch between interactive real-time backgrounds (Floating Lines, Light Pillars, Galaxy, Hyperspeed, Silk, Pixel Snow, Ballpit, Gradient).

---
© 2026 PIKY-505 // Raven. All rights reserved.

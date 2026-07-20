import React from 'react';
import { useStore } from '../../store/useStore';

export function WindowManager() {
  const activeWindows = useStore((state) => state.activeWindows);
  const openWindow = useStore((state) => state.openWindow);

  return (
    <div style={styles.container}>
      <nav style={styles.sidebar}>
        <h3 style={{ color: 'var(--accent-primary)', marginBottom: '2rem' }}>[ RAVEN_OS ]</h3>
        <button onClick={() => openWindow('CV')} style={styles.btn}>./init_CV.sh</button>
        <button onClick={() => openWindow('PROJECTS')} style={styles.btn}>./load_projects.sh</button>
        <button onClick={() => openWindow('CERTS')} style={styles.btn}>./verify_certs.sh</button>
      </nav>
      
      <main style={styles.workspace}>
        {activeWindows.length === 0 && (
          <p style={{ color: 'var(--text-muted)' }}>Awaiting execution sequence...</p>
        )}
        
        {/* Aquí iteraremos sobre activeWindows para renderizar la grilla Tiling */}
        {activeWindows.map(win => (
          <div key={win} style={styles.window}>
            <div style={styles.windowHeader}>Proceso: {win}</div>
            <div style={styles.windowBody}>Cargando datos...</div>
          </div>
        ))}
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: '20px',
    gap: '20px',
    pointerEvents: 'none' // Se hereda del padre, se sobreescribe en hijos
  },
  sidebar: {
    width: '250px',
    borderRight: 'var(--border-thin)',
    paddingRight: '20px',
    pointerEvents: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  workspace: {
    flex: 1,
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    pointerEvents: 'auto'
  },
  btn: {
    background: 'transparent',
    border: 'var(--border-thin)',
    color: 'var(--text-main)',
    fontFamily: 'var(--font-mono)',
    padding: '10px',
    textAlign: 'left',
    transition: '0.2s',
    cursor: 'none' // Para usar el custom cursor
  },
  window: {
    flex: '1 1 45%',
    backgroundColor: 'var(--bg-panel)',
    border: 'var(--border-thin)',
    display: 'flex',
    flexDirection: 'column'
  },
  windowHeader: {
    backgroundColor: 'var(--bg-surface)',
    padding: '5px 10px',
    borderBottom: 'var(--border-thin)',
    color: 'var(--accent-primary)',
    fontSize: '0.85rem'
  },
  windowBody: {
    padding: '15px',
    flex: 1
  }
};

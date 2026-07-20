import React, { useState } from 'react';
import { useStore } from '../../store/useStore';

export function LockScreen() {
  const unlockSystem = useStore((state) => state.unlockSystem);
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (input.toLowerCase() === 'raven') {
        unlockSystem();
      } else {
        setInput('');
      }
    }
  };

  return (
    <div className="lockscreen-container" style={styles.container}>
      <div className="terminal-box" style={styles.terminal}>
        <p style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>
          CONNECTION ESTABLISHED. ENCRYPTED HANDSHAKE.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>root@system:~#</span>
          <input 
            type="password"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.input}
            placeholder="Introduce credenciales..."
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 5, 5, 0.85)',
    backdropFilter: 'blur(5px)'
  },
  terminal: {
    border: 'var(--border-accent)',
    padding: '2rem',
    backgroundColor: 'var(--bg-panel)',
    width: '600px',
    boxShadow: '0 0 20px var(--accent-dim)'
  },
  input: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-main)',
    fontFamily: 'var(--font-mono)',
    fontSize: '1rem',
    outline: 'none',
    width: '100%'
  }
};

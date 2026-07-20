import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useStore } from './store/useStore';
import { NetworkTopology } from './components/Backgrounds/NetworkTopology';
import { WindowManager } from './components/UI/WindowManager';
import { LockScreen } from './components/UI/LockScreen';
import { CustomCursor } from './components/Effects/CustomCursor';

export default function App() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const bootSequenceComplete = useStore((state) => state.bootSequenceComplete);

  useEffect(() => {
    // Simula la carga de subsistemas
    const timer = setTimeout(() => bootSequenceComplete(), 2000);
    return () => clearTimeout(timer);
  }, [bootSequenceComplete]);

  return (
    <div className="system-root">
      <CustomCursor />
      
      {/* Capa WebGL Off-main-thread */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
             {/* Tu nuevo shader de nodos de red, en lugar de partículas/nieve */}
             <NetworkTopology />
          </Suspense>
        </Canvas>
      </div>

      {/* Capa UI DOM */}
      <div className="ui-layer">
        {!isAuthenticated ? (
          <LockScreen />
        ) : (
          <WindowManager />
        )}
      </div>
    </div>
  );
}

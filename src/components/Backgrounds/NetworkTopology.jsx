import React from 'react';

export function NetworkTopology() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="green" wireframe />
    </mesh>
  );
}

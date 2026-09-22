export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.65} color="#FFEFE0" />
      <directionalLight
        position={[40, 60, 20]}
        intensity={1.4}
        color="#FFF3D9"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-90}
        shadow-camera-right={90}
        shadow-camera-top={110}
        shadow-camera-bottom={-110}
        shadow-camera-far={220}
      />
      <hemisphereLight args={['#FFE9D6', '#8FBF78', 0.5]} />
    </>
  )
}

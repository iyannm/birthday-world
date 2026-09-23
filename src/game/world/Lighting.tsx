import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color, DirectionalLight, Fog } from 'three'
const gardenSky = new Color('#F1E8DB'),
  hillSky = new Color('#DCDDEB'),
  tint = new Color()
/** One warm sun and a cool sky fill. The small shadow frustum follows the camera. */
export function Lighting() {
  const sun = useRef<DirectionalLight>(null)
  useFrame(({ camera, scene }) => {
    const light = sun.current
    if (light) {
      light.position.set(camera.position.x + 22, camera.position.y + 34, camera.position.z + 8)
      light.target.position.set(camera.position.x, camera.position.y - 5, camera.position.z - 10)
      light.target.updateMatrixWorld()
    }
    tint.copy(gardenSky).lerp(hillSky, Math.max(0, Math.min(1, (camera.position.y - 17) / 24)))
    if (scene.background instanceof Color) scene.background.copy(tint)
    if (scene.fog instanceof Fog) scene.fog.color.copy(tint)
  })
  return (
    <>
      <ambientLight intensity={0.3} color="#FFE8D5" />
      <hemisphereLight args={['#E5E7FF', '#64755A', 1.15]} />
      <directionalLight
        ref={sun}
        position={[22, 42, 8]}
        intensity={2.1}
        color="#FFE6BA"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-26}
        shadow-camera-right={26}
        shadow-camera-top={26}
        shadow-camera-bottom={-26}
        shadow-camera-far={110}
        shadow-normalBias={0.08}
        shadow-bias={-0.0002}
      />
    </>
  )
}

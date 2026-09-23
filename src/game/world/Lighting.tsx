import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AmbientLight, Color, DirectionalLight, Fog, HemisphereLight, MathUtils } from 'three'
import { useGameStore } from '../../state/gameStore'
const gardenSky = new Color('#F1E8DB'),
  hillSky = new Color('#DCDDEB'),
  nightSky = new Color('#564566'),
  moonLight = new Color('#BAC8FF'),
  sunLight = new Color('#FFE6BA'),
  tint = new Color()
/** One warm sun and a cool sky fill. The small shadow frustum follows the camera. */
export function Lighting() {
  const sun = useRef<DirectionalLight>(null)
  const ambient = useRef<AmbientLight>(null)
  const hemisphere = useRef<HemisphereLight>(null)
  const nightBlend = useRef(0)
  useFrame(({ camera, scene }, delta) => {
    const target = useGameStore.getState().finaleActive ? 1 : 0
    nightBlend.current = MathUtils.damp(nightBlend.current, target, 2, delta)
    const light = sun.current
    if (light) {
      light.position.set(camera.position.x + 22, camera.position.y + 34, camera.position.z + 8)
      light.target.position.set(camera.position.x, camera.position.y - 5, camera.position.z - 10)
      light.target.updateMatrixWorld()
      light.intensity = MathUtils.lerp(2.1, 0.8, nightBlend.current)
      light.color.copy(sunLight).lerp(moonLight, nightBlend.current)
    }
    if (ambient.current) ambient.current.intensity = MathUtils.lerp(0.3, 0.22, nightBlend.current)
    if (hemisphere.current) hemisphere.current.intensity = MathUtils.lerp(1.15, 0.65, nightBlend.current)
    tint.copy(gardenSky).lerp(hillSky, Math.max(0, Math.min(1, (camera.position.y - 17) / 24)))
    tint.lerp(nightSky, nightBlend.current)
    if (scene.background instanceof Color) scene.background.copy(tint)
    if (scene.fog instanceof Fog) scene.fog.color.copy(tint)
  })
  return (
    <>
      <ambientLight ref={ambient} intensity={0.3} color="#FFE8D5" />
      <hemisphereLight ref={hemisphere} args={['#E5E7FF', '#64755A', 1.15]} />
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

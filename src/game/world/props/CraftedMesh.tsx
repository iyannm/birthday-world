import { useEffect } from 'react'
import type { BufferGeometry } from 'three'
import { DoubleSide, FrontSide } from 'three'
export function CraftedMesh({
  geometry,
  glow = false,
  shadow = true,
  doubleSided = false,
}: {
  geometry: BufferGeometry
  glow?: boolean
  shadow?: boolean
  doubleSided?: boolean
}) {
  useEffect(() => () => geometry.dispose(), [geometry])
  return (
    <mesh geometry={geometry} castShadow={shadow && !glow} receiveShadow={!glow}>
      {glow ? (
        <meshBasicMaterial vertexColors />
      ) : (
        <meshStandardMaterial vertexColors roughness={0.88} side={doubleSided ? DoubleSide : FrontSide} />
      )}
    </mesh>
  )
}

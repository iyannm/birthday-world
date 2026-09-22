import { useMemo } from 'react'
import { Text } from '@react-three/drei'
import { useSafeTexture } from '../../../hooks/useSafeTexture'
import { palette } from '../worldConfig'

interface PolaroidFrameProps {
  id: string
  position: [number, number, number]
  rotation?: [number, number, number]
  image?: string
  scale?: number
}

const PLACEHOLDER_COLORS = [palette.pink, palette.lightPink, palette.gold, palette.lavender, palette.sage]

function colorForId(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  return PLACEHOLDER_COLORS[hash % PLACEHOLDER_COLORS.length]
}

/** Polaroid-style photo card. Shows the real image when it loads, an attractive
 * gradient-toned placeholder otherwise — never crashes on a missing photo. */
export function PolaroidFrame({ id, position, rotation = [0, 0, 0], image, scale = 1 }: PolaroidFrameProps) {
  const texture = useSafeTexture(image)
  const color = useMemo(() => colorForId(id), [id])

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh position={[0, 0, -0.03]} castShadow>
        <boxGeometry args={[1.3, 1.55, 0.06]} />
        <meshStandardMaterial color="#FFFBF3" flatShading />
      </mesh>
      <mesh position={[0, 0.08, 0.005]}>
        <planeGeometry args={[1.1, 1.1]} />
        {texture ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshStandardMaterial color={color} flatShading />
        )}
      </mesh>
      {!texture && (
        <Text position={[0, 0.08, 0.03]} fontSize={0.32} color="#FFFFFF" anchorX="center" anchorY="middle">
          ❤
        </Text>
      )}
    </group>
  )
}

import { useMemo } from 'react'
import { Balloon } from '../props/Balloon'
import { Bench } from '../props/Bench'
import { Cake } from '../props/Cake'
import { FlowerPatch } from '../props/FlowerPatch'
import { Lamp } from '../props/Lamp'
import { Present } from '../props/Present'
import { WorldSign } from '../props/WorldSign'
import { birthdayConfig } from '../../../config/birthday'
import { useGameStore } from '../../../state/gameStore'
import { heightAt, palette, zonePositions } from '../worldConfig'

const BUNTING_COLORS = [palette.pink, palette.gold, palette.lavender, palette.lightPink]

export function BirthdayPlaza() {
  const [x, , z] = zonePositions.birthdayPlaza
  const y = heightAt(x, z)
  const sparkle = useGameStore((s) => s.cakeSparkle)

  const buntingFlags = useMemo(() => {
    const flags = []
    const count = 11
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1)
      flags.push({
        x: -4 + t * 8,
        y: 2.6 - Math.sin(t * Math.PI) * 0.7,
        color: BUNTING_COLORS[i % BUNTING_COLORS.length],
      })
    }
    return flags
  }, [])

  return (
    <group position={[x, 0, z]}>
      <WorldSign position={[-5.5, y, 5.5]} title="Birthday Plaza" subtitle={birthdayConfig.cakeWishPrompt} />

      {/* circular plaza platform */}
      <mesh position={[0, y + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[6.4, 24]} />
        <meshStandardMaterial color={palette.pathStone} flatShading />
      </mesh>

      <group position={[0, y + 0.05, 0]}>
        <Cake position={[0, 0, 0]} sparkle={sparkle} />
      </group>

      <Present position={[-2.2, y + 0.4, 1.6]} color={palette.lavender} rotationY={0.3} />
      <Present position={[2.4, y + 0.35, 1.2]} color={palette.sage} ribbonColor={palette.pink} scale={0.85} rotationY={-0.4} />
      <Present position={[-1.6, y + 0.4, -2.2]} color={palette.pink} ribbonColor={palette.cream} scale={0.95} rotationY={0.9} />

      <Balloon position={[-3.5, y + 2.6, -3]} color={palette.pink} seed={4} />
      <Balloon position={[3.6, y + 2.8, -3.2]} color={palette.lavender} seed={5} />
      <Balloon position={[0, y + 3, -3.6]} color={palette.gold} seed={6} />

      {/* bunting strung between two posts */}
      {[-4.6, 4.6].map((px) => (
        <mesh key={px} position={[px, y + 1.3, 4]} castShadow>
          <cylinderGeometry args={[0.05, 0.06, 2.6, 6]} />
          <meshStandardMaterial color={palette.wood} flatShading />
        </mesh>
      ))}
      {buntingFlags.map((f, i) => (
        <mesh key={i} position={[f.x, y + f.y, 4]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.18, 0.28, 3]} />
          <meshStandardMaterial color={f.color} flatShading />
        </mesh>
      ))}

      {/* small fountain */}
      <group position={[0, y, 5.6]}>
        <mesh receiveShadow castShadow>
          <cylinderGeometry args={[1.1, 1.2, 0.35, 12]} />
          <meshStandardMaterial color={palette.cream} flatShading />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.95, 0.95, 0.06, 12]} />
          <meshStandardMaterial color={palette.water} transparent opacity={0.7} />
        </mesh>
        <mesh position={[0, 0.55, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.16, 0.7, 6]} />
          <meshStandardMaterial color={palette.pathStone} flatShading />
        </mesh>
      </group>

      <FlowerPatch center={[-5, -1]} y={y} count={18} radius={2.4} />
      <FlowerPatch center={[5, -1]} y={y} count={18} radius={2.4} />

      <Bench position={[-4, y, -3]} rotation={Math.PI / 3} />
      <Bench position={[4, y, -3]} rotation={-Math.PI / 3} />

      <Lamp position={[-5.8, y, 0]} withLight />
      <Lamp position={[5.8, y, 0]} />
    </group>
  )
}

import { Balloon } from '../props/Balloon'
import { Bench } from '../props/Bench'
import { FlowerArch } from '../props/FlowerArch'
import { FlowerPatch } from '../props/FlowerPatch'
import { FloatingParticles } from '../props/FloatingParticles'
import { Lamp } from '../props/Lamp'
import { Tree } from '../props/Tree'
import { WorldSign } from '../props/WorldSign'
import { birthdayConfig } from '../../../config/birthday'
import { heightAt, palette, zonePositions } from '../worldConfig'

export function WelcomeGarden() {
  const [x, , z] = zonePositions.welcomeGarden
  const y = heightAt(x, z)

  return (
    <group position={[x, 0, z]}>
      <WorldSign position={[0, y, 6]} title="Welcome Garden" subtitle={birthdayConfig.welcomeSignSubtitle} />
      <FlowerArch position={[0, y, 3.5]} />

      {/* small fence line */}
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} position={[-6 + i * 1.5, y + 0.3, -3]} castShadow>
          <boxGeometry args={[0.1, 0.6, 0.1]} />
          <meshStandardMaterial color={palette.cream} flatShading />
        </mesh>
      ))}

      <FlowerPatch center={[x - 5, z - 2]} y={heightAt(x - 5, z - 2)} count={22} radius={3} />
      <FlowerPatch center={[x + 5, z + 1]} y={heightAt(x + 5, z + 1)} count={22} radius={3} />
      <FlowerPatch center={[x, z - 6]} y={heightAt(x, z - 6)} count={16} radius={2.6} />

      <Tree position={[-7, y, -5]} scale={1.1} seed={1} />
      <Tree position={[7, y, -6]} scale={1} seed={2} />

      <Balloon position={[-2, y + 2.4, 1]} color={palette.pink} seed={1} />
      <Balloon position={[2.2, y + 2.6, 0.5]} color={palette.gold} seed={2} />
      <Balloon position={[0.5, y + 2.3, -1.5]} color={palette.lavender} seed={3} />

      <Bench position={[-4, y, 2]} rotation={Math.PI / 4} />
      <Bench position={[4, y, 2]} rotation={-Math.PI / 4} />

      <Lamp position={[-6, y, -1]} />
      <Lamp position={[6, y, -1]} />

      <FloatingParticles center={[0, -2]} count={8} radius={5} baseY={y + 1.2} height={1.6} color={palette.lightPink} size={0.1} />
    </group>
  )
}

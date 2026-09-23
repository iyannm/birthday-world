import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color, type InstancedMesh, Object3D } from 'three'
import { Tree } from '../props/Tree'
import { Clearing } from '../props/Clearing'
import { FlowerPatch } from '../props/FlowerPatch'
import { PolaroidFrame } from '../props/PolaroidFrame'
import { WorldSign } from '../props/WorldSign'
import { birthdayConfig } from '../../../config/birthday'
import { heightAt, palette, zonePositions } from '../worldConfig'

const dummy = new Object3D()
const LIGHT_COUNT = 40
const LIGHT_COLOR = new Color(palette.gold)

function StringLights({ radius, centerY }: { radius: number; centerY: number }) {
  const ref = useRef<InstancedMesh>(null)

  useFrame(({ clock }) => {
    const mesh = ref.current
    if (!mesh) return
    const t = clock.elapsedTime
    for (let i = 0; i < LIGHT_COUNT; i++) {
      const angle = (i / LIGHT_COUNT) * Math.PI * 6
      const height = centerY - (i / LIGHT_COUNT) * 6
      const r = radius * (1 - i / (LIGHT_COUNT * 1.6))
      dummy.position.set(Math.cos(angle) * r, height + Math.sin(t * 2 + i) * 0.04, Math.sin(angle) * r)
      dummy.scale.setScalar(0.9 + Math.sin(t * 3 + i) * 0.15)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, LIGHT_COUNT]}>
      <sphereGeometry args={[0.08, 6, 6]} />
      <meshStandardMaterial color={LIGHT_COLOR} emissive={LIGHT_COLOR} emissiveIntensity={1.6} />
    </instancedMesh>
  )
}

const HANGING_STARS: [number, number, number][] = [
  [7.5, 18, 4],
  [-8, 17, -3],
  [3, 15.5, -7.5],
  [-4, 16, 7],
  [8.5, 20, -4],
  [0, 14, 8.5],
]

const POLAROIDS: [number, number, number][] = [
  [6.5, 14, 5.5],
  [-7, 13.5, -4.5],
  [4, 12.5, -7],
  [-5.5, 13, 7.5],
]

export function MemoryTree() {
  const [x, , z] = zonePositions.memoryTree
  const y = heightAt(x, z)

  return (
    <group position={[x, y, z]}>
      <Clearing origin={[x, z]} radius={11} />
      <WorldSign
        position={[-10, 0, 5]}
        title={birthdayConfig.memoryTreeLabel}
        subtitle="Every memory, one tree"
      />

      <Tree position={[0, 0, 0]} scale={5.3} foliageColor={palette.darkGreen} seed={20} />

      <StringLights radius={7} centerY={22} />

      {HANGING_STARS.map((p, i) => (
        <group key={i} position={p}>
          <mesh position={[0, 1.6, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 1.6, 3]} />
            <meshBasicMaterial color={palette.wood} />
          </mesh>
          <mesh>
            <octahedronGeometry args={[0.28, 0]} />
            <meshStandardMaterial
              color={palette.gold}
              emissive={palette.gold}
              emissiveIntensity={1.1}
              flatShading
            />
          </mesh>
        </group>
      ))}

      {POLAROIDS.map((p, i) => (
        <group key={i} position={p}>
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 1.2, 3]} />
            <meshBasicMaterial color={palette.wood} />
          </mesh>
          <PolaroidFrame
            id={`tree-deco-${i}`}
            position={[0, 0, 0]}
            rotation={[0, (i - 1.5) * 0.3, 0]}
            scale={0.75}
          />
        </group>
      ))}

      <FlowerPatch center={[0, 0]} count={40} radius={7.5} />
      <FlowerPatch center={[0, 0]} count={20} radius={4} />
    </group>
  )
}

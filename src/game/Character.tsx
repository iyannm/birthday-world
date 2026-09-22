import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { palette } from './world/worldConfig'

interface CharacterProps {
  moving: boolean
}

/** Extremely simple low-poly player character built from primitives, with a light walk cycle. */
export function Character({ moving }: CharacterProps) {
  const leftLeg = useRef<Group>(null)
  const rightLeg = useRef<Group>(null)
  const leftArm = useRef<Group>(null)
  const rightArm = useRef<Group>(null)
  const bob = useRef<Group>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 9
    const swing = moving ? Math.sin(t) * 0.55 : 0
    if (leftLeg.current) leftLeg.current.rotation.x = swing
    if (rightLeg.current) rightLeg.current.rotation.x = -swing
    if (leftArm.current) leftArm.current.rotation.x = -swing * 0.8
    if (rightArm.current) rightArm.current.rotation.x = swing * 0.8
    if (bob.current) bob.current.position.y = moving ? Math.abs(Math.sin(t)) * 0.08 : 0
  })

  return (
    <group ref={bob}>
      {/* body */}
      <mesh position={[0, 0.62, 0]} castShadow>
        <capsuleGeometry args={[0.28, 0.32, 4, 8]} />
        <meshStandardMaterial color={palette.pink} flatShading />
      </mesh>

      {/* head */}
      <mesh position={[0, 1.18, 0]} castShadow>
        <sphereGeometry args={[0.3, 12, 10]} />
        <meshStandardMaterial color="#FFE1C2" flatShading />
      </mesh>

      {/* hair — top */}
      <mesh position={[0, 1.32, -0.02]} castShadow>
        <sphereGeometry args={[0.32, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color="#6B4A3A" flatShading />
      </mesh>

      {/* hair — long straight back with a faint wave */}
      <mesh position={[0, 0.92, -0.22]} rotation={[0.09, 0, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.22, 0.62, 8]} />
        <meshStandardMaterial color="#6B4A3A" flatShading />
      </mesh>

      {/* hair — side strands framing the face */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.29, 0.97, 0.04]} rotation={[0, 0, side * -0.14]} castShadow>
          <capsuleGeometry args={[0.065, 0.52, 4, 6]} />
          <meshStandardMaterial color="#6B4A3A" flatShading />
        </mesh>
      ))}

      {/* glasses */}
      <group position={[0, 1.19, 0.27]}>
        {[-0.12, 0.12].map((x) => (
          <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.09, 0.016, 6, 12]} />
            <meshStandardMaterial color="#4A3B3F" flatShading />
          </mesh>
        ))}
        <mesh>
          <boxGeometry args={[0.1, 0.014, 0.014]} />
          <meshStandardMaterial color="#4A3B3F" flatShading />
        </mesh>
      </group>

      {/* cheeks */}
      {[-0.15, 0.15].map((x) => (
        <mesh key={x} position={[x, 1.12, 0.25]}>
          <circleGeometry args={[0.05, 8]} />
          <meshStandardMaterial color={palette.lightPink} />
        </mesh>
      ))}

      {/* legs */}
      <group ref={leftLeg} position={[-0.13, 0.38, 0]}>
        <mesh position={[0, -0.18, 0]} castShadow>
          <capsuleGeometry args={[0.09, 0.28, 4, 6]} />
          <meshStandardMaterial color={palette.darkGreen} flatShading />
        </mesh>
      </group>
      <group ref={rightLeg} position={[0.13, 0.38, 0]}>
        <mesh position={[0, -0.18, 0]} castShadow>
          <capsuleGeometry args={[0.09, 0.28, 4, 6]} />
          <meshStandardMaterial color={palette.darkGreen} flatShading />
        </mesh>
      </group>

      {/* arms */}
      <group ref={leftArm} position={[-0.34, 0.72, 0]}>
        <mesh position={[0, -0.16, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.24, 4, 6]} />
          <meshStandardMaterial color="#FFE1C2" flatShading />
        </mesh>
      </group>
      <group ref={rightArm} position={[0.34, 0.72, 0]}>
        <mesh position={[0, -0.16, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.24, 4, 6]} />
          <meshStandardMaterial color="#FFE1C2" flatShading />
        </mesh>
      </group>
    </group>
  )
}

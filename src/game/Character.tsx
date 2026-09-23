import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  CapsuleGeometry,
  CatmullRomCurve3,
  CylinderGeometry,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector3,
  type Group,
} from 'three'
import { palette } from './world/worldConfig'
import { box, combine, pigment, place } from './world/props/craftGeometry'
import { CraftedMesh } from './world/props/CraftedMesh'
const SKIN = '#FFE1C2',
  HAIR = '#624638'

/** Rounded cloth, flowing hair and fine glasses; static details are baked together. */
export function Character({ moving }: { moving: boolean }) {
  const leftLeg = useRef<Group>(null),
    rightLeg = useRef<Group>(null)
  const leftArm = useRef<Group>(null),
    rightArm = useRef<Group>(null),
    bob = useRef<Group>(null)
  const body = useMemo(() => {
    const parts = [
      place(pigment(new CapsuleGeometry(0.25, 0.22, 5, 12), palette.pink), [0, 0.72, 0]),
      place(pigment(new CylinderGeometry(0.23, 0.38, 0.37, 16), palette.pink), [0, 0.46, 0]),
      place(
        pigment(new TorusGeometry(0.35, 0.028, 5, 20), palette.cream),
        [0, 0.29, 0],
        [1, 1, 1],
        [Math.PI / 2, 0, 0],
      ),
      place(pigment(new SphereGeometry(0.3, 16, 12), SKIN), [0, 1.21, 0.02], [1, 1.06, 0.95]),
      place(
        pigment(new SphereGeometry(0.321, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.51), HAIR),
        [0, 1.3, -0.015],
      ),
      place(pigment(new SphereGeometry(1, 12, 8), HAIR), [0, 1.03, -0.2], [0.32, 0.47, 0.15]),
      place(
        pigment(new SphereGeometry(1, 10, 6), '#76523E'),
        [-0.115, 1.42, 0.16],
        [0.22, 0.1, 0.16],
        [0, 0, -0.25],
      ),
      box([0.065, 0.016, 0.025], [0, 1.23, 0.304], palette.wood),
      place(
        pigment(new TorusGeometry(0.042, 0.009, 4, 10, Math.PI * 0.7), '#AB725C'),
        [0.024, 1.12, 0.299],
        [1, 1, 1],
        [0, 0, Math.PI * 1.15],
      ),
    ]
    for (const side of [-1, 1]) {
      parts.push(
        place(pigment(new TorusGeometry(0.092, 0.012, 6, 20), '#4A3B3F'), [side * 0.116, 1.23, 0.303]),
      )
      parts.push(
        place(
          pigment(new SphereGeometry(1, 8, 6), '#3F3532'),
          [side * 0.115, 1.23, 0.294],
          [0.016, 0.022, 0.01],
        ),
      )
      parts.push(
        place(
          pigment(new SphereGeometry(1, 8, 6), palette.lightPink),
          [side * 0.17, 1.14, 0.26],
          [0.047, 0.026, 0.016],
        ),
      )
      parts.push(
        place(
          pigment(new SphereGeometry(1, 8, 5), palette.cream),
          [side * 0.105, 0.89, 0.21],
          [0.105, 0.04, 0.045],
          [0, 0, side * 0.3],
        ),
      )
      const curve = new CatmullRomCurve3([
        new Vector3(side * 0.26, 1.38, 0.03),
        new Vector3(side * 0.3, 1.12, 0.06),
        new Vector3(side * 0.28, 0.88, 0.025),
        new Vector3(side * 0.32, 0.73, 0.01),
      ])
      parts.push(pigment(new TubeGeometry(curve, 8, 0.075, 6, false), HAIR))
    }
    for (let i = 0; i < 5; i++) {
      const x = (i - 2) * 0.115
      const curve = new CatmullRomCurve3([
        new Vector3(x, 1.34, -0.26),
        new Vector3(x + 0.035, 1.1, -0.32),
        new Vector3(x - 0.018, 0.85, -0.33),
        new Vector3(x + 0.03, 0.65 + (i % 2) * 0.04, -0.23),
      ])
      parts.push(pigment(new TubeGeometry(curve, 9, 0.073, 6, false), i % 2 ? HAIR : '#795542'))
    }
    // Small ribbon on the back, visible in the normal follow-camera view.
    for (const side of [-1, 1])
      parts.push(
        place(
          pigment(new SphereGeometry(1, 8, 5), palette.lightPink),
          [side * 0.09, 1.16, -0.4],
          [0.11, 0.065, 0.045],
          [0, 0, side * 0.35],
        ),
      )
    return combine(parts)
  }, [])
  const limbs = useMemo(
    () =>
      [0, 1].map(() => ({
        leg: combine([
          place(pigment(new CapsuleGeometry(0.073, 0.16, 4, 8), SKIN), [0, -0.12, 0]),
          place(
            pigment(new SphereGeometry(1, 10, 6), palette.darkGreen),
            [0, -0.24, 0.045],
            [0.1, 0.065, 0.16],
          ),
        ]),
        arm: combine([
          place(pigment(new CapsuleGeometry(0.078, 0.09, 4, 8), palette.pink), [0, -0.065, 0]),
          place(pigment(new CapsuleGeometry(0.06, 0.14, 4, 8), SKIN), [0, -0.2, 0]),
        ]),
      })),
    [],
  )
  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime * 9,
      swing = moving ? Math.sin(t) * 0.5 : 0,
      blend = Math.min(1, delta * 14)
    for (const [ref, target] of [
      [leftLeg, swing],
      [rightLeg, -swing],
      [leftArm, -swing * 0.65],
      [rightArm, swing * 0.65],
    ] as const) {
      if (ref.current) ref.current.rotation.x += (target - ref.current.rotation.x) * blend
    }
    if (bob.current)
      bob.current.position.y = moving
        ? Math.abs(Math.sin(t)) * 0.055
        : Math.sin(clock.elapsedTime * 2) * 0.008
  })
  return (
    <group ref={bob}>
      <CraftedMesh geometry={body} />
      <group ref={leftLeg} position={[-0.13, 0.31, 0]}>
        <CraftedMesh geometry={limbs[0].leg} />
      </group>
      <group ref={rightLeg} position={[0.13, 0.31, 0]}>
        <CraftedMesh geometry={limbs[1].leg} />
      </group>
      <group ref={leftArm} position={[-0.3, 0.82, 0]} rotation={[0, 0, -0.1]}>
        <CraftedMesh geometry={limbs[0].arm} />
      </group>
      <group ref={rightArm} position={[0.3, 0.82, 0]} rotation={[0, 0, 0.1]}>
        <CraftedMesh geometry={limbs[1].arm} />
      </group>
    </group>
  )
}

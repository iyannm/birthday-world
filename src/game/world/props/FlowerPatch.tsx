import { useEffect, useRef } from 'react'
import { Color, InstancedBufferAttribute, type InstancedMesh, Object3D } from 'three'
import { palette } from '../worldConfig'

interface FlowerPatchProps {
  center: [number, number]
  count?: number
  radius?: number
  colors?: string[]
  y?: number
}

const dummy = new Object3D()

/** Instanced flower cluster — one draw call for stems, one for blooms, however many flowers. */
export function FlowerPatch({
  center,
  count = 18,
  radius = 3,
  colors = [palette.pink, palette.lightPink, palette.gold, palette.lavender],
  y = 0,
}: FlowerPatchProps) {
  const bloomRef = useRef<InstancedMesh>(null)
  const stemRef = useRef<InstancedMesh>(null)

  useEffect(() => {
    const bloomMesh = bloomRef.current
    const stemMesh = stemRef.current
    if (!bloomMesh || !stemMesh) return

    const colorArray = new Float32Array(count * 3)
    const tmpColor = new Color()

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = Math.sqrt(Math.random()) * radius
      const x = center[0] + Math.cos(angle) * r
      const z = center[1] + Math.sin(angle) * r
      const h = 0.25 + Math.random() * 0.2

      dummy.position.set(x, y + h / 2, z)
      dummy.rotation.set(0, 0, 0)
      dummy.scale.set(1, h, 1)
      dummy.updateMatrix()
      stemMesh.setMatrixAt(i, dummy.matrix)

      dummy.position.set(x, y + h + 0.05, z)
      dummy.rotation.y = Math.random() * Math.PI
      const s = 0.12 + Math.random() * 0.09
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      bloomMesh.setMatrixAt(i, dummy.matrix)

      tmpColor.set(colors[i % colors.length])
      tmpColor.toArray(colorArray, i * 3)
    }

    stemMesh.instanceMatrix.needsUpdate = true
    bloomMesh.instanceMatrix.needsUpdate = true
    bloomMesh.geometry.setAttribute('color', new InstancedBufferAttribute(colorArray, 3))
  }, [center, count, radius, y, colors])

  return (
    <group>
      <instancedMesh ref={stemRef} args={[undefined, undefined, count]}>
        <cylinderGeometry args={[0.02, 0.02, 1, 4]} />
        <meshStandardMaterial color={palette.sage} />
      </instancedMesh>
      <instancedMesh ref={bloomRef} args={[undefined, undefined, count]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial vertexColors flatShading />
      </instancedMesh>
    </group>
  )
}

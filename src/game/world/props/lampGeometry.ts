import { ConeGeometry, CylinderGeometry } from 'three'
import { palette } from '../worldConfig'
import { box, branch, combine, pigment, place } from './craftGeometry'

export function lampGeometry(height = 2.8) {
  return combine([
    branch([0, 0, 0], [0, height, 0], 0.07, palette.darkGreen),
    place(pigment(new CylinderGeometry(0.15, 0.22, 0.24, 8), palette.wood), [0, 0.12, 0]),
    box([0.44, 0.08, 0.44], [0, height, 0], palette.wood),
    place(
      pigment(new ConeGeometry(0.37, 0.28, 4), palette.darkGreen),
      [0, height + 0.63, 0],
      [1, 1, 1],
      [0, Math.PI / 4, 0],
    ),
    ...[-1, 1].flatMap((x) =>
      [-1, 1].map((z) => box([0.035, 0.45, 0.035], [x * 0.18, height + 0.24, z * 0.18], palette.wood)),
    ),
  ])
}
export function lampGlow(height = 2.8, color: string = palette.gold) {
  return box([0.29, 0.37, 0.29], [0, height + 0.25, 0], color)
}

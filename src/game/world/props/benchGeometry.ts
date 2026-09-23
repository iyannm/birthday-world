import { palette } from '../worldConfig'
import { box, combine } from './craftGeometry'

export function benchGeometry() {
  const parts = []
  for (let i = 0; i < 3; i++)
    parts.push(box([1.8, 0.09, 0.16], [0, 0.55, -0.18 + i * 0.19], i === 1 ? '#AF8261' : palette.wood))
  for (let i = 0; i < 2; i++)
    parts.push(box([1.8, 0.19, 0.08], [0, 0.86 + i * 0.23, -0.27], '#AF8261', [-0.12, 0, 0]))
  for (const x of [-0.7, 0.7]) {
    parts.push(box([0.11, 0.55, 0.54], [x, 0.27, 0], palette.darkGreen))
    parts.push(box([0.09, 0.7, 0.09], [x, 0.8, -0.3], palette.darkGreen))
    parts.push(box([0.12, 0.08, 0.64], [x, 0.79, 0], palette.wood))
  }
  return combine(parts)
}

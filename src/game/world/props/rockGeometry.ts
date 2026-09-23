import { palette } from '../worldConfig'
import { combine, pebble } from './craftGeometry'

export function rockGeometry(seed = 0) {
  return combine([
    pebble([0, 0.28, 0], [1.1, 0.72, 0.85], palette.rock, seed),
    pebble([-0.45, 0.68, -0.12], [0.65, 0.16, 0.5], palette.sage, seed),
    pebble([0.83, 0.08, 0.32], [0.35, 0.28, 0.38], palette.pathStone, seed + 2),
  ])
}

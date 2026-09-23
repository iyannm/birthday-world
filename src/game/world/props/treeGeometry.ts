import { palette } from '../worldConfig'
import { branch, combine, pebble, random } from './craftGeometry'

export function treeGeometry(
  seed = 0,
  foliageColor: string = palette.darkGreen,
  trunkColor: string = palette.wood,
) {
  const rand = random(seed),
    lean = (rand() - 0.5) * 0.6
  const parts = [branch([0, 0, 0], [lean, 3.4, 0], 0.34, trunkColor)]
  for (let i = 0; i < 3; i++) {
    const a = i * 2.1 + seed
    parts.push(branch([0, 0.08, 0], [Math.cos(a) * 0.7, 0.03, Math.sin(a) * 0.7], 0.18, trunkColor))
    parts.push(branch([lean * 0.5, 1.8, 0], [Math.cos(a) * 1.3, 3, Math.sin(a)], 0.16, trunkColor))
  }
  for (let i = 0; i < 5; i++) {
    const a = i * 2.4 + seed,
      r = i === 0 ? 0 : 1.1
    parts.push(
      pebble(
        [lean + Math.cos(a) * r, 3.2 + (i === 0 ? 1.1 : rand() * 0.6), Math.sin(a) * r],
        [1.6 + rand() * 0.3, 1.3 + rand() * 0.7, 1.5],
        foliageColor,
        seed + i,
      ),
    )
  }
  return combine(parts)
}

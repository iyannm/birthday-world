export const palette = {
  cream: '#FFF0DC',
  pink: '#EFA4B7',
  lightPink: '#F7B8C6',
  lavender: '#D8B8EA',
  sage: '#8FBF78',
  darkGreen: '#52765D',
  gold: '#FFD58A',
  pathStone: '#E8D7BF',
  rock: '#8D829E',
  wood: '#8B6048',
  water: '#76BED5',
} as const

export const WORLD_WIDTH = 180
export const WORLD_DEPTH = 220
export const WORLD_BOUNDS = {
  minX: -WORLD_WIDTH / 2 + 4,
  maxX: WORLD_WIDTH / 2 - 4,
  minZ: -WORLD_DEPTH / 2 + 4,
  maxZ: WORLD_DEPTH / 2 - 4,
}

export const SPAWN_POSITION: [number, number, number] = [0, 3, 103]

export const zonePositions = {
  spawn: [0, 3, 103] as [number, number, number],
  welcomeGarden: [-38, 5, 68] as [number, number, number],
  birthdayPlaza: [34, 6, 58] as [number, number, number],
  memoryTree: [0, 12, 0] as [number, number, number],
  wishingTree: [61, 17, -10] as [number, number, number],
  letterHill: [42, 25, -53] as [number, number, number],
  finaleLookout: [-35, 34, -88] as [number, number, number],
}

/** [x, z, y] control points used to Shepard-interpolate a smooth rolling terrain. */
const terrainAnchors: [number, number, number][] = [
  [0, 103, 3],
  [-38, 68, 5],
  [34, 58, 6],
  [0, 30, 9],
  [0, 0, 12],
  [-52, 36, 9],
  [-61, 20, 11],
  [-56, 4, 14],
  [-66, -12, 17],
  [-57, -29, 21],
  [-46, -43, 24],
  [61, -10, 17],
  [42, -53, 25],
  [-40, -65, 29],
  [-35, -88, 34],
  [-90, 110, 4],
  [90, 110, 4],
  [-90, 0, 14],
  [90, 0, 10],
  [-90, -110, 30],
  [90, -110, 22],
]

/** Smooth, cheap procedural terrain height via inverse-distance weighting — no heightmap asset needed. */
export function heightAt(x: number, z: number): number {
  let weightedSum = 0
  let weightSum = 0
  for (const [ax, az, ay] of terrainAnchors) {
    const dx = x - ax
    const dz = z - az
    const distSq = dx * dx + dz * dz
    if (distSq < 0.0001) return ay
    const weight = 1 / distSq ** 1.6
    weightedSum += weight * ay
    weightSum += weight
  }
  return weightedSum / weightSum
}

export interface PathSegment {
  points: [number, number][]
  width?: number
}

/** Organic curved path network connecting every zone (rendered as ribbon strips). */
export const pathSegments: PathSegment[] = [
  {
    points: [
      [0, 103],
      [0, 94],
      [-12, 88],
      [-27, 80],
      [-38, 68],
    ],
    width: 3.8,
  },
  {
    points: [
      [0, 94],
      [12, 88],
      [24, 75],
      [34, 58],
    ],
    width: 3.8,
  },
  {
    points: [
      [-38, 68],
      [-25, 45],
      [-10, 20],
      [0, 0],
    ],
  },
  {
    points: [
      [34, 58],
      [25, 35],
      [10, 15],
      [0, 0],
    ],
  },
  {
    points: [
      [0, 0],
      [-30, 20],
      [-52, 36],
      [-61, 20],
      [-56, 4],
      [-66, -12],
      [-57, -29],
      [-46, -43],
      [-40, -65],
      [-35, -88],
    ],
  },
  {
    points: [
      [0, 0],
      [30, -5],
      [50, -8],
      [61, -10],
    ],
  },
  {
    points: [
      [61, -10],
      [55, -30],
      [48, -45],
      [42, -53],
    ],
  },
  {
    points: [
      [42, -53],
      [20, -65],
      [0, -72],
      [-35, -88],
    ],
  },
]

export interface WaterFeature {
  position: [number, number]
  width: number
  length: number
  rotation: number
}

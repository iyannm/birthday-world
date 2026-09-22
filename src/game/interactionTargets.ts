import { memories } from '../data/memories'
import { birthdayConfig } from '../config/birthday'
import type { InteractionTarget } from '../state/gameStore'
import { zonePositions } from './world/worldConfig'

export interface InteractionPoint {
  position: [number, number]
  radius: number
  target: InteractionTarget
}

/** Every interactive point in the world, in one flat list the player checks proximity against. */
export const interactionPoints: InteractionPoint[] = [
  ...memories.map((m) => ({
    position: [m.location[0], m.location[2]] as [number, number],
    radius: 4,
    target: { type: 'memory', id: m.id, label: 'Open Memory' } as InteractionTarget,
  })),
  {
    position: [zonePositions.birthdayPlaza[0], zonePositions.birthdayPlaza[2]],
    radius: 4.5,
    target: { type: 'cake', label: birthdayConfig.cakeWishPrompt },
  },
  {
    position: [zonePositions.wishingTree[0], zonePositions.wishingTree[2]],
    radius: 5,
    target: { type: 'wish', label: 'Make a Wish' },
  },
  {
    position: [zonePositions.letterHill[0], zonePositions.letterHill[2]],
    radius: 4.5,
    target: { type: 'letter', label: 'Read Letter' },
  },
  {
    position: [zonePositions.finaleLookout[0], zonePositions.finaleLookout[2]],
    radius: 5.5,
    target: { type: 'finale', label: 'Watch the Sky' },
  },
]

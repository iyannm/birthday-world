import { useEffect, useRef } from 'react'

export interface KeyboardState {
  x: number
  y: number
  interact: boolean
}

const MOVE_KEYS: Record<string, [number, number]> = {
  KeyW: [0, -1],
  ArrowUp: [0, -1],
  KeyS: [0, 1],
  ArrowDown: [0, 1],
  KeyA: [-1, 0],
  ArrowLeft: [-1, 0],
  KeyD: [1, 0],
  ArrowRight: [1, 0],
}

/**
 * Desktop fallback controls: WASD/arrow keys to move, E to interact.
 * State lives in a ref so it can be polled from useFrame without
 * re-rendering React on every keypress.
 */
export function useKeyboard() {
  const state = useRef<KeyboardState>({ x: 0, y: 0, interact: false })
  const pressed = useRef<Set<string>>(new Set())

  useEffect(() => {
    const recompute = () => {
      let x = 0
      let y = 0
      pressed.current.forEach((code) => {
        const vec = MOVE_KEYS[code]
        if (vec) {
          x += vec[0]
          y += vec[1]
        }
      })
      const len = Math.hypot(x, y)
      state.current.x = len > 1 ? x / len : x
      state.current.y = len > 1 ? y / len : y
    }

    const onKeyDown = (e: KeyboardEvent) => {
      pressed.current.add(e.code)
      if (e.code === 'KeyE') state.current.interact = true
      recompute()
    }
    const onKeyUp = (e: KeyboardEvent) => {
      pressed.current.delete(e.code)
      if (e.code === 'KeyE') state.current.interact = false
      recompute()
    }
    const onBlur = () => {
      pressed.current.clear()
      state.current = { x: 0, y: 0, interact: false }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return state
}

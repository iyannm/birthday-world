import { useCallback, useRef, useState } from 'react'

export interface JoystickVector {
  x: number
  y: number
}

const MAX_RADIUS = 45

/**
 * Touch/mouse virtual joystick. The live vector is kept in a ref (read
 * every animation frame by the player controller) so dragging never
 * triggers a React re-render; `active` is plain state only for styling
 * the nub while it's grabbed.
 */
export function useJoystick() {
  const baseRef = useRef<HTMLDivElement | null>(null)
  const nubRef = useRef<HTMLDivElement | null>(null)
  const vector = useRef<JoystickVector>({ x: 0, y: 0 })
  const pointerId = useRef<number | null>(null)
  const [active, setActive] = useState(false)

  const updateFromPoint = useCallback((clientX: number, clientY: number) => {
    const base = baseRef.current
    if (!base) return
    const rect = base.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    let dx = clientX - cx
    let dy = clientY - cy
    const dist = Math.hypot(dx, dy)
    if (dist > MAX_RADIUS) {
      dx = (dx / dist) * MAX_RADIUS
      dy = (dy / dist) * MAX_RADIUS
    }
    vector.current = { x: dx / MAX_RADIUS, y: dy / MAX_RADIUS }
    if (nubRef.current) {
      nubRef.current.style.transform = `translate(${dx}px, ${dy}px)`
    }
  }, [])

  const reset = useCallback(() => {
    vector.current = { x: 0, y: 0 }
    if (nubRef.current) {
      nubRef.current.style.transform = 'translate(0px, 0px)'
    }
  }, [])

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (pointerId.current !== null) return
      pointerId.current = e.pointerId
      setActive(true)
      updateFromPoint(e.clientX, e.clientY)
      ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    },
    [updateFromPoint],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (pointerId.current !== e.pointerId) return
      updateFromPoint(e.clientX, e.clientY)
    },
    [updateFromPoint],
  )

  const endTouch = useCallback(
    (e: React.PointerEvent) => {
      if (pointerId.current !== e.pointerId) return
      pointerId.current = null
      setActive(false)
      reset()
    },
    [reset],
  )

  return {
    baseRef,
    nubRef,
    vector,
    active,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endTouch,
      onPointerCancel: endTouch,
      onPointerLeave: endTouch,
    },
  }
}

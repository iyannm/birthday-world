import { forwardRef } from 'react'

export const DebugOverlay = forwardRef<HTMLDivElement>(function DebugOverlay(_, ref) {
  return <div className="debug-overlay" ref={ref} />
})

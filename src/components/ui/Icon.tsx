import type { CSSProperties } from 'react'
export function Icon({
  name,
  size = 20,
  style,
}: {
  name: 'heart' | 'photos' | 'sound' | 'muted' | 'arrow' | 'sparkle'
  size?: number
  style?: CSSProperties
}) {
  const paths = {
    heart:
      'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
    photos: 'M5 3h16v16H5z M2 7v15h15 M8 14l3-3 3 3 2-2 3 4 M16 7h.01',
    sound: 'M11 4 6 8H2v8h4l5 4V4Z M15 8a6 6 0 0 1 0 8 M18 5a10 10 0 0 1 0 14',
    muted: 'M11 4 6 8H2v8h4l5 4V4Z M16 9l6 6 M22 9l-6 6',
    arrow: 'M4 12h16 M14 6l6 6-6 6',
    sparkle: 'm12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2Z',
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      <path d={paths[name]} />
    </svg>
  )
}

import { useEffect, useState } from 'react'
import { BirthdayWorld } from './game/BirthdayWorld'
import { PhotoManager } from './dev/PhotoManager'

function isDevPhotosPath(pathname: string) {
  const relative = pathname.startsWith(import.meta.env.BASE_URL)
    ? pathname.slice(import.meta.env.BASE_URL.length)
    : pathname
  return relative.replace(/^\/+/, '').startsWith('dev/photos')
}

export default function App() {
  const [pathname] = useState(() => window.location.pathname)
  const devRoute = isDevPhotosPath(pathname)

  useEffect(() => {
    if (devRoute && !import.meta.env.DEV) {
      window.history.replaceState(null, '', import.meta.env.BASE_URL)
    }
  }, [devRoute])

  if (devRoute && import.meta.env.DEV) {
    return <PhotoManager />
  }

  return <BirthdayWorld />
}

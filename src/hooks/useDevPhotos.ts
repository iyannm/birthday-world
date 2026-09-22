import { useCallback, useEffect, useState } from 'react'
import { deleteDevPhoto, getAllDevPhotos, saveDevPhoto } from '../dev/photoDb'

export interface DevPhotoEntry {
  url: string
  caption: string
}

/**
 * Loads dev-uploaded photos from IndexedDB and keeps a map of
 * id -> { url, caption } (object URLs) in sync as photos are
 * added/removed. Used by both the dev Photo Manager screen and the
 * in-world memory displays so uploads preview immediately.
 */
export function useDevPhotos() {
  const [entries, setEntries] = useState<Record<string, DevPhotoEntry>>({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    getAllDevPhotos()
      .then((records) => {
        if (cancelled) return
        const next: Record<string, DevPhotoEntry> = {}
        for (const r of records) {
          next[r.id] = { url: URL.createObjectURL(r.blob), caption: r.caption }
        }
        setEntries(next)
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
    return () => {
      cancelled = true
    }
  }, [])

  const upload = useCallback(async (id: string, blob: Blob, caption: string) => {
    await saveDevPhoto(id, blob, caption)
    setEntries((prev) => {
      const old = prev[id]
      if (old) URL.revokeObjectURL(old.url)
      return { ...prev, [id]: { url: URL.createObjectURL(blob), caption } }
    })
  }, [])

  const remove = useCallback(async (id: string) => {
    await deleteDevPhoto(id)
    setEntries((prev) => {
      const old = prev[id]
      if (old) URL.revokeObjectURL(old.url)
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [])

  return { entries, loaded, upload, remove }
}

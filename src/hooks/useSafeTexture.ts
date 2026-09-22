import { useEffect, useState } from 'react'
import * as THREE from 'three'

const loader = new THREE.TextureLoader()
const cache = new Map<string, THREE.Texture | null>()

/**
 * Loads a texture without ever throwing — resolves to `null` on a
 * missing/broken image so callers can render a placeholder instead of
 * crashing the scene. Successful loads are cached by URL.
 */
export function useSafeTexture(url: string | undefined): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(() =>
    url && cache.has(url) ? (cache.get(url) ?? null) : null,
  )

  useEffect(() => {
    if (!url) {
      setTexture(null)
      return
    }
    if (cache.has(url)) {
      setTexture(cache.get(url) ?? null)
      return
    }
    let cancelled = false
    loader.load(
      url,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        cache.set(url, tex)
        if (!cancelled) setTexture(tex)
      },
      undefined,
      () => {
        cache.set(url, null)
        if (!cancelled) setTexture(null)
      },
    )
    return () => {
      cancelled = true
    }
  }, [url])

  return texture
}

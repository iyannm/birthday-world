import { useEffect, useRef, useState } from 'react'
import { useGameStore } from '../state/gameStore'

const MUSIC_SRC = `${import.meta.env.BASE_URL}audio/music.mp3`

/** Optional background music. If /public/audio/music.mp3 is absent the app works
 * normally and the sound toggle simply doesn't appear. Never autoplays before a
 * user gesture — playback only starts from the mute-button click handler. */
export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [available, setAvailable] = useState(false)
  const muted = useGameStore((s) => s.muted)
  const toggleMute = useGameStore((s) => s.toggleMute)

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC)
    audio.loop = true
    audio.volume = 0.4
    const onReady = () => setAvailable(true)
    const onError = () => setAvailable(false)
    audio.addEventListener('canplaythrough', onReady)
    audio.addEventListener('error', onError)
    audioRef.current = audio
    return () => {
      audio.removeEventListener('canplaythrough', onReady)
      audio.removeEventListener('error', onError)
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const toggleMusic = () => {
    const audio = audioRef.current
    toggleMute()
    if (!audio) return
    if (muted) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }

  return { musicAvailable: available, toggleMusic }
}

import { useRef, useState } from 'react'
import { memories } from '../data/memories'
import { useDevPhotos, type DevPhotoEntry } from '../hooks/useDevPhotos'

const INSTRUCTIONS = `DEV PHOTO MANAGER

Photos uploaded here are stored only in this browser for testing.

For the final deployed version:

1. Place your final images inside /public/photos/
2. Name them memory_01.jpg, memory_02.jpg, etc.
3. Update captions and image extensions in src/data/memories.ts if needed
4. Commit and push.`

interface SlotProps {
  id: string
  index: number
  entry?: DevPhotoEntry
  onUpload: (file: File, caption: string) => void
  onRemove: () => void
}

function Slot({ id, index, entry, onUpload, onRemove }: SlotProps) {
  const [caption, setCaption] = useState(memories[index]?.caption ?? '')
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File | undefined) => {
    if (!file) return
    if (!/^image\/(jpeg|jpg|png|webp)$/.test(file.type)) return
    onUpload(file, caption)
  }

  return (
    <div className="dev-photo-slot" data-testid={id}>
      <h3>Memory {index + 1}</h3>
      <div
        className="dev-photo-preview dev-photo-dropzone"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          handleFile(e.dataTransfer.files?.[0])
        }}
        style={{ borderColor: dragOver ? '#EFA4B7' : undefined }}
      >
        {entry ? (
          <img
            src={entry.url}
            alt={caption}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }}
          />
        ) : (
          <span>❤</span>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <input
        className="dev-photo-caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Caption"
      />
      <div className="dev-photo-actions">
        <button className="dev-photo-choose" onClick={() => inputRef.current?.click()}>
          Choose Photo
        </button>
        <button className="dev-photo-remove" onClick={onRemove}>
          Remove
        </button>
      </div>
    </div>
  )
}

/** Dev-only local photo preview tool. Never shipped to production — App.tsx gates the
 * /dev/photos route behind import.meta.env.DEV and redirects otherwise. */
export function PhotoManager() {
  const { entries, upload, remove } = useDevPhotos()

  return (
    <div className="dev-photos-page">
      <div className="dev-photos-header">
        <h1>Dev Photo Manager</h1>
      </div>
      <pre className="dev-photos-instructions">{INSTRUCTIONS}</pre>
      <div className="dev-photos-grid">
        {memories.map((m, i) => (
          <Slot
            key={m.id}
            id={m.id}
            index={i}
            entry={entries[m.id]}
            onUpload={(file, caption) => upload(m.id, file, caption)}
            onRemove={() => remove(m.id)}
          />
        ))}
      </div>
    </div>
  )
}

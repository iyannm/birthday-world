import { openDB, type IDBPDatabase } from 'idb'

export interface DevPhotoRecord {
  id: string
  blob: Blob
  caption: string
}

const DB_NAME = 'birthday-world-dev-photos'
const STORE = 'photos'

let dbPromise: Promise<IDBPDatabase> | null = null

/**
 * Dev-only local photo storage. Lets the developer preview real photos
 * in the 3D world without touching the repo. Everything lives in this
 * browser's IndexedDB and never leaves the machine.
 */
function getDb() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: 'id' })
        }
      },
    })
  }
  return dbPromise
}

export async function getAllDevPhotos(): Promise<DevPhotoRecord[]> {
  const db = await getDb()
  return db.getAll(STORE)
}

export async function saveDevPhoto(id: string, blob: Blob, caption: string) {
  const db = await getDb()
  await db.put(STORE, { id, blob, caption })
}

export async function deleteDevPhoto(id: string) {
  const db = await getDb()
  await db.delete(STORE, id)
}

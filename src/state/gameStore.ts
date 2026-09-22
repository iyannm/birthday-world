import { create } from 'zustand'
import { memories } from '../data/memories'

export type GamePhase = 'loading' | 'intro' | 'playing' | 'finale'

export type InteractionTarget =
  | { type: 'memory'; id: string; label: string }
  | { type: 'cake'; label: string }
  | { type: 'wish'; label: string }
  | { type: 'letter'; label: string }
  | { type: 'finale'; label: string }

interface GameState {
  phase: GamePhase
  openedMemories: Set<string>
  activeMemoryId: string | null
  wishModalOpen: boolean
  letterModalOpen: boolean
  memoriesPanelOpen: boolean
  finaleActive: boolean
  cakeSparkle: boolean
  muted: boolean
  nearbyInteraction: InteractionTarget | null
  devPhotoUrls: Record<string, string>

  finishLoading: () => void
  enterWorld: () => void
  setNearbyInteraction: (target: InteractionTarget | null) => void
  triggerInteraction: () => void
  openMemory: (id: string) => void
  closeMemory: () => void
  toggleWishModal: (open?: boolean) => void
  toggleLetterModal: (open?: boolean) => void
  toggleMemoriesPanel: (open?: boolean) => void
  triggerCakeSparkle: () => void
  triggerFinale: () => void
  exploreAgain: () => void
  toggleMute: () => void
  setDevPhotoUrl: (id: string, url: string) => void
}

export const useGameStore = create<GameState>((set, get) => ({
  phase: 'loading',
  openedMemories: new Set(),
  activeMemoryId: null,
  wishModalOpen: false,
  letterModalOpen: false,
  memoriesPanelOpen: false,
  finaleActive: false,
  cakeSparkle: false,
  muted: true,
  nearbyInteraction: null,
  devPhotoUrls: {},

  finishLoading: () => set((s) => (s.phase === 'loading' ? { phase: 'intro' } : {})),

  enterWorld: () => set({ phase: 'playing' }),

  setNearbyInteraction: (target) => set({ nearbyInteraction: target }),

  triggerInteraction: () => {
    const { nearbyInteraction } = get()
    if (!nearbyInteraction) return
    switch (nearbyInteraction.type) {
      case 'memory':
        get().openMemory(nearbyInteraction.id)
        break
      case 'cake':
        get().triggerCakeSparkle()
        break
      case 'wish':
        get().toggleWishModal(true)
        break
      case 'letter':
        get().toggleLetterModal(true)
        break
      case 'finale':
        get().triggerFinale()
        break
    }
  },

  openMemory: (id) =>
    set((s) => {
      const next = new Set(s.openedMemories)
      next.add(id)
      return { activeMemoryId: id, openedMemories: next }
    }),

  closeMemory: () => set({ activeMemoryId: null }),

  toggleWishModal: (open) =>
    set((s) => ({ wishModalOpen: open ?? !s.wishModalOpen })),

  toggleLetterModal: (open) =>
    set((s) => ({ letterModalOpen: open ?? !s.letterModalOpen })),

  toggleMemoriesPanel: (open) =>
    set((s) => ({ memoriesPanelOpen: open ?? !s.memoriesPanelOpen })),

  triggerCakeSparkle: () => {
    set({ cakeSparkle: true })
    setTimeout(() => set({ cakeSparkle: false }), 1800)
  },

  triggerFinale: () => set({ finaleActive: true, phase: 'finale' }),

  exploreAgain: () => set({ finaleActive: false, phase: 'playing' }),

  toggleMute: () => set((s) => ({ muted: !s.muted })),

  setDevPhotoUrl: (id, url) =>
    set((s) => ({ devPhotoUrls: { ...s.devPhotoUrls, [id]: url } })),
}))

export const totalMemories = memories.length

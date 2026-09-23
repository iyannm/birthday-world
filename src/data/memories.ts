export interface Memory {
  id: string
  image: string
  caption: string
  location: [number, number, number]
}

const photosBase = `${import.meta.env.BASE_URL}photos/`

/**
 * Data-driven memory stations along the Memory Trail.
 * Swap `image` paths for real photos in /public/photos and this list
 * is the only thing that needs editing — everything else follows.
 * If an image is missing, the app automatically shows a placeholder.
 */
export const memories: Memory[] = [
  {
    id: 'memory-01',
    image: `${photosBase}memory_01.jpg`,
    caption: 'Cuties in one pic 🥰',
    location: [-52, 9, 36],
  },
  {
    id: 'memory-02',
    image: `${photosBase}memory_02.jpg`,
    caption: "POV: I'm on a date with you 💕",
    location: [-61, 11, 20],
  },
  {
    id: 'memory-03',
    image: `${photosBase}memory_03.jpg`,
    caption: 'One of my faves ❤️',
    location: [-56, 14, 4],
  },
  {
    id: 'memory-04',
    image: `${photosBase}memory_04.jpg`,
    caption: 'Monster eating Iceuna 👹🍦',
    location: [-66, 17, -12],
  },
  {
    id: 'memory-05',
    image: `${photosBase}memory_05.jpg`,
    caption: 'Silly duckies 🐥💛',
    location: [-57, 21, -29],
  },
  {
    id: 'memory-06',
    image: `${photosBase}memory_06.jpg`,
    caption: 'Here is to many more!! 🥂✨',
    location: [-46, 24, -43],
  },
]

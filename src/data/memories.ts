export interface Memory {
  id: string
  image: string
  caption: string
  location: [number, number, number]
}

/**
 * Data-driven memory stations along the Memory Trail.
 * Swap `image` paths for real photos in /public/photos and this list
 * is the only thing that needs editing — everything else follows.
 * If an image is missing, the app automatically shows a placeholder.
 */
export const memories: Memory[] = [
  {
    id: 'memory-01',
    image: '/photos/memory-01.jpg',
    caption: 'A special memory ❤️',
    location: [-52, 9, 36],
  },
  {
    id: 'memory-02',
    image: '/photos/memory-02.jpg',
    caption: 'Another beautiful day.',
    location: [-61, 11, 20],
  },
  {
    id: 'memory-03',
    image: '/photos/memory-03.jpg',
    caption: 'One of my favorites.',
    location: [-56, 14, 4],
  },
  {
    id: 'memory-04',
    image: '/photos/memory-04.jpg',
    caption: 'I still think about this one.',
    location: [-66, 17, -12],
  },
  {
    id: 'memory-05',
    image: '/photos/memory-05.jpg',
    caption: 'Such a good time.',
    location: [-57, 21, -29],
  },
  {
    id: 'memory-06',
    image: '/photos/memory-06.jpg',
    caption: 'Here is to many more.',
    location: [-46, 24, -43],
  },
]

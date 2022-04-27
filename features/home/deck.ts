export interface Deck {
  id: string
  name: string
  stats: {
    new: number
    review: number
  }
}

// @TODO: @kamil rename
export interface Card {
  id: string
  front: string
  back: string
}


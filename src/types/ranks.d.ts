export interface IRank {
  name: string
  abbreviation: string
  description: string
  groupId: number
  displayOrder: number
}

export interface IImage {
    image: any
}

export interface IRankOrder {
    rank: number,
    order: number
}
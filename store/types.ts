export interface Item {
  id: string
  snippet: {
    title: string
    thumbnails: {
      medium: {
        url: string
      }
    }
    publishedAt: string
    channelTitle: string
    description: string
  }
  isFavorite: boolean
}

export interface Meta {
  items?: Item[]
  isFavorite?: boolean
}

export interface State {
  items: Item[]
  relatedItems: Item[]
  favoriteItems: []
  item?: Item
  meta: Meta
  searchItems: Item[]
  searchMeta: Meta
  token: Token
}

export interface Params {
  [key: string]: string
}

export interface FetchPayload {
  uri: string
  params?: Params
}

export interface RootState {}

export interface User {
  email: string
  password: string
}

export type Token = string

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
}

export interface Meta {
  items?: Item[]
}

export interface State {
  items: Item[]
  meta: Meta
}

export interface FetchPopularVideosPayload {
  uri: string
  params?: {}
}

export interface RootState {}

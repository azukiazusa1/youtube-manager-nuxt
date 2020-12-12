export interface Meta {
  items?: string[]
}

export interface State {
  items: string[]
  meta: Meta
}

export interface FetchPopularVideosPayload {
  uri: string
  params?: {}
}

export interface RootState {}

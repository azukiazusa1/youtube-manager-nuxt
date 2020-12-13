export const ROUTES = {
  GET: {
    POPULARS: '/api/popular',
    VIDEO: '/api/video/:id',
    RELATED: '/api/related/:id'
  }
} as const

export default ROUTES

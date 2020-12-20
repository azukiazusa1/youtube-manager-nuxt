import { Context } from '@nuxt/types'

export default ({ $axios, app }: Context) => {
  $axios.onRequest((config) => {
    const token = app.$cookies.get('jwt_token')
    if (token) {
      // eslint-disable-next-line dot-notation
      config.headers.common['Authorization'] = `Bearer ${token}`
    }
  })
}

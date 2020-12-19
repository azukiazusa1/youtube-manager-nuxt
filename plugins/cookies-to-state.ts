import { Context } from '@nuxt/types'

export default ({ app, store }: Context) => {
  const token = app.$cookies.get('jwt_token')
  if (token) {
    store.dispatch('setToken', token)
  }
}

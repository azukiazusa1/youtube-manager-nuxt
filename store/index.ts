import { ActionTree, MutationTree, GetterTree } from 'vuex/types'
import { createRequestClient } from '~/store/request-client'
import { FetchPayload, State, RootState, Meta } from '~/store/types'

export const state = (): State => ({
  items: [],
  item: undefined,
  meta: {}
})

export const actions: ActionTree<State, RootState> = {
  async fetchPopularVideos({ commit }, payload: FetchPayload) {
    const client = createRequestClient(this.$axios)
    const res = await client.get(payload.uri, payload.params)
    commit('mutatePopularVideos', res)
  },

  async fetchVideo({ commit }, payload: FetchPayload) {
    const client = createRequestClient(this.$axios)
    const res = await client.get(payload.uri)
    const params = {
      ...res.video_list
    }
    commit('mutateVideo', params)
  }
}

export const mutations: MutationTree<State> = {
  mutatePopularVideos(state, payload: Meta) {
    state.items = payload.items ? state.items.concat(payload.items) : []
    state.meta = payload
  },

  mutateVideo(state, payload: Meta) {
    const params =
      payload.items && payload.items.length > 0 ? payload.items[0] : undefined
    state.item = params
  }
}

export const getters: GetterTree<State, RootState> = {
  getPopularVideos(state) {
    return state.items
  },
  getMeta(state) {
    return state.meta
  },
  getVideo(state) {
    return state.item
  }
}

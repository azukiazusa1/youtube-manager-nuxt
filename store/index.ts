import { ActionTree, MutationTree, GetterTree } from 'vuex/types'
import { createRequestClient } from '~/store/request-client'
import { FetchPayload, State, RootState, Meta } from '~/store/types'

export const state = (): State => ({
  items: [],
  relatedItems: [],
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
  },

  async fetchRelatedVideos({ commit }, payload: FetchPayload) {
    const client = createRequestClient(this.$axios)
    const res = await client.get(payload.uri)
    commit('mutateRelatedVideos', res)
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
  },

  mutateRelatedVideos(state, payload: Meta) {
    state.relatedItems = payload.items || []
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
  },
  getRelatedVideos(state) {
    return state.relatedItems
  }
}

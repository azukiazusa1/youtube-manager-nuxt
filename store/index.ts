import { ActionTree, MutationTree, GetterTree } from 'vuex/types'
import { createRequestClient } from '~/store/request-client'
import {
  FetchPopularVideosPayload,
  State,
  RootState,
  Meta
} from '~/store/types'

export const state = (): State => ({
  items: [],
  meta: {}
})

export const actions: ActionTree<State, RootState> = {
  async fetchPopularVideos({ commit }, payload: FetchPopularVideosPayload) {
    const client = createRequestClient(this.$axios)
    const res = await client.get(payload.uri, payload.params)
    commit('mutatePopularVideos', res)
  }
}

export const mutations: MutationTree<State> = {
  mutatePopularVideos(state, payload: Meta) {
    state.items = payload.items ? state.items.concat(payload.items) : []
    state.meta = payload
  }
}

export const getters: GetterTree<State, RootState> = {
  getPopularVideos(state) {
    return state.items
  },
  getMeta(state) {
    return state.meta
  }
}

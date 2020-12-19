import { ActionTree, MutationTree, GetterTree } from 'vuex/types'
import { createRequestClient } from '~/store/request-client'
import {
  FetchPayload,
  State,
  RootState,
  Meta,
  User,
  Token
} from '~/store/types'
import firebase from '~/plugins/firebase'

export const state = (): State => ({
  items: [],
  relatedItems: [],
  item: undefined,
  meta: {},
  searchItems: [],
  searchMeta: {},
  token: ''
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
  },

  async searchVideos({ commit }, payload: FetchPayload) {
    const client = createRequestClient(this.$axios)
    const res = await client.get(payload.uri, payload.params)
    commit('mutateSearchVideos', res)
  },

  async signUp({ commit }, payload: User) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
    const token = await res.user?.getIdToken()
    this.$cookies.set('jwt_token', token)
    commit('mutateToken', token)
    this.$router.push('/')
  },

  setToken({ commit }, payload: Token) {
    commit('mutateToken', payload)
  },

  async login({ commit }, payload: User) {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
    const token = await res.user?.getIdToken()
    this.$cookies.set('jwt_token', token)
    commit('mutateToken', token)
    this.$router.push('/')
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
  },

  mutateSearchVideos(state, payload: Meta) {
    state.searchItems = payload.items
      ? state.searchItems.concat(payload.items)
      : []
    state.searchMeta = payload
  },

  mutateToken(state, payload) {
    state.token = payload
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
  },
  getSearchVideos(state) {
    return state.searchItems
  },
  getSearchMeta(state) {
    return state.searchMeta
  },
  isLoggedIn(state) {
    return !!state.token
  }
}

<template>
  <section class="section">
    <div class="container">
      <div class="block">
        <div
          v-for="item in items"
          :key="item.id.videoId"
          class="block video-block"
        >
          <app-video :item="item" :video-id="item.id.videoId" />
        </div>
      </div>

      <div class="block">
        <nav class="pagination">
          <a href.prevent="#" class="pagination-next" @click="loadMore"></a>
        </nav>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import ROUTES from '~/routes/api'
import AppVideo from '~/components/AppVideo.vue'
import { FetchPayload } from '~/store/types'

export default Vue.extend({
  components: {
    AppVideo
  },
  async fetch({ store, query }) {
    const q = encodeURIComponent(query.q as string) || ''
    const payload: FetchPayload = {
      uri: ROUTES.GET.SEARCH,
      params: {
        q
      }
    }

    if (
      store.getters.getSearchVideos &&
      store.getters.getSearchVideos.length > 0
    ) {
      return
    }

    await store.dispatch('searchVideos', payload)
  },
  computed: {
    items() {
      return this.$store.getters.getSearchVideos
    },
    nextPageToken() {
      return this.$store.getters.getSerachMeta.nextPageToken
    }
  },
  methods: {
    loadMore() {
      const q = encodeURIComponent(this.$route.query.q as string) || ''
      const payload: FetchPayload = {
        uri: ROUTES.GET.SEARCH,
        params: {
          q
        }
      }

      this.$store.dispatch('searchVideos', payload)
    }
  }
})
</script>

<style scoped>
.video-block {
  max-width: 900px;
}
</style>

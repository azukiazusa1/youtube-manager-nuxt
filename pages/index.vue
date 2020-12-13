<template>
  <section class="section">
    <div class="container">
      <div class="block">
        <div v-for="item in items" :key="item.id" class="block video-block">
          <app-video :item="item" :video-id="item.id" />
        </div>
      </div>

      <div class="block">
        <nav class="pagination">
          <a href.prevent="#" class="pagination-next" @click="loadMore">
            More
          </a>
        </nav>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import ROUTES from '~/routes/api'
import AppVideo from '~/components/AppVideo.vue'
import { FetchPopularVideosPayload } from '~/store/types'

export default Vue.extend({
  components: {
    AppVideo
  },

  async fetch({ store }) {
    const payload: FetchPopularVideosPayload = {
      uri: ROUTES.GET.POPULARS
    }

    if (
      store.getters.getPopularVideos &&
      store.getters.getPopularVideos.length > 0
    ) {
      return
    }

    await store.dispatch('fetchPopularVideos', payload)
  },

  computed: {
    items() {
      return this.$store.getters.getPopularVideos
    },
    nextPageToken() {
      return this.$store.getters.getMeta.nextPageToken
    }
  },

  methods: {
    loadMore() {
      const payload: FetchPopularVideosPayload = {
        uri: ROUTES.GET.POPULARS,
        params: {
          pageToken: this.nextPageToken
        }
      }
      this.$store.dispatch('fetchPopularVideos', payload)
    }
  }
})
</script>

<style scoped>
.video-block {
  max-width: 900px;
}
</style>

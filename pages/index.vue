<template>
  <section class="section">
    <div class="container">
      <div class="block">
        <div v-for="item in items" :key="item.id" class="block video-block">
          <app-video :item="item" :video-id="item.id" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import ROUTES from '~/routes/api'
import AppVideo from '~/components/AppVideo.vue'

export default Vue.extend({
  components: {
    AppVideo
  },

  async fetch({ store }) {
    const payload = {
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
    }
  }
})
</script>

<style scoped>
.video-block {
  max-width: 900px;
}
</style>

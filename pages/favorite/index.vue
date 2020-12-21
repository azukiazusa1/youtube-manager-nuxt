<template>
  <section class="section">
    <div class="container">
      <div class="block">
        <div v-for="item in items" :key="item.id" class="block">
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
      uri: ROUTES.GET.FAVORITE
    }

    await store.dispatch('fetchFavorite', payload)
  },

  computed: {
    items() {
      return this.$store.getters.getFavoriteVideos
    }
  }
})
</script>

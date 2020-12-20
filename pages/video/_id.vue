<template>
  <div class="section">
    <div class="columns">
      <div class="column is-6">
        <div class="block video-player">
          <youtube ref="youtube" :video-id="this.$route.params.id" />
        </div>

        <div class="box">
          <p>
            <span class="title is-4">
              {{ item.snippet.title }}
            </span>
          </p>

          <div class="lavel">
            <div class="lavel-left">
              {{ item.snippet.channelTitle }}
              <br />
              {{ item.snippet.publishedAt }}
            </div>
          </div>

          <div v-if="isLoggedIn" class="lavel-right">
            <a href="#" @click.prevent="toggleFavorite">
              <span class="icon is-large">
                <span class="fa-stack fa-lg">
                  <i
                    class="fas fa-heart fa-stack-1x"
                    :class="[
                      item.isFavorite ? 'active' : 'has-text-grey-light'
                    ]"
                  ></i>
                </span>
              </span>
            </a>
          </div>

          <hr />
          <p>{{ item.snippet.description }}</p>
        </div>
      </div>

      <div class="column is-4">
        <div class="box">
          <p>
            <span>関連動画</span>
          </p>
          <div
            v-for="relatedItem in relatedItems"
            :key="relatedItem.id.videoId"
          >
            <hr />
            <nuxt-link :to="`/video/${relatedItem.id.videoId}`">
              <article class="media">
                <div class="media-left">
                  <figure class="image">
                    <img
                      :src="relatedItem.snippet.thumbnails.default.url"
                      alt="tuhmbnails"
                    />
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p>{{ relatedItem.snippet.title }}</p>
                    <small>{{ relatedItem.snippet.channelTitle }}</small>
                  </div>
                </div>
              </article>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ROUTES from '~/routes/api'

export default Vue.extend({
  async fetch({ store, route }) {
    await store.dispatch('fetchVideo', {
      uri: ROUTES.GET.VIDEO.replace(':id', route.params.id)
    })
    await store.dispatch('fetchRelatedVideos', {
      uri: ROUTES.GET.RELATED.replace(':id', route.params.id)
    })
  },
  computed: {
    item() {
      return this.$store.getters.getVideo
    },
    relatedItems() {
      return this.$store.getters.getRelatedVideos
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    async toggleFavorite() {
      await this.$store.dispatch('toggleFavorite', {
        uri: ROUTES.POST.TOGGLE_FAVORITE.replace(':id', this.$route.params.id)
      })
    }
  }
})
</script>

<style>
iframe {
  width: 100%;
  height: 500px;
}

.video-player {
  max-width: 880px !important;
}

.fa-heart.active {
  color: #ff1493;
}
</style>

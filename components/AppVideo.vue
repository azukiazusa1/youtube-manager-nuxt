<template>
  <nuxt-link :to="`/video/${videoId}`">
    <div class="box video-box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-220x120">
            <img :src="item.snippet.thumbnails.medium.url" alt="Image" />
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ item.snippet.title }}</strong>
              <br />
              <small>{{ item.snippet.publishedAt }}</small>
              <small>{{ item.snippet.channelTitle }}</small>
              <br />
              {{ item.snippet.description | omit }}
            </p>
          </div>
        </div>
      </article>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Item } from '~/store/types'

export default Vue.extend({
  filters: {
    omit(value: string) {
      if (!value) {
        return ''
      }

      if (value.length > 120) {
        return value.substr(0, 120) + '...'
      }

      return value
    }
  },
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true
    },
    videoId: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
.video-box {
  max-width: 900px;
}

.is-220x120 {
  width: 220px;
  height: 120px;
}
</style>

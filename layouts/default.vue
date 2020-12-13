<template>
  <div id="app">
    <the-header />
    <div class="columns">
      <the-sidebar />
      <div class="column content">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheHeader from '~/components/TheHeader.vue'
import TheSidebar from '~/components/TheSidebar.vue'

export default Vue.extend({
  components: {
    TheHeader,
    TheSidebar
  }
})
</script>
<style>
#app {
  min-height: 100vh;
  background: #fafafa;
}

.columns {
  min-height: 100vh;
}
</style>

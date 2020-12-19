<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <nuxt-link class="navbar-item subtitle is-4" to="/">
        Youtube Player
      </nuxt-link>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <div class="field has-addons">
            <form action="/search" method="get">
              <div class="control">
                <input type="text" name="q" class="input" placeholder="検索" />
              </div>
              <div class="control">
                <button class="button">
                  search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="isLoggedIn" class="buttons">
            <a href="#" class="button is-light" @click.prevent="logout">
              Log out
            </a>
          </div>
          <div v-else class="buttons">
            <nuxt-link class="button is-primary" to="/signup">
              <strong>Sign up</strong>
            </nuxt-link>
            <nuxt-link class="button is-light" to="/login">
              <strong>Log in</strong>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
})
</script>

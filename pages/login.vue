<template>
  <div class="section">
    <div class="columns">
      <div class="column is-6">
        <div class="box">
          <div class="field">
            <label for="" class="label">Email</label>
            <div class="control">
              <input
                v-model="email"
                class="input is-info"
                type="email"
                placeholder="Email"
              />
            </div>
          </div>

          <div class="field">
            <label for="" class="label">Password</label>
            <div class="control">
              <input
                v-model="password"
                type="password"
                class="input is-info"
                placeholder="Password"
              />
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link" @click="login">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', user)
    }
  }
})
</script>

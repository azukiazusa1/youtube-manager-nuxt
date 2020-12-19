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
    </div>
  </nav>
</template>

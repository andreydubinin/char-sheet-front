<template>
  <div id="app">
    <router-view name="header"></router-view>
    <main>
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </fade-transition>
    </main>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
import { FadeTransition } from "vue2-transitions";
import { mapActions } from "vuex"

export default {
  components: {
    FadeTransition
  },
  created () {
    this.$store.dispatch('AuthStore/initRefreshToken')
        .then(() => {
          this.fetchUser();
        })
        .catch(error => {
          console.log('error fetch', error)
          this.$router.push('Login');
        });
  },
  methods   : {
    ...mapActions('AuthStore', [
      'fetchUser',
    ]),
  }
};
</script>

<style lang="scss">
@import "assets/scss/main";
</style>

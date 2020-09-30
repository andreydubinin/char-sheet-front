<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-container>
      <b-navbar-brand to="/">
        <img src="/img/logo.png" alt="logo" class="logo-header">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <template v-if="authenticated">
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                <em>{{ login }}</em>
              </template>
              <b-dropdown-item to="/me">Профиль</b-dropdown-item>
              <b-dropdown-item to="/logout">Выйти</b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
          <template v-else>
            <b-nav-item to="/login">Вход</b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>
<script>
import NavbarToggleButton from "@/components/NavbarToggleButton";
import { mapGetters } from 'vuex';

export default {
  name      : "base-nav",
  components: {
    NavbarToggleButton
  },
  props     : {
    type       : {
      type       : String,
      default    : "primary",
      description: "Navbar type (e.g default, primary etc)"
    },
    title      : {
      type       : String,
      default    : "",
      description: "Title of navbar"
    },
    contentId  : {
      type       : [String, Number],
      default    : Math.random().toString(),
      description:
          "Explicit id for the menu. By default it's a generated random number"
    },
    effect     : {
      type       : String,
      default    : "dark",
      description: "Effect of the navbar (light|dark)"
    },
    round      : {
      type       : Boolean,
      default    : false,
      description: "Whether nav has rounded corners"
    },
    transparent: {
      type       : Boolean,
      default    : false,
      description: "Whether navbar is transparent"
    },
    expand     : {
      type       : Boolean,
      default    : false,
      description: "Whether navbar should contain `navbar-expand-lg` class"
    }
  },
  data () {
    return {
      toggled: false
    };
  },
  computed  : {
    ...mapGetters('AuthStore', ['authenticated', 'user']),
    login() {
      return this.user ? this.user.login : '';
    }
  },
  methods   : {
    onTitleClick (evt) {
      this.$emit("title-click", evt);
    },
    closeMenu () {
      this.toggled = false;
    }
  }
};
</script>

<style lang="scss">
.logo-header {
  width: 200px;
}
</style>

<template>
  <div>
    <h1>Вход</h1>
    <b-overlay :show="loading" rounded="sm">
      <validation-observer ref="observer_login" v-slot="{ invalid }">
        <validation-provider
            name="Логин"
            vid="login"
            rules="required|min:3"
            v-slot="{ validated, invalid, errors }"
            slim
        >
          <b-form-group
              id="login-group"
              label=""
              label-for="login"
              :invalid-feedback="errors[0]"
              :state="!validated || !invalid"
          >
            <b-form-input
                id="login"
                v-model="login"
                required
                placeholder="Логин"
            ></b-form-input>
          </b-form-group>
        </validation-provider>

        <validation-provider
            name="Пароль"
            vid="password"
            rules="required"
            v-slot="{ validated, invalid, errors }"
            slim
        >
          <b-form-group
              id="password-group"
              label=""
              label-for="password"
              :invalid-feedback="errors[0]"
              :state="!validated || !invalid"
          >
            <b-form-input
                id="password"
                v-model="password"
                type="password"
                required
                placeholder="Пароль"
            ></b-form-input>
          </b-form-group>
        </validation-provider>

        <b-button type="submit" variant="primary" :disabled="loading" @click="signIn">Submit</b-button>
        <router-link to="/registration" class="ml-5">Регистрация</router-link>
      </validation-observer>
    </b-overlay>
  </div>
</template>
<script>

import { mapGetters } from 'vuex';
import { flatten } from 'lodash'

export default {
  data () {
    return {
      login   : null,
      password: null,
      error   : false,
      loading : false,
    }
  },
  methods : {
    async signIn () {
      if (this.loading)
        return;

      const isValid = await this.$refs.observer_login.validate();

      if (isValid) {
        this.loading = true;
        this.error = false;

        this.$store.dispatch('AuthStore/login', {
          login   : this.login,
          password: this.password
        })
            .then(() => {
              this.$router.push('/')
            })
            .catch(error => {
              console.log(error);
              if (error.response.status === 422) {
                if (error.response.data.hasOwnProperty('errors')) {
                  let msg = flatten(Object.values(error.response.data.errors));
                  this.error = msg.join(', ');
                }
              }
            })
            .finally(() => this.loading = false)
      }
    }
  },
  computed: {
    ...mapGetters(
        'AuthStore',
        ['user']
    ),
  },
  created : function () {
    if (this.$store.state.AuthStore.authenticated)
      this.$router.push('/dashboard');

    this.login = this.user && this.user.login;
  },
}
</script>

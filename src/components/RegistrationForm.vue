<template>
  <div>
    <h1>Регистрация</h1>
    <div class="errors">{{ error }}</div>
    <b-overlay :show="loading" rounded="sm">
      <validation-observer ref="observer_registration" v-slot="{ invalid }">
        <validation-provider
            name="Логин"
            vid="login"
            rules="required|min:3"
            v-slot="{ validated, invalid, errors }"
            slim
        >
          <b-form-group
              id="login-field"
              label=""
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
            :rules="rules.phone"
            v-slot="{ validated, invalid, errors }"
            ref="phone_registration_ref"
            name="Телефон"
            vid="phone"
            slim
        >
          <b-form-group
              id="phone-field"
              label=""
              :invalid-feedback="errors[0]"
              :state="!validated || !invalid"
          >
            <b-form-input
                id="phone"
                v-model="phone"
                v-mask="`+7 ### ###-##-##`"
                required
                placeholder="Телефон"
            ></b-form-input>
          </b-form-group>
        </validation-provider>

        <validation-provider
            name="Пароль"
            vid="password"
            rules="required|confirmed:confirm"
            v-slot="{ validated, invalid, errors }"
            slim
        >
          <b-form-group
              id="password-field"
              label=""
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

        <validation-provider
            name="Подтвердите пароль"
            vid="confirm"
            rules="required"
            v-slot="{ validated, invalid, errors }"
            slim
        >
          <b-form-group
              id="password-confirm-field"
              label=""
              :invalid-feedback="errors[0]"
              :state="!validated || !invalid"
          >
            <b-form-input
                id="confirm-password"
                v-model="passwordConfirmation"
                type="password"
                required
                placeholder="Повторите пароль"
                :invalid-feedback="errors[0]"
                :state="!validated || !invalid"
            ></b-form-input>
          </b-form-group>
        </validation-provider>

        <b-button variant="primary" :disabled="loading" @click="signUp">Отправить</b-button>
        <router-link to="/login" class="ml-5">Вход</router-link>
      </validation-observer>
    </b-overlay>
  </div>
</template>

<script>
import { flatten } from "lodash";

export default {
  data () {
    return {
      login               : null,
      phone               : null,
      password            : null,
      passwordConfirmation: null,
      loading             : false,
      rules               : {
        phone: {
          required: true,
          regex   : /^\+7 \d{3} \d{3}-\d{2}-\d{2}$/,
        }
      },
      error               : null,
    }
  },
  methods: {
    async signUp () {
      if (this.loading)
        return;

      const isValid = await this.$refs.observer_registration.validate();

      if (isValid) {
        this.loading = true;
        this.error = null;

        this.$store.dispatch('AuthStore/registration', {
          login                : this.login,
          password             : this.password,
          password_confirmation: this.passwordConfirmation,
          phone                : this.phone
        })
            .then(() => {
              this.$router.push('/')
            })
            .catch(error => {
              console.error(error);

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
}
</script>


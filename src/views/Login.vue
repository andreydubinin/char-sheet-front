<template>
  <b-container>
    <b-row>
      <b-col lg="9" class="mt-5">
        <login-form></login-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import LoginForm from '@/components/LoginForm'

export default {
  components: {
    LoginForm
  },
}
</script>

<template>
  <b-container>
    <b-row>
      <b-col class="text-center mt-5">
        <b-spinner variant="primary" label="Выходим"></b-spinner>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('AuthStore/logout')
        .finally(() => this.$router.push('/'))
  },
}
</script>

<style scoped>

</style>

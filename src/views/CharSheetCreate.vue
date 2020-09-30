<template>
  <b-container>
    <b-row>
      <b-col class="text-center mt-5">
        <template v-if="error">
          <div class="errors">Произошла ошибка</div>
        </template>
        <template v-else>
          <b-spinner variant="primary" label="Создаем чарник"></b-spinner>
        </template>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'CharSheetCreate',
  data () {
    return {
      error: false
    }
  },
  mounted () {
    this.$store.dispatch('CharSheetStore/create')
        .then(response => {
          this.$router.push(`/charsheet/${response.data.data.id}`)
        })
        .catch(error => {
          console.log(error.response);
          this.error = true;
        });
  }
}
</script>

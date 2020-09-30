<template>
  <b-row no-gutters class="char-slogan">
    <b-col class="text-center slogan-block">
      Девиз
      <b-form-textarea
          id="textarea"
          v-model="slogan"
          rows="4"
      ></b-form-textarea>
    </b-col>
  </b-row>
</template>

<script>
import mapVuexFields from '@/mixins/mapVuexFields'

export default {
  mixins: [mapVuexFields('CharSheetStore/CharSheetDetail', [
    'slogan',
  ])]
}
</script>

<style lang="scss">
.char-slogan {
  height: 100%;

  .slogan-block {
    min-height: 200px;
    border: 4px solid #333;
    border-radius: 35px;
    margin: 1rem 0 2rem;
  }
}
</style>

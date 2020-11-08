<template>
  <b-row class="injury-block mt-5">
    <b-col>
      <div class="title-field">
        Увечья
      </div>
      <input-list v-model="injury" :min-count="7"></input-list>
    </b-col>
  </b-row>
</template>

<script>
import InputList from "@/components/InputList";
import mapVuexFields from "@/mixins/mapVuexFields";

export default {
  mixins    : [mapVuexFields('CharSheetStore/CharSheetDetail', [
    'injury',
  ])],
  components: {
    InputList
  }
}
</script>

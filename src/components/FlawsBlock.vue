<template>
  <b-row class="flaws-block">
    <b-col sm="18" md="4">
      <div class="flaw-title d-inline">Изъяны</div>
    </b-col>
    <b-col sm="18" md="14">
      <input-list v-model="flaws" :min-count="3"></input-list>
    </b-col>
  </b-row>
</template>

<script>
import InputList from "@/components/InputList";
import mapVuexFields from "@/mixins/mapVuexFields";

export default {
  mixins    : [mapVuexFields('CharSheetStore/CharSheetDetail', [
    'flaws',
  ])],
  components: {
    InputList
  }
}
</script>

<style lang="scss">
.flaws-block {
  height: 100%;
  border-left: 3px solid black;
  border-right: 3px solid black;
  padding-bottom: 15px;

  .flaw-title {
    position: absolute;
    top: 0;
    left: 15px;
    font-size: 1.25rem;
    font-weight: bold;
  }

  .flaw {
    &.flaw-first {
      margin-left: 80px;
    }
  }
}
</style>

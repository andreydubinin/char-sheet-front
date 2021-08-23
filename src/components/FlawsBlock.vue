<template>
  <b-row class="flaws-block">
    <div class="flaws-col-title">
      <div class="flaw-title d-inline">{{ title }}</div>
    </div>
    <div class="flaws-col-body">
      <input-list v-model="flaws" :min-count="minCount"></input-list>
    </div>
  </b-row>
</template>

<script>
import InputList from "@/components/InputList";
import mapVuexFields from "@/mixins/mapVuexFields";

export default {
  props: {
    title: {
      type: String,
      default: 'Изъяны',
    },
    minCount: {
      type: Number,
      default: 3,
    }
  },
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

  .flaws-col-body, .flaws-col-title {
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }

  @media (min-width: 768px) {
    .flaws-col-title {
      flex: 0 0 22.2222222222%;
      max-width: 22.2222222222%;
    }

    .flaws-col-body {
      flex: 0 0 77.7777777778%;
      max-width: 77.7777777778%;
    }
  }
}
</style>

<template>
  <b-row class="flaws-block">
    <b-col>
      <div class="flaw-title d-inline">Изъяны</div>
      <div
          class="flaw"
          :class="index === 0 ? 'flaw-first' : 'd-block'"
          v-for="(flaw, index) in flaws"
          :key="index"
      >
        <b-input v-model="flaws[index]"></b-input>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data () {
    return {
      flaws: [
        'asdf',
        'qwer',
        'zcxb'
      ]
    }
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

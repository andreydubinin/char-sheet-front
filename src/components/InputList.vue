<template>
  <div class="input-list-block">
    <div
        class="input-group"
        v-for="(item, index) in localValue"
        :key="index"
    >
      <b-input v-model="localValue[index]" @input="setValues"></b-input>
    </div>
    <b-button v-if="showButton" class="new-input-button" @click="localValue.push('')">+</b-button>
  </div>
</template>

<script>
export default {
  props   : {
    value     : {
      type: Array
    },
    minCount  : {
      type   : Number,
      default: 1
    },
    showButton: {
      type   : Boolean,
      default: true
    }
  },
  computed: {
    localValue: {
      get () {
        let value = this.value || [];

        while (value.length < this.minCount) {
          value.push('');
        }

        return value
      },
    }
  },
  methods : {
    setValues () {
      this.$emit('input', this.localValue.filter(x => !!x));
    }
  },
}
</script>

<style lang="scss">
.input-list-block {
  position: relative;

  .new-input-button {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>

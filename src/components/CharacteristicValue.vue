<template>
  <div class="characteristic-value">
    <b-row
        class="value-block"
        :class="[
            `value-${valueLocal}`,
        ]"
        :style="styleHandler"
        :no-gutters="true"
    >
      <b-col v-for="index in count" :class="{value: true, active: index <= valueLocal}" class="value" sm="auto" @click="changeValue(index)">{{ (index + 1) * 2 }}</b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    value     : {
      type    : Number,
      required: true
    },
    count: {
      type: Number,
      default: 5
    },
    styleHandler: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    valueLocal: {
      get() {
        return this.value;
      },
      set (value) {
        this.$emit('input', value);
      }
    }
  },

  methods: {
    changeValue(newValue) {
      console.log('changeValue');
      if (this.valueLocal === newValue) {
        this.valueLocal--;
      } else {
        this.valueLocal = newValue;
      }
    }
  }
}
</script>

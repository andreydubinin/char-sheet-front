<template>
  <div class="characteristic-value">
    <b-row
        class="value-block"
        :class="[
            `value-${valueLocal}`,
        ]"
        :style="style"
        :no-gutters="true"
    >
      <b-col class="value" sm="auto" @click="changeValue(1)">4</b-col>
      <b-col class="value" sm="auto" @click="changeValue(2)">6</b-col>
      <b-col class="value" sm="auto" @click="changeValue(3)">8</b-col>
      <b-col class="value" sm="auto" @click="changeValue(4)">10</b-col>
      <b-col class="value" sm="auto" @click="changeValue(5)">12</b-col>
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
    width     : {
      type   : Number,
      default: 100
    },
    withNumber: {
      type   : Boolean,
      default: false
    }
  },

  computed: {
    style () {
      const height = this.width * 0.344;
      const fontSize = this.withNumber ? this.width * 0.1 : 0;
      const lineHeight = this.width * 0.37;

      return {
        width     : `${this.width}px`,
        height    : `${height}px`,
        fontSize  : `${fontSize}px`,
        lineHeight: `${lineHeight}px`
      }
    },
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
      if (this.valueLocal === newValue) {
        this.valueLocal--;
      } else {
        this.valueLocal = newValue;
      }
    }
  }
}
</script>

<style lang="scss">
.characteristic-value {
  .value-block {
    background-size: contain;
    background-repeat: no-repeat;
    text-align: center;
    margin: 0 auto;

    .value:hover {
      color: red;
      cursor: pointer;
    }

    :nth-child(1) {
      width: 20%;
      text-align: right;
    }

    :nth-child(2) {
      width: 17%;
      text-align: right;
      padding-top: 3%;
    }

    :nth-child(3) {
      width: 23%;
      padding-bottom: 3%;
    }

    :nth-child(4) {
      width: 15%;
      text-align: left;
    }

    :nth-child(5) {
      width: 20%;
      padding-right: 5%;
    }
  }

  .value-0 {
    background-image: url("/img/cube_0.png");
  }

  .value-1 {
    background-image: url("/img/cube_1.png");

    :nth-child(-n+1) {
      color: white;
    }
  }

  .value-2 {
    background-image: url("/img/cube_2.png");

    :nth-child(-n+2) {
      color: white;
    }
  }

  .value-3 {
    background-image: url("/img/cube_3.png");

    :nth-child(-n+3) {
      color: white;
    }
  }

  .value-4 {
    background-image: url("/img/cube_4.png");

    :nth-child(-n+4) {
      color: white;
    }
  }

  .value-5 {
    background-image: url("/img/cube_5.png");

    color: white;
  }
}
</style>

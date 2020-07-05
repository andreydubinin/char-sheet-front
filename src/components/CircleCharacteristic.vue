<template>
  <div class="circle-characteristic position-relative">
    <div class="main-value rounded-circle d-flex position-relative">
      <div class="value">{{ value }}</div>
      <div class="name">{{ name }}</div>
      <div class="description">{{ description }}</div>
    </div>
    <div class="additional-value-block rounded-circle d-flex" v-if="useAdditionalValue">
      <div class="value">{{ additionalValue }}</div>
      <div class="name">{{ additionalName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value             : {
      type   : Number,
      default: 0
    },
    name              : {
      type   : String,
      default: '111'
    },
    description       : {
      type   : String,
      default: '+1'
    },
    useAdditionalValue: {
      type   : Boolean,
      default: false
    },
    additionalValue   : {
      type   : Number,
      default: 0
    },
    additionalName    : {
      type   : String,
      default: '111'
    }
  }
}
</script>

<style lang="scss">
.circle-characteristic {
  width: 100px;
  font-weight: bold;

  .main-value {
    height: 100px;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 7px dashed black;
    background: white;
    z-index: 1;

    .value {
      font-size: 2rem;
    }

    .name {
      position: absolute;
      bottom: -2rem;
      left: 0;
      right: 0;
    }

    .description {
      color: #ff7c00;
      position: absolute;
      top: -1rem;
      right: -1rem;
    }
  }

  .additional-value-block {
    z-index: 0;
    position: absolute;
    right: -2.5rem;
    bottom: 0;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border: 4px dashed black;

    .value {
      font-size: 1rem;
    }

    .name {
      position: absolute;
      top: -1.5rem;
      right: -1rem;
      font-size: 0.875rem;
    }
  }
}

</style>

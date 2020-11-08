<template>
  <b-row class="health-block">
    <b-col sm="18" class="fix-absolute">
      <div class="title-field">Ранения</div>
      <div class="circle-block circle-block-first">
        <div
            class="circle rounded-circle"
            v-for="i in [-3, -2, -1]"
            :key="i"
            :class="[
                `circle-${Math.abs(i)}`,
                {'active': wounds >= Math.abs(i)}
            ]"
            @click="setWounds(i)"
        >
          <div class="description">{{ i }}</div>
        </div>
        <!--<div class="circle circle-3 rounded-circle">
          <div class="description">-3</div>
        </div>
        <div class="circle circle-2 rounded-circle">
          <div class="description">-2</div>
        </div>
        <div class="circle circle-1 rounded-circle active">
          <div class="description">-1</div>
        </div>-->
      </div>

      <div class="title-field double-border">При смерти</div>
      <div class="circle-block circle-block-second">
        <div
            class="circle rounded-circle"
            v-for="(value, key) in {2: -1, 1: -2}"
            :key="key"
            :class="[
                `circle-${key}`,
                {'active': fatigue >= Math.abs(value)}
            ]"
            @click="setFatigue(value)"
        >
          <div class="description">{{ value }}</div>
        </div>
        <!--<div class="circle circle-2 rounded-circle">
          <div class="description">-1</div>
        </div>
        <div class="circle circle-1 rounded-circle">
          <div class="description">-2</div>
        </div>-->
      </div>
    </b-col>
    <div class="title-field">Усталость</div>
  </b-row>
</template>

<script>
import mapVuexFields from "@/mixins/mapVuexFields";

export default {
  mixins : [mapVuexFields('CharSheetStore/CharSheetDetail', [
    'wounds',
    'fatigue',
  ])],
  methods: {
    setWounds (value) {
      value = Math.abs(value)

      if (this.wounds === value) {
        this.wounds = value - 1;
      } else {
        this.wounds = value;
      }
    },
    setFatigue (value) {
      value = Math.abs(value)

      if (this.fatigue === value) {
        this.fatigue = value - 1;
      } else {
        this.fatigue = value;
      }
    }
  }
}
</script>

<style lang="scss">
.health-block {
  .title-field {
    text-align: left;
    font-size: 1.5rem;

    &.double-border {
      text-align: center;
    }
  }

  .fix-absolute {
    height: 520px;
  }

  .circle-block {
    position: relative;
    width: 150px;

    &.circle-block-first {
      height: 220px;
    }

    &.circle-block-second {
      margin-top: 50px;
    }

    .circle {
      border: 8px dashed black;
      width: 100px;
      height: 100px;
      position: absolute;
      background: white;

      .description {
        color: #ff7c00;
        font-weight: bold;
        position: absolute;
        top: -15px;
      }

      &.active {
        background: #ff8686;
      }

      &.circle-1 {
        top: -40px;
        right: -50px;

        .description {
          right: -15px;
        }
      }

      &.circle-2 {
        top: 30px;
        right: 0;

        .description {
          left: -15px;
        }
      }

      &.circle-3 {
        top: 100px;
        right: -50px;

        .description {
          right: -15px;
        }
      }
    }
  }
}
</style>

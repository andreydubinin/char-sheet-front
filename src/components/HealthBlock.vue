<template>
  <b-row class="health-block">
    <b-col sm="18">
      <div class="title-field">Ранения</div>
      <div class="circle-block circle-block-first">
        <div class="circle circle-3 rounded-circle">
          <div class="description">-3</div>
        </div>
        <div class="circle circle-2 rounded-circle">
          <div class="description">-2</div>
        </div>
        <div class="circle circle-1 rounded-circle active">
          <div class="description">-1</div>
        </div>
      </div>

      <div class="title-field double-border">При смерти</div>
      <div class="circle-block circle-block-second">
        <div class="circle circle-2 rounded-circle">
          <div class="description">-1</div>
        </div>
        <div class="circle circle-1 rounded-circle">
          <div class="description">-2</div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<style lang="scss">
.health-block {
  .title-field {
    text-align: left;
    font-size: 1.5rem;

    &.double-border {
      text-align: center;
    }
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

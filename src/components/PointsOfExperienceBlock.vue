<template>
  <b-row class="points-of-experience-block">
    <b-col sm="18">
      <div class="title">Пункты опыта</div>
    </b-col>
    <b-col sm="18" class="points-of-experience d-flex p-0">
      <div class="experience rounded-circle main-circle"></div>
      <div class="experience rounded-circle simple-circle"></div>
      <div class="experience rounded-circle simple-circle"></div>
      <div class="experience rounded-circle simple-circle"></div>
      <div class="experience rounded-circle simple-circle"></div>
    </b-col>
  </b-row>
</template>

<style lang="scss">
.points-of-experience-block {
  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .points-of-experience {
    flex-direction: row-reverse;
    align-items: flex-end;

    .experience {
      background: white;
      border: 5px dashed black;
      width: 50px;
      height: 50px;
      margin-left: -20px;

      &.main-circle {
        width: 75px;
        height: 75px;
      }
    }
  }
}
</style>

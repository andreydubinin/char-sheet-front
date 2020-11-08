<template>
  <b-row class="circle-characteristic-block">
    <b-col>
      <circle-characteristic v-model="step" name="Шаг" description="6"></circle-characteristic>
    </b-col>
    <b-col>
      <circle-characteristic v-model="defense" name="Защита" description="2"></circle-characteristic>
    </b-col>
    <b-col>
      <circle-characteristic
          v-model="resistance"
          name="Стойкость"
          description="4"
          additional-name="Броня"
          :additional-value="shield"
          :use-additional-value="true"
          @input-additional="shield = $event"
      ></circle-characteristic>
    </b-col>
    <b-col>
      <circle-characteristic v-model="charisma" name="Харизма" description="+0"></circle-characteristic>
    </b-col>
  </b-row>
</template>

<script>
import CircleCharacteristic from "@/components/CircleCharacteristic"
import mapVuexFields from '@/mixins/mapVuexFields'

export default {
  mixins: [mapVuexFields('CharSheetStore/CharSheetDetail', [
    'step',
    'defense',
    'resistance',
    'shield',
    'charisma',
  ])],
  components: {
    CircleCharacteristic
  }
}
</script>

<style lang="scss">
.circle-characteristic-block {
  padding: 30px;
  margin-top: 15px;
  border: 5px double black;
  border-radius: 20px;
}
</style>

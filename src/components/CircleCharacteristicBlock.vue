<template>
  <b-row class="circle-characteristic-block">
    <b-col>
      <circle-characteristic value="0" name="Шаг" description="6"></circle-characteristic>
    </b-col>
    <b-col>
      <circle-characteristic value="0" name="Защита" description="2"></circle-characteristic>
    </b-col>
    <b-col>
      <circle-characteristic value="0" name="Стойкость" description="4" additional-name="Броня" additional-value="0"
                             :use-additional-value="true"></circle-characteristic>
    </b-col>
    <b-col>
      <circle-characteristic value="0" name="Харизма" description="+0"></circle-characteristic>
    </b-col>
  </b-row>
</template>

<script>
import CircleCharacteristic from "../components/CircleCharacteristic"

export default {
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

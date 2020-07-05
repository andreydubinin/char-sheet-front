<template>
  <b-col lg>
    <div class="text-center">{{ type }}</div>
    <characteristic-value :value="3" :width="190" :with-number="true"></characteristic-value>

    <div class="text-lg-right text-center" v-for="ti in t">
      <span class="name">Value {{ ti }}</span>
      <characteristic-value class="d-inline-block" :value="1" :width="100"
                            :with-number="false"></characteristic-value>
    </div>
  </b-col>
</template>

<script>
import CharacteristicValue from "../components/CharacteristicValue"

export default {
  components: {
    CharacteristicValue
  },
  props     : {
    type: {//буду получать из бека по типу данные
      type    : String,
      required: true
    }
  },
  data () {
    return {
      t: [1, 2, 3, 4]
    }
  }
}
</script>

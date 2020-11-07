<template>
  <b-col lg v-if="characteristicList[index]">
    <div class="text-center title-field">{{ characteristicList[index].name }}</div>
    <characteristic-value v-model="characteristicList[index].value"
                          @input="changeCharacteristic(characteristicList[index].id, $event)" :width="190"
                          :with-number="true"></characteristic-value>

    <div class="text-lg-right text-center" v-for="child in characteristicList[index].children" :key="child.id">
      <span class="name">{{ child.name }}</span>
      <characteristic-value class="d-inline-block" v-model="child.value" :width="100"
                            @input="changeCharacteristic(child.id, $event)"
                            :with-number="false"></characteristic-value>
    </div>
    <characteristic-new :parent-id="characteristicList[index].id"></characteristic-new>
  </b-col>
</template>

<script>
import CharacteristicValue from "@/components/CharacteristicValue"
import CharacteristicNew from "@/components/CharacteristicNew"
import { mapGetters, mapActions } from 'vuex'
import mapVuexFields from '@/mixins/mapVuexFields'

export default {
  mixins    : [mapVuexFields('CharSheetStore/CharSheetDetail', [
    'characteristics',
  ])],
  components: {
    CharacteristicValue,
    CharacteristicNew
  },
  props     : {
    index: {
      type    : Number,
      required: true
    }
  },
  computed  : {
    ...mapGetters('CharSheetStore/CharSheetDetail', ['charsheet']),
    ...mapGetters('CharacteristicStore', ['characteristicList']),
  },
  methods   : {
    ...mapActions('CharSheetStore/CharSheetDetail', ['updateCharacteristic']),
    changeCharacteristic (characteristicId, value) {
      this.updateCharacteristic({
        characteristic_id: characteristicId,
        value            : value
      })
          .then(response => {

          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>

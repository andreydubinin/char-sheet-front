<template>
  <div>
    <template v-if="charsheet.type === typeSavageWorld">
      <char-sheet-savage-world></char-sheet-savage-world>
    </template>

    <template v-if="charsheet.type === typeCyberpunk">
      <char-sheet-cyberpunk></char-sheet-cyberpunk>
    </template>

    <template v-if="charsheet.type === typeCustom">
      <char-sheet-custom></char-sheet-custom>
    </template>
  </div>
</template>

<script>
import CharSheetSavageWorld from "@/components/CharSheetSavageWorld";
import CharSheetCustom from "@/components/CharSheetCustom";
import CharSheetCyberpunk from "@/components/CharSheetCyberpunk";
import { TYPE_CHARSHEET_SAVAGE_WORLD, TYPE_CHARSHEET_CUSTOM, TYPE_CHARSHEET_CYBERPUNK } from "@/constants";
import Vue from 'vue'
import { mapGetters } from 'vuex'
import mapVuexFields from "@/mixins/mapVuexFields";

export default {
  mixins    : [mapVuexFields('CharSheetStore/CharSheetDetail', [
    'characteristics',
  ])],
  components: {
    CharSheetSavageWorld,
    CharSheetCustom,
    CharSheetCyberpunk,
  },
  data () {
    return {
      typeSavageWorld: TYPE_CHARSHEET_SAVAGE_WORLD,
      typeCustom     : TYPE_CHARSHEET_CUSTOM,
      typeCyberpunk  : TYPE_CHARSHEET_CYBERPUNK,
    }
  },
  computed: {
    ...mapGetters('CharSheetStore/CharSheetDetail', ['charsheet']),
    ...mapGetters('CharacteristicStore', ['characteristicList']),
  },
  beforeRouteEnter (to, from, next) {
    Vue.prototype.$store.dispatch('CharSheetStore/CharSheetDetail/getCharSheet', to.params.id)
        .then(() => next())
        .catch(error => next(error));
  }
}
</script>

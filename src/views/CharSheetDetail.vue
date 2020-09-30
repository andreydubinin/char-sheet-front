<template>
  <b-overlay :show="loading" rounded="sm">
    <b-container class="char-sheet">
      <b-row>
        <b-col sm="12" lg="5" class="m-0 p-0">
          <div class="img-logo"></div>
        </b-col>
        <b-col sm="12" lg="7">
          <char-title></char-title>
        </b-col>
        <b-col sm="12" lg="6">
          <char-slogan></char-slogan>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="7">
          <b-row>
            <characteristic-column :index="0"></characteristic-column>
            <characteristic-column :index="1"></characteristic-column>
          </b-row>
        </b-col>
        <b-col lg="11">
          <b-row>
            <characteristic-column :index="2"></characteristic-column>
            <characteristic-column :index="3"></characteristic-column>
            <characteristic-column :index="4"></characteristic-column>
          </b-row>
          <circle-characteristic-block></circle-characteristic-block>
          <b-row align-v="stretch">
            <b-col lg="10" offset="1">
              <flaws-block></flaws-block>
            </b-col>
            <b-col lg="7">
              <points-of-experience></points-of-experience>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="14">
          <traits-block></traits-block>
        </b-col>
        <b-col lg="4">
          <injury-block></injury-block>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col lg="14">
          <power-table></power-table>
          <weapon-table></weapon-table>
          <equipment-table></equipment-table>
        </b-col>
        <b-col lg="4">
          <health-block></health-block>
        </b-col>
      </b-row>
    </b-container>
  </b-overlay>
</template>

<script>
import Vue from 'vue'
import CharTitle from "@/components/CharTitle"
import CharSlogan from "@/components/CharSlogan"
import CharacteristicColumn from "@/components/CharacteristicColumn"
import CircleCharacteristicBlock from "@/components/CircleCharacteristicBlock"
import FlawsBlock from "@/components/FlawsBlock"
import PointsOfExperience from "@/components/PointsOfExperienceBlock"
import TraitsBlock from "@/components/TraitsBlock"
import InjuryBlock from "@/components/InjuryBlock"
import PowerTable from "@/components/PowerTable"
import WeaponTable from "@/components/WeaponTable"
import EquipmentTable from "@/components/EquipmentTable"
import HealthBlock from "@/components/HealthBlock"
import { mapGetters, mapActions } from 'vuex'
import { isArray, debounce, find } from 'lodash'
import swal from 'sweetalert2'
import mapVuexFields from "@/mixins/mapVuexFields";

export default {
  mixins    : [mapVuexFields('CharSheetStore/CharSheetDetail', [
    'characteristics',
  ])],
  components: {
    CharTitle,
    CharSlogan,
    CharacteristicColumn,
    CircleCharacteristicBlock,
    FlawsBlock,
    PointsOfExperience,
    TraitsBlock,
    InjuryBlock,
    PowerTable,
    WeaponTable,
    EquipmentTable,
    HealthBlock
  },
  data () {
    return {
      loading: false,
    }
  },
  computed  : {
    ...mapGetters('CharSheetStore/CharSheetDetail', ['charsheet']),
    ...mapGetters('CharacteristicStore', ['characteristicList']),
    changeValue () {
      return debounce(() => {
        if (this.loading) return;

        this.loading = true;

        this.sendCharSheet()
            .catch(error => {
              console.log(error);

              swal.fire(
                  {
                    title           : 'Ошибка',
                    text            : 'Чарник не сохранился',
                    type            : 'error',
                    showCloseButton : false,
                    showCancelButton: false,
                    focusConfirm    : false,
                  }
              )
            })
            .finally(() => {
              this.loading = false;
            });
      }, 1000)
    },
  },
  beforeRouteEnter (to, from, next) {
    Vue.prototype.$store.dispatch('CharSheetStore/CharSheetDetail/getCharSheet', to.params.id)
        .then(() => next())
        .catch(error => next(error));
  },
  watch     : {
    charsheet: {
      deep: true,
      handler (newValue) {
        this.changeValue();
      },
    }
  },
  mounted () {
    this.fetchCharacteristics(this.charsheet.id)
        .then(response => {
          let list = response.data.data;
        });
  },
  methods   : {
    ...mapActions('CharSheetStore/CharSheetDetail', ['sendCharSheet']),
    ...mapActions('CharacteristicStore', ['fetchCharacteristics'])
  }
}
</script>

<style lang="scss">
.char-sheet {
  padding: 3rem 4rem;

  .img-logo {
    margin-top: 1rem;
    background-image: url("/img/logo.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 20px 15px;
    width: 100%;
    height: 220px;
  }


}
</style>

<template>
  <b-overlay :show="loading" rounded="sm">
    <b-container class="char-sheet">
      <b-row>
        <b-col sm="18">
          <char-title></char-title>
        </b-col>
        <b-col sm="18">
          <char-slogan></char-slogan>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="18">
          <characteristic-column v-for="(list, index) in characteristicList" :index="index"></characteristic-column>
        </b-col>
        <b-col sm="18">
          <characteristic-new></characteristic-new>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="18">
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
import CharacteristicNew from "@/components/CharacteristicNew"
import { mapGetters, mapActions } from 'vuex'
import { debounce } from 'lodash'
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
    HealthBlock,
    CharacteristicNew
  },
  data () {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapGetters('CharSheetStore/CharSheetDetail', ['charsheet']),
    ...mapGetters('CharacteristicStore', ['characteristicList']),
  },
  watch   : {
    charsheet: {
      deep: true,
      handler (newValue) {
        this.changeValue();
      },
    }
  },
  mounted () {
    this.fetchCharacteristics(this.charsheet.id);
  },
  created () {
    this.changeValue = debounce(this.changeValue, 1000);
  },
  methods: {
    ...mapActions('CharSheetStore/CharSheetDetail', ['sendCharSheet']),
    ...mapActions('CharacteristicStore', ['fetchCharacteristics']),

    changeValue () {
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
    }
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

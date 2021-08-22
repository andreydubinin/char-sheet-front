<template>
  <b-overlay :show="loading" rounded="sm">
    <b-container class="char-sheet savage-char-sheet">
      <b-row>
        <b-col sm="18" lg="5" class="d-none d-lg-block m-0 p-0">
          <div class="img-logo"></div>
        </b-col>
        <b-col sm="18" lg="7">
          <char-title></char-title>
        </b-col>
        <b-col sm="18" lg="6">
          <char-slogan></char-slogan>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="7">
          <b-row>
            <characteristic-column :index="'lovkost'"></characteristic-column>
            <characteristic-column :index="'smekalka'"></characteristic-column>
          </b-row>
        </b-col>
        <b-col lg="11">
          <b-row>
            <characteristic-column :index="'harakter'"></characteristic-column>
            <characteristic-column :index="'sila'"></characteristic-column>
            <characteristic-column :index="'vynoslivost'"></characteristic-column>
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
    HealthBlock
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

.savage-char-sheet {
  .characteristic-value {
    .value-block {
      background-size: contain;
      background-repeat: no-repeat;
      text-align: center;
      margin: 0 auto;

      .value:hover {
        color: red;
        cursor: pointer;
      }

      :nth-child(1) {
        width: 20%;
        text-align: right;
      }

      :nth-child(2) {
        width: 17%;
        text-align: right;
        padding-top: 3%;
      }

      :nth-child(3) {
        width: 23%;
        padding-bottom: 3%;
      }

      :nth-child(4) {
        width: 15%;
        text-align: left;
      }

      :nth-child(5) {
        width: 20%;
        padding-right: 5%;
      }
    }

    .value-0 {
      background-image: url("/img/cube_0.png");
    }

    .value-1 {
      background-image: url("/img/cube_1.png");

      :nth-child(-n+1) {
        color: white;
      }
    }

    .value-2 {
      background-image: url("/img/cube_2.png");

      :nth-child(-n+2) {
        color: white;
      }
    }

    .value-3 {
      background-image: url("/img/cube_3.png");

      :nth-child(-n+3) {
        color: white;
      }
    }

    .value-4 {
      background-image: url("/img/cube_4.png");

      :nth-child(-n+4) {
        color: white;
      }
    }

    .value-5 {
      background-image: url("/img/cube_5.png");

      color: white;
    }
  }
}
</style>

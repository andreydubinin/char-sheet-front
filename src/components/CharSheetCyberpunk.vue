<template>
  <b-overlay :show="loading" rounded="sm">
    <b-container class="char-sheet cyberpunk-char-sheet">
      <b-row>
        <b-col sm="18" lg="7" class="cyber-border">
          <char-title class="cyberpunk-title"></char-title>
        </b-col>
        <b-col sm="18" lg="5">
          <img src="/img/qr.png" alt="" height="180" class="d-none d-lg-block m-auto">
          <div class="experience-block cyber-border pb-3">
            <div class="title-field text-left">Очки опыта</div>
            <b-input v-model="experience"></b-input>
          </div>
        </b-col>
        <b-col sm="18" lg="6">
          <b-row>
            <b-col align="right">
              <span>[+Тек x 4]</span>
              <span>Аттрибуты</span>
            </b-col>
          </b-row>
          <div class="cyber-border">
            <b-row>
              <b-col
                  v-for="(characteristic, key) in characteristicAttributes"
                  sm="18"
                  v-if="characteristicList[characteristic]"
                  :key="key"
                  :class="{'mb-2': key % 3 === 2}"
              >
                <b-row>
                  <b-col sm="8">
                    <span>{{ characteristicList[characteristic].name }}</span>
                  </b-col>
                  <b-col sm="10">
                    <characteristic-value
                        v-model="characteristicList[characteristic].value"
                        @input="changeCharacteristic(characteristicList[characteristic].id, $event)"
                        :count="10"
                        :style-handler="styleValue(200, false)"
                        class="d-inline-block"
                    ></characteristic-value>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col sm="18">
          <div class="text-center title-field">[+Тек x 2] 13/9/5 <h2 class="d-inline">Способности</h2></div>
        </b-col>
        <b-col sm="18" lg="6">
          <div class="mb-3 cyber-border">
            <b-row>
              <b-col sm="18">
                <div class="text-center title-field">Таланты</div>
              </b-col>
              <b-col
                  v-for="(characteristic, key) in characteristicTalants"
                  sm="18"
                  v-if="characteristicList[characteristic]"
                  :key="key"
              >
                <b-row>
                  <b-col sm="8">
                    <span>{{ characteristicList[characteristic].name }}</span>
                  </b-col>
                  <b-col sm="10">
                    <characteristic-value
                        v-model="characteristicList[characteristic].value"
                        @input="changeCharacteristic(characteristicList[characteristic].id, $event)"
                        :count="10"
                        :style-handler="styleValue(200, false)"
                        class="d-inline-block"
                    ></characteristic-value>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col sm="18" lg="6">
          <div class="mb-3 cyber-border">
            <b-row>
              <b-col sm="18">
                <div class="text-center title-field">Навыки</div>
              </b-col>
              <b-col
                  v-for="(characteristic, key) in characteristicSkills"
                  sm="18"
                  v-if="characteristicList[characteristic]"
                  :key="key"
              >
                <b-row>
                  <b-col sm="8">
                    <span>{{ characteristicList[characteristic].name }}</span>
                  </b-col>
                  <b-col sm="10">
                    <characteristic-value
                        v-model="characteristicList[characteristic].value"
                        @input="changeCharacteristic(characteristicList[characteristic].id, $event)"
                        :count="10"
                        :style-handler="styleValue(200, false)"
                        class="d-inline-block"
                    ></characteristic-value>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col sm="18" lg="6">
          <div class="mb-3 cyber-border">
            <b-row>
              <b-col sm="18">
                <div class="text-center title-field">Познания</div>
              </b-col>
              <b-col
                  v-for="(characteristic, key) in characteristicKnowledge"
                  sm="18"
                  v-if="characteristicList[characteristic]"
                  :key="key"
              >
                <b-row>
                  <b-col sm="8">
                    <span>{{ characteristicList[characteristic].name }}</span>
                  </b-col>
                  <b-col sm="10">
                    <characteristic-value
                        v-model="characteristicList[characteristic].value"
                        @input="changeCharacteristic(characteristicList[characteristic].id, $event)"
                        :count="10"
                        :style-handler="styleValue(200, false)"
                        class="d-inline-block"
                    ></characteristic-value>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="18" lg="6" v-if="characteristicList['dopolneniya']">
          <div class="mb-3 cyber-border">
            <b-row>
              <b-col sm="18">
                <div class="text-center title-field">Дополнения</div>
              </b-col>
              <b-col sm="18">
                <div class="text-lg-right text-center" v-for="child in characteristicList['dopolneniya'].children" :key="child.id">
                  <span class="name">{{ child.name }}</span>
                  <characteristic-value class="d-inline-block" v-model="child.value"
                                        @input="changeCharacteristic(child.id, $event)"
                                        :count="10"
                                        :style-handler="styleValue(100, false)"
                  ></characteristic-value>
                </div>
                <characteristic-new :parent-id="characteristicList['dopolneniya'].id"></characteristic-new>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col sm="18" lg="6" v-if="characteristicList['mody']">
          <div class="mb-3 cyber-border">
            <b-row>
              <b-col sm="18">
                <div class="text-center title-field">Моды</div>
              </b-col>
              <b-col sm="18">
                <div class="text-lg-right text-center" v-for="child in characteristicList['mody'].children" :key="child.id">
                  <span class="name">{{ child.name }}</span>
                  <characteristic-value class="d-inline-block" v-model="child.value"
                                        @input="changeCharacteristic(child.id, $event)"
                                        :count="10"
                                        :style-handler="styleValue(100, false)"
                  ></characteristic-value>
                </div>
                <characteristic-new :parent-id="characteristicList['dopolneniya'].id"></characteristic-new>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col sm="18" lg="6">
          <div class="mb-3 cyber-border">
            <b-row>
              <b-col sm="18">
                <div class="text-center title-field">Психический профиль</div>
              </b-col>
              <b-col
                  v-for="(characteristic, key) in characteristicMentalProfile"
                  sm="18"
                  v-if="characteristicList[characteristic]"
                  :key="key"
              >
                <b-row>
                  <b-col sm="8">
                    <span>{{ characteristicList[characteristic].name }}</span>
                  </b-col>
                  <b-col sm="10">
                    <characteristic-value
                        v-model="characteristicList[characteristic].value"
                        @input="changeCharacteristic(characteristicList[characteristic].id, $event)"
                        :count="5"
                        :style-handler="styleValue(200, false)"
                        class="d-inline-block"
                    ></characteristic-value>
                  </b-col>
                </b-row>
              </b-col>
              <b-col sm="18" class="text-right">
                [7/+Тек x 3]
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="18" lg="6">
          <flaws-block title="Недостатки" :min-count="8"></flaws-block>
        </b-col>
        <b-col sm="18" lg="6">
          <div class="cyber-border">
            <b-row class="mb-3" v-if="characteristicList['chelovechnost']">
              <b-col sm="18">
                <span class="title-field">Человечность [+Тек x 2]</span>
              </b-col>
              <b-col sm="18">
                <characteristic-value
                    v-model="characteristicList['chelovechnost'].value"
                    @input="changeCharacteristic(characteristicList['chelovechnost'].id, $event)"
                    :count="10"
                    :style-handler="styleValue(400, false)"
                    class="characteristic-full-width"
                ></characteristic-value>
              </b-col>
            </b-row>
            <b-row class="mb-3" v-if="characteristicList['sila-voli']">
              <b-col sm="18">
                <span class="title-field">Сила воли [+Тек x 1]</span>
              </b-col>
              <b-col sm="18">
                <characteristic-value
                    v-model="characteristicList['sila-voli'].value"
                    @input="changeCharacteristic(characteristicList['sila-voli'].id, $event)"
                    :count="10"
                    :style-handler="styleValue(400, false)"
                    class="characteristic-space-between mb-2"
                ></characteristic-value>
                <characteristic-value
                    v-model="characteristicList['sila-voli-obshchaya'].value"
                    @input="changeCharacteristic(characteristicList['sila-voli-obshchaya'].id, $event)"
                    :count="10"
                    :style-handler="styleValue(400, false)"
                    class="characteristic-full-width"
                ></characteristic-value>
              </b-col>
            </b-row>
            <b-row class="mb-3" v-if="characteristicList['bio-batareya']">
              <b-col sm="18">
                <div class="title-field text-center">Био батарея</div>
              </b-col>
              <b-col sm="18">
                <characteristic-value
                    v-model="characteristicList['bio-batareya'].value"
                    @input="changeCharacteristic(characteristicList['bio-batareya'].id, $event)"
                    :count="40"
                    :style-handler="styleValue(400, false)"
                    class="characteristic-space-around"
                ></characteristic-value>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col sm="18" lg="6" class="cyber-border health-block">
          <b-row>
            <b-col sm="14">
              <span class="title-field">BIO MON</span>
              <b-row v-for="(item, key) in healthList" :key="key">
                <b-col sm="15">
                  <span>{{ item.name }}</span>
                </b-col>
                <b-col sm="3">
                  <div class="value" :class="{active: item.value <= wounds}" @click="wounds = item.value"></div>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="4" class="d-md-none d-lg-block color-block"></b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="18" class="cyber-border">
          <equipment-table></equipment-table>
        </b-col>
      </b-row>
    </b-container>
  </b-overlay>
</template>

<script>
import CharacteristicValue from "@/components/CharacteristicValue"
import CharTitle from "@/components/CharTitle"
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
    'wounds',
    'experience',
  ])],
  components: {
    CharacteristicValue,
    CharTitle,
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
      characteristicAttributes: [
          'sila-1',
          'lovkost-1',
          'vynoslivost-1',
          'obayanie',
          'manipulyaciya',
          'vneshnost',
          'vospriyatie',
          'intellekt',
          'smekalka-1',
      ],
      characteristicTalants: [
          'atletika',
          'vnimatelnost',
          'zapugivanie-1',
          'znanie-ulic',
          'liderstvo',
          'rukopashnyy-boy',
          'uklonenie',
          'hitrost',
          'ekspressiya',
          'empatiya',
      ],
      characteristicSkills: [
          'bezopasnost',
          'vozhdenie-1',
          'vyzhivanie-1',
          'znanie-zhivotn',
          'ispolnenie',
          'remesla',
          'skrytnost',
          'strelba-1',
          'fehtovanie',
          'etiket',
      ],
      characteristicKnowledge: [
          'akademicheskie',
          'zakony',
          'kibernetika',
          'kompyutery',
          'lingvistika',
          'medicina',
          'nauchnye',
          'politika',
          'rassledovanie-1',
          'finansy',
      ],
      characteristicMentalProfile: [
          'sochuvstvie',
          'kontrol',
          'smelost',
      ],
      healthList: [
        {
          name : 'Задет',
          value: 1,
        },
        {
          name : 'Поврежден',
          value: 2,
        },
        {
          name : 'Ранен',
          value: 3,
        },
        {
          name : 'Тяжело ранен',
          value: 4,
        },
        {
          name : 'Травмирован',
          value: 5,
        },
        {
          name : 'Искалечен',
          value: 6,
        },
        {
          name : 'Обездвижен',
          value: 7,
        },
        {
          name : 'Присмерти',
          value: 8,
        },
      ]
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
    ...mapActions('CharSheetStore/CharSheetDetail', ['sendCharSheet', 'updateCharacteristic']),
    ...mapActions('CharacteristicStore', ['fetchCharacteristics']),

    styleValue (width, withNumber = false) {
      const fontSize = withNumber ? width * 0.1 : 0;
      const lineHeight = width * 0.17;

      return {
        width     : `${this.width}px`,
        fontSize  : `${fontSize}px`,
        lineHeight: `${lineHeight}px`
      }
    },

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
    },

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
    },

    setWounds (value) {
      value = Math.abs(value)

      if (this.wounds === value) {
        this.wounds = value - 1;
      } else {
        this.wounds = value;
      }
    },
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
.cyberpunk-char-sheet {
  .cyberpunk-title {
    .title-block {
      background-color: $cyberpunk-color;
      margin-bottom: 20px;
      padding: 5px 10px;

      .form-control {
        border: none;
        margin-top: 8px;
        width: 100%;
        float: none;
      }

      .form-group {
        margin-bottom: 1rem;
      }
    }

    .form-group {
      margin-bottom: 0;
    }

    .form-control {
      width: 350px;
      float: right;
    }

    label {
      padding-top: 0;
    }
  }

  .form-control {
    height: calc(1.5em + 2px);
    border: 1px solid black;
  }

  .experience-block {
    input {
      border: 1px solid black;
      width: 85px;
      font-size: 28px;
    }
  }

  .characteristic-value {
    .value-block {
      .value {
        border: 1px solid black;
        width: 20px;
        height: 20px;

        &.active {
          background-color: #3B3B3B;
        }
      }
    }
  }

  .cyber-border {
    position: relative;
    padding: 10px 15px 0;
    border: 1px solid black;
    border-top: 0;

    &::before {
      content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAxCAMAAACxvDqeAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAdFQTFRF////6Obqv7vFvbnEwr7I7OvuWlFtTkRhV05qY1p03dzhWlBsgHmO9PT2////////////////////////////09DXT0ZjgHmO9/f4////////AAAA/////////////////////////////////////////////////////////////////////////////////////////////////v7+0M3VRjxak42f9/b4////////////////w8DKSD1cpJ+u+vr7/////////////f3+urfCRDlYpqGw////r6q4QjhXvLjD/v7+////+/v8qKOx////////jIaZzcrT////////////+Pj5kYudUEdk1dPa////////////+vn6iIKV2dfd////////8/L0cWmBXFNu5eTo////8/P1dm+GYVlz////////5OLnYllzamJ67+/x////6unsYVhyb2d/7+7x////Vkxoh4CU9vb3////0s/XVk1pgXqP9vX3////////y8jQmpWl+vr7////x8TNpJ+u+/v7hH6SenOJ////////g3yRjIWY////////////////////hH2RtrK+oZys////////////////5uXpSU9dkAAAAJt0Uk5T//////////////////bgzPXw2+j3///6z384AB4cHRgiL0enqFwzNmiIbUIjFxA7WoS86/////ymFkCc4///96QSCUz/////t////9Qf///QKf//82wE//////GOCP///5QU/////3T///+/IP////Kj/////67////O////8sIh///4Kv//8f//zUX//3guGxkR////JVSBS/9GcPJiAAABZ0lEQVR4nGNgGHSAkYmZEGDBpZeVjZ2DEODEoZeLm4eXj5+fn08AXUZQCCgsLILHzaJi4hKSUtLS0jKycvIKikrKKqpqiuoamlraOrp6QGF9A0MjY+xaTUzNzC2UpPEDSytrG2yabe3sHRwJ6AUCJ2dMrS6ubu4eOoT1AgGmZk8vbx9fovRiaPbzN7MNCCROL7pmkyCz4JDQMLI0h0dERkXHxBKpF1VzXDx7QnRiErF6UTQnp6SmCaQ7Ea0XWXNGZlZadg7xWpE15+blFxSSohVJc1FxSWmZHHmaE8orKqsUSNML01xdU1tX30CiXohmk0a3pubCFlL1QjS3Rra1FxIfvaiaOzpdurpJ1wvR3NPL0EeGXrjmfko0k6N3RGsmttjCqnkCJZpJKgTQNU+kRDNFziZH7yDQPIkszZOnUKC5eCpYsyUlmqdRonk6JZpnDJjmmWRrnsXIoEi2ZiBQo0QzoQYfVgAA4Sc110006YsAAAAASUVORK5CYII=");
      position: absolute;
      top: -4px;
      left: -1px;
      height: 100%;
    }

    &::after {
      content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAABHCAMAAAAJKiY9AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAg1QTFRFOC1OSD5d/fz95ePnkoye////oJuq9/f4cmqBSD1c7u3wdW2EOi9QbGR9Rz1benKI4+HmWE9qYVhy4N7jX1ZxWVBr29nf4uHl7ezv1dPaVUto6+ntnZio3dzhSkBeaGB58fDz5+XpVEtnQjhXhn+T+Pj5zMnSTEJgRjxa8/P109HYb2d/jIaZvLjDQzlY9vX3vrvFRDpZgXqP8vHz/v7+rai1PjRUlpGi/f3+pJ+uQTdWn5qq/f39mJKkrKi1/Pz8rqm3PzRURDlYs667op2sWlBs09DXqKOxnJanmZOki4SY9vb3iIKVurbB9PP1e3SKysfQeHGHYllzfXaMc2uC393j7OvuU0lm7+/xU0pmz8zUXlVwTEJf2tfe5OPnVk1p4eDlT0ZjXFNu8/L0z83VUkhlc2yD2tjfV05qS0FfcWmB7+7x3NrgW1JtQDVVq6a0zsvTUUdkdm+GjoiaTUNhv7vGOzBRgHmO+vn6t7O/ioOXmJGjk42foZuroZys+fj5RTta+vr7ubXBT0VipaCvPTNTnZeonpmp+/v8j4mcPTJStbG99fT2h4CUST9df3iNxsPMaF94Vkxo1NLZ7+7wfXWLzcrThH6Sa2N78O/y1dLa6+rtbmZ+ZFt15eTo2dfdZ1546unsYFdx4d/kmpWldm6Fx8TNy8jQTkRhvbrFiIGVkYud+/v7OS5PPDFR41DBTAAAAdFJREFUeJxjYIABRgYmZghgYWRghQK2wcpk5+CEMrm4eaBMdl4+fogCAUEhAYhaYRFRMYg2cVFRCYgJklK80kApGUYGWTl5BSBLUYmTQVlFFchSU9dgZJDRBLK0lLR1IIbp6qnoQwwzMDQyBptgYmpmDnGOhaWVNZBlA1Rrq2xnz8pq7+DIx+DkbAMUdFF2ZWRwA4qxuvN5eIJNMPFicIY4x9tH2RfiHD9/vgCIYfqBciCWKjcnQ5C6GJDlHczAyRASCmSFaYcHMjKAzIrgjYyCOEc6OiYWYlhcUHwCxDDxxKRkiGEpqWlA/7KmZ3AyZGZlA1k5uXmMDPkgvxUUFhVD/KZVkhUGMay0rLwCbIJ9JWOVPcQwB8dqC6CbaxgZavnq6llZLZwbOBkcPRqBypsamhkZBEBGtLS6tIFNqG83a7EAG9bR2dVtAjahp7dP1wQSUP15E0ABZcTIMHHSZCBrytQyToboaUCW/nTOGYwMoOCfKS81yxps2Ow5MVEQvynM5ZsHcc78jAULIX5LWCS0GGT3EkaGzKVTQKxlJVMZOkGyrMtXBCpA0sPKvFX1rCCmTRrPaqCjgUybJIZFa1hBzEDDtfygSGJlcFpXshKSlABVJ1xl6alNJwAAAABJRU5ErkJggg==');
      position: absolute;
      top: -1px;
      right: -9px;
      height: 100%;
    }
  }

  .form-control {
    border: none;
    border-bottom: 1px solid black;
  }

  .flaws-block {
    @extend .cyber-border;
  }

  .flaws-col-body, .flaws-col-title {
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }

  .flaws-col-title {
    flex: none;
    max-width: 100%;
  }

  .flaws-col-body {
    flex: none;
    max-width: 100%;
    display: block;
  }

  .flaws-block {
    display: block;

    .flaw-title {
      position: relative;
    }
  }

  .characteristic-space-between {
    .value-block {
      display: flex;
      justify-content: space-between;
    }
  }

  .characteristic-space-around {
    .value-block .value {
      margin-right: 16px;
      margin-bottom: 5px;
    }
  }

  .characteristic-full-width {
    .value-block .value {
      width: 38px;
    }
  }

  .health-block {
    .value {
      width: 25px;
      height: 25px;
      border: 1px solid black;

      &.active {
        background-color: #3B3B3B;
      }
    }

    .color-block {
      background: $cyberpunk-color;
    }
  }

  .table thead th {
    border: none;
  }
}

</style>

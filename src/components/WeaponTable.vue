<template>
  <b-row>
    <b-col>
      <b-table responsive="responsive" :busy="isBusy" :items="weaponList" :fields="fields">
        <template #cell(remove)="data">
          <b-button @click="removeWeapon(data.item.id)">-</b-button>
        </template>
        <template #cell()="data">
          <b-input v-model="data.value" @input="updateField(data.item.id, data.field.key, $event)"></b-input>
        </template>
      </b-table>
      <b-button @click="createWeapon">+</b-button>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex';
import mapVuexFields from "@/mixins/mapVuexFields";
import { debounce } from 'lodash'
import swal from "sweetalert2";

export default {
  mixins : [mapVuexFields('WeaponStore', [
    'weaponList',
  ])],
  data () {
    return {
      isBusy: true,
      fields: [
        {
          key  : 'name',
          label: 'Оружие'
        },
        {
          key  : 'distance',
          label: 'Дистанция'
        },
        {
          key  : 'speed',
          label: 'Ск.'
        },
        {
          key  : 'damage',
          label: 'Урон'
        },
        {
          key  : 'remove',
          label: ''
        },
      ],
    }
  },
  created () {
    this.updateField = debounce(this.updateField, 1000);
  },
  methods: {
    ...mapActions('WeaponStore', ['fetchWeapons', 'patchWeapon', 'storeWeapon', 'destroyWeapon']),

    updateField: function (id, field, value) {
      if (this.isBusy) return false;
      this.isBusy = true;

      let data = {};
      data.id = id;
      data[field] = value;

      this.patchWeapon(data)
          .catch(error => {
            console.log(error);

            swal.fire(
                {
                  title           : 'Ошибка',
                  text            : 'Сила не сохранилась',
                  type            : 'error',
                  showCloseButton : false,
                  showCancelButton: false,
                  focusConfirm    : false,
                }
            )
          })
          .finally(() => {
            this.isBusy = false;
          });
    },

    createWeapon () {
      this.isBusy = true;

      this.storeWeapon({
        charsheet_id: this.$store.getters["CharSheetStore/CharSheetDetail/id"]
      }).finally(() => {
        this.isBusy = false;
      })
    },

    removeWeapon (id) {
      this.isBusy = true;

      this.destroyWeapon(parseInt(id))
          .finally(() => {
            this.isBusy = false;
          })
    }
  },
  mounted () {
    this.fetchWeapons().finally(() => {
      this.isBusy = false;
    });
  }
}
</script>

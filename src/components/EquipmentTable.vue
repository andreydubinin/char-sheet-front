<template>
  <b-row>
    <b-col>
      <b-table :responsive="true" :items="equipmentList" :fields="fields">
        <template #cell(remove)="data">
          <b-button @click="removeEquipment(data.item.id)">-</b-button>
        </template>
        <template #cell()="data">
          <b-input v-model="data.value" @input="updateField(data.item.id, data.field.key, $event)"></b-input>
        </template>
      </b-table>
      <b-button @click="createEquipment">+</b-button>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex';
import mapVuexFields from "@/mixins/mapVuexFields";
import { debounce } from 'lodash'
import swal from "sweetalert2";

export default {
  mixins : [mapVuexFields('EquipmentStore', [
    'equipmentList',
  ])],
  data () {
    return {
      isBusy: true,
      fields: [
        {
          key  : 'name',
          label: 'Снаряжение'
        },
        {
          key  : 'price',
          label: 'Цена'
        },
        {
          key  : 'weight',
          label: 'Вес'
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
    ...mapActions('EquipmentStore', ['fetchEquipments', 'patchEquipment', 'storeEquipment', 'destroyEquipment']),

    updateField: function (id, field, value) {
      if (this.isBusy) return false;
      this.isBusy = true;

      let data = {};
      data.id = id;
      data[field] = value;

      this.patchEquipment(data)
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

    createEquipment () {
      this.isBusy = true;

      this.storeEquipment({
        charsheet_id: this.$store.getters["CharSheetStore/CharSheetDetail/id"]
      }).finally(() => {
        this.isBusy = false;
      })
    },

    removeEquipment (id) {
      this.isBusy = true;

      this.destroyEquipment(parseInt(id))
          .finally(() => {
            this.isBusy = false;
          })
    }
  },
  mounted () {
    this.fetchEquipments().finally(() => {
      this.isBusy = false;
    });
  }
}
</script>

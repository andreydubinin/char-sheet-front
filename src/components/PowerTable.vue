<template>
  <b-row class="mb-4">
    <b-col>
      <b-table :responsive="true" :busy="isBusy" :items="powerList" :fields="fields">
        <template #cell(remove)="data">
          <b-button @click="removePower(data.item.id)">-</b-button>
        </template>
        <template #cell()="data">
          <b-input v-model="data.value" @input="updateField(data.item.id, data.field.key, $event)"></b-input>
        </template>
      </b-table>
      <b-button @click="createPower">+</b-button>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex';
import mapVuexFields from "@/mixins/mapVuexFields";
import { debounce } from 'lodash'
import swal from "sweetalert2";

export default {
  mixins : [mapVuexFields('PowerStore', [
    'powerList',
  ])],
  data () {
    return {
      isBusy: true,
      fields: [
        {
          key    : 'name',
          label  : 'Сила / Уловка',
          thClass: 'width300'
        },
        {
          key  : 'price',
          label: 'Цена'
        },
        {
          key  : 'distance',
          label: 'Дистанция'
        },
        {
          key  : 'effect',
          label: 'Урон / Эффект'
        },
        {
          key  : 'duration',
          label: 'Длительность'
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
    ...mapActions('PowerStore', ['fetchPowers', 'patchPower', 'storePower', 'destroyPower']),

    updateField: function (id, field, value) {
      if (this.isBusy) return false;
      this.isBusy = true;

      let data = {};
      data.id = id;
      data[field] = value;

      this.patchPower(data)
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

    createPower () {
      this.isBusy = true;

      this.storePower({
        charsheet_id: this.$store.getters["CharSheetStore/CharSheetDetail/id"]
      }).finally(() => {
        this.isBusy = false;
      })
    },

    removePower (id) {
      this.isBusy = true;

      this.destroyPower(parseInt(id))
          .finally(() => {
            this.isBusy = false;
          })
    }
  },
  mounted () {
    this.fetchPowers().finally(() => {
      this.isBusy = false;
    });
  }
}
</script>

<style lang="scss">
.width300 {
  min-width: 300px;
}
</style>

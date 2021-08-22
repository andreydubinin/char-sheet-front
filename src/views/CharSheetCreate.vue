<template>
  <b-container>
    <b-row>
      <b-col class="text-center mt-5">
        <ul class="box-list">
          <li>
            <b-link @click="createSavageWorld">Создать чарник Savage world</b-link>
          </li>
          <li>
            <b-link @click="createCyberpunk">Создать чарник Cyberpunk</b-link>
          </li>
          <li>
            <b-link @click="createCustom">Создать кастомный чарник</b-link>
          </li>
        </ul>
        <template v-if="creating">
          <template v-if="error">
            <div class="errors">Произошла ошибка</div>
          </template>
          <template v-else>
            <b-spinner variant="primary" label="Создаем чарник"></b-spinner>
          </template>
        </template>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { TYPE_CHARSHEET_SAVAGE_WORLD, TYPE_CHARSHEET_CUSTOM, TYPE_CHARSHEET_CYBERPUNK } from "@/constants";

export default {
  name: 'CharSheetCreate',
  data () {
    return {
      error   : false,
      creating: false,
    }
  },
  methods: {
    createSavageWorld () {
      this.create(TYPE_CHARSHEET_SAVAGE_WORLD);
    },
    createCyberpunk () {
      this.create(TYPE_CHARSHEET_CYBERPUNK);
    },
    createCustom () {
      this.create(TYPE_CHARSHEET_CUSTOM);
    },
    create (type) {
      this.creating = true;

      this.$store.dispatch('CharSheetStore/create', {
        type: type
      })
          .then(response => {
            this.$router.push(`/charsheet/${response.data.data.id}`)
          })
          .catch(error => {
            console.log(error.response);
            this.error = true;
          });
    }
  }
}
</script>

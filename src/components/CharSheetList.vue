<template>
  <div class="charsheet-list">
    <b-overlay :show="loading" rounded="sm">
      <ul class="box-list">
        <li v-for="(charsheet, key) in charsheets" :key="key">
          <b-link :to="`/charsheet/${charsheet.id}`">
            <div class="pip">#{{ charsheet.id }}</div>
            {{ charsheet.name || key }} <span class="small">[{{ getNameByType(charsheet.type) }}]</span>
          </b-link>
        </li>
        <li>
          <b-link to="/charsheet/create">Создать новый</b-link>
        </li>
      </ul>
    </b-overlay>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { TYPE_CHARSHEET_SAVAGE_WORLD, TYPE_CHARSHEET_CUSTOM, TYPE_CHARSHEET_CYBERPUNK } from "@/constants";

export default {
  data () {
    return {
      charsheets: [],
      loading   : false
    }
  },
  mounted () {
    this.loading = true;
    this.fetchList()
        .then(response => this.charsheets = response.data.data)
        .finally(() => this.loading = false);
  },
  methods: {
    ...mapActions('CharSheetStore', ['fetchList']),

    getNameByType(type) {
      switch (type) {
        case TYPE_CHARSHEET_SAVAGE_WORLD:
          return 'Savage world';
        case TYPE_CHARSHEET_CUSTOM:
          return 'Кастомный';
        case TYPE_CHARSHEET_CYBERPUNK:
          return 'Cyberpunk';
        default:
          return 'Что-то новенькое)';
      }
    }
  }
}
</script>

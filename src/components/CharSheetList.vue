<template>
  <div class="charsheet-list">
    <b-overlay :show="loading" rounded="sm">
      <ul class="box-list">
        <li v-for="(charsheet, key) in charsheets" :key="key">
          <b-link :to="`/charsheet/${charsheet.id}`">
            <div class="pip">#{{ charsheet.id }}</div>
            {{ charsheet.name || key }}
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
import { mapGetters, mapActions } from "vuex";

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
    ...mapActions('CharSheetStore', ['fetchList'])
  }
}
</script>

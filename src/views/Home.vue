<template>
  <b-container>
    <b-row>
      <b-col>
        <template v-if="authenticated">
          <char-sheet-list></char-sheet-list>
        </template>
        <template v-else>
          <div><b-link to="login">Надо бы войти</b-link></div>
        </template>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import CharSheetList from "@/components/CharSheetList";

export default {
  components: {
    CharSheetList
  },
  computed: {
    ...mapGetters('AuthStore', ['authenticated', 'user']),
  }
};
</script>

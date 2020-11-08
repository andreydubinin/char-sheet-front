<template>
  <b-row class="traits-block">
    <b-col>
      <b-row class="mb-4">
        <b-col lg="3">
          <div class="title-field">
            Стартовые черты
          </div>
        </b-col>
        <b-col lg="5">
          <input-list :value="start" :min-count="2" @input="setValues('start', $event)"></input-list>
        </b-col>
      </b-row>
      <b-row class="mb-4">
        <b-col lg="5">
          <div class="title-field">Новичок</div>
          <input-list :value="beginner" :min-count="4" @input="setValues('beginner', $event)"></input-list>
        </b-col>
        <b-col lg="5">
          <div class="title-field">Закаленный</div>
          <input-list :value="middle" :min-count="4" @input="setValues('middle', $event)"></input-list>
        </b-col>
        <b-col lg="4">
          <div class="title-field">Ветеран</div>
          <input-list :value="veteran" :min-count="4" @input="setValues('veteran', $event)"></input-list>
        </b-col>
        <b-col lg="4">
          <div class="title-field">Герой</div>
          <input-list :value="hero" :min-count="4" @input="setValues('hero', $event)"></input-list>
        </b-col>
      </b-row>
      <b-row class="mb-4">
        <b-col lg="3">
          <div class="title-field">
            Легендарные черты
          </div>
        </b-col>
        <b-col lg="5">
          <input-list :value="legendary" :min-count="2" @input="setValues('legendary', $event)"></input-list>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import InputList from "@/components/InputList";
import mapVuexFields from "@/mixins/mapVuexFields";

export default {
  mixins    : [mapVuexFields('CharSheetStore/CharSheetDetail', [
    'traits',
  ])],
  components: {
    InputList
  },
  computed  : {
    start    : function () {
      return this.traits?.start || [];
    },
    beginner : function () {
      return this.traits?.beginner || [];
    },
    middle   : function () {
      return this.traits?.middle || [];
    },
    veteran  : function () {
      return this.traits?.veteran || [];
    },
    hero     : function () {
      return this.traits?.hero || [];
    },
    legendary: function () {
      return this.traits?.legendary || [];
    },
  },
  methods   : {
    setValues (key, values) {
      let traits = this.traits || {};

      traits[key] = values.filter(x => !!x);
      this.traits = traits;
    }
  }
}
</script>

<style lang="scss">
.traits-block {
  border: 5px double black;
  border-radius: 20px;
}
</style>

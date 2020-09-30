<template>
  <div class="char-title">
    <b-form-group
        label-cols-sm="auto"
        label="Имя:"
        label-align-sm="right"
        label-for="name-field"
    >
      <b-form-input id="name-field" v-model="name"></b-form-input>
    </b-form-group>
    <b-form-group
        label-cols-sm="auto"
        label="Игрок:"
        label-align-sm="right"
        label-for="player-name-field"
    >
      <b-form-input id="player-name-field" v-model="player_name"></b-form-input>
    </b-form-group>
    <b-form-group
        label-cols-sm="auto"
        label="Концепция:"
        label-align-sm="right"
        label-for="conception-field"
    >
      <b-form-input id="conception-field" v-model="conception"></b-form-input>
    </b-form-group>
    <b-form-group
        label-cols-sm="auto"
        label="Внешность:"
        label-align-sm="right"
        label-for="appearance-field"
    >
      <b-form-input id="appearance-field" v-model="appearance"></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
import mapVuexFields from '@/mixins/mapVuexFields'

export default {
  mixins: [mapVuexFields('CharSheetStore/CharSheetDetail', [
    'name',
    'player_name',
    'conception',
    'appearance',
  ])]
}
</script>

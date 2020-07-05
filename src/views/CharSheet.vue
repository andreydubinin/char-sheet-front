<template>
  <b-container class="char-sheet">
    <b-row>
      <b-col sm="12" lg="5" class="m-0 p-0">
        <div class="img-logo"></div>
      </b-col>
      <b-col sm="12" lg="7">
        <char-title></char-title>
      </b-col>
      <b-col sm="12" lg="6">
        <char-slogan></char-slogan>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="7">
        <b-row>
          <characteristic-column type="Ловкость"></characteristic-column>
          <characteristic-column type="Ловкость"></characteristic-column>
        </b-row>
      </b-col>
      <b-col lg="11">
        <b-row>
          <characteristic-column type="Ловкость"></characteristic-column>
          <characteristic-column type="Ловкость"></characteristic-column>
          <characteristic-column type="Ловкость"></characteristic-column>
        </b-row>
        <circle-characteristic-block></circle-characteristic-block>
        <b-row align-v="stretch">
          <b-col lg="10" offset="1">
            <flaws-block></flaws-block>
          </b-col>
          <b-col lg="7">
            <points-of-experience></points-of-experience>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="14">
        <traits-block></traits-block>
      </b-col>
      <b-col lg="4">
        <injury-block></injury-block>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col lg="14">
        <power-table></power-table>
        <weapon-table></weapon-table>
        <equipment-table></equipment-table>
      </b-col>
      <b-col lg="4">
        <health-block></health-block>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CharTitle from "../components/CharTitle"
import CharSlogan from "../components/CharSlogan"
import CharacteristicColumn from "../components/CharacteristicColumn"
import CircleCharacteristicBlock from "../components/CircleCharacteristicBlock"
import FlawsBlock from "../components/FlawsBlock"
import PointsOfExperience from "../components/PointsOfExperienceBlock"
import TraitsBlock from "../components/TraitsBlock"
import InjuryBlock from "../components/InjuryBlock"
import PowerTable from "../components/PowerTable"
import WeaponTable from "../components/WeaponTable"
import EquipmentTable from "../components/EquipmentTable"
import HealthBlock from "../components/HealthBlock"

export default {
  components: {
    CharTitle,
    CharSlogan,
    CharacteristicColumn,
    CircleCharacteristicBlock,
    FlawsBlock,
    PointsOfExperience,
    TraitsBlock,
    InjuryBlock,
    PowerTable,
    WeaponTable,
    EquipmentTable,
    HealthBlock
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
</style>

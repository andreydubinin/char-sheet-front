import Vue from "vue";
import Vuex from "vuex";
import CharSheetStore from "@/store/modules/CharSheetStore";
import AuthStore from "@/store/modules/AuthStore";
import CharacteristicStore from "@/store/modules/CharacteristicStore";
import PowerStore from "@/store/modules/PowerStore";
import WeaponStore from "@/store/modules/WeaponStore";
import EquipmentStore from "@/store/modules/EquipmentStore";

Vue.use(Vuex);

const store = new Vuex.Store({
  state    : {},
  mutations: {},
  actions  : {},
  modules  : {
    CharSheetStore,
    AuthStore,
    CharacteristicStore,
    PowerStore,
    WeaponStore,
    EquipmentStore
  }
});

Vue.prototype.$store = store;

export default store;

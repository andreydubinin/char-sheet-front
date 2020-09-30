import Vue from "vue";
import Vuex from "vuex";
import CharSheetStore from "@/store/modules/CharSheetStore";
import AuthStore from "@/store/modules/AuthStore";
import CharacteristicStore from "@/store/modules/CharacteristicStore";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    CharSheetStore,
    AuthStore,
    CharacteristicStore
  }
});

Vue.prototype.$store = store;

export default store;

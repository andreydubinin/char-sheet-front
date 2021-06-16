import Vue from "vue";
import { cloneDeep } from 'lodash';
import { isEmpty, delKeys } from "@/store/helpers/";

const emptyData = {
  id         : null,
  user_id    : null,
  name       : '',
  player_name: '',
  conception : '',
  appearance : '',
  slogan     : '',
  step       : null,
  defense    : null,
  resistance : null,
  shield     : null,
  charisma   : null,
  experience : null,
  injury     : null,
  wounds     : null,
  fatigue    : null,
  flaws      : [],
  traits     : [],
  type       : null,
};

const state = {
  charsheet      : cloneDeep(emptyData),
  characteristics: [],
  loading        : false,
};

const getters = {
  charsheet      : state => state.charsheet,
  characteristics: state => state.characteristics,
  id             : state => state.charsheet.id,
  user_id        : state => state.charsheet.user_id,
  name           : state => state.charsheet.name,
  player_name    : state => state.charsheet.player_name,
  conception     : state => state.charsheet.conception,
  appearance     : state => state.charsheet.appearance,
  slogan         : state => state.charsheet.slogan,
  step           : state => state.charsheet.step,
  defense        : state => state.charsheet.defense,
  resistance     : state => state.charsheet.resistance,
  shield         : state => state.charsheet.shield,
  charisma       : state => state.charsheet.charisma,
  experience     : state => state.charsheet.experience,
  injury         : state => state.charsheet.injury,
  wounds         : state => state.charsheet.wounds,
  fatigue        : state => state.charsheet.fatigue,
  flaws          : state => state.charsheet.flaws,
  traits         : state => state.charsheet.traits,
  type           : state => state.charsheet.type,
  loading        : state => state.loading,
};

const mutations = {
  set_charsheet      : (state, payload) => state.charsheet = payload,
  set_characteristics: (state, payload) => state.characteristics = payload,
  set_id             : (state, payload) => state.charsheet.id = payload,
  set_user_id        : (state, payload) => state.charsheet.user_id = payload,
  set_name           : (state, payload) => state.charsheet.name = payload,
  set_player_name    : (state, payload) => state.charsheet.player_name = payload,
  set_conception     : (state, payload) => state.charsheet.conception = payload,
  set_appearance     : (state, payload) => state.charsheet.appearance = payload,
  set_slogan         : (state, payload) => state.charsheet.slogan = payload,
  set_step           : (state, payload) => state.charsheet.step = payload,
  set_defense        : (state, payload) => state.charsheet.defense = payload,
  set_resistance     : (state, payload) => state.charsheet.resistance = payload,
  set_shield         : (state, payload) => state.charsheet.shield = payload,
  set_charisma       : (state, payload) => state.charsheet.charisma = payload,
  set_experience     : (state, payload) => state.charsheet.experience = payload,
  set_injury         : (state, payload) => state.charsheet.injury = payload,
  set_wounds         : (state, payload) => state.charsheet.wounds = payload,
  set_fatigue        : (state, payload) => state.charsheet.fatigue = payload,
  set_flaws          : (state, payload) => state.charsheet.flaws = payload,
  set_traits         : (state, payload) => {
    state.charsheet.traits = payload;
    // этот костыль нужен для нормального отслеживания изменения вложенного массива
    state.charsheet.traits_json = JSON.stringify(state.charsheet.traits);
  },
  set_type           : (state, payload) => state.charsheet.type = payload,
  set_loading        : (state, payload) => state.loading = payload,
  clearState         : (state) => state.charsheet = cloneDeep(emptyData),
};

const actions = {
  clearCharSheet ({commit}) {
    commit('clearState');
    commit('setDraftId', null);
    commit('set_id', null);
  },
  getCharSheet : async ({
                          commit,
                          dispatch
                        }, charsheetId) => {
    await Vue.prototype.$http.get(`charsheets/${charsheetId}`)
        .then(async response => {
          let {data} = response;
          await dispatch('setCharSheet', data.data);
        })
        .catch(error => {
          console.error('get charsheet', error);
          this.$router.push('Login');
        });
  },
  setCharSheet : (context, charsheet) => {
    // этот костыль нужен для нормального отслеживания изменения вложенного массива
    charsheet.traits_json = JSON.stringify(charsheet.traits);
    context.commit('set_charsheet', charsheet);
  },
  sendCharSheet: async ({
                          getters,
                          commit
                        }, payload) => {
    if (getters.loading)
      return;

    commit('set_loading', true);

    let data = cloneDeep(getters.charsheet);
    let id = getters.id;
    delKeys(data);

    return new Promise((resolve, reject) => {
      return Vue.prototype.$http.put(`charsheets/${id}`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error);
          })
          .finally(() => commit('set_loading', false));
    });
  },
  updateCharacteristic ({
                          getters,
                          commit
                        }, payload) {
    return new Promise((resolve, reject) => {
      return Vue.prototype.$http.post(`charsheets/set-characteristic/${getters.id}`, payload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error);
          });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}

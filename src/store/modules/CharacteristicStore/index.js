import Vue from 'vue';
import CharSheetDetail from "@/store/modules/CharSheetStore/Detail";

const state = {
  characteristicList: [],
  loading           : false
}

const getters = {
  characteristicList: state => state.characteristicList,
  loading           : state => state.loading,
}

const mutations = {
  set_characteristicList: (state, payload) => state.characteristicList = payload,
  set_loading           : (state, payload) => state.loading = payload,
}

const actions = {
  fetchCharacteristics ({commit, getters, dispatch, rootGetters}, charsheetId = null) {
    if (charsheetId === null) {
      charsheetId = rootGetters['CharSheetStore/CharSheetDetail/id'];
    }

    return new Promise((resolve, reject) => {
      Vue.prototype.$http.get(`/characteristics/get-for-charsheet/${charsheetId}`)
          .then(response => {
            commit('set_characteristicList', response.data.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          })
    })
  },

  storeForCharsheet ({commit, getters, dispatch, rootGetters}, data) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.post(`/characteristics/store-for-charsheet/${rootGetters['CharSheetStore/CharSheetDetail/id']}`, data)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          })
    })
  }
}

export default {
  namespaced: true,
  modules   : {},
  state,
  getters,
  mutations,
  actions,
}


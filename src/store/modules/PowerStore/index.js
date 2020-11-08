import Vue from 'vue';

const state = {
  powerList: [],
  loading  : false
}

const getters = {
  powerList: state => state.powerList,
  loading  : state => state.loading,
}

const mutations = {
  set_powerList    : (state, payload) => state.powerList = payload,
  pushPowerList    : (state, payload) => state.powerList.push(payload),
  removePowerListId: (state, payload) => state.powerList = state.powerList.filter(item => item.id !== payload),
  set_loading      : (state, payload) => state.loading = payload,
}

const actions = {
  fetchPowers ({commit, getters, dispatch, rootGetters}, charsheetId = null) {
    if (charsheetId === null) {
      charsheetId = rootGetters['CharSheetStore/CharSheetDetail/id'];
    }

    return new Promise((resolve, reject) => {
      Vue.prototype.$http.get(`/powers`, {
        params: {
          charsheet_id: charsheetId
        }
      })
          .then(response => {
            commit('set_powerList', response.data.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          })
    })
  },

  patchPower (context, data) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.patch(`/powers/${data.id}`, data)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          })
    });
  },

  storePower ({commit, getters, dispatch, rootGetters}, data) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.post(`/powers`, data)
          .then(response => {
            commit('pushPowerList', response.data.data)
            resolve(response);
          })
          .catch(error => {
            reject(error);
          })
    })
  },

  destroyPower ({commit}, id) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.delete(`/powers/${id}`)
          .then(response => {
            commit('removePowerListId', id);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          })
    });
  },
}

export default {
  namespaced: true,
  modules   : {},
  state,
  getters,
  mutations,
  actions,
}

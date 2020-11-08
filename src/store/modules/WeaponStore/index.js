import Vue from 'vue';

const state = {
  weaponList: [],
  loading   : false
}

const getters = {
  weaponList: state => state.weaponList,
  loading   : state => state.loading,
}

const mutations = {
  set_weaponList    : (state, payload) => state.weaponList = payload,
  pushWeaponList    : (state, payload) => state.weaponList.push(payload),
  removeWeaponListId: (state, payload) => state.weaponList = state.weaponList.filter(item => item.id !== payload),
  set_loading       : (state, payload) => state.loading = payload,
}

const actions = {
  fetchWeapons ({commit, getters, dispatch, rootGetters}, charsheetId = null) {
    if (charsheetId === null) {
      charsheetId = rootGetters['CharSheetStore/CharSheetDetail/id'];
    }

    return new Promise((resolve, reject) => {
      Vue.prototype.$http.get(`/weapons`, {
        params: {
          charsheet_id: charsheetId
        }
      })
          .then(response => {
            commit('set_weaponList', response.data.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          })
    })
  },

  patchWeapon (context, data) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.patch(`/weapons/${data.id}`, data)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          })
    });
  },

  storeWeapon ({commit, getters, dispatch, rootGetters}, data) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.post(`/weapons`, data)
          .then(response => {
            commit('pushWeaponList', response.data.data)
            resolve(response);
          })
          .catch(error => {
            reject(error);
          })
    })
  },

  destroyWeapon ({commit}, id) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.delete(`/weapons/${id}`)
          .then(response => {
            commit('removeWeaponListId', id);
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

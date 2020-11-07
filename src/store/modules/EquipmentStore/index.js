import Vue from 'vue';

const state = {
  equipmentList: [],
  loading      : false
}

const getters = {
  equipmentList: state => state.equipmentList,
  loading      : state => state.loading,
}

const mutations = {
  set_equipmentList    : (state, payload) => state.equipmentList = payload,
  pushEquipmentList    : (state, payload) => state.equipmentList.push(payload),
  removeEquipmentListId: (state, payload) => state.equipmentList = state.equipmentList.filter(item => item.id !== payload),
  set_loading          : (state, payload) => state.loading = payload,
}

const actions = {
  fetchEquipments ({commit, getters, dispatch, rootGetters}, charsheetId = null) {
    if (charsheetId === null) {
      charsheetId = rootGetters['CharSheetStore/CharSheetDetail/id'];
    }

    return new Promise((resolve, reject) => {
      Vue.prototype.$http.get(`/equipments`, {
        params: {
          charsheet_id: charsheetId
        }
      })
          .then(response => {
            commit('set_equipmentList', response.data.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          })
    })
  },

  patchEquipment (context, data) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.patch(`/equipments/${data.id}`, data)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          })
    });
  },

  storeEquipment ({commit, getters, dispatch, rootGetters}, data) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.post(`/equipments`, data)
          .then(response => {
            commit('pushEquipmentList', response.data.data)
            resolve(response);
          })
          .catch(error => {
            reject(error);
          })
    })
  },

  destroyEquipment ({commit}, id) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.delete(`/equipments/${id}`)
          .then(response => {
            commit('removeEquipmentListId', id);
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

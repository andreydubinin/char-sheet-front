import Vue from 'vue';
import CharSheetDetail from './Detail/'

const state = {
  charsheets: [],
  loading   : false
}

const getters = {
  charsheets: state => state.charsheets,
  loading   : state => state.loading,
}

const mutations = {
  set_charsheets: (state, payload) => state.charsheets = payload,
  set_loading   : (state, payload) => state.loading = payload,
}

const actions = {
  create ({
            commit,
            dispatch
          }, data) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.post('/charsheets', data)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          })
    })
  },
  fetchList ({
               commit,
               dispatch
             }) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.get('/charsheets')
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
  modules   : {
    CharSheetDetail
  },
  state,
  getters,
  mutations,
  actions,
}

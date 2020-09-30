import Vue from 'vue';
import { tokenRefreshBefore } from "@/config.env";

let decodeToken = function (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

let setToken = (commit, token) => {
  localStorage.setItem('user-token', token);
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  commit('set_token', token);
};

let successAuth = (commit, dispatch, authData) => {
  if (authData.user) {
    setToken(commit, authData.token);
    writeUserToLocalStorage(authData.user);
    commit('set_user', authData.user);
    commit('set_authenticated', true);
  }
};

let writeUserToLocalStorage = user => {
  localStorage.setItem('user', JSON.stringify(user));
};

let clearAuth = (commit) => {
  localStorage.removeItem('user-token');
  localStorage.removeItem('user');

  commit('set_token', '');
  commit('set_authenticated', false);
};

let getUserFromLocalStorage = (localStorage) => {
  let user;

  try {
    user = JSON.parse(localStorage.getItem('user') ? localStorage.getItem('user') : '{}');
  } catch (e) {
    user = {};
  }

  return user;
}

const state = {
  user          : getUserFromLocalStorage(localStorage),
  token         : localStorage.getItem('user-token'),
  authenticated : localStorage.getItem('user-token') !== null && localStorage.getItem('user-token') !== 'undefined',
  checking_token: true,
};

const getters = {
  user          : state => state.user,
  token         : state => state.token,
  authenticated : state => state.authenticated,
  checking_token: state => state.checking_token,
};

const mutations = {
  set_user          : (state, user) => state.user = user,
  set_token         : (state, token) => state.token = token,
  set_authenticated : (state, authenticated) => state.authenticated = authenticated,
  set_checking_token: (state, checking_token) => state.checking_token = checking_token,
};

const actions = {
  login ({commit, dispatch}, authData) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.post('auth/login', authData)
          .then(response => {
            successAuth(commit, dispatch, response.data);
            dispatch('initRefreshToken');
            resolve(response);
          })
          .catch(error => {
            clearAuth(commit);
            reject(error);
          })
    });
  },

  logout ({commit}) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.get('auth/logout')
          .then(response => {
            clearAuth(commit);
            resolve(response);
          })
          .catch(error => reject(error));
    })
  },

  refreshToken ({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      commit('set_checking_token', true);
      Vue.prototype.$http.get('auth/refresh')
          .then(response => {
            let token = response.data.token;
            setToken(commit, token);

            let decodedToken = decodeToken(token);
            let expiration = new Date(decodedToken.exp * 1000);
            let timeToRefresh = expiration - (new Date()) - tokenRefreshBefore;
            let refreshToken = () => dispatch('refreshToken');

            setTimeout(refreshToken, timeToRefresh);

            commit('set_checking_token', false);

            resolve(response);
          })
          .catch(error => {
            // console.error('ERROR REFRESHING TOKEN', error);
            clearAuth(commit);
            commit('set_checking_token', false);
            reject(error)
          });
    })
  },

  initRefreshToken ({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('user-token');

      if (!token || token === 'undefined') {
        clearAuth(commit);
        commit('set_checking_token', false);
        reject('No token stored');
      }

      let decodedToken = decodeToken(token);
      let expiration = new Date(decodedToken.exp * 1000);
      let now = new Date();
      let refreshToken = () => dispatch('refreshToken');

      if (now >= expiration - tokenRefreshBefore) {
        refreshToken();
      } else {
        let timeToRefresh = expiration - now - tokenRefreshBefore;
        commit('set_checking_token', false);
        setTimeout(refreshToken, timeToRefresh);
      }

      resolve();
    });
  },

  fetchUser ({commit}) {
    return Vue.prototype.$http.get('auth/me')
        .then(response => {
          if (response.data.user) {
            writeUserToLocalStorage(response.data.user);
            commit('set_user', response.data.user);
          }
        });
  },

  registration ({commit, dispatch}, data) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.post('auth/registration', data)
          .then(response => {
            successAuth(commit, dispatch, response.data);
            resolve(response);
          })
          .catch(error => reject(error));
    })
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

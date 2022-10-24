import axios from "axios";
const state = {
  user: {},
};
const getters = {};
const actions = {
  getUser({ commit }) {
    axios.get(process.env.VUE_APP_BACKEND_ROUTE + "api/v1/user/current", 
    
    ).then(response => {
      commit("setUser", response.data.data);
    });
  },
  loginUser({}, user) {
    axios.post(process.env.VUE_APP_BACKEND_ROUTE + "api/v1/user/login", {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem("session_token", response.data.access_token);
          window.location.replace("#/");
          location.reload();
        }
      })
  },
  logoutUser() {
    localStorage.clear();
    window.location.replace("#/");
    location.reload();
  }
};
const mutations = {
  setUser(state, data) {
    state.user = data;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

import api from '@/api/index';

export default {
  namespaced: true,
  state: {
    list: [],
    editedItem: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
    },
  },
  getters: {
    list(state) {
      return state.list;
    },
    editedItem(state) {
      return state.editedItem;
    },
  },
  mutations: {
    setData(state, data) {
      state.list = data;
    },
    setEditedItem(state, data) {
      state.editedItem = data;
    },
  },
  actions: {
    async fetchData({ commit }) {
      await api.get(`/user`).then(res => {
        commit('setData', res);
      }).catch(err => {
        console.error(err);
      });
    },
    async fetchUser({ commit }, id) {
      api.getById(`/user/${id}`)
        .then(res => {
          commit('setEditedItem', res);
        })
        .catch(err => {
          console.error(err);
        });
    },
    async updateUser({ dispatch }, user) {
      await api.update(`/user/${user.id}`, user)
        .then(() => {
          dispatch('fetchData');
        })
        .catch(err => {
          console.log(err);
        });
    },
    async createUser({ dispatch }, user) {
        await api.create(`/user/create`, user)
          .then(res => {
            console.log(res);
            dispatch('fetchData');
          })
          .catch(err => {
            console.log(err);
          });

    },
    async deleteUser({ dispatch }, userId) {
        await api.delete(`/user/${userId}`)
          .then(() => {
            dispatch('fetchData');
          })
          .catch(err => {
            console.error(err);
          });
    },
    updateEdited({ commit }, item) {
      commit('setEditedItem', item);
    },
  }
}
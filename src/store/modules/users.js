export default {
    namespaced: true,
    state: {
        usersList: [
          {id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com'},
          {id: 2, firstName: 'Jo', lastName: 'Do', email: 'jo@example.com'},
          {id: 3, firstName: 'Hn', lastName: 'Oe', email: 'hn@example.com'},
          {id: 4, firstName: 'Mn', lastName: 'Oe', email: 'nn@example.com'},
          {id: 5, firstName: 'Mary', lastName: 'Mey', email: 'mary@example.com'}
        ]
      },
      getters: {
        usersList(state) {
          return state.usersList;
        } 
      },
      mutations: {
        updateUser(state, {userIndex, user}) {
          state.usersList[userIndex] = user;
        },
        createUser(state, user) {
          state.usersList.push(user);
        },
        deleteUser(state, userId) {
          state.usersList.splice(userId, 1);
        },
      },
      actions: {
        updateUser({state, commit}, user) {
          let userIndex = state.usersList.findIndex(x => x.id == user.id)
          commit('updateUser', {userIndex, user});
        },
        createUser({commit}, user) {
          commit('createUser', user);
        },
        deleteUser({state, commit}, userId) {
          let userIndex = state.usersList.findIndex(x => x.id == userId)
          commit('deleteUser', userIndex);
        }
      }
}
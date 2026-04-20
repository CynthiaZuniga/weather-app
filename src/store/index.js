import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
    users: [
      {
        id: 1,
        name: 'Cynthia',
        email: 'cynthia@email.com',
        password: '1234',
        favorites: [1, 2],
        preferences: {
          unit: '°C',
          theme: 'Claro'
        }
      },
      {
        id: 2,
        name: 'María',
        email: 'maria@email.com',
        password: 'abcd',
        favorites: [3, 4],
        preferences: {
          unit: '°F',
          theme: 'Oscuro'
        }
      }
    ]
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isAuthenticated = true
    },

    LOGOUT(state) {
      state.user = null
      state.isAuthenticated = false
    },

    UPDATE_PREFERENCES(state, preferences) {
      state.user.preferences = {
        ...state.user.preferences,
        ...preferences
      }
    }
  },

  actions: {
    login({ commit, state }, credentials) {
      const foundUser = state.users.find(
        user =>
          user.email === credentials.email &&
          user.password === credentials.password
      )

      if (foundUser) {
        commit('SET_USER', foundUser)
        return true
      }

      return false
    },

    logout({ commit }) {
      commit('LOGOUT')
    },

    updatePreferences({ commit }, preferences) {
      commit('UPDATE_PREFERENCES', preferences)
    }
  },

  getters: {
    currentUser: state => state.user,
    isAuthenticated: state => state.isAuthenticated,
    userFavorites: state => state.user?.favorites || [],
    userPreferences: state => state.user?.preferences || {}
  }
})
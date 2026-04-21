import { createStore } from 'vuex'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

const cities = [
  { id: 1, name: 'Santiago', lat: -33.4489, lon: -70.6693 },
  { id: 2, name: 'Valparaíso', lat: -33.0472, lon: -71.6127 },
  { id: 3, name: 'Concepción', lat: -36.8269, lon: -73.0498 },
  { id: 4, name: 'Temuco', lat: -38.7359, lon: -72.5904 },
  { id: 5, name: 'Puerto Varas', lat: -41.3195, lon: -72.9854 }
]

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
          unit: 'metric',
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
          unit: 'imperial',
          theme: 'Oscuro'
        }
      }
    ],
    places: [],
    selectedPlace: null,
    forecast: [],
    loading: false,
    error: null
  },

  mutations: {
    SET_USER(state, user) {
      state.user = JSON.parse(JSON.stringify(user))
      state.isAuthenticated = true
    },

    LOGOUT(state) {
      state.user = null
      state.isAuthenticated = false
    },

    UPDATE_PREFERENCES(state, preferences) {
      if (state.user) {
        state.user.preferences = {
          ...state.user.preferences,
          ...preferences
        }
      }
    },

    SET_PLACES(state, places) {
      state.places = places
    },

    SET_SELECTED_PLACE(state, place) {
      state.selectedPlace = place
    },

    SET_FORECAST(state, forecast) {
      state.forecast = forecast
    },

    SET_LOADING(state, value) {
      state.loading = value
    },

    SET_ERROR(state, message) {
      state.error = message
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

    updatePreferences({ commit, dispatch }, preferences) {
      commit('UPDATE_PREFERENCES', preferences)
      dispatch('fetchPlacesWeather')
    },

    async fetchPlacesWeather({ commit, state }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        if (!API_KEY) {
          throw new Error('Falta la API key. Revisa el archivo .env')
        }

        const unit = state.user?.preferences?.unit || 'metric'

        const results = await Promise.all(
          cities.map(async city => {
            const response = await fetch(
              `${BASE_URL}/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=${unit}&lang=es`
            )

            if (!response.ok) {
              throw new Error(`No se pudo cargar el clima de ${city.name}`)
            }

            const data = await response.json()

            return {
              id: city.id,
              name: city.name,
              lat: city.lat,
              lon: city.lon,
              temp: Math.round(data.main.temp),
              status: data.weather[0].description,
              icon: data.weather[0].icon,
              humidity: data.main.humidity,
              wind: data.wind.speed
            }
          })
        )

        commit('SET_PLACES', results)
      } catch (error) {
        commit('SET_ERROR', error.message || 'Error al consultar la API')
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchForecastByCity({ commit, state }, cityId) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        if (!API_KEY) {
          throw new Error('Falta la API key. Revisa el archivo .env')
        }

        const city = cities.find(item => item.id === Number(cityId))

        if (!city) {
          throw new Error('Ciudad no encontrada')
        }

        const unit = state.user?.preferences?.unit || 'metric'

        const currentResponse = await fetch(
          `${BASE_URL}/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=${unit}&lang=es`
        )

        if (!currentResponse.ok) {
          throw new Error('No se pudo cargar el detalle del lugar')
        }

        const currentData = await currentResponse.json()

        const forecastResponse = await fetch(
          `${BASE_URL}/forecast?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=${unit}&lang=es`
        )

        if (!forecastResponse.ok) {
          throw new Error('No se pudo cargar el pronóstico')
        }

        const forecastData = await forecastResponse.json()

        const dailyForecast = forecastData.list
          .filter(item => item.dt_txt.includes('12:00:00'))
          .slice(0, 5)

        const normalizedForecast = dailyForecast.map(item => ({
          date: item.dt_txt.split(' ')[0],
          temp: Math.round(item.main.temp),
          tempMin: Math.round(item.main.temp_min),
          tempMax: Math.round(item.main.temp_max),
          status: item.weather[0].description,
          icon: item.weather[0].icon
        }))

        commit('SET_SELECTED_PLACE', {
          id: city.id,
          name: city.name,
          temp: Math.round(currentData.main.temp),
          status: currentData.weather[0].description,
          humidity: currentData.main.humidity,
          wind: currentData.wind.speed
        })

        commit('SET_FORECAST', normalizedForecast)
      } catch (error) {
        commit('SET_ERROR', error.message || 'Error al consultar el pronóstico')
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },

  getters: {
    currentUser: state => state.user,
    isAuthenticated: state => state.isAuthenticated,
    userFavorites: state => state.user?.favorites || [],
    userPreferences: state => state.user?.preferences || {},

    allPlaces: state => state.places,
    selectedPlace: state => state.selectedPlace,
    forecast: state => state.forecast,
    loading: state => state.loading,
    error: state => state.error,

    weeklyStats: state => {
      if (!state.forecast.length) return null

      const temps = state.forecast.map(day => day.temp)
      const rainyDays = state.forecast.filter(day =>
        day.status.toLowerCase().includes('lluv')
      ).length
      const cloudyDays = state.forecast.filter(day =>
        day.status.toLowerCase().includes('nubl')
      ).length
      const clearDays = state.forecast.filter(day => {
        const status = day.status.toLowerCase()
        return (
          status.includes('despejado') ||
          status.includes('sole') ||
          status.includes('claro')
        )
      }).length

      const average =
        temps.reduce((acc, temp) => acc + temp, 0) / temps.length

      return {
        min: Math.min(...temps),
        max: Math.max(...temps),
        average: average.toFixed(1),
        rainyDays,
        cloudyDays,
        clearDays
      }
    },

    weatherAlert: (state, getters) => {
      if (!state.forecast.length || !getters.weeklyStats) return null

      const hotDays = state.forecast.filter(day => day.tempMax >= 30).length
      const rainyDays = getters.weeklyStats.rainyDays
      const average = Number(getters.weeklyStats.average)

      if (hotDays >= 3) {
        return 'Alerta: posible ola de calor esta semana.'
      }

      if (rainyDays >= 3) {
        return 'Alerta: se espera una semana lluviosa.'
      }

      if (average <= 10) {
        return 'Alerta: se espera una semana fría.'
      }

      return 'Sin alertas meteorológicas importantes esta semana.'
    }
  }
})
import Vue from 'vue'
import Vuex from 'vuex'
import access from './access'

Vue.use(Vuex)

const getters = {
  userId: state => state.access.userId,
  permissions: state => state.access.permissions,
  roles: state => state.access.roles
}

export default new Vuex.Store({
  modules: {
    access
  },
  getters
})

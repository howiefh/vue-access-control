import WildcardPermission from "../WildcardPermission"

const access = {
  namespaced: true,

  state: {
    userId: null,
    permissions: null,
    wildcardPermissions: null,
    roles: null
  },

  mutations: {
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_WILDCARD_PERMISSIONS: (state, wildcardPermissions) => {
      state.wildcardPermissions = wildcardPermissions
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 获取用户权限
    access({ commit }, options) {
      return new Promise((resolve, reject) => {
        if (!options || !options.access || typeof options.access !== 'function') {
          reject('cannot find function access')
        }
        const funcResult = Promise.resolve(options.access())
        funcResult.then(data => {
          if (!data) {
            reject('error. object is empty')
          }
          commit('SET_USER_ID', data.userId)
          commit('SET_ROLES', data.roles)
          commit('SET_PERMISSIONS', data.permissions)
          if (options.enableWildcard) {
            const wildcardPermissions = (data.permissions || []).map(v => new WildcardPermission(v))
            commit('SET_WILDCARD_PERMISSIONS', wildcardPermissions)
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

  },

  getters: {
    userId: state => state.userId,
    permissions: state => state.permissions,
    wildcardPermissions: state => state.wildcardPermissions,
    roles: state => state.roles
  }
}

export default access

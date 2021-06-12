const access = {
  state: {
    userId: null,
    permissions: null,
    roles: null
  },

  mutations: {
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
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
          commit('SET_PERMISSIONS', data.permissions)
          commit('SET_ROLES', data.roles)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
}

export default access

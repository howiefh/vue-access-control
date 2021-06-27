import accessStore from './store/access'
import WildcardPermission from "./WildcardPermission"

const defaultOptions = {
  enableWildcard: false
}

const install = function (Vue, options = defaultOptions) {
  const { store } = options
  if (!store) {
    throw new Error('Dependency vuex was not found!')
  }

  store.registerModule('ac', accessStore)

  Vue.$access = async () => await store.dispatch('ac/access', options)
  Vue.prototype.$getUserId = () => store.getters['ac/userId']

  function hasPermission(permission) {
    if (!permission) return true
    if (typeof permission === 'string') {
      permission = [permission]
    }
    return hasAnyPermissions(permission)
  }

  function lacksPermission(permission) {
    return !hasPermission(permission)
  }

  function hasAnyPermissions(permissions) {
    if (!permissions || !permissions.length) return true
    const userPermissions = getUserPermissions()
    if (!userPermissions || !userPermissions.length) return false
    return permissions.some(perm => hasUserPermissions(userPermissions, perm))
  }

  function hasAllPermissions(permissions) {
    if (!permissions || !permissions.length) return true
    const userPermissions = getUserPermissions()
    if (!userPermissions || !userPermissions.length) return false
    return permissions.every(perm => hasUserPermissions(userPermissions, perm))
  }

  function hasUserPermissions(userPermissions, perm) {
    if (options.enableWildcard) {
      const userWildcardPermissions = store.getters['ac/wildcardPermissions'];
      const wildcardPermission = new WildcardPermission(perm);
      return userWildcardPermissions.some(p => p.implies(wildcardPermission))
    } else {
      return userPermissions.includes(perm);
    }
  }

  function getUserPermissions() {
    return store.getters['ac/permissions']
  }

  function hasRole(role) {
    if (!role) return true
    if (typeof role === 'string') {
      role = [role]
    }
    return hasAnyRoles(role)
  }

  function lacksRole(role) {
    return !hasRole(role)
  }

  function hasAnyRoles(roles) {
    if (!roles || !roles.length) return true
    const userRoles = getUserRoles()
    if (!userRoles || !userRoles.length) return false
    return roles.some(perm => userRoles.includes(perm))
  }

  function hasAllRoles(roles) {
    if (!roles || !roles.length) return true
    const userRoles = getUserRoles()
    if (!userRoles || !userRoles.length) return false
    return roles.every(perm => userRoles.includes(perm))
  }

  function getUserRoles() {
    return store.getters['ac/roles']
  }

  const accessFuncs = { hasPermission, lacksPermission, hasAnyPermissions, hasAllPermissions, hasRole, lacksRole, hasAnyRoles, hasAllRoles }

  Object.keys(accessFuncs).forEach(funcName => {
    const func = accessFuncs[funcName]
    Vue.prototype['$' + funcName] = (v) => func(v)

    /* 权限指令 */
    Vue.directive(funcName, {
      bind: function(el, binding) {
        if (!func(binding.value)) {
          if (el.parentNode) {
            el.parentNode.removeChild(el)
          } else {
            el.style.setProperty('display', 'none', 'important');
          }
        }
      }
    })
  })

  function handleBeforeRouteEnter(to, from, next) {
    if (hasPermission(to.meta && to.meta.permissions)) {
      next()
    } else {
      if (options.errorPage) {
        next({ path: options.errorPage, replace: true, query: { noGoBack: !!options.noGoBack }})
      } else {
        window.alert('无访问权限，请联系管理员申请')
        next(false)
      }
    }
  }

  // 3. 注入组件选项
  Vue.mixin({
    beforeRouteEnter(to, from, next) {
      console.debug('to', to)
      let userPermissions = getUserPermissions()
      if (!userPermissions) {
        store.dispatch('ac/access', options).then(() => {
          handleBeforeRouteEnter(to, from, next)
        }).catch (err=> {
          console.error(err)
          next(false)
        })
      } else {
        handleBeforeRouteEnter(to, from, next)
      }
    }
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install
}

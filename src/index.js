import store from './store'
import Error401 from './components/errorPage/401.vue'
import Error403 from './components/errorPage/403.vue'
import Error404 from './components/errorPage/404.vue'
import Error500 from './components/errorPage/500.vue'

const defaultOptions = {
  enableErrorComponent: true
}

const install = function (Vue, options = defaultOptions) {
  if (typeof options === 'function') {
		options = Object.assign({}, defaultOptions, { access: options })
	}

  if (options.enableErrorComponent) {
    const components = [
      Error401,
      Error403,
      Error404,
      Error500,
    ]

    components.map(component => {
      Vue.component(component.name, component)
    })
  }

  Vue.$access = async () => await store.dispatch('access', options)

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
    return permissions.some(perm => userPermissions.includes(perm))
  }

  function hasAllPermissions(permissions) {
    if (!permissions || !permissions.length) return true
    const userPermissions = getUserPermissions()
    if (!userPermissions || !userPermissions.length) return false
    return permissions.every(perm => userPermissions.includes(perm))
  }

  function getUserPermissions() {
    return store.getters.permissions
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
    return store.getters.roles
  }

  const accessFuncs = [hasPermission, lacksPermission, hasAnyPermissions, hasAllPermissions, hasRole, lacksRole, hasAnyRoles, hasAllRoles]

  accessFuncs.forEach(func => {
    const funcName = func.name
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
        store.dispatch('access', options).then(() => {
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

export {
  Error401,
  Error403,
  Error404,
  Error500,
}

export default {
  install
}

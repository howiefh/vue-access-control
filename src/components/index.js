import Error401 from '../components/errorPage/401.vue'
import Error403 from '../components/errorPage/403.vue'
import Error404 from '../components/errorPage/404.vue'
import Error500 from '../components/errorPage/500.vue'

const install = function (Vue) {
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

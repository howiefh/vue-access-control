import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueAccessControl from './index'
import VueRouter from 'vue-router'
import { Error403 } from './components/index'
import Demo from './Demo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/403',
    name: '403',
    component: Error403
  },
  {
    path: '/',
    name: 'Home',
    meta: { permissions: ['user:query:1,2,3'] },
    component: Demo
  },
  {
    path: '/demo',
    name: 'Demo',
    meta: { permissions: ['menu'] },
    component: Demo
  },
  {
    path: '/about',
    name: 'About',
    meta: { permissions: ['user'] },
    component: Demo
  }
]

const router = new VueRouter({ routes })

Vue.use(Vuex)
const store = new Vuex.Store({})

Vue.use(VueAccessControl, {
  store,
  errorPage: '/403',
  enableWildcard: true,
  access() {
    const result = {
      userId: 'howiefh',
      permissions: ['app', 'menu', 'user:query:*'],
      roles: ['app', 'menu']
    }
    return result
  }
})
Vue.config.productionTip = false
Vue.$access().then((data) => {
  console.log(data)

  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
})


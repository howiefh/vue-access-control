import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueAccessControl from './index'

Vue.use(VueAccessControl, () => {
  const result = {
    userId: 'howiefh',
    permissions: ['vueRouter', 'vuex'],
    roles: ['vueRouter', 'vuex']
  }
  return result
})
Vue.config.productionTip = false
Vue.$access().then((data) => {
  console.log(data)

  new Vue({
    store,
    render: h => h(App)
  }).$mount('#app')
})


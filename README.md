# vue-access-control

## Install

```
npm install @howiefh/vue-access-control -S
```

## Quick Start

Add plugin in vue 2.

```
import Vue from 'vue'
import VueAccessControl from '@howiefh/vue-access-control'
import axios from 'axios'

// or simply
// import store from './store'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({})

Vue.use(VueAccessControl, {
  errorPage: '/403', // default: null. the path of error page. navigate to the error page when hasPermission(route.meta.permissions) is false.
  enableWildcard: true, // default: false. see more about wildcard permissions: https://shiro.apache.org/permissions.html#wildcard-permissions
  store,
  access() {
    return new Promise((resolve, reject) => {
      axios.post('/api/permissions').then(response => {
        const res = response.data
        // data structure
        // response.data:
        // {"data":{"userId":"howiefh","permissions":["app", "menu", "user:query:*"], "roles": ["admin"]}}
        if (!res.data) {
          reject('res.data is null')
        } else {
          resolve(res.data)
        }
      }).catch(err => reject(err))
    })
  }
})
```

## Usage

Use functions or directives to check permissions

```
<template>
  <div>
    functions:
    <div v-show="$hasPermission('app')">$hasPermission('app')</div>
    <div v-show="$hasPermission(['app'])">$hasPermission(['app'])</div>
    <div v-show="$lacksPermission('user')">$lacksPermission('user')</div>
    <div v-show="$lacksPermission(['user'])">$lacksPermission(['user'])</div>
    <div v-show="$hasAnyPermissions(['app'])">$hasAnyPermissions(['app'])</div>
    <div v-show="$hasAnyPermissions(['user'])">$hasAnyPermissions(['user'])</div>
    <div v-show="$hasAllPermissions(['app', 'menu'])">$hasAllPermissions(['app', 'menu'])</div>
    <div v-show="$hasRole('app')">$hasRole('app')</div>
    <div v-show="$hasRole(['app'])">$hasRole(['app'])</div>
    <div v-show="$lacksRole('user')">$lacksRole('user')</div>
    <div v-show="$lacksRole(['user'])">$lacksRole(['user'])</div>
    <div v-show="$hasAnyRoles(['app'])">$hasAnyRoles(['app'])</div>
    <div v-show="$hasAnyRoles(['user'])">$hasAnyRoles(['user'])</div>
    <div v-show="$hasAllRoles(['app', 'menu'])">$hasAllRoles(['app', 'menu'])</div>
    directions:
    <div v-hasPermission="'app'">v-hasPermission="'app'"</div>
    <div v-hasPermission="['app']">v-hasPermission="['app']"</div>
    <div v-lacksPermission="'user'">v-lacksPermission="'user'"</div>
    <div v-lacksPermission="['user']">v-lacksPermission="['user']"</div>
    <div v-hasAnyPermissions="['app']">v-hasAnyPermissions="['app']"</div>
    <div v-hasAnyPermissions="['user']">v-hasAnyPermissions="['user']"</div>
    <div v-hasAllPermissions="['app', 'menu']">v-hasAllPermissions="['app', 'menu']"</div>
    <div v-hasRole="'app'">v-hasRole="'app'"</div>
    <div v-hasRole="['app']">v-hasRole="['app']"</div>
    <div v-lacksRole="'user'">v-lacksRole="'user'"</div>
    <div v-lacksRole="['user']">v-lacksRole="['user']"</div>
    <div v-hasAnyRoles="['app']">v-hasAnyRoles="['app']"</div>
    <div v-hasAnyRoles="['user']">v-hasAnyRoles="['user']"</div>
    <div v-hasAllRoles="['app', 'menu']">v-hasAllRoles="['app', 'menu']"</div>
    wildcard permissions:
    <div v-show="$hasPermission('user:query:*')">$hasPermission('user:query:*')</div>
    <div v-show="$hasPermission('user:query:1,2,3')">$hasPermission('user:query:1,2,3')</div>
    <div v-show="$lacksPermission('user:update')">$lacksPermission('user:update')</div>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    foo() {
      if (this.$hasPermission(['menu'])) {
        this.$router.push({ path: '/menu' })
      }
    }
  }
}
</script>
```

## Error Page

You can also use the error page components provided in this plugin.

```
import { Error403 } from '@howiefh/vue-access-control/dist/error-page.umd'
import '@howiefh/vue-access-control/dist/error-page.css'

const routes = [{ path: '/403', name: '403', component: Error403 }]

const router = new VueRouter({
  routes
})
```

## Demo

```
git clone https://github.com/howiefh/vue-access-control.git
cd vue-access-control
yarn install
yarn serve
```
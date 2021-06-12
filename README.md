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

Vue.use(VueAccessControl, {
  errorPage: '/403', // default: null. the path of error page. navigate to the error page when hasPermission(route.meta.permissions) is false.
  access() {
    return new Promise((resolve, reject) => {
      axios.post('/api/permissions').then(response => {
        const res = response.data
        // data structure
        // response.data:
        // {"data":{"userId":"howiefh","permissions":["APP", "MENU"], "roles": ["admin"]}}
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
    <div v-show="$hasPermission('APP')">$hasPermission('APP')</div>
    <div v-show="$hasPermission(['APP'])">$hasPermission(['APP'])</div>
    <div v-show="$lacksPermission('USER')">$lacksPermission('USER')</div>
    <div v-show="$lacksPermission(['USER'])">$lacksPermission(['USER'])</div>
    <div v-show="$hasAnyPermissions(['APP'])">$hasAnyPermissions(['APP'])</div>
    <div v-show="$hasAnyPermissions(['USER'])">$hasAnyPermissions(['USER'])</div>
    <div v-show="$hasAllPermissions(['APP', 'MENU'])">$hasAllPermissions(['APP', 'MENU'])</div>
    <div v-show="$hasRole('APP')">$hasRole('APP')</div>
    <div v-show="$hasRole(['APP'])">$hasRole(['APP'])</div>
    <div v-show="$lacksRole('USER')">$lacksRole('USER')</div>
    <div v-show="$lacksRole(['USER'])">$lacksRole(['USER'])</div>
    <div v-show="$hasAnyRoles(['APP'])">$hasAnyRoles(['APP'])</div>
    <div v-show="$hasAnyRoles(['USER'])">$hasAnyRoles(['USER'])</div>
    <div v-show="$hasAllRoles(['APP', 'MENU'])">$hasAllRoles(['APP', 'MENU'])</div>
    directions:
    <div v-hasPermission="'APP'">v-hasPermission="'APP'"</div>
    <div v-hasPermission="['APP']">v-hasPermission="['APP']"</div>
    <div v-lacksPermission="'USER'">v-lacksPermission="'USER'"</div>
    <div v-lacksPermission="['USER']">v-lacksPermission="['USER']"</div>
    <div v-hasAnyPermissions="['APP']">v-hasAnyPermissions="['APP']"</div>
    <div v-hasAnyPermissions="['USER']">v-hasAnyPermissions="['USER']"</div>
    <div v-hasAllPermissions="['APP', 'MENU']">v-hasAllPermissions="['APP', 'MENU']"</div>
    <div v-hasRole="'APP'">v-hasRole="'APP'"</div>
    <div v-hasRole="['APP']">v-hasRole="['APP']"</div>
    <div v-lacksRole="'USER'">v-lacksRole="'USER'"</div>
    <div v-lacksRole="['USER']">v-lacksRole="['USER']"</div>
    <div v-hasAnyRoles="['APP']">v-hasAnyRoles="['APP']"</div>
    <div v-hasAnyRoles="['USER']">v-hasAnyRoles="['USER']"</div>
    <div v-hasAllRoles="['APP', 'MENU']">v-hasAllRoles="['APP', 'MENU']"</div>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    foo() {
      if (this.$hasPermission(['MENU'])) {
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
<template>
  <div>
    <Error403/>
  </div>
</template>

<script>
import { Error403 } from "@howiefh/vue-access-control"
import '@howiefh/vue-access-control/dist/vue-access-control.css'

export default {
  name: 'App',
  components: {
    Error403
  }
}
</script>
```

## Demo

```
git clone https://github.com/howiefh/vue-access-control.git
cd vue-access-control
yarn install
yarn serve
```
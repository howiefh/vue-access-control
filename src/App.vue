<template>
  <div id="app">
    <div>
      <button type="button" @click="() => show = 1">权限</button>
      <button type="button" @click="() => show = 401">401</button>
      <button type="button" @click="() => show = 403">403</button>
      <button type="button" @click="() => show = 404">404</button>
      <button type="button" @click="() => show = 500">500</button>
    </div>
    <div v-show="show === 1">
      permissions:
      {{permissions}}
      roles:
      {{roles}}
      <div v-show="$hasPermission('vuex')">$hasPermission('vuex')</div>
      <div v-show="$hasPermission(['vuex'])">$hasPermission(['vuex'])</div>
      <div v-show="$lacksPermission('vue-devtools')">$lacksPermission('vue-devtools')</div>
      <div v-show="$lacksPermission(['vue-devtools'])">$lacksPermission(['vue-devtools'])</div>
      <div v-show="$hasAnyPermissions(['vuex'])">$hasAnyPermissions(['vuex'])</div>
      <div v-show="$hasAnyPermissions(['vue-devtools'])">$hasAnyPermissions(['vue-devtools'])</div>
      <div v-show="$hasAllPermissions(['vuex', 'vueRouter'])">$hasAllPermissions(['vuex', 'vueRouter'])</div>
      <div v-hasPermission="'vuex'">v-hasPermission="'vuex'"</div>
      <div v-hasPermission="['vuex']">v-hasPermission="['vuex']"</div>
      <div v-lacksPermission="'vue-devtools'">v-lacksPermission="'vue-devtools'"</div>
      <div v-lacksPermission="['vue-devtools']">v-lacksPermission="['vue-devtools']"</div>
      <div v-hasAnyPermissions="['vuex']">v-hasAnyPermissions="['vuex']"</div>
      <div v-hasAnyPermissions="['vue-devtools']">v-hasAnyPermissions="['vue-devtools']"</div>
      <div v-hasAllPermissions="['vuex', 'vueRouter']">v-hasAllPermissions="['vuex', 'vueRouter']"</div>
      <div v-show="$hasRole('vuex')">$hasRole('vuex')</div>
      <div v-show="$hasRole(['vuex'])">$hasRole(['vuex'])</div>
      <div v-show="$lacksRole('vue-devtools')">$lacksRole('vue-devtools')</div>
      <div v-show="$lacksRole(['vue-devtools'])">$lacksRole(['vue-devtools'])</div>
      <div v-show="$hasAnyRoles(['vuex'])">$hasAnyRoles(['vuex'])</div>
      <div v-show="$hasAnyRoles(['vue-devtools'])">$hasAnyRoles(['vue-devtools'])</div>
      <div v-show="$hasAllRoles(['vuex', 'vueRouter'])">$hasAllRoles(['vuex', 'vueRouter'])</div>
      <div v-hasRole="'vuex'">v-hasRole="'vuex'"</div>
      <div v-hasRole="['vuex']">v-hasRole="['vuex']"</div>
      <div v-lacksRole="'vue-devtools'">v-lacksRole="'vue-devtools'"</div>
      <div v-lacksRole="['vue-devtools']">v-lacksRole="['vue-devtools']"</div>
      <div v-hasAnyRoles="['vuex']">v-hasAnyRoles="['vuex']"</div>
      <div v-hasAnyRoles="['vue-devtools']">v-hasAnyRoles="['vue-devtools']"</div>
      <div v-hasAllRoles="['vuex', 'vueRouter']">v-hasAllRoles="['vuex', 'vueRouter']"</div>
    </div>
    <Error401 v-show="show === 401"/>
    <Error403 v-show="show === 403"/>
    <Error404 v-show="show === 404"/>
    <Error500 v-show="show === 500"/>
  </div>
</template>

<script>
import { Error401, Error403, Error404, Error500 } from './index'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      show: 1
    }
  },
  computed: {
    ...mapGetters([
      'permissions',
      'roles'
    ])
  },
  components: {
    Error401,
    Error403,
    Error404,
    Error500
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

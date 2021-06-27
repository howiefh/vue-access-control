<template>
  <div id="demo">
    <div>
      <button type="button" @click="() => show = 1">权限</button>
      <button type="button" @click="() => show = 401">401</button>
      <button type="button" @click="() => show = 403">403</button>
      <button type="button" @click="() => show = 404">404</button>
      <button type="button" @click="() => show = 500">500</button>
    </div>
    <div v-show="show === 0">
      Home
    </div>
    <div v-show="show === 1">
      {{$getUserId()}}
      permissions:
      {{permissions}}
      roles:
      {{roles}}
      <br/>
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
    <Error401 v-show="show === 401"/>
    <Error403 v-show="show === 403"/>
    <Error404 v-show="show === 404"/>
    <Error500 v-show="show === 500"/>
  </div>
</template>

<script>
import { Error401, Error403, Error404, Error500 } from './components/index'
import { mapGetters } from 'vuex'

export default {
  name: 'Demo',
  data() {
    return {
      show: 1
    }
  },
  computed: {
    ...mapGetters('ac', [
      'permissions',
      'roles'
    ])
  },
  mounted() {
    this.show = this.$route.name === 'Home' ? 0 : 1;
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
#demo {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

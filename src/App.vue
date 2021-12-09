<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <b active v-if="!conferetoken()">
        <router-link to="/login">Login</router-link> |
      </b>
      <b active v-else>
        <router-link to="/login">Logout</router-link> |
      </b>
      <b active v-if="conferetoken()">
      <router-link to="/formulario">Formulario</router-link> |
      </b>
      <router-link to="/help">Help</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {

  methods:{
    conferetoken(){
      if(localStorage.jwtToken){
        return true;
      }else{
        return false;
      }
    }
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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

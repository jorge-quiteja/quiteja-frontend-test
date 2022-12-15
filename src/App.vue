<template>
  <div id="app">
    <NavBarComponent />
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import NavBarComponent from "./components/NavBarComponent.vue";
export default {
  components: {
    NavBarComponent,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>



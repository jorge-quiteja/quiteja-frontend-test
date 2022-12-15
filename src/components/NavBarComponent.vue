<template>
  <v-app-bar app dark>
    <div class="d-flex justify-space-between">
      <router-link to="/home">Home</router-link>
      <router-link to="/usuarios">Users</router-link>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBarComponent",
};
</script>

<style scoped>
a {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  margin-left: 2rem;
}

a:visited {
  color: #ffffff;
}
</style>
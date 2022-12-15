<template>
  <div class="hello">
    <h1>Teste pratico QuiteJa</h1>
    <div class="mt-2">
      <h2>
        {{ msg }}
      </h2>
    </div>
    <div class="mt-2">
      <h2>Essas foram as ferramentas utilizadas</h2>
    </div>
    <ul class="d-flex align-center justify-center">
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener"
          >vue-router</a
        >
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
          >vue-devtools</a
        >
      </li>
      <li>
        <a
          href="https://vuetifyjs.com/en/getting-started/installation/"
          target="_blank"
          rel="noopener"
          >vuetify</a
        >
      </li>
      <li>
        <a href="https://axios-http.com/ptbr/" target="_blank" rel="noopener"
          >Axios</a
        >
      </li>
    </ul>
    <h3>
      <img
        width="50"
        class="lgif"
        src="https://gifs.eco.br/wp-content/uploads/2021/09/gifs-de-setas-23.gif"
        alt=""
      />
      <router-link class="users-link" to="/usuarios"
        >Ver usuarios cadastrados</router-link
      >
      <img
        width="50"
        class="rgif"
        src="https://gifs.eco.br/wp-content/uploads/2021/09/gifs-de-setas-23.gif"
        alt=""
      />
    </h3>
  </div>
</template>

<script>
export default {
  name: "WelcomeComponent",
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="scss">
.mt-2 {
  margin-top: 8px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 10px;
}
li {
  display: inline-block;
  margin: 0 10px;
  &:hover{
    font-weight: bold;
  }
}
a {
  color: #42b983;
}
.lgif,
.rgif {
  bottom: -18px;
  position: relative;
}
.rgif {
  transform: scaleX(-1);
}
</style>

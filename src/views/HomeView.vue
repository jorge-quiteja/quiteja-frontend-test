<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <WelcomeComponent msg="Bem vindo!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import WelcomeComponent from '@/components/WelcomeComponent.vue'

export default {
  name: 'HomeView',
  components: {
    WelcomeComponent
  }
}
</script>

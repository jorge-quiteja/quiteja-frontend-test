<template>
  <div>
    <div>
      <h1>Usuários</h1>
      <h2>Estes são os usuários cadastrados em nossa base de dados:</h2>
    </div>
    <div>
      <ListComponent />
    </div>
  </div>
</template>

<script>
import ListComponent from "@/components/ListComponent.vue";
export default {
  name: "UsersView",
  components: {
    ListComponent,
  },
};
</script>

<style>
</style>
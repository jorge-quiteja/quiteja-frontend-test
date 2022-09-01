<template>
  <v-data-table
    :headers="headers"
    :items="usersList"
  ></v-data-table>
</template>

<script>
// import { mapState } from "vuex";
export default {
    name: "ListComponent",
  data() {
    return {
      headers: [
        { text: "ID", align: "start", sortable: false, value: "id" },
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "E-mail", value: "email" }
      ],
      usersList: [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        },
        {
          id: 2,
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        },
        {
          id: 3,
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        },
      ],
    };
  },
  computed: {
    // ...mapState('users', {
    //   usersList: (state) => state.usersList,
    // }),
  },
};
</script>

<style>
</style>
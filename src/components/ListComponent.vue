<template>
  <v-card class="cardTable">
    <v-data-table data-app :headers="headers" :items="usersList" class="elevation-1">
    <template v-slot:top>
      <v-toolbar >
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.firstName"
                      label="First name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.lastName"
                      label="LastName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.email"
                      label="E-mail"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="fetchData"> Reset </v-btn>
    </template>
  </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ListComponent",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "ID", align: "start", sortable: false, value: "id" },
      { text: "First Name", value: "firstName" },
      { text: "Last Name", value: "lastName" },
      { text: "E-mail", value: "email" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
    },
    defaultItem: {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
    },
  }),
  computed: {
    ...mapGetters("users", {
      usersList: 'usersList',
    }),

    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
  },
  watch: {
    dialog(val) {
        val || this.close();

    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      return this.usersList;
    },
    ...mapActions("users", {
      updateUser: "updateUser",
      createUser: "createUser",
      deleteUser: "deleteUser",
    }),

    editItem(item) {
      this.editedIndex = this.usersList.indexOf(item);
      this.editedItem = item;
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.usersList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteUser(this.editedItem.id);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        let editedUser = this.usersList[this.editedIndex];
        Object.assign(editedUser, this.editedItem);
        this.updateUser(editedUser);

      } else {
        this.createUser(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style>
.cardTable {
  width: 75%;
  margin: 0 auto;
}
</style>
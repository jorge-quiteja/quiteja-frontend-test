<template>
  <v-card class="cardTable">
    <v-data-table
      data-app
      :headers="headers"
      :items="usersList"
      :loading="loadingTable"
      :items-per-page="itemsPerPage"
      :page="actualPage"
      @update:options="setPagination"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
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
                <v-form>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.firstName"
                          :rules="[rules.fNameRules]"
                          placeholder="John"
                          label="First name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.lastName"
                          :rules="[rules.lNameRules]"
                          placeholder="Smith"
                          label="LastName"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-select
                          :items="titles"
                          v-model="editedItem.title"
                          :rules="[rules.required]"
                          label="Title"
                          placeholder="Ms..."
                          required
                        ></v-select>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="8"
                        md="8"
                        v-if="formTitle === 'New User'"
                      >
                        <v-text-field
                          v-model="editedItem.email"
                          :rules="[rules.required, rules.email]"
                          label="E-mail"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-alert v-if="formError" type="success" class="sucess">{{
                    formError
                  }}</v-alert>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" type="submit" text @click="save">
                  Save
                </v-btn>
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
    formError: null,
    loadingForm: false,
    loadingTable: false,
    actualPage: 1,
    itemsPerPage: 10,
    headers: [
      { text: "ID", align: "start", sortable: false, value: "id" },
      { text: "First Name", value: "firstName" },
      { text: "Last Name", value: "lastName" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    rules: {
      required: (value) => !!value || "Required.",
      fNameRules: (v) => !!v || "First name is required",
      lNameRules: (v) => !!v || "Last name is required",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
    editedIndex: -1,
    titles: ["mr", "ms", "mrs", "miss", "dr", "none"],
    defaultItem: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
    },
  }),
  async created() {
    Object.entries(this.$route.query).forEach(([key, value]) => {
      console.log("Switch");
      console.log(key, value);
      switch (key) {
        case "limit":
          this.itemsPerPage = parseInt(value);
          break;
        case "page":
          this.actualPage = value;
          break;
      }
    });

    this.loadingTable = true;
    await this.fetchData();
    this.loadingTable = false;
  },

  computed: {
    ...mapGetters("users", {
      usersList: "list",
      editedItem: "editedItem",
    }),

    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
  },
  watch: {
    dialog(value) {
      value || this.close();
    },
    dialogDelete(value) {
      value || this.closeDelete();
    },
  },
  methods: {
    ...mapActions("users", {
      fetchData: "fetchData",
      fetchUser: "fetchUser",
      updateUser: "updateUser",
      updateEdited: "updateEdited",
      createUser: "createUser",
      deleteUser: "deleteUser",
    }),
    setPagination(e) {
      console.log(e);
      this.itemsPerPage = e.itemsPerPage; 
      this.actualPage = e.page;

      this.$router.replace({
        path: "",
        query: { limit: this.itemsPerPage, page: this.actualPage },
      });
    },
    isEditing() {
      this.formTitle == "New user" ? true : false;
    },

    async editItem(item) {
      this.editedIndex = this.usersList.indexOf(item);
      await this.fetchUser(item.id);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.usersList.indexOf(item);
      this.updateEdited(Object.assign({}, item));
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      await this.deleteUser(this.editedItem.id);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.updateEdited(Object.assign({}, this.defaultItem));
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.updateEdited(Object.assign({}, this.defaultItem));
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        let editedUser = this.usersList[this.editedIndex];
        Object.assign(editedUser, this.editedItem);
        this.updateUser(editedUser);
        this.close();
      } else {
        this.formError = null;
        this.loadingForm = false;
        let newUser = this.editedItem;
        if (newUser.title === "none") {
          newUser.title = "";
        }
        await this.createUser(JSON.stringify(newUser))
          .then(() => {
            this.close();
          })
          .catch((e) => {
            if (e) {
              let { data } = e.response.data;
              if (data.title) {
                this.loadingForm = false;
                this.formError = "This title is invalid";
              }
              if (data.firstName) {
                this.loadingForm = false;
                this.formError = "This first name is invalid";
              }
              if (data.lastName) {
                this.loadingForm = false;
                this.formError = "This last name is invalid";
              }
              if (data.email) {
                this.loadingForm = false;
                this.formError = data.title;
              }
            }
          });
      }
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
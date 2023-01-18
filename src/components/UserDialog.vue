<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    :value="opened"
  >
    <template>
      <v-card>
        <v-toolbar color="primary" dark>
          {{ isNew ? "Create user" : "Edit user" }}
        </v-toolbar>
        <v-form>
          <v-text-field v-model="item.name" label="Name" />
          <v-text-field v-model="item.email" label="email" />
          <v-text-field v-model="item.pass" label="pass" />
          <v-text-field v-model="item.role" label="role" />
        </v-form>
        <v-card-actions>
          <v-btn @click="persist">
            {{ isNew ? "Create" : "Save" }}
          </v-btn>
          <v-btn @click="deleteItem">
            {{ " Delete " }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import api from "../api";

export default {
  name: "UserDialog",
  props: {
    item: Object,
    opened: Boolean,
  },
  methods: {
    deleteItem() {
      api.users.delete(this.item).then(() => this.$emit("refresh"));
    },
    persist() {
      if (this.isNew) {
        api.auth
          .register({
            username: this.item.name,
            email: this.item.email,
            password: this.item.pass,
            roles: [this.item.role],
          })
          .then(() => this.$emit("refresh"));
      } else {
        api.users
          .edit({
            id: this.item.id,
            username: this.item.name,
            email: this.item.email,
            password: this.item.pass,
            roles: [this.item.role],
          })
          .then(() => this.$emit("refresh"));
      }
    },
  },
  computed: {
    isNew: function () {
      return !this.item.id;
    },
  },
};
</script>

<style scoped></style>

<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    :value="opened"
  >
    <template>
      <v-card>
        <v-toolbar color="primary" dark>
          {{ isNew ? "Create device" : "Edit device" }}
        </v-toolbar>
        <v-form>
          <v-text-field v-model="item.id" label="Id" />
          <v-text-field v-model="item.description" label="Description" />
          <v-text-field v-model="item.address" label="Address" />
          <v-text-field v-model="item.user" label="User" />
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

  name: "ItemDialog",
  props: {
    item: Object,
    opened: Boolean,
  },
  methods: {
    deleteItem() {
      api.items.delete(this.item).then(() => this.$emit("refresh"));
    },
    persist() {
      if (this.isNew) {
        api.items
          .create({
            id: this.item.id,
            description: this.item.description,
            address: this.item.address,
            userId: this.item.user,
          })
          .then(() => this.$emit("refresh"));
      } else {
        api.items
          .edit({
            id: this.item.id,
            description: this.item.description,
            address: this.item.address,
            userId: this.item.user,
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

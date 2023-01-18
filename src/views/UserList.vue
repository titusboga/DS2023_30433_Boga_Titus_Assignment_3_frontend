<template>
  <v-card>
    <v-card-title>
      Users
      <v-spacer></v-spacer>
      <v-text-field v-model="ids" label="Ids" />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-btn @click="addItem">Add User</v-btn>
      <v-btn @click="devices">Devices</v-btn>
      <v-text-field v-model="msg" label="Message" />
      <v-text-field v-model="to" label="To" />

      <v-btn @click="sendmsg">Send Message</v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      @click:row="editItem"
    ></v-data-table>
    <UserDialog
      :opened="dialogVisible"
      :item="selectedItem"
      @refresh="refreshList"
    ></UserDialog>

    <v-data-table
      :headers="headers2"
      :items="items2"
      @click:row="editItem"
    ></v-data-table>
  </v-card>
</template>

<script>
import api from "../api";
import UserDialog from "@/components/UserDialog";
import router from "@/router";

import { MessageServiceClient } from "../message_grpc_web_pb";
import { Message, Empty } from "../message_pb";
const client = new MessageServiceClient("http://0.0.0.0:50051", null, null);
import Vue from "vue";

//import grpcs from "../../dynamic_codegen/greeter_server"

function sendMessage(msg, to) {
  const strRq = new Message();
  strRq.setFrom(Vue.prototype.$logged);
  strRq.setTo(to);
  strRq.setMessage(msg);

  client.sendMsg(strRq, null, (err, response) => {
    console.log(response);
  });
}

export default {
  props: {
    value2: { default: "" },
    value: { default: "" },
    placeholder: { default: "" },
    msg: { default: "" },
    to: { default: "" },
    ids: { default: "" },
  },
  name: "ItemList",
  components: { UserDialog },
  data() {
    return {
      items2: [],
      headers2: [
        {
          text: "Messages",
          align: "start",
          sortable: false,
          value: "name",
        },
      ],
      items: [],
      search: "",
      headers: [
        {
          text: "Username",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Email", value: "email" },
        { text: "Roles", value: "roles" },
      ],
      dialogVisible: false,
      selectedItem: {},
    };
  },
  methods: {
    editItem(item) {
      this.selectedItem = item;
      this.dialogVisible = true;
    },
    sendmsg() {
      sendMessage(this.msg, this.to);
      console.log("hoho");
      console.log(Vue.prototype.$logged);
    },
    addItem() {
      this.dialogVisible = true;
    },
    devices() {
      router.push("/users/devices");
    },
    async refreshList() {
      this.dialogVisible = false;
      this.selectedItem = {};
      this.items = await api.users.allUsers();
      console.log(this.items);
    },
  },
  created() {
    this.refreshList();
    this.ids = Vue.prototype.$logged;

    var chatStream = client.receiveMsg(new Empty(), {});
    chatStream.on("data", (response) => {
      //}
      if (response.getFrom() === Vue.prototype.$logged) {
        this.items2.push({ name: "Me: " + response.getMessage() });
      }
      if (response.getTo() === Vue.prototype.$logged) {
        this.items2.push({
          name: response.getFrom() + ": " + response.getMessage(),
        });
      }
      console.log(response.getMessage());
      console.log("damn");
      console.log(response);
    });

    chatStream.on("status", function (status) {
      console.log("stream:", status.code, status.details, status.metadata);
    });

    chatStream.on("end", () => {
      console.log("Stream ended.");
    });
  },
};
</script>

<style scoped></style>

<template>
  <section class="header-wrapper">
    <v-toolbar class="white">
      <v-toolbar-title @click="goToMain" class="logo">
        <span class="blue--text lighten-2">KPI</span>
        <span class="font-weight-bold">bot</span>
      </v-toolbar-title>
      <v-toolbar-items v-if="userAuth">
        <div class="header-content">
          <div class="username pr-3">{{ getUsername }}</div>
          <div class="avatar">
            <img :src="getUserAvatar" alt>
          </div>
          <div class="ml-3 control" @click="logOut">
            <span class="blue--text lighten-2">Выйти</span>
          </div>
        </div>
      </v-toolbar-items>
    </v-toolbar>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import { MODE, USER_KEY_FIELD } from "../../../config/global.js";
import MOCK_USER from "../../../config/mockUser.js";

export default {
  name: "Header",
  methods: {
    goToMain() {
      this.$router.push("/");
    },
    logOut() {
      this.$store.commit("deleteCurrentUser");
      this.$router.push({ name: "Main" });
      localStorage.clear();
    }
  },
  computed: {
    ...mapState(["currentUser"]),
    ...mapGetters(["userAuth"]),
    getUsername() {
      return this.currentUser.username || "";
    },
    getUserAvatar() {
      return this.currentUser.photo_url || "";
    }
  },
  mounted() {
    const user =
      process.env.NODE_ENV === MODE.DEV
        ? MOCK_USER
        : JSON.parse(localStorage.getItem(USER_KEY_FIELD));

    this.$store.commit("setCurrentUser", user);
  }
};
</script>

<style lang="scss" >
//  hack :c
.toolbar__content {
  justify-content: space-between;
}
</style>

<style lang="scss" scoped>
@import "../../assets/scss/styles/header.scss";
</style>

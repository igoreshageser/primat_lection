<template>
  <div ref="telegram"></div>
</template>

<script>
import { BOT_DOMEN } from "../../../.env";

import { USER_KEY_FIELD } from "../../../config/global.js";

import { getUser } from "../../api/auth";

export default {
  name: "TelegramLogin",
  methods: {
    onTelegramAuth(user) {
      this.authHanlder(user);
    },
    authHanlder(user) {
      getUser(user)
        .then(({ data }) => {
          if (data === 404) {
            this.$router.push({ name: "login" });
            this.saveUser(user);
          } else {
            this.saveUser({ ...data, ...user });
          }
        })
        .catch(err => console.log(err));
    },
    saveUser(userObj) {
      this.$store.commit("setCurrentUser", userObj);
      localStorage.setItem(USER_KEY_FIELD, JSON.stringify(userObj));
    }
  },
  mounted() {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?4";

    script.setAttribute("data-telegram-login", BOT_DOMEN);
    script.setAttribute("data-request-access", "write");

    window.onTelegramAuth = this.onTelegramAuth;
    script.setAttribute("data-onauth", "window.onTelegramAuth(user)");

    this.$refs.telegram.appendChild(script);
  }
};
</script>

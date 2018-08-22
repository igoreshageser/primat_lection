<template>
  <div ref="telegram"></div>
</template>

<script>
import { BOT_DOMEN } from '../../../.env'

import { getUser } from '../../api/auth'

export default {
  name: 'TelegramLogin',
  methods: {
    onTelegramAuth (user) {
      this.authHanlder(user)
    },
    authHanlder(user) {
      getUser(user)
        .then(data => {
          if (data === 404) {
            this.$router.push({ name: 'login' })
            this.saveUser(user)
          } else {
            console.log(data)
            const { _doc: botdata } = data;
            console.log(botdata)
            const userObj = { ..._doc , ...user }
            this.saveUser(userObj)
          }
        })
        .catch(err => console.log(err))
    },
    saveUser(userObj) {
      this.$store.commit('setCurrentUser', userObj)
      localStorage.setItem('user', JSON.stringify(userObj))
    }
  },
  mounted() {
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://telegram.org/js/telegram-widget.js?4'

    script.setAttribute('data-telegram-login', BOT_DOMEN)
    script.setAttribute('data-request-access', 'write')

    window.onTelegramAuth = this.onTelegramAuth
    script.setAttribute('data-onauth', 'window.onTelegramAuth(user)')

    this.$refs.telegram.appendChild(script)
  }
}
</script>

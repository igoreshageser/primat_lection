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
      console.log(user)
      const stringi = JSON.stringify(user)
      console.lof(stringi)
      this.saveUser(user)
      getUser(user)
        .then(data => {
          if (data === 'Not found') {
            this.$router.push({ name: 'login' })
          } else {
            const { _doc: botData } = data
            const userObj = { ...botData, ...user }
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

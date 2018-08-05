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
      this.saveUser(user)
    },
    saveUser(user) {
      // const { id } = user
      const id = 1212
      getUser(id)
        .then(data => {
          if (data === 'Not found') {
            this.$router.push({ name: 'user' })
          }
        })
        .catch(err => console.log(err))
      // this.$store.commit('setCurrentUser', user)
      // localStorage.setItem('user', JSON.stringify(user))
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

    // test
    this.saveUser()
  }
}
</script>

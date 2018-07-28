<template>
  <div ref="telegram"></div>
</template>

<script>
import { BOT_DOMEN } from '../../../.env'

export default {
  name: 'TelegramLogin',
  methods: {
    onTelegramAuth (user) {
      console.log(user)
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

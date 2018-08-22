<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Неполадочки
        </v-card-title>

        <v-card-text>
          Для того, чтобы пользоваться расписанием необходимо зарегистрироваться или авторизоваться
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="approveHandler"
          >
            ОК
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    toggleModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    approveHandler() {
      this.dialog = false
      this.$router.push({ name: 'Main' })
    }
  },
  watch: {
    toggleModal() {
      this.dialog = this.toggleModal
    }
  },
  mounted() {
    this.dialog = this.toggleModal
  }
}
</script>

<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline"
          :class="getHeaderStyle"
          primary-title>
          <slot name="header"></slot>
        </v-card-title>

        <v-card-text>
          <slot name="content"></slot>
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
    },
    mode: {
      type: String
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    getHeaderStyle() {
      const SUCCESS_MODE = 'green darken-2'
      const ERROR_MODE = 'red darken-3'
      const DEFAULT_MODE = 'blue-grey lighten-3'
      const { mode } = this

      switch (mode) {
        case 'success':
          return SUCCESS_MODE
        case 'error':
          return ERROR_MODE
        default:
          return DEFAULT_MODE
      }
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

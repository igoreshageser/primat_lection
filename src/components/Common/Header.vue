<template>
  <v-toolbar class="white">
    <v-toolbar-title @click="goToMain" class="logo">
      <span class="blue--text lighten-2 ">KPI</span>
      <span class="font-weight-bold">bot</span>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    goToMain() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  cursor: pointer;
}
</style>

<template>
  <section class="header-wrapper">
    <v-toolbar class="white">
      <v-toolbar-title @click="goToMain" class="logo">
        <span class="blue--text lighten-2 ">KPI</span>
        <span class="font-weight-bold">bot</span>
      </v-toolbar-title>
      <v-toolbar-items>
        <div class="header-content">
          <div class="username pr-3">
            igoreshageser
          </div>
          <div class="avatar">

          </div>
        </div>
      </v-toolbar-items>
    </v-toolbar>
  </section>
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
.header {
  &-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      cursor: pointer;
    }
  }
  &-content {
    display: flex;
    align-items: center;
    .avatar {
      width: 40px;
      height: 40px;
      background-color: blue;
    }
  }
}
</style>

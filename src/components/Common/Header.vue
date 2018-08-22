<template>
  <section class="header-wrapper">
    <v-toolbar class="white">
      <v-toolbar-title @click="goToMain" class="logo">
        <span class="blue--text lighten-2 ">KPI</span>
        <span class="font-weight-bold">bot</span>
      </v-toolbar-title>
      <v-toolbar-items v-if="userAuth">
        <div class="header-content">
          <div class="username pr-3">
            {{ getUsername }}
          </div>
          <div class="avatar ">
            <img :src="getUserAvatar" alt="">
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
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Header',
  methods: {
    goToMain() {
      this.$router.push('/')
    },
    logOut () {
      this.$store.commit('deleteCurrentUser')
      this.$router.push({ name: 'Main' })
      localStorage.clear()
    }
  },
  computed: {
    ...mapState(['currentUser']),
    ...mapGetters(['userAuth']),
    getUsername() {
      if (this.currentUser.username) {
        return this.currentUser.username
      }
      return ''
    },
    getUserAvatar() {
      if (this.currentUser.photo_url) {
        return this.currentUser.photo_url
      }
      return ''
    }
  },
  mounted() {
    const user = localStorage.getItem('user')
    this.$store.commit('setCurrentUser', JSON.parse(user))
  }
}
</script>

<style lang="scss" >
//  hack :c
.toolbar__content {
  justify-content: space-between;
}
</style>

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
    }
    .control {
      cursor: pointer;
    }
  }
}
</style>

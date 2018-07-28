<template>
  <div id="app">
   <v-app light>
    <v-content>
      <section>
        <v-parallax :src="getImg" height="600">
          <v-layout
            id="layout-wrapper"
            column
            align-center
            justify-center
            class="white--text"
          >
            <img src="../assets/img/logo.png" alt="logo" height="400">
            <div class="subheading mb-3 text-xs-center">Все твои лекции в одном месте</div>
            <div id="iframe-wrapper" class="mt-5">
              <TelegramLogin v-if="!userAuth" />
            </div>
            <!-- <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              @click="authUser"
            >
              Авторизоваться
            </v-btn> -->
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">
               Учиться, учиться и еще раз учиться
              </h2>
              <span class="subheading">
                Ребята, а палево есть?
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4 class="card-item" @click="goTo('/schedule')">
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">schedule</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Актуальное раписание</div>
                    </v-card-title>
                    <v-card-text >
                      Всегда можно узнать где и какая пара будет следующей.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4 class="card-item">
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">book</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Лекции</div>
                    </v-card-title>
                    <v-card-text>
                     Читай и сохраняй лекции прямо в телефоне. Главное - самому не забывать их добавлять.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4 class="card-item">
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">code</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">В разработке :)</div>
                    </v-card-title>
                    <v-card-text>
                     Еще работаем над некоторыми фичами.
                     Скоро выкатим.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>
    </v-content>
  </v-app>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TelegramLogin from '../components/Main/TelegramLogin'

export default {
  name: 'Main',
  components: {
    TelegramLogin
  },
  methods: {
    goTo(url) {
      this.$router.push({ path: url })
    }
  },
  computed: {
    ...mapGetters(['userAuth']),
    getImg() {
      return require('@/assets/img/blueparallax.jpg')
    }
  }
}
</script>

<style lang="scss">
.send-mail {
  cursor: pointer;
}

.card-item {
  cursor: pointer;
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 1px rgba(39, 44, 49, 0.1), 0 3px 16px rgba(39, 44, 49, 0.07);
    transition: all 0.3s ease;
    transform: translate3D(0, -1px, 0);
  }
}
</style>

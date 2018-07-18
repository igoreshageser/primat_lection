<template>
    <div id="app">
   <v-app light>
    <v-toolbar class="white">
      <v-toolbar-title>
        <span class="blue--text lighten-2 ">KPI</span>
        <span class="font-weight-bold">bot</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <section>
        <v-parallax :src="getImg('blueparallax.jpg')" height="600">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <img src="../assets/img/logo.png" alt="logo" height="400">
            <!-- <h1 class="white--text mb-2 display-1 text-xs-center">Parallax Template</h1> -->
            <div class="subheading mb-3 text-xs-center">Все твои лекции в одном месте</div>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
            >
              Авторизоваться
            </v-btn>
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
               Учиться, учиться и учиться
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

      <v-footer class="blue darken-2" height="auto">
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs6>
                <div class="white--text ml-3">
                  По всем вопросам и предложениям писать сюда
                  <a href="https://t.me/Fowi3" target="_blank">
                    <v-icon class="white--text send-mail">mail</v-icon>
                  </a>
                </div>
              </v-flex>
              <v-flex xs6>
                <div class="white--text ml-3 text-sm-right">
                  Сделано с
                  <v-icon class="red--text">favorite</v-icon>
                  KPIbot-team 2018
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-footer>

    </v-content>
  </v-app>
 </div>
</template>

<script>
export default {
  methods: {
    getImg(img) {
      return require(`@/assets/img/${img}`)
    },
    goTo(url) {
      this.$router.push({ path: url })
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

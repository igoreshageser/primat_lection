<template>
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
</template>

<script>
export default {
  name: "Footer"
};
</script>

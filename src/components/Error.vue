<template>
   <v-app light>
   <Header />
    <v-content>
      <section>
        <v-parallax>
          <v-layout
            column
            align-center
            justify-center
            class="blue--text lighten-2 mt-5"
          >
          <div class="display-4 mb-3 text-xs-center">404</div>
          </v-layout>
        </v-parallax>
      </section>
    </v-content>
    <Footer />
   </v-app>
</template>

<script>
import Header from './Common/Header'
import Footer from './Common/Footer'

export default {
  name: 'ErrorPage',
  components: {
    Header,
    Footer
  }
}
</script>

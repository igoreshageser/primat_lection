<template>
  <div id="app">
    <v-app>
      <Header />
      <router-view/>
      <Footer />
    </v-app>
  </div>
</template>

<script>
import Header from './components/Common/Header'
import Footer from './components/Common/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
body {
  overflow-x: auto;
}
</style>

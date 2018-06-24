import Vue from 'vue'
import Router from 'vue-router'
import Promo from '@/components/Promo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Promo',
      component: Promo
    }
  ]
})

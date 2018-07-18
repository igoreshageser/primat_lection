import Vue from 'vue'
import Router from 'vue-router'
import Promo from '@/components/Promo'
import Schedule from '@/components/Schedule'
import Main from '@/components/Main'
import Test from '@/components/newMain'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/lections',
      name: 'lections',
      component: Promo
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})

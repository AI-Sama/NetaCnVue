import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import AddNetaPage from '@/components/AddNetaPage'
import ShowPage from '@/components/ShowPage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/AddNetaPage',
      name: 'AddNetaPage',
      component: AddNetaPage
    }
    ,
    {
      path: '/ShowPage',
      name: 'ShowPage',
      component: ShowPage
    }
  ]
})

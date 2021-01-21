import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import AddNetaPage from '@/components/AddNetaPage'
import ShowPage from '@/components/ShowPage'
import UserInfoPage from '@/components/UserInfoPage'
import JudgeNetaPage from '@/components/JudgeNetaPage'
import UserManage from '@/components/UserManage'
import LabelPage from '@/components/LabelPage'
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
    },
    {
      path: '/UserInfoPage',
      name: 'UserInfoPage',
      component: UserInfoPage
    },
    {
      path: '/JudgeNetaPage',
      name: 'JudgeNetaPage',
      component: JudgeNetaPage
    },
    {
      path: '/UserManage',
      name: 'UserManage',
      component: UserManage
    },
    {
      path: '/LabelPage',
      name: 'LabelPage',
      component: LabelPage
    }
  ]
})

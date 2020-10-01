import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from "../views/Home.vue";
import NotFoundPage from "../views/NotFoundPage";
import Main from "../views/Main";
import Conference from "../views/Conference";
import Hosting from "../views/Hosting";
import Participate from "../views/Participate";
Vue.use(VueRouter);

export default new VueRouter({
  mode:'history',
  routes:[
    {
      path:'/login',
      component:Login
    },
    {
      path:'/',
      component: Home
    },
    {
      path:'/main',
      component: Main
    },
    {
      path:'/conference',
      component: Conference
    },
    {
      path:'/hosting',
      component: Hosting
    },
    {
      path:'/participate',
      component: Participate
    },
    {
      path:'*',
      component: NotFoundPage
    }
  ]
});

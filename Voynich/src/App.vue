<template>
  <div id="app">
    <TopNav></TopNav>
    <router-view></router-view>
    <left-nav v-if="$store.state.user"> </left-nav>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import TopNav from './components/TopNav.vue';
import BottomNav from "./components/BottomNav.vue";

export default {
  name: 'App',
  mounted(){
  },
  data(){
  },
  components: {
    TopNav,
    BottomNav
  }
}
</script>

<style>

</style>

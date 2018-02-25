<template>
  <div id="app">
    <!--左侧导航-->
    <left-nav ref="orderList"></left-nav>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import LeftNav from '@/components/common/LeftNav';

  export default {
    name: 'App',
    components: {
      LeftNav
    },
    data () {
      return {}
    },
    mounted(){
      // let windowHeight = document.body.clientHeight;
      // console.log(document.body.clientHeight);
    }
  }
</script>

<style>
  html,body{
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    height: 100%;
  }

  .main {
    float: left;
    width: 95%;
    background-color: #EFF2F7;
    height: 100%;
    overflow: hidden;

  }
</style>

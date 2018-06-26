<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import url('/styles/base.css');

  #app {
    font-family: Microsoft Yahei,Arial, Sans-Serif, Helvetica,'Avenir';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>

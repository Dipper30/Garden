<template>
  <div id="main">
    <router-view></router-view>
  </div>
</template>
<script>
// import SideNav from './SideNav'

export default {
  name: 'Main',
  components: {
    // SideNav
  }
}
</script>
<style lang="scss">
#main {
  width: 100vw;
  /* display: flex; */
  /* flex-direction: row; */
  height: 100%;
}
#side {
  height: 100%;
  background-color: #fb7299;
}
</style>

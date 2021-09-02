<template>
  <div id="home">
    <Header @goLogIn="goLogIn" />
    <SideNav @onMenuSelected="onMenuSelected" />
    <div class="content">
      <div v-if="menuIndex==1" ><ClockPage /></div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/common/Header.vue'
import SideNav from '../../components/common/SideNav.vue'
import ClockPage from '../../components/ClockPage.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
  components: {
    Header,
    SideNav,
    ClockPage
  },
  setup () {
    const $route = useRouter()
    const menuIndex = ref(0)
    const goLogIn = () => {
      $route.push('/login')
    }
    const onMenuSelected = (index) => {
      // index: 1-clock 2-community 3-partners 4-feedback
      console.log('select', index)
      menuIndex.value = index
    }
    return {
      goLogIn,
      onMenuSelected,
      menuIndex
    }
  }
}
</script>

<style lang="scss" scoped>
#header {
  display: flex;
}
#home {
  .content {
  margin-left: 200px;
  /* height: 100%; */
  min-height: calc(100vh - 130px);
  min-width: calc(100vw - 250px);
  /* box-shadow: 0px 0px 100px 10px rgb(0 0 0 / 20%); */
}
}
</style>

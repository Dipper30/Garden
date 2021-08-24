<template>
  <div id="header">
    <div class="cover" id="cover"></div>
    <div class="logo">
      <div class="img"></div>
    </div>
    <div class="middle" id="search">
      <div class="slogan"> {{ $t("home.slogan") }}  </div>
      <div class="search">
        <SearchBox />
      </div>
    </div>
    <div class="info">
      <div class="profile"></div>
      <div class="options" @click="goLogIn">
        1
        <div class="message"></div>
        <div class="contact"></div>
        <div class="language"></div>
      </div>
    </div>
  </div>
</template>
<script>
// import { NButton, NInput, NInputGroup, NIcon } from 'naive-ui'
// import { CashOutline as CashIcon } from '@vicons/ionicons5'
import SearchBox from '../common-element/SearchBox.vue'

export default {
  name: 'Header',
  components: {
    SearchBox
  },
  setup (props, { emit }) {
    const goLogIn = () => {
      emit('goLogIn')
    }
    return {
      goLogIn
    }
  }
}
</script>
<style lang="scss">
#header {
  height: 100px;
  background-color: $dark-grey;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .cover {
    top: 0;
    left: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgb(0,0,0,0.4);
    display: none;
    z-index: 1000;
  }
  .logo {
    padding: 5px 20px;
    width: max(30vw, 300px);
    .img {
      background: url('../../images/pitt-panther-logo.png') no-repeat;
      height: 90px;
      background-size: 240px 90px;
    }
  }
  .middle {
    width: 40vw;
    display: flex;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .slogan {
      font-size: 26px;
      font-weight: 500;
    }
    /* margin: 0 auto; */
    .n-input-group {
      display: inline-block;
      margin-top: 10px;
    }
  }
  .info {
    width: max(30vw, 300px);
    height: 100px;
  }
}
</style>

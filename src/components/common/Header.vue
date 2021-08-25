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
      <div class="profile">
        <div class="avatar" :class="{'hover-avatar': hover}" @mouseover="onMouseOver('avatar')" @mouseleave="onMouseLeave('avatar')"></div>
        <div class="board" id="board" @mouseover="onMouseOver('board')" @mouseleave="onMouseLeave('board')">
          <div class="name">{{ user.name }}</div>
        </div>
      </div>
      <div class="options">
        <div class="message">
          <n-icon size="20">
            <msg />
          </n-icon>
          {{ $t("home.options.message") }}
        </div>
        <div class="feedback">
          <n-icon size="20">
            <feedback />
          </n-icon>
          {{ $t("home.options.feedback") }}
        </div>
        <div class="publish">
          <n-icon size="20">
            <publish />
          </n-icon>
          {{ $t("home.options.publish") }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { NButton, NInput, NInputGroup, NIcon } from 'naive-ui'
// import { CashOutline as CashIcon } from '@vicons/ionicons5'
import SearchBox from '../common-element/SearchBox.vue'
import { NIcon } from 'naive-ui'
import { ChatboxEllipsesOutline as Msg, Help as Feedback, PaperPlaneSharp as Publish } from '@vicons/ionicons5'
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Header',
  components: {
    SearchBox,
    NIcon,
    Msg,
    Feedback,
    Publish
  },
  setup (props, { emit }) {
    const hover = ref(false)
    const $store = useStore()
    // const hideBoard = ref(true)
    const isHovering = reactive({
      avatar: false,
      board: false
    })
    const goLogIn = () => {
      emit('goLogIn')
    }
    const onMouseOver = section => {
      isHovering[section] = true
      showBoard()
    }
    const onMouseLeave = section => {
      // let onMouseOver excute first
      setTimeout(() => {
        if (section === 'avatar' && isHovering.board === false) hideBoard()
        else if (section === 'board' && isHovering.avatar === false) hideBoard()
        isHovering[section] = false
        clearTimeout()
      }, 0)
    }
    const showBoard = () => {
      document.getElementById('board').style.display = 'block'
      hover.value = true
    }
    const hideBoard = () => {
      document.getElementById('board').style.display = 'none'
      hover.value = false
    }
    const user = JSON.parse($store.getters.getUser)
    return {
      goLogIn,
      onMouseOver,
      onMouseLeave,
      hover,
      user,
      isHovering
    }
  }
}
</script>
<style lang="scss">
#header {
  height: 130px;
  /* background-color: $dark-grey; */
  background: url('../../images/home-bg3.jpg') no-repeat;
  background-size: max(1200px, 100vw) 250px;
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
  @media screen and (max-width: 1000px) {
    .middle {
      display: none;
    }
  }

  @media screen and (min-width: 1001px) {
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
  }
  .info {
    width: max(30vw, 450px);
    height: 100px;
    position: relative;
    .profile {
      position: absolute;
      width: 100px;
      height: 100px;
      .avatar {
        background: url('../../images/haibara/default-avatar3.jpg') no-repeat;
        position: absolute;
        z-index: 100;
        height: 50px;
        width: 50px;
        background-size: 100% 100%;
        border-radius: 50%;
        transition: 0.1s linear;
        cursor: pointer;
      }
      .hover-avatar {
        height: 70px;
        width: 70px;
      }
      .board {
        display: none;
        position: absolute;
        height: 199px;
        width: 180px;
        left: -56px;
        top: 34px;
        background: #fff;
        color: $super-dark-grey;
        padding-top: 40px;
        border-radius: 5px;
      }
    }
    .options {
      position: absolute;
      right: 0;
      width: 300px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-right: 40px;
      padding-left: 40px;
      cursor: pointer;
      .n-icon svg {
        transform: translateY(5px);
      }
      .message, .publish, .feedback {
        line-height: 35px;
        padding: 0 10px 0 8px;
        height: 35px;
        /* background-color: $dark-grey; */
        /* color: #fff; */
        border-radius: 5px;
        color: darkslategrey;
      }
      .message:hover, .feedback:hover {
        color: #fff;
        background-color: $dark-grey;
      }
      .publish:hover {
        color: #fff;
        background-color: $pink;
      }
    }
  }
}
</style>

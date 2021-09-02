<template>
  <div>
    <div v-if="!clock">啊 哦</div>
    <div v-else class="clock-panel">
      <div class="header">
        <div class="title"><span class="clock-title">{{ clock.title }}</span></div>
        <div class="options"></div>
      </div>
      <div class="content">
        <div class="txt">还有</div>
        <div class="count-down">
          {{ countdown.days }}
          天
          {{ countdown.hours }}
          时
          {{ countdown.minutes }}
          分
          {{ countdown.seconds }}
          秒
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '../i18n'
import { ref, computed, watch } from 'vue'
import { calcTimeDifference } from '../utils/tools.js'

export default {
  props: {
    clock: Object,
    default: null
  },
  setup (props, context) {
    const countdown = ref({})
    const locale = computed(() => i18n.global.locale)
    // const { countdown } = toRefs(props)
    // const countdown = props.countdown
    watch(() => props.clock, (val) => {
      if (val) calcTime()
    })
    const calcTime = () => {
      if (window.t) clearInterval(window.t)
      countdown.value = calcTimeDifference(props.clock.set_time)
      window.t = setInterval(() => {
        countdown.value = calcTimeDifference(props.clock.set_time)
        console.log(countdown.value)
      }, 1000)
    }
    return {
      locale,
      countdown,
      calcTime
    }
  },
  beforeUnmount () {
    clearInterval(window.t)
  }
}
</script>

<style lang="scss">
.clock-panel {
  width: 500px;
  margin: 0 auto;
  height: 260px;
  box-shadow: 0 0 10px 10px rgba(33,33,33,0.2);
  border-radius: 10px;
  color: #fff;
  border-radius: 10px;
  .header {
    border-radius: 10px 10px 0 0;
    text-align: center;
    line-height: 50px;
    height: 50px;
    background-color: $super-dark-grey;
    font-size: 30px;
    font-weight: 800;
    padding: 10px 20px;
    color: #fff;
  }
  .content {
    background-color: $super-light-grey;
    width: 500px;
    height: 210px;
    color: $dark-grey;
    .txt {
      text-align: left;
    }
  }
}
</style>

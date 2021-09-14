<template>
  <div>
    <div v-if="!clock">
      <n-empty :description="$t('clock.panel.emptyTxt')">
        <template #icon>
          <n-icon>
            <airplane />
          </n-icon>
        </template>
        <template #extra>
          <d-button>{{ $t("clock.panel.emptyExtra") }}</d-button>
        </template>
      </n-empty>
    </div>
    <div v-else class="clock-panel">
      <div class="header">
        <div class="title"><span class="clock-title">{{ clock.title }}</span></div>
        <div class="options"></div>
      </div>
      <div class="content">
        <div class="count-down">
          <div class="days">
            <span v-if="locale==='zh_cn'" class="cn-txt txt">{{isFutre ? '还有' : '已过去'}}</span>
            {{ $t("clock.panel.countdownDays", { days: countdown['days'] }) }}
            <span v-if="locale==='en'" class="en-txt txt">{{isFutre ? 'To Go' : 'Past'}}</span>
          </div>
          <div class="details">
            {{ $t("clock.panel.countdownDetail", { hours: countdown['hours'], minutes: countdown['minutes'], seconds: countdown['seconds'] }) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '../i18n'
import { ref, computed, watch } from 'vue'
import { calcTimeDifference, calcDate } from '../utils/tools.js'
import { NEmpty, NIcon } from 'naive-ui'
import DButton from './common-element/DButton.vue'
import { Airplane } from '@vicons/ionicons5'
import moment from 'moment'

export default {
  props: {
    clock: Object
  },
  components: {
    NEmpty,
    NIcon,
    Airplane,
    DButton
  },
  setup (props, context) {
    const countdown = ref('')
    const date = ref({})
    const locale = computed(() => i18n.global.locale)
    const isFutre = computed(() => Boolean(props.clock?.set_time > moment().unix()))
    // const { countdown } = toRefs(props)
    // const countdown = props.countdown
    watch(() => props.clock, (val) => {
      if (val) {
        calcTime()
        date.value = calcDate(val.set_time)
      }
    })
    const calcTime = () => {
      if (window.t) clearInterval(window.t)
      countdown.value = calcTimeDifference(props.clock.set_time)
      window.t = setInterval(() => {
        countdown.value = calcTimeDifference(props.clock.set_time)
      }, 1000)
    }
    return {
      locale,
      countdown,
      calcTime,
      isFutre,
      date
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
    .count-down{
      .days {
        position: relative;
        font-size: 36px;
        font-weight: bold;
        padding-top: 40px;
        .txt {
          position: absolute;
          padding: 20px 40px;
          font-size: 20px;
          font-weight: 300;
          transform: translateY(-5px);
        }
        .cn-txt {
          left: 80px;
        }
      }
      .details {
        margin-top: 50px;
        font-size: 20px;
        font-weight: 400;
      }
    }
  }
}
</style>

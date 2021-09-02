<template>
  <div class="clock-page">
    <div class="header">
      共有一条记录
    </div>
    <div class="options">
      <d-button>
        添加
      </d-button>
    </div>
    <div class="clock-board">
      <div class="left-part">
        <div class="future-list-board">
          <div class="future-title">值得期待的日子</div>
          <div class="future" @click="onSelectFuture">
            <ClockItem v-for="(item, index) in future" :key="index" :clockItem="item"
            :data-item="JSON.stringify(item)" :selected="selectedIndex==index && selectedFuture" :data-index="index" />
          </div>
        </div>
        <div class="past-list-board">
          <div class="past-title">一些怀念</div>
          <div class="past" @click="onSelectPast">
          <ClockItem v-for="(item, index) in past" :key="index" :clockItem="item"
          :data-item="JSON.stringify(item)" :selected="selectedIndex==index && !selectedFuture" :data-index="index" />
        </div>
        </div>
      </div>
      <div class="display-board"><ClockPanel :clock="selectedItem.clock" /></div>
    </div>
  </div>
</template>

<script>
import DButton from './common-element/DButton.vue'
import ClockPanel from './ClockPanel.vue'
import ClockItem from './ClockItem.vue'
import { clocks as mockData } from '../views/home/clock-mock.js'
import { ref, reactive } from 'vue'
// import { NIcon } from 'naive-ui'
// import { AddCircle16Regular as Add } from '@vicons/fluent'
// import { Language } from '@vicons/ionicons5'

export default {
  components: {
    ClockPanel,
    ClockItem,
    // NIcon,
    DButton
  },
  setup () {
    const selectedIndex = ref(0)
    const selectedItem = reactive({
      clock: null
    })
    const selectedFuture = ref(true)
    const { future, past } = mockData
    const onSelectFuture = (e) => {
      // if select an empty target, remain unchanged
      const { index, item } = e.target.dataset
      if (!index) return
      selectedFuture.value = true
      selectedItem.clock = JSON.parse(item)
      selectedIndex.value = index
    }
    const onSelectPast = (e) => {
      // if select an empty target, remain unchanged
      const { index, item } = e.target.dataset
      if (!index) return
      selectedFuture.value = false
      selectedItem.clock = JSON.parse(item)
      selectedIndex.value = index
    }
    return {
      countdown: {
        set_time: 123456789,
        title: '圣诞节',
        desc: '我的圣诞节'
      },
      future,
      past,
      onSelectFuture,
      onSelectPast,
      selectedIndex,
      selectedItem,
      selectedFuture
    }
  }
}
</script>

<style lang="scss" scoped>
.clock-page {
  padding: 40px;
  .header {
    color: $super-dark-grey;
  }
  .clock-board {
    display: flex;
    flex-direction: row;
    .left-part {
      width: 500px;
      height: 880px;
      display: flex;
      flex-direction: column;
      .future-list-board, .past-list-board {
        width: 500px;
        height: 400px;
        border-radius: 10px;
        background: $super-light-grey;
        /* border: 1px solid #333; */
        box-shadow: 0 0 10px 10px rgb(0, 0, 0, 0.3);
        margin-bottom: 40px;
        z-index: 0;
        .future-title, .past-title {
          background: $super-dark-grey;
          padding: 5px 0;
          border-radius: 10px 10px 0 0;
          color: #fff;
          font-size: 26px;
          font-weight: 600;
        }
        .future, .past {
          height: 320px;
          overflow: scroll;
          margin-top: 20px;
        }
      }
    }
    .display-board {
      width: 600px;
      height: 880px;
    }
  }
}
</style>

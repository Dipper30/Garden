<template>
  <div class="clock-page">
    <d-modal :show="showCreateModal"
      @onCloseModal="onCloseModal"
      :title="$t('modal.clock.clockModalTitle')"
      @onConfirm="createClock"
      @onCancel="onCloseModal"
      :confirm="$t('modal.clock.confirm')">
      <template v-slot:content>
        <div class="modal-content">
          <div class="row">
            <div class="label">{{ $t('modal.clock.titleLabel') }}</div>
            <div class="input">
              <n-input v-model:value="clockTitle" type="text" maxlength="10" :placeholder="$t('modal.clock.titlePl')" />
            </div>
          </div>
          <div class="row">
            <div class="label">{{ $t('modal.clock.dateLabel') }}</div>
            <div class="input"><n-date-picker v-model:value="clockTimeStamp" type="datetime" clearable /></div>
          </div>
          <div class="row">
            <div class="label">{{ $t('modal.clock.descLabel') }}</div>
            <div class="input">
              <n-input
                v-model:value="clockDesc"
                type="textarea"
                :placeholder="$t('modal.clock.descPl')"
              />
            </div>
          </div>
        </div>
      </template>
    </d-modal>
    <div class="clock-board">
      <div class="left-part">
        <div class="future-list-board">
          <div class="future-title">{{ $t('clock.futureTitle') }}</div>
          <div class="future" @click="onSelectFuture">
            <ClockItem v-for="(item, index) in clocks.future" :key="index" :clockItem="item"
            :data-item="JSON.stringify(item)" :selected="selectedIndex==index && selectedFuture" :data-index="index" />
          </div>
        </div>
        <div class="past-list-board">
          <div class="past-title">{{ $t('clock.pastTitle') }}</div>
          <div class="past" @click="onSelectPast">
          <ClockItem v-for="(item, index) in clocks.past" :key="index" :clockItem="item"
          :data-item="JSON.stringify(item)" :selected="selectedIndex==index && !selectedFuture" :data-index="index" />
        </div>
        </div>
      </div>
      <div class="right-part">
        <div class="options">
          <div class="row board">
            <div class="board-txt">{{ $t('clock.displayBoard') }}</div>
            <d-button class="create-btn" @click="onCreateClock">
              {{ $t('clock.createClock') }}
            </d-button>
          </div>
          <div class="row more" v-if="selectedItem.clock">
            <div class="delete" @click="deleteClock">
              <n-icon class="icon" size="20">
                <delete />
              </n-icon>
            </div>
          </div>
        </div>
        <div class="display-board"><ClockPanel :clock="selectedItem.clock" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import DButton from './common-element/DButton.vue'
import DModal from './common-element/DModal.vue'
import ClockPanel from './ClockPanel.vue'
import ClockItem from './ClockItem.vue'
// import { clocks as mockData } from '../views/home/clock-mock.js'
import { ref, reactive, computed, onMounted, toRefs } from 'vue'
import { NDatePicker, NInput, useMessage, NIcon } from 'naive-ui'
import { getStartOfDate, getCurrentUnixTS } from '../utils/tools.js'
import { createClock as createClockAPI, getClocksByUserID as getClocksByUserIDAPI, deleteClockByID, getClocksByUserID } from '../request/api.js'
import { useStore } from 'vuex'
import i18n from '../i18n'
import { Delete16Regular as Delete } from '@vicons/fluent'

export default {
  components: {
    ClockPanel,
    ClockItem,
    NIcon,
    DModal,
    NInput,
    DButton,
    NDatePicker,
    Delete
  },
  setup () {
    // 一些数据的初始化
    const selectedIndex = ref(-1)
    const showCreateModal = ref(false)
    const clockTitle = ref('')
    const clockDesc = ref('')
    const $message = useMessage()
    const $store = useStore()
    const $locale = computed(() => i18n.global.locale)
    const clockTimeStamp = ref(getStartOfDate())
    const selectedItem = reactive({
      clock: null
    })
    const clocks = reactive({total: 0, future: [], past: []})
    const selectedFuture = ref(true)
    // const future = computed((clocks) => clocks?.value?.future || [])
    // const past = computed((clocks) => clocks?.value?.past || [])
    const userID = $store.getters.getUserID
    const status = ref($store.getters.getStatus)
    console.log(userID+ '登录了吗？'+ status.value)

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
    const onCreateClock = () => {
      showCreateModal.value = true
    }
    const onCloseModal = () => {
      showCreateModal.value = false
    }

    const getClocksByUserID = async () => {
      if (status.value === 1) {
        const res = await getClocksByUserIDAPI({ user_id: userID, locale: getCurrentUnixTS() })
        clocks.future = res.future
        clocks.past = res.past
      }
    }

    // 创建新的clock
    const createClock = async () => {
      if (!clockTitle.value || !clockTimeStamp.value) {
        $message.warning(`${$locale.value === 'en' ? 'Title and Date cannot be empty.' : '请输入事件和时间'}`)
        return
      }
      if (!userID) {
        $message.warning(`${$locale.value === 'en' ? 'Please log in first~' : '请先登录哦~'}`)
        return
      }
      const params = {
        user_id: userID,
        title: clockTitle.value,
        desc: clockDesc.value,
        set_time: parseInt(new Date(clockTimeStamp.value).getTime() / 1000)
      }
      const res = await createClockAPI(params)
      console.log(params)
      if (res?.code === 201) {
        $message.success(`${$locale.value === 'en' ? 'New clock created!' : '创建成功！'}`)
      } else {
        $message.error(`${$locale.value === 'en' ? 'Oops, something went wrong...' : '好像哪里出错了...'}`)
      }
      onCloseModal()
      getClocksByUserID()
    }

    const deleteClock = async (e) => {
      const clockItem = selectedItem.clock
      const res = await deleteClockByID({clock_id: Number(clockItem.id)})
      if (res.code == 201) {
        $message.success(`${$locale.value === 'en' ? 'Deleted!!' : '已删除'}`)
      } else {
        $message.error(`${$locale.value === 'en' ? 'Oops, something went wrong...' : '好像哪里出错了...'}`)
      }
      selectedItem.clock = clocks?.future[0] || clocks?.past[0] || null
      getClocksByUserID()
    }

    onMounted(async () => {
      // read data of clocks
      await getClocksByUserID()
    })

    return {
      countdown: {
        set_time: 123456789,
        title: '圣诞节',
        desc: '我的圣诞节'
      },
      // future,
      // past,
      onSelectFuture,
      onSelectPast,
      selectedIndex,
      selectedItem,
      selectedFuture,
      showCreateModal,
      onCreateClock,
      onCloseModal,
      clockTimeStamp,
      clockDesc,
      clockTitle,
      createClock,
      deleteClock,
      clocks,
      status
    }
  }
}
</script>

<style lang="scss" scoped>
.clock-page {
  padding: 40px;
  .modal-content {
    width: 400px;
    height: 200px;
    padding: 30px;
    .row {
      display: flex;
      justify-content: space-around;
      min-height: 45px;
      width: 100%;
      align-items: flex-start;
      margin-top: 15px;
      .label {
        color: $super-dark-grey;
        width: 50px;
        flex: 1;
        font-size: 17px;
        font-weight: 500;
      }
      .input {
        width: 100px;
        flex: 3;
        margin-left: 30px;
        text-align: left;
      }
    }
  }
  .header {
    color: $super-dark-grey;
  }
  .clock-board {
    display: flex;
    flex-direction: row;
    .left-part {
      width: 500px;
      height: 660px;
      display: flex;
      flex-direction: column;
      .future-list-board, .past-list-board {
        width: 500px;
        height: 300px;
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
          height: 200px;
          overflow: scroll;
          margin-top: 20px;
        }
      }
    }
    .right-part {
      display: flex;
      flex-direction: column;
      .options {
        height: 100px;
        width: 600px;
        .row {
          margin: 0 auto;
          width: 500px;
          height: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .more {
          height: 30px;
          .delete {
            height: 25px;
            width: 25px;
            margin-left: auto;
            cursor: pointer;
            color: $pink;
            .icon {
              width: 20px;
              height: 20px;
            }
          }
        }
        .board {
          .board-txt {
            font-size: 23px;
            font-weight: 800;
            line-height: 50px;
          }
        }
      }
      .display-board {
        width: 600px;
        height: 880px;
      }
    }
  }
}
</style>

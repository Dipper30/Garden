<template>
  <div class="d-modal" v-if="show">
    <div class="mask" @click="onClickMask"></div>
    <div class="modal">
      <slot name="header">
        <div class="header">
          <div class="title">{{ title }}</div>
          <n-icon @click="onClose" class="close-icon">
            <close />
          </n-icon>
        </div>
      </slot>
      <slot name="content">
        <div class="content">
        </div>
      </slot>
      <slot name="footer">
        <div class="footer">
          <d-button @click="onCancel">{{ cancelTxt || $t('modal.cancel') }}</d-button>
          <d-button @click="onConfirm" :disabled="disableConfirm">{{ confirmTxt || $t('modal.confirm') }}</d-button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { Close } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import DButton from './DButton.vue'
import { ref, computed } from 'vue'

export default {
  name: 'DModal',
  components: {
    Close,
    NIcon,
    DButton
  },
  props: {
    title: {
      type: String,
      default: 'Na Na...'
    },
    show: {
      type: Boolean,
      default: false
    },
    closeOnMask: {
      type: Boolean,
      default: false
    },
    confirm: {
      type: String,
      default: ''
    },
    cancel: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // const modalTitle = computed((props) => {
    //   console.log(props)
    //   return props.title
    // })
    const cancelTxt = computed(() => props.cancel)
    const confirmTxt = computed(() => props.confirm)
    const disableConfirm = ref(false)
    const onClose = () => {
      disableConfirm.value = false
      emit('onCloseModal')
    }
    const onCancel = () => {
      disableConfirm.value = false
      emit('onCancel')
    }
    const onConfirm = () => {
      // 在回调之前暂时禁用
      disableConfirm.value = true
      emit('onConfirm')
    }
    const onClickMask = () => {
      if (props.closeOnMask) emit('onCloseModal')
    }
    return {
      onClose,
      onClickMask,
      onCancel,
      onConfirm,
      confirmTxt,
      cancelTxt,
      disableConfirm
    }
  }
}
</script>

<style lang="scss">
.d-modal {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  .mask {
    position: fixed;
    height: 100vh;
    width: 100vw;
    opacity: 0.9;
    background-image: url('../../images/haibara/haibara-bg2.jpeg');
    background-size: 100% 100%;
    /* filter: blur(10px); */
  }
  .mask:before {
    background-color: rgb(0,0,0,0.8);
  }
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    min-width: 100px;
    min-height: 100px;
    width: auto;
    height: auto;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .header {
      display: flex;
      background-color: $super-dark-grey;
      border-radius: 5px 5px 0 0;
      color: #fff;
      justify-content: space-between;
      align-items: center;
      padding: 8px 10px 8px 20px;
      font-size: 20px;
      font-weight: 600;
      .close-icon {
        cursor: pointer;
      }
    }
    .content {
      flex: 1;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:10px 30px 20px;
    }
  }
}
</style>

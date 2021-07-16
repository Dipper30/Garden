<template>
  <n-button class="normal">
    <slot></slot>
  </n-button>
</template>
<script>
import { computed } from 'vue'
import { NButton } from 'naive-ui'

export default {
  components: {
    NButton
  },
  props: {
    type: {
      default: 'normal',
      type: String
    },
    color: {
      default: 'black',
      type: String
    }
  },
  setup (props) {
    const buttonClass = computed(() => {
      let style = 'normal'
      switch (props.type) {
        case ('normal'):
          style = 'normal'
          break
        default:
          style = 'normal'
          break
      }
      return style
    })
    return {
      buttonClass
    }
  }
}
</script>
<style lang="scss">
.normal {
  color: #fff;
}
</style>

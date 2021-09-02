<template>
  <div class="d-button" :class="buttonClass">
    <slot></slot>
  </div>
</template>
<script>
import { computed } from 'vue'

export default {
  components: {
    // NButton
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
.d-button {
  border-radius: 5px;
  border: 1px #212121 solid;
  color: $dark-grey;
  padding: 3px 12px;
  background: transparent;
  width: fit-content;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: #fff;
    background: $dark-grey;
  }
  &:active {
    color: $super-dark-grey;
    background: #fff;
  }
  .n-icon svg {
    transform: translateY(5px);
  }
}
</style>

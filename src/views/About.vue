<template>
  <div class="about">
    <h1 class="desc">This is an about page</h1>
    <n-button>nButton</n-button>
  </div>
</template>
<script>
import { NButton } from 'naive-ui'

export default {
  components: {
    NButton
  },
  setup () {

  }
}
</script>
<style lang="scss" scoped>
.desc {
  color: $theme-color;
}
</style>

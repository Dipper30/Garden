<template>
  <div class="clock-panel">
    <div class="header">

      <div class="title">距离<span class="clock-title">圣诞节</span>还有</div>
    </div>
    <div class="count-down"></div>
  </div>
</template>

<script>
import i18n from '../i18n'
import { computed } from 'vue'

export default {
  setup () {
    const locale = computed(() => i18n.global.locale)
    console.log(locale)
    return {
      locale
    }
  }
}
</script>

<style lang="scss">
.clock-panel {
  width: 800px;
  margin: 0 auto;
  height: 300px;
  box-shadow: 0 0 10px 10px rgba(33,33,33,0.2);
  /* background-color: #e7e7e7; */
  margin-top: 20px;
}
</style>

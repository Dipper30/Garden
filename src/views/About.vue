<template>
  <div class="about">
    <h1 class="desc">This is an about page</h1>
    <n-button @click="switchLanguage">nButton</n-button>
    <div>{{ $t("login.say") }}</div>
  </div>
</template>
<script>
import { NButton } from 'naive-ui'
import store from '../store'
import i18n from '../i18n'

export default {
  components: {
    NButton
  },
  setup () {
    const switchLanguage = () => {
      console.log(store.state)
      const currentLang = i18n.global.locale
      i18n.global.locale = currentLang === 'zh_cn' ? 'en' : 'zh_cn'
      console.log(i18n)
    }

    return {
      switchLanguage
    }
  }
}
</script>
<style lang="scss" scoped>
.desc {
  color: $theme-color;
}
</style>

<template>
  <div class="search-box" @keydown.enter="onSearch">
    <input v-model="searchValue" :placeholder="plholder" @blur="onBlur" @focus="onFocus" type="text" class="input" />
    <div class="btn" @click="onSearch">
      <n-icon class="icon" size="20">
        <Search />
      </n-icon>
      {{ $t("home.search") }} </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import i18n from '../../i18n'
import { useNotification, NIcon } from 'naive-ui'
import { Search } from '@vicons/ionicons5'

export default {
  components: {
    Search,
    NIcon
  },
  setup () {
    const searchValue = ref(null)
    const locale = computed(() => i18n.global.locale)
    const plholder = computed(() => locale.value === 'zh_cn' ? '输入姓名/拼音/缩写' : 'Input names/pinyin/initials...')
    const notification = useNotification()

    const onSearch = () => {
      onBlur()
      notification.success({
        content: locale.value === 'zh_cn' ? '哈哈，这个功能还没做' : 'Oops, this function has not been implemented yet!',
        duration: 4000
      })
      console.log('onsearch', searchValue.value)
    }

    const onFocus = () => {
      document.getElementById('search').style.zIndex = 1001
      document.getElementById('cover').style.display = 'block'
    }

    const onBlur = () => {
      document.getElementById('search').style.zIndex = 1
      document.getElementById('cover').style.display = 'none'
    }

    return {
      searchValue,
      onSearch,
      onFocus,
      onBlur,
      locale,
      plholder
    }
  }
}
</script>

<style lang="scss">
.search-box {
  width: 400px;
  height: 30px;
  display: flex;
  z-index: 101;
  .input {
    width: 270px;
    height: 28px;
    border-radius: 10px 0 0 10px;
    outline-style: none;
    padding: 1px 10px;
    color: $dark-grey;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.1rem;
    border-width: 0;
  }
  .input:focus {
    border-color: $blue;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(41, 122, 243, 0.9);
    /* -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(231, 223, 114, 0.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(233, 213, 102, 0.6) */
  }
  .btn {
    min-width: 70px;
    height: 30px;
    border-radius: 0 10px 10px 0;
    background-color: $blue;
    color: #fff;
    padding: 0 10px;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    font-weight: 600;
    letter-spacing: 0.1rem;
    .icon {
      transform: translateY(4px);
    }
  }
  .btn:hover {
    cursor: pointer;
    /* background-color: $light-yellow; */
  }
  .btn:active {
    cursor: pointer;
    background-color: $light-yellow;
  }
}
</style>

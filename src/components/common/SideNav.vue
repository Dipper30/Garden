<template>
  <div id="side-nav">
    <div class="menu" @click="onMenuSelected">
      <div class="menu-item" data-index=1 :class="{'selected': selectedIndex === 1}">
        <n-icon class="icon" size="20">
          <clock />
        </n-icon>
        Days Matter
      </div>
    </div>
    <!-- {{ $t("home.options.feedback") }} -->
  </div>
</template>
<script>
import { NIcon } from 'naive-ui'
import { ref } from 'vue'
import { Clock24Regular as Clock } from '@vicons/fluent'

export default {
  name: 'SideNav',
  components: {
    Clock,
    NIcon
  },
  setup () {
    const selectedIndex = ref(0)

    const onMenuSelected = (e) => {
      console.log(e.target.dataset.index)
    }

    return {
      selectedIndex,
      onMenuSelected
    }
  }
}
</script>
<style lang="scss">
#side-nav {
  height: 400px;
  width: 200px;
  background-color: #fff;
  position: fixed;
  color: $super-dark-grey;
  left: 0;
  top: max(calc(50% - 200px), 130px);
  border: 1px solid #333;
  .menu-item {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    .icon {
      transform: translateY(4px);
    }
    padding: 5px 5px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.1rem;
  }
  .menu-item:hover {
    color: #fff;
    background-color: $dark-grey;
  }
  .selected {
    color: #fff;
    background-color: $dark-grey;
  }
}
</style>

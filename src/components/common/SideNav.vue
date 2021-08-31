<template>
  <div id="side-nav">
    <div class="menu" @click="onMenuSelected">
      <div class="menu-item" data-index=1 :class="{'selected': selectedIndex == 1}">
        <n-icon class="icon" size="20">
          <clock />
        </n-icon>
        {{ $t("home.menu.clock") }}
      </div>
      <div class="menu-item" data-index=2 :class="{'selected': selectedIndex == 2}">
        <n-icon class="icon" size="20">
          <community />
        </n-icon>
        {{ $t("home.menu.community") }}
      </div>
      <div class="menu-item" data-index=3 :class="{'selected': selectedIndex == 3}">
        <n-icon class="icon" size="20">
          <partner />
        </n-icon>
        {{ $t("home.menu.partners") }}
      </div>
      <div class="menu-item" data-index=4 :class="{'selected': selectedIndex == 4}">
        <n-icon class="icon" size="20">
          <feedback />
        </n-icon>
        {{ $t("home.menu.feedback") }}
      </div>
    </div>
    <!-- {{ $t("home.options.feedback") }} -->
  </div>
</template>
<script>
import { NIcon } from 'naive-ui'
import { ref } from 'vue'
import {
  Clock24Regular as Clock,
  ChatBubblesQuestion20Regular as Feedback,
  PeopleCheckmark20Regular as Partner
} from '@vicons/fluent'
import { AccessPoint as Community } from '@vicons/tabler'
// import { MENU } from '../../utils/enum.js'

export default {
  name: 'SideNav',
  components: {
    Clock,
    NIcon,
    Feedback,
    Partner,
    Community
  },
  setup (props, { emit }) {
    const selectedIndex = ref(0)

    const onMenuSelected = (e) => {
      selectedIndex.value = e.target.dataset.index || 0
      emit('onMenuSelected', e.target.dataset.index || 0)
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
  .menu-item {
    text-align: left;
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

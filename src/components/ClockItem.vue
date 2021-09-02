<template>
  <div class="clock-item" :class="{'selected': selected}">
    <div class="count-down-title">
      {{ clockItem.title }}
    </div>
    <div class="count-down-days">
      还有 {{countdown.days}} 天
    </div>
  </div>
</template>

<script>
import { calcTimeDifference } from '../utils/tools.js'

export default {
  props: {
    clockItem: Object,
    selected: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const countdown = calcTimeDifference(props.clockItem.set_time)
    console.log('countdown', countdown)
    return {
      countdown
    }
  }
}
</script>

<style lang="scss">
.clock-item {
  position: relative;
  width: 400px;
  height: 30px;
  line-height: 30px;
  color: $dark-grey;
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;
  background-color: #ddd;
  border-radius: 10px;
  margin: 20px auto;
  cursor: pointer;
  /* box-shadow: 0 0 3px 3px rgba(33,33,33,0.2); */
  .count-down-title {
    text-align: left;
  }
  &.selected {
    background-color: #fff;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 3%;
      right: 5%;
      bottom: 0;
      border-radius: 10px;
      background: hsl(45, 3%, 31%);
      transform: translate(3%, -25%) rotate(-3deg);
      transform-origin: center center;
      box-shadow: 0 0 10px 10px hsl(45, 3%, 31%);
      z-index: -1;
    }
  }
  &:hover::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 3%;
    right: 5%;
    bottom: 0;
    border-radius: 10px;
    background: hsl(45, 3%, 31%);
    transform: translate(3%, -25%) rotate(-3deg);
    transform-origin: center center;
    box-shadow: 0 0 10px 10px hsl(45, 3%, 31%);
    z-index: -1;
  }
}
</style>

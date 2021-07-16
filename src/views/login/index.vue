<template>
  <div class="login-wrap">
    <div class="side">
      <dp-button :type="normal">{{ $t("login.say",{name: "dipper"}) }}</dp-button>
    </div>
    <div class="content">
      login content
    </div>
  </div>
</template>
<script>
import { DpButton } from '../../components/common-element/DpButton'

export default {
  name: 'Login',
  components: {
    DpButton
  }
}
</script>
<style lang="scss">

#header, #side, #footer {
  display: none
}
.login-wrap {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.side {
  position: absolute;
  left: 0;
  height: 100vh;
  width: max(30vw, 400px);
  background-color: $dark-grey;
}
.content {
  padding-left: max(30vw, 400px);
}
</style>

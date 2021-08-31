<template>
  <div class="login-wrap">
    <div class="side">
      <div class="title" :class="{'normal-title': locale !== 'zh_cn'}" v-if="!swiped">
        {{ $t("login.welcome") }} PittLand !
      </div>
      <div class="title" :class="{'normal-title': locale !== 'zh_cn'}" v-else>
        {{ $t("login.join_us") }}
      </div>
      <div class="slider" @keydown.enter="enterClick">
        <div class="container" :class="{'register-page': swiped}">
          <!-- login form -->
          <div class="form login-form">
            <n-form
              :label-width="80"
              :model="loginFormValue"
              :rules="loginRules"
              ref="formRef"
              color="#666"
              show-label=false
            >
              <n-form-item :label="loginFormText.label_username" path="username">
                <n-input autofocus ref="loginInput" v-model:value="loginFormValue.username" :placeholder="loginFormText.plholder_username" />
              </n-form-item>
              <div class="divide" />
              <n-form-item :label="loginFormText.label_password" path="password">
                <n-input type="password" show-password-toggle :placeholder="loginFormText.plholder_password" v-model:value="loginFormValue.password" />
              </n-form-item>
              <div class="divide" />
            </n-form>
            <div class="options">
              <div class="left">
                <div class="text-btn forget" @click="switchLanguage">{{ $t("login.forget") }}</div>
                <div class="text-btn register" @click="goToRegister">{{ $t("login.go_register") }}</div>
              </div>
              <div class="right">
                <n-button :loading="loginLoading" color="#666" class="confirm-btn" @click="onLogIn">
                  {{ $t("login.login") }}
                </n-button>
              </div>
            </div>
            <div class="more">
              <div class="language" @click="switchLanguage">
                 <n-icon size="20" class="">
                  <language />
                </n-icon>
                {{ $t("login.language") }}
              </div>
              <div class="contact">
                {{ $t("login.contact") }} dddDipper30@gmail.com
              </div>
            </div>
          </div>
          <!-- login form ends -->
          <!-- register form -->
          <div class="form register-form">
            <n-form
              :label-width="80"
              :model="registerFormValue"
              :rules="registerRules"
              ref="formRef"
              color="#666"
              show-label=false
            >
              <n-form-item :label="registerFormText.label_username" path="username">
                <n-input ref="registerInput" v-model:value="registerFormValue.username" :placeholder="`${registerFormText.plholder_username}`" />
              </n-form-item>
              <div class="divide" />
              <n-form-item :label="registerFormText.label_password" path="password">
                <n-input type="password" show-password-toggle :placeholder="`${registerFormText.plholder_password}`" v-model:value="registerFormValue.password" :maxlength="20" />
              </n-form-item>
              <!-- check PASSWORD -->
              <n-form-item :label="registerFormText.label_check_password" path="check_password">
                <n-input type="password" :placeholder="`${registerFormText.plholder_check_password}`" v-model:value="checkPassword" :maxlength="20" />
              </n-form-item>
              <div class="divide" />
              <n-form-item :label="registerFormText.label_name">
                <n-input :placeholder="`${registerFormText.plholder_name}`" v-model:value="registerFormValue.name" />
              </n-form-item>
              <div class="divide" />
              <!-- school -->
              <n-form-item :label="registerFormText.label_school">
                <n-select
                  :placeholder="registerFormText.select"
                  :options="schoolOptions"
                  v-model:value="registerFormValue.school"
                />
              </n-form-item>
              <div class="divide" />
              <!-- grade -->
              <n-form-item :label="registerFormText.label_grade">
                <n-select
                  :placeholder="registerFormText.select"
                  :options="gradeOptions"
                  v-model:value="registerFormValue.grade"
                />
              </n-form-item>
            </n-form>
            <div class="options">
              <div class="left">
                <div class="text-btn return" @click="goToRegister"><pre html="<<<"></pre>{{ $t("login.return") }}</div>
              </div>
              <div class="right">
                <n-button :loading="registerLoading" color="#666" class="confirm-btn" @click="onRegister">
                  {{ $t("login.register") }}
                </n-button>
              </div>
            </div>
          </div>
          <!-- register form ends -->
          </div>
      </div>
    </div>
    <div class="content">

    </div>
  </div>
</template>
<script>
// import DButton from '../../components/common-element/DButton.vue'
import { NButton, NForm, NFormItem, NInput, NSelect, useNotification, NIcon } from 'naive-ui'
import i18n from '../../i18n'
import { ref, computed } from 'vue'
import { http } from '../../request/http'
import { register, login } from '../../request/api'
import { useRouter } from 'vue-router'
import { Language } from '@vicons/ionicons5'
import { useStore } from 'vuex'
import { switchLanguage } from '../../utils/tools.js'

// import { CashOutline as CashIcon } from '@vicons/ionicons5'

export default {
  name: 'Login',
  components: {
    NButton, NForm, NFormItem, NInput, NSelect, NIcon, Language
  },
  setup () {
    const notification = useNotification()
    const $route = useRouter()
    const swiped = ref(false)
    const locale = computed(() => i18n.global.locale)
    const checkPassword = ref('')
    const matchedPassword = ref(false)
    const loginLoading = ref(false)
    const registerLoading = ref(false)
    const registerInput = ref(null)
    const loginInput = ref(null)
    const $store = useStore()

    const loginRules = {
      username: [
        {
          required: true,
          validator: (rule, value) => {
            if (!value) return new Error('Required!')
            return true
          },
          trigger: ['input']
        }
      ],
      password: [
        {
          required: true,
          validator (rule, value) {
            if (!value) {
              return new Error('Required!')
            } else if (value.length < 6) {
              return new Error('Minimun 6 letters!')
            }
            return true
          },
          trigger: ['input']
        }
      ]
    }
    const registerRules = {
      username: [
        {
          required: true,
          validator: (rule, value) => {
            if (!value) return new Error(registerFormText.value.empty_username)
            return new Promise((resolve, reject) => {
              http.post('/checkAccount', {
                username: registerFormValue.value.username
              }).then(res => {
                if (res.code === 200) resolve(true)
                else reject(Error(registerFormText.value.used_username))
              }).catch(err => reject(Error(err)))
            })
          },
          trigger: ['input']
        }
      ],
      password: [
        {
          required: true,
          validator (rule, value) {
            if (!value) {
              return new Error('Required!')
            } else if (value.length < 6) {
              return new Error(loginFormText.value.short_password)
            }
            return true
          },
          trigger: ['input']
        }
      ],
      check_password: [
        {
          required: true,
          validator (rule, value) {
            if (!checkPassword.value) {
              return new Error('Required!')
            } else if (checkPassword.value !== registerFormValue.value.password) {
              matchedPassword.value = false
              return new Error(registerFormText.value.mismatched_password)
            }
            return true
          },
          trigger: ['input', 'blur']
        }
      ]
    }
    const loginFormValue = ref({
      username: '',
      password: ''
    })
    const registerFormValue = ref({
      username: '',
      password: '',
      grade: null,
      school: null,
      name: ''
    })
    const loginTextConfig = {
      zh_cn: {
        label_username: '用户名',
        label_password: '密码',
        empty_username: '请输入用户名',
        short_password: '请至少输入6位密码',
        plholder_username: '请输入用户名',
        plholder_password: '请输入密码',
        loading: '登录中，请稍候',
        success: '登录成功！',
        error: '啊哦~登录失败！'
      },
      en: {
        label_username: 'USERNAME',
        label_password: 'PASSWORD',
        empty_username: 'Please input username.',
        short_password: 'Minimun 6 letters!',
        plholder_username: 'Please input username',
        plholder_password: 'Please input password',
        loading: 'Loading...',
        success: 'Logged In!',
        error: 'Sadly, login failure!'
      }
    }
    const registerTextConfig = {
      zh_cn: {
        label_username: '用户名',
        label_password: '密码',
        label_check_password: '确认密码',
        label_school: '学校',
        label_grade: '年级',
        label_name: '姓名',
        plholder_username: '请输入用户名',
        plholder_password: '请输入密码',
        plholder_check_password: '请重复密码',
        plholder_name: '请输入姓名',
        used_username: '用户名已被使用',
        mismatched_password: '密码不匹配喔~',
        select: '请选择',
        schoolOptions: [
          '神秘大学',
          '匹兹堡大学',
          '卡内基梅隆大学'
        ],
        gradeOptions: [
          '未知',
          '大一',
          '大二',
          '大三',
          '大四',
          '研一',
          '研二',
          '研三',
          '博士',
          '教授',
          '无敌'
        ],
        success: '注册成功，欢迎加入Pitt大家庭!',
        error: '啊哦~注册失败了喔!'
      },
      en: {
        label_username: 'USERNAME',
        label_password: 'PASSWORD',
        label_check_password: 'CONFIRM PASSWORD',
        label_school: 'SCHOOL',
        label_grade: 'GRADE',
        label_name: 'NAME',
        plholder_username: 'Input Username',
        plholder_password: 'Input Password',
        plholder_check_password: 'Please retype password',
        plholder_name: 'Input name',
        used_username: 'Username already used.',
        mismatched_password: 'Mismatched password~',
        select: 'Select',
        schoolOptions: [
          'Undefined',
          'University of Pittsburgh',
          'Carnegie Mellon University'
        ],
        gradeOptions: [
          'Unknoen',
          'Freshman',
          'Sophermore',
          'Junior',
          'Senior',
          'Grad1',
          'Grad2',
          'Grad3',
          'Doctor',
          'Professor',
          'Invincible'
        ],
        success: 'You are registered now. Welcome to Pitt!',
        error: 'Sadly, registration failure!'
      }
    }
    const loginFormText = computed(() => {
      return loginTextConfig[i18n.global.locale]
    })
    const registerFormText = computed(() => {
      return registerTextConfig[i18n.global.locale]
    })
    const schoolOptions = ref([
      {
        label: `${registerFormText.value.schoolOptions[0]}`,
        value: 0
      },
      {
        label: `${registerFormText.value.schoolOptions[1]}`,
        value: 1
      },
      {
        label: `${registerFormText.value.schoolOptions[2]}`,
        value: 2
      }
    ])
    const gradeOptions = ref([
      {
        label: `${registerFormText.value.gradeOptions[0]}`,
        value: 0
      },
      {
        label: `${registerFormText.value.gradeOptions[1]}`,
        value: 1
      },
      {
        label: `${registerFormText.value.gradeOptions[2]}`,
        value: 2
      },
      {
        label: `${registerFormText.value.gradeOptions[3]}`,
        value: 3
      },
      {
        label: `${registerFormText.value.gradeOptions[4]}`,
        value: 4
      },
      {
        label: `${registerFormText.value.gradeOptions[5]}`,
        value: 10
      },
      {
        label: `${registerFormText.value.gradeOptions[6]}`,
        value: 11
      },
      {
        label: `${registerFormText.value.gradeOptions[7]}`,
        value: 12
      },
      {
        label: `${registerFormText.value.gradeOptions[8]}`,
        value: 20
      },
      {
        label: `${registerFormText.value.gradeOptions[9]}`,
        value: 30
      },
      {
        label: `${registerFormText.value.gradeOptions[10]}`,
        value: 90
      }
    ])
    // const setUser = computed((user) => store.mutations.setUser(user))
    // methods
    const onLogIn = async () => {
      loginLoading.value = true
      const res = await login(loginFormValue.value)
      loginLoading.value = false
      if (res.code === 200) {
        notification.success({
          content: loginFormText.value.success || 'success',
          duration: 3000
        })
        const { data: user, token } = res
        $store._mutations.setUser[0](user)
        $store._mutations.setToken[0](token)
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        $route.push('/home')
      } else {
        notification.warning({
          content: loginFormText.value.error || 'unknown error',
          duration: 3000
        })
      }
    }
    // go to register
    const goToRegister = () => {
      swiped.value = !swiped.value
      setTimeout(() => {
        if (swiped.value) registerInput.value.focus()
        else loginInput.value.focus()
        clearTimeout()
      }, 610)
    }
    const onRegister = async () => {
      if (checkPassword.value !== registerFormValue.value.password) return
      registerLoading.value = true
      const res = await register(registerFormValue.value)
      registerLoading.value = false
      if (res.code === 201) {
        swiped.value = false
        notification.success({
          content: registerFormText.value.success || 'success',
          duration: 3000
        })
      } else {
        notification.warning({
          content: registerFormText.value.error || 'unknown error',
          duration: 3000
        })
      }
      console.log(res, $route)
    }

    // const switchLanguage = () => {
    //   const currentLang = i18n.global.locale
    //   i18n.global.locale = currentLang === 'zh_cn' ? 'en' : 'zh_cn'
    // }

    const enterClick = () => {
      if (swiped.value) onRegister()
      else onLogIn()
    }

    return {
      swiped, // switched to register page?
      locale,
      loginFormValue,
      registerFormValue,
      loginRules,
      registerRules,
      loginFormText,
      registerFormText,
      onLogIn,
      goToRegister,
      schoolOptions,
      gradeOptions,
      onRegister,
      switchLanguage,
      checkPassword,
      matchedPassword,
      loginLoading,
      registerLoading,
      enterClick,
      registerInput,
      loginInput
    }
  }
}
</script>
<style lang="scss">
.login-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  .side {
    position: absolute;
    left: 0;
    height: 100%;
    min-height: 700px;
    width: max(30vw, 400px);
    background-color: $super-dark-grey;
    .title {
      margin-top: 20%;
      letter-spacing: 0.2em;
      text-align: center;
      height: 10%;
      display: flex;
      align-items: center;
      /* padding: 5% 0 15%; */
      /* margin-bottom: 20%; */
      font-size: 24px;
      color: #fff;
      justify-content: center;
    }
    .normal-title {
      letter-spacing: 0;
    }
    .more {
      position: absolute;
      bottom: 20px;
      display: flex;
      flex-direction: column;
      font-size: 14px;
      .language {
        cursor: pointer;
        margin-bottom: 10px;
      }
      .language:hover {
        color: $pink;
      }
    }
    .slider {
      width: 80%;
      min-height: 400px;
      margin: 0 auto;
      overflow: hidden;
      .container {
        width: 200%;
        height: 100%;
        display: flex;
        flex-direction: row;
        transition: 0.6s ease;
        .form {
          width: 50%;
          height: 70%;
          padding: 20px 10px 0;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 20px;
          text-align: left;
          .n-form-item-label {
            color: #fff;
            letter-spacing: 0.1rem;
          }
          .options {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .left {
              display: flex;
              flex-direction: column;
              font-size: 12px;
              justify-content: space-between;
            }
            .text-btn:hover {
              cursor: pointer;
              color: $pink;
              text-shadow: $pink;
            }
          }
          font-weight: 500;
          color: #fff;
        }
        .login-form {
          padding-top: 30px;
          .divide {
            height: 20px;
            width: 100%;
          }
        }
        .regiser-form {
          .divide {
            height: 15px;
            width: 100%;
          }
        }
      }
      .register-page {
        transform: translate(-50%, 0);
      }
    }
  }
  .content {
    margin-left: max(30vw, 400px);
    min-width: 1000px;
    height: 100%;
    min-height: 700px;
    background: url('../../images/pitt-port.jpg') no-repeat;
    background-size:100% 100%;
  }
}
.n-button__content {
  /* text-align: center; */
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  font-weight: 500;
  padding: 0 18px;
  /* letter-spacing: .5em; */
}
.n-form-item .n-form-item-feedback-wrapper .n-form-item-feedback.n-form-item-feedback--error {
  color: $pink;
}
.n-form-item .n-form-item-label .n-form-item-label__asterisk {
  color: $pink;
}
</style>

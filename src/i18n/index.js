import { createI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler.js'

const messages = {
  CN: {
    message: {
      hello: '这是中文.'
    }
  },
  EN: {
    message: {
      hello: 'Hello English.'
    }
  }
}

const i18n = createI18n({
  locale: 'CN',
  messages
})

export default i18n

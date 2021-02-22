import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import zh from './config/zh'
import en from './config/en'
import tw from './config/tw'

const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'zh',
  messages: {
    zh,
    en,
    tw
  }
})
export default i18n


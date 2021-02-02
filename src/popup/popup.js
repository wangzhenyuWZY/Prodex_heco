import Vue from 'vue'
import Popup from './ipopup.vue'

const PopupBox = Vue.extend(Popup)

Popup.install = function(data) {
  const instance = new PopupBox({
    data
  }).$mount()

  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.showAlert = true
    // show 和弹窗组件里的show对应，用于控制显隐
  })
}

export default Popup

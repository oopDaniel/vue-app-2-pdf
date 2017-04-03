import Vue from 'vue'
import App from './App'
import router from './router'

import EventBus from '@plugins/event-bus.plugin'
import Mixins from '@plugins/mixins.plugin'

Vue.use(EventBus)
Vue.use(Mixins)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

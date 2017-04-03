import EventBus from '@services/event-bus'

export default {
  install: Vue => (Vue.prototype.$eventBus = EventBus)
}

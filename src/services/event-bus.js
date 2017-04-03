import Vue from 'vue'

export default new Vue({
  data: () => ({
    observers: []
  }),
  methods: {
    emit (name) {
      this.observers.forEach(ob => ob(name))
    },
    subscribe (callback) {
      this.observers.push(callback)
      return () => {
        const index = this.observers.findIndex(ob => ob === callback)
        if (index > 0) this.observers.splice(index, 1)
      }
    }
  }
})

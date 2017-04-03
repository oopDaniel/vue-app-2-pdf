import Vue from 'vue'
import Router from 'vue-router'

const routes = [
  {
    path: '*',
    redirect: '/p0'
  }
]

const context = require.context('@components', true, /^(.*\.(vue$))$/igm)
context.keys().forEach((key, index) => {
  const component = context(key)
  routes.push({
    path: `/p${index}`,
    name: `p${index}`,
    component
  })
})

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes
})

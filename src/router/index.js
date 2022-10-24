import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Event from '../components/my-event.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/my-event',
    name: 'My Event',
    component: Event
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

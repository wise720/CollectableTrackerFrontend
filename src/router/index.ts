import { createRouter, createWebHistory } from 'vue-router'
import CollectableLists from '@/views/CollectableLists.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Settings from '@/views/Settings.vue'
import List from '@/views/CollectableList.vue'
import ListSearch from '@/views/ListSearch.vue'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/list',
      name: 'lists',
      component: CollectableLists,
    },
    { path: '/list/:id/', name: 'list', component: List },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/search',
      name: 'search',
      component: ListSearch,
      props: route => ({ query: route.query.query }),
    },
  ],
})

export default router

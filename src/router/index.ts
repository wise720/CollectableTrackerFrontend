import { createRouter, createWebHistory } from 'vue-router'
import CollectableLists from '../views/CollectableLists.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import Settings from '../views/Settings.vue'
import List from '../views/CollectableList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/profile/:id?',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
  ],
})

export default router

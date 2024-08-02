import type { RouteRecordRaw } from 'vue-router'

import UsersView from '../views/UsersView.vue'
import UserFormView from '../views/UserFormView.vue'
import UserShowView from '../views/UserShowView.vue'

const userRoutes: Array<RouteRecordRaw> = [
  {
    path: '/users',
    name: 'Users',
    component: UsersView,
  },
  {
    path: '/user/form',
    name: 'UserForm',
    component: UserFormView,
  },
  {
    path: '/user/:id',
    name: 'UserShow',
    component: UserShowView,
    props: true,
  },
]

export default userRoutes

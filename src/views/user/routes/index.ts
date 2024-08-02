import UserViews from './UserViews.vue'
import UserForm from './UserForm.vue'
import UserShow from './UserShow.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/users',
    name: 'Users',
    component: UserViews,
  },
  {
    path: '/user/form',
    name: 'UserForm',
    component: UserForm,
  },
  {
    path: '/user/:id',
    name: 'UserShow',
    component: UserShow,
    props: true,
  },
]

export default routes
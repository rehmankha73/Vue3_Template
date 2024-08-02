import type { RouteRecordRaw } from 'vue-router'
import CompanyViews from './CompanyViews.vue'
import CompanyForm from './CompanyForm.vue'
import CompanyShow from './CompanyShow.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/companies',
    name: 'Company',
    component: CompanyViews,
  },
  {
    path: '/company/form',
    name: 'CompanyForm',
    component: CompanyForm,
  },
  {
    path: '/company/:id',
    name: 'CompanyShow',
    component: CompanyShow,
    props: true,
  },
]

export default routes
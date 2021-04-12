import Vue from 'vue'
import VueRouter from 'vue-router'
import Listerestaurants from '@/components/Listerestaurants.vue'
import Details from '@/components/Details.vue'
import Paiement from '@/components/Paiement.vue'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Listerestaurants',
    component: Listerestaurants
  },

  {
    path: '/Details/:id',
    name: 'Details',
    component: Details
  },
  {
    path: '/Paiement',
    name: 'Paiement',
    component: Paiement
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

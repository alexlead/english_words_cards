import { createRouter, createWebHistory } from 'vue-router'
import Quizz from '../views/Quizz.vue'
import Cards from '../views/Cards.vue'

const routes = [
  {
    path: '/',
    name: 'cards',
    alias: ['/cards'],
    component: Cards
  },
  {
    path: '/quizz',
    name: 'quizz',
    component: Quizz
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

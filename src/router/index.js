import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import('views/home/Home');
const Classify = () => import('views/classify/Classify');
const Cart = () => import('views/cart/Cart');
const Profile = () => import('views/profile/Profile');

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/classify',
    component: Classify
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;
import { createRouter, createWebHistory } from 'vue-router';

// Importez vos composants de vue ici
import Home from '../views/Home.vue';
import CreateProduct from '../views/CreateProduct.vue';
import SignIn from '../views/SignIn.vue';
import Cart from '../views/Cart.vue';
import MyOrders from '../views/MyOrders.vue';
import AllOrders from '../views/AdminOrders.vue';
import CreateAccount from '../views/CreateAccount.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { path: '/create-product', component: CreateProduct },
  { path: '/sign-in', component: SignIn },
  { path: '/cart', component: Cart },
  { path: '/myorders', component: MyOrders },
  { path: '/all-orders', component: AllOrders },
  { path: '/create-account', component: CreateAccount },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import CreateRoom from '../views/room/CreateRoom.vue';
import ViewRoom from '../views/room/ViewRoom.vue';
import JoinRoom from '../views/room/JoinRoom.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { hideNavigation: true }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { hideNavigation: true }
  },
  {
    path: '/create-room',
    name: 'create-room',
    component: CreateRoom,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/room/view/:roomID',
    name: 'ViewRoom',
    component: ViewRoom,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/room/join',
    name: 'JoinRoom',
    component: JoinRoom,
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = Cookies.get('auth');

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;

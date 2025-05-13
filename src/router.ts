import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from './pages/Home.vue';
import EditProfile from './pages/EditProfile.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: Home },
  { path: '/edit-profile', name: 'EditProfile', component: EditProfile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 
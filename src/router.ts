import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import WeatherList from './components/WeatherList.vue';
import WeatherDetails from './pages/WeatherDetails.vue';
import EditProfile from './pages/EditProfile.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      {
        path: '',
        components: {
          left: WeatherList,
          right: WeatherDetails
        },
        meta: { layout: 'split' }
      },
      {
        path: 'details/:id',
        components: {
          left: WeatherList,
          right: WeatherDetails
        },
        meta: { layout: 'split' }
      },
      {
        path: 'edit-profile',
        name: 'EditProfile',
        component: EditProfile,
        meta: { layout: 'main' }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 
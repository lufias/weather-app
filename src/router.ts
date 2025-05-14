import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import WeatherList from './components/WeatherList.vue';
import WeatherDetails from './pages/WeatherDetailsPage.vue';
import EditProfile from './pages/EditProfilePage.vue';

// ROUTE CONFIGURATION
// -------------------
// - Routes can use a "split" layout (for desktop/tablet) or a single view (for mobile).
// - For split layout, use the `components` property with named views (e.g., left/right).
// - For mobile, specify which component to show using `meta.mobileComponent`.
// - If `meta.mobileComponent` is not set, the default component will be used (see MobileLayout.vue logic).

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      // SPLIT LAYOUT ROUTE (Desktop/Tablet)
      {
        path: '',
        components: {
          left: WeatherList,        // Left pane component
          right: WeatherDetails     // Right pane component
        },
        meta: { 
          layout: 'split',          // Use split layout for large screens
          mobileComponent: WeatherList // Show WeatherList on mobile
        }
      },
      // SPLIT LAYOUT ROUTE WITH DETAILS (Desktop/Tablet)
      {
        path: 'details/:id',
        components: {
          left: WeatherList,
          right: WeatherDetails
        },
        meta: { 
          layout: 'split',
          mobileComponent: WeatherDetails, // Show WeatherDetails on mobile
          mobileLayout: 'blank'  // Use blank layout (without header) on mobile
        }
      },
      // SINGLE COMPONENT ROUTE (No split layout)
      {
        path: 'edit-profile',
        name: 'EditProfile',
        component: EditProfile // Will be used for both desktop and mobile (mobile fallback)
        // No meta.mobileComponent needed unless you want a different mobile view
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 
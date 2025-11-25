import { createWebHashHistory, createRouter } from 'vue-router';
import { errorRouter, staticRouter } from './static';

const routes = [
  ...staticRouter,
  ...errorRouter,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});



export default router;

import { createWebHashHistory, createRouter } from 'vue-router';
export const errorRouter = [
  {
    name: '403',
    path: '/403',
    component: () => import('@/views/error/403.vue'),
    meta: { title: '403页面', unNeedAuth: true },
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    meta: { title: '404页面', unNeedAuth: true },
  },
  {
    name: '500',
    path: '/500',
    component: () => import('@/views/error/500.vue'),
    meta: { title: '500页面', unNeedAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    meta: { unNeedAuth: true },
  },
];

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
    meta: { title: '登陆', unNeedAuth: true },
  },
  {
    name: 'layout',
    path: '/layout',
    redirect: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      { path: '/', component: () => import('@/views/Home.vue') },
      {
        path: '/about',
        component: () => import('@/views/About.vue'),
        meta: { title: '关于', unNeedAuth: true },
      },
    ],
  },
  ...errorRouter,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

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
export const staticRouter = [
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
            { path: '/', component: () => import('@/views/Home.vue'), meta: { title: '首页', isMenu: true } },
            {
                path: '/user',
                component: () => import('@/views/User/index.vue'),
                meta: { title: '用户管理', isMenu: true },
            },
            {
                path: '/apiAuth',
                component: () => import('@/views/ApiAuth/index.vue'),
                meta: { title: '接口', isMenu: true },
            },
            {
                path: '/auth',
                component: () => import('@/views/Auth/index.vue'),
                meta: { title: '权限管理', isMenu: true },
            },
            {
                path: '/role',
                component: () => import('@/views/Role/index.vue'),
                meta: { title: '角色管理', isMenu: true },
            },
        ],
    },
]

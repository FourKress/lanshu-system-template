import settingsManage, { settingsGroupRoute } from './settings-manage';

const login = () => import('@/views/login');
const dashboard = () => import('@/views/dashboard');

const errorNotFound = () =>
  import('@lanshu/system-common/components/error/404');
const errorNoAuth = () => import('@lanshu/system-common/components/error/401');

const baseRoutes = [
  ...settingsManage,
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      full: true,
    },
  },
  {
    path: '/',
    name: 'dashboard',
    component: dashboard,
  },
  {
    path: '/404',
    name: 'errorNotFound',
    component: errorNotFound,
    white: true,
  },
  {
    path: '/401',
    name: 'errorNoAuth',
    component: errorNoAuth,
    white: true,
  },
  {
    path: '*',
    redirect: '/404',
    white: true,
  },
];

const routes = [...baseRoutes];

export const groupRoute = [settingsGroupRoute];

export default routes;

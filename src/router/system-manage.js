const systemHome = () => import('@/views/system-manage/home');

const routeList = [
  {
    path: '/systemHome',
    name: 'systemHome',
    component: systemHome,
    meta: {
      bread: [
        { name: '系统首页', path: '/systemHome' },
      ],
      code: 'employeeManage',
    },
  },
];

export const systemGroupRoute = {
  name: 'systemGroupRoute',
  title: '系统设置',
  icon: 'menu-setting-management',
  children: routeList,
};

export default routeList;

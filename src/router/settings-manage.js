const SettingsHome = () => import('@/views/settings/home');
const SettingsList = () => import('@/views/settings/list');

const routeList = [
  {
    path: '/settingsHome',
    name: 'SettingsHome',
    component: SettingsHome,
    meta: {
      bread: [{ name: '设置首页', path: '/settingsHome' }],
      code: 'employeeManage',
    },
  },
  {
    path: '/settingsList',
    name: 'SettingsList',
    component: SettingsList,
    meta: {
      bread: [{ name: '列表页', path: '/settingsList' }],
      code: 'employeeManage',
    },
  },
];

export const settingsGroupRoute = {
  name: 'settingsGroupRoute',
  title: '系统设置',
  icon: 'menu-setting-management',
  children: routeList,
};

export default routeList;

/**
 * 引入公共模块的组件和当前项目的组件
 *
 * 此处组件为全局注册组件
 * 注意重复检查
 * 多次注册组件
 * 公共组件，加V前缀
 * 当前项目的自有组件，加R前缀
 * 不推荐单词组件
 * @return: 所有的组件LIST
 * */

import Confirm from '@lanshu/system-common/components/confirm';

// 当前目录下的组件（按照规范构建目录的组件）自动注册，自动会加上r前缀
import autoRegister from './auto-register';

// 按需引用进来全局注册
// 公共模块的组件, 加上V
const VEmpty = () => import('@lanshu/system-common/components/empty');
const VBreadCrumb = () =>
  import('@lanshu/system-common/components/bread-crumb');
const VLayout = () => import('@lanshu/system-common/components/layout');
const VLayoutFullPage = () =>
  import('@lanshu/system-common/components/layout-full-page');
const VSelect = () => import('@lanshu/system-common/components/select');
const VSearch = () => import('@lanshu/system-common/components/search');
const VIcon = () => import('@lanshu/system-common/components/icon');
const VDialog = () => import('@lanshu/system-common/components/dialog');
const VPage = () => import('@lanshu/system-common/components/page');
const VButton = () => import('@lanshu/system-common/components/button');
const VTable = () => import('@lanshu/system-common/components/table');
const VDateRangerPicker = () =>
  import('@lanshu/system-common/components/date-ranger-picker');
const VPageView = () => import('@lanshu/system-common/components/page-view');
const VListTemplate = () =>
  import('@lanshu/system-common/components/list-template');
const VFilterTree = () =>
  import('@lanshu/system-common/components/filter-tree');
const VLink = () => import('@lanshu/system-common/components/link');
const VRemoteInput = () =>
  import('@lanshu/system-common/components/remote-input');
const VEditPassword = () =>
  import('@lanshu/system-common/components/editPassword');

// 其他情况的组件，需要手动注册，防止组件名为单词，加R前缀
// const RTest = () => import('./test');

const components = {
  // 通用组件
  VEmpty,
  VBreadCrumb,
  VLayout,
  VLayoutFullPage,
  VSelect,
  VSearch,
  VIcon,
  VDialog,
  VPage,
  VButton,
  VTable,
  VDateRangerPicker,
  VPageView,
  VListTemplate,
  VFilterTree,
  VLink,
  VRemoteInput,
  VEditPassword,

  // 当前项目全局组件
  // RTest,
};

export default {
  install(Vue) {
    Object.keys(components).forEach((key) => {
      Vue.component(key, components[key]);
    });
    autoRegister.install(Vue);

    Vue.use(Confirm);
  },
};

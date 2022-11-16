import directive from '@lanshu/system-common/utils/directive';

const directives = {
  ...directive,
};

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
};

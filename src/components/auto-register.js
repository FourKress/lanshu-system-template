// 自动注册组件
const regComponents = /^\.\/([a-zA-Z\d-]+)\/index\.vue$/;
const componentFiles = require.context(
  './',
  true,
  /^\.\/([a-zA-Z\d-]+)\/index\.vue$/,
);
const requireAllComponents = (context, Vue) =>
  context.keys().forEach(key => {
    const fileName = key.match(regComponents);
    if (!context(key).default.notAutoRegister) {
      Vue.component(`r-${fileName[1]}`, context(key).default);
    }
  });

export default {
  install(Vue) {
    requireAllComponents(componentFiles, Vue);
  },
};

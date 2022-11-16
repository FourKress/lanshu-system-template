/**
 * 需要挂载到Vue原型链上的方法
 * 统一由$开头以示区别
 */
import prototype from '@lanshu/system-common/utils/prototype';

const prototypes = {
  ...prototype,
};

export default {
  install(Vue) {
    Object.keys(prototypes).forEach((key) => {
      Vue.prototype[`$${key}`] = prototypes[key];
    });
  },
};

/**
 * 当前项目（私有特性）全局通用缓存变量
 * 局部模块的变量建议放到对应的模块
 */

const state = {
  // 全屏遮罩
  fullScreenLoading: false,
  // 菜单展开收起状态控制
};

const mutations = {
  fullScreenLoading(data, value) {
    data.fullScreenLoading = value;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};

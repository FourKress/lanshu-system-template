/**
 * 导出自定义注册的过滤器(filter)的install方法，在main.js统一install
 * 过滤器文档：https://cn.vuejs.org/v2/api/#Vue-filter
 */

import dayjs from 'dayjs';

// 千分位
function currency(value, separator = ',') {
  if (!value) return value
  const values = value.toString().split('.')
  const start = values[0].replace(/(\d)(?=(?:\d{3})+$)/g, `$1${separator}`)
  const end = values.length === 2 ? `.${values[1]}` : ''
  return `${start}${end}`
}

const filters = {
  // 格式化日期
  formatDate(value, format = 'YYYY-MM-DD') {
    return value ? dayjs(value).format(format) : ''
  },

  // 格式化时间
  formatTime(value, format = 'YYYY-MM-DD HH:mm:ss') {
    return value ? dayjs(value).format(format) : ''
  },

  // 千分位
  currency,
};

export default {
  install(Vue) {
    Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key]);
    });
  },
};

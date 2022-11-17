import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App';
import router from './router';
import store from './store';
import Filter from './utils/filter';
import Prototype from './utils/prototype';
import Directive from './utils/directive';
import Components from './components';

// 引入项目中的所有样式
import '@/assets/styles/index.less';

Vue.use(ElementUI);
// 注册全局过滤器
Vue.use(Filter);
// 注册全局指令
Vue.use(Directive);
// 挂载原型链方法
Vue.use(Prototype);
// 注册全局组件, 放在后面
Vue.use(Components);

new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App),
});

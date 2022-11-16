import Vue from 'vue';
import Vuex from 'vuex';
import user from '@lanshu/system-common/store/user';
import global from '@lanshu/system-common/store/global';
import index from './modules/index';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    index,
    global,
  },
});

export default store;

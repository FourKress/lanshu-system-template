import Vue from 'vue';
import Router from 'vue-router';
import routerIntercept from '@lanshu/system-common/utils/router-intercept';
import routes from './router-list';

const router = new Router({
  routes,
});

Vue.use(Router);
router.beforeEach(routerIntercept({ routes }));

export default router;

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Helper from './helper';

Vue.use(VueRouter);
Vue.use(Helper);

import Routes from './routes.js';
const $ = require('jquery')
require('bootstrap')

const router = new VueRouter({
    routes: Routes
});

// router.beforeEach(function (to, from, next) {
//   if (from.path === '/fases') {
//     if (Vue.helper.isLoaded()) {
//     	Vue.helper.stopLoad();
//     	next();
//     }
//   } else {
//     next()
//   }
// })

new Vue({
	el: '#app',
	render: h => h(App),
	router: router,
	data() {
		return{
			loaded: false
		}
	}
})

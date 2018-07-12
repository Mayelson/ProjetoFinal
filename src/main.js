import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(VueRouter);

import Routes from './routes.js';
const $ = require('jquery')
require('bootstrap')

const router = new VueRouter({
    routes: Routes
});

new Vue({
	el: '#app',
	render: h => h(App),
	router: router
})

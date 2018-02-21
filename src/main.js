import Vue from 'Vue'
import App from './app.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
	routes: routes,
	mode: 'history'
});

new Vue({
	el: '#app',
	render: h => h(App),
	router: router
});
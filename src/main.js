import Vue from 'Vue'
import App from './app.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import VueSession from 'vue-session'
import routes from './routes'

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueSession);

const router = new VueRouter({
	routes: routes,
	mode: 'history'
});

Vue.filter('toUppercase', function(value) {
	if(!value)
		return ''
	else
		return value.toUpperCase();
})

Vue.prototype.$base_url = 'http://localhost:4000';

new Vue({
	el: '#app',
	render: h => h(App),
	router: router
});
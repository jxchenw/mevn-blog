import home from './components/home.vue'
import blogs from './components/blogs.vue'
import blog from './components/blog.vue'
import add from './components/add.vue'
import edit from './components/edit.vue'
import register from './components/register.vue'
import personal from './components/personal.vue'
import images from './components/images.vue'
import notFound from './components/notFound.vue'


export default [
	{ path: '/', component: home },
	{ path: '/blogs', component: blogs },
	{ path: '/blog/:id', component: blog },
	{ path: '/add', component: add },
	{ path: '/blog/:id/edit', component: edit },
	{ path: '/user/register', component: register },
	{ path: '/user/personal', component: personal },
	{ path: '/user/images', component: images },
	{ path: '*', component: notFound }
]
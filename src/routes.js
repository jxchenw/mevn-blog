import home from '../components/home.vue'
import blogs from '../components/blogs.vue'
import blog from '../components/blog.vue'
import add from '../components/add.vue'
import edit from '../components/edit.vue'

export default [
	{ path: '/', component: home },
	{ path: '/blogs', component: blogs },
	{ path: '/blog/:id', component: blog },
	{ path: '/add', component: add },
	{ path: '/blog/:id/edit', component: edit }
]
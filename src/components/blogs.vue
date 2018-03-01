<template>
	<div class="container">
		<h2>Blogs</h2>
		<input type="text" v-model="search" />
		<div v-for="blog in filterResults" class="blog_detail">
			<router-link v-bind:to="'blog/' + blog._id" exact><h4 v-rainbow>{{ blog.title | to-uppercase}}</h4></router-link>
			<div>{{ blog.content }}</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			blogs: [],
			search: ''
		}
	},
	created: function() {
		this.$http.get('http://localhost:4000/api/blogs').then(function(data) {
			this.blogs = data.body;
		});
	},
	directives: {
		'rainbow': {
			bind: function(el, binding, vnode) {
				el.style.color = 'rgb(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ')';
			}
		}
	},
	computed: {
		filterResults: function() {
			return this.blogs.filter((blog) => {
				return blog.title.toLowerCase().match(this.search.toLowerCase());
			});
		}
	}
}
</script>

<style scoped>
.container {
	width: 80%;
	margin: 0 auto;
}
.blog_detail {
	padding: 20px;
	margin: 20px 0;
	box-sizing: border-box;
	background-color: #eee;
}
h4 {
	font-size: 1.5rem;
}
a {
	text-decoration: none;
}
input {
	width: 100%;
	padding: 12px 20px;
	margin: 8px 0;
	display: inline-block;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
}
</style>
<template>
	<div>
		<h2>Blogs</h2>
		<div v-for="blog in blogs" class="blog-detail">
			<router-link v-bind:to="'blog/' + blog._id" exact><h4 v-rainbow>{{ blog.title | to-uppercase}}</h4></router-link>
			<div>{{ blog.content }}</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			blogs: []
		}
	},
	created: function() {
		this.$http.get('http://localhost:4000/api/blogs').then(function(data) {
			this.blogs = data.body;
			console.log(data);
		})
	},
	// filters: {
	// 	uppercase: function(value) {
	// 		return value.toUpperCase();
	// 	}
	// },
	directives: {
		'rainbow': {
			bind: function(el, binding, vnode) {
				el.style.color = 'rgb(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ')';
			}
		}
	}
}
</script>

<style scoped>
.blog-detail {
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
</style>
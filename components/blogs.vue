<template>
	<div>
		<h2>Blogs</h2>
		<div v-for="blog in blogs">
			<h4><router-link v-bind:to="'blog/' + blog._id" exact>{{ blog.title }}</router-link></h4>

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
	}
}
</script>

<style scoped></style>
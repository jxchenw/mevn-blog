<template>
	<div>
		<h2>{{ blog.title }}</h2>
		<span>{{ blog.date }}, by {{ blog.author }}</span>
		<div>{{ blog.content }}</div>
		<br/>
		<button v-on:click.prevent='remove'>Delete this post</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			id: this.$route.params.id,
			blog: {
				title: '',
				content: '',
				author: '',
				date: ''
			}
		}
	},
	methods: {
		remove: function() {
			this.$http.delete('http://localhost:4000/api/blogs/' + this.id).then(function() {
				console.log('deleted!');
				this.$router.push({ path: '/blogs' });
			});
		}
	},
	created: function() {
		this.$http.get('http://localhost:4000/api/blogs/' + this.id).then(function(data) {
			this.blog.title = data.body.title;
			this.blog.content = data.body.content;
			this.blog.author = data.body.author;
			this.blog.date = data.body.createdBy;
			console.log(data);
		});
	}
}
</script>

<style scoped=""></style>
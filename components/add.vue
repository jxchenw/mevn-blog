<template>
	<div class="container">
		<form>
			<div class="row">
				<div class="col-25">
					<label for="title">Title</label>
				</div>
				<div class="col-75">
					<input type="text" name="title" v-model="blog.title" />
				</div>
			</div>
			<div class="row">
				<div class="col-25">
					<label for="category">Category</label>
				</div>
				<div class="col-75">
					<div class="category-checkbox">
						<label>Vue
							<input type="checkbox" value="vue" v-model="blog.categories">
						</label>
						<label>Angular
							<input type="checkbox" value="angular" v-model="blog.categories">
						</label>
						<label>React
							<input type="checkbox" value="react" v-model="blog.categories">
						</label>
						<label>Node
							<input type="checkbox" value="node" v-model="blog.categories">
						</label>
						<label>Other Technologies
							<input type="checkbox" value="others" v-model="blog.categories">
						</label>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-25">
					<label for="content">Content</label>
				</div>
				<div class="col-75">
					<textarea name="content" v-model="blog.content"></textarea>
				</div>
			</div>
			<div class="row">
				<button v-on:click.prevent="post" type="submit">Post</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			blog: {
				title: '',
				categories: [],
				content: '',
				author: 'James Chen'
			}
		}
	},
	methods: {
		post: function() {
			console.log('Hello');
			this.$http.post('http://localhost:4000/api/blogs', {
				title: this.blog.title,
				category: this.blog.categories,
				content: this.blog.content,
				author: this.blog.author
			}).then(function(data) {
				console.log('success!');
				this.$router.push({ path: '/blogs' });
			}, function(err) {
				console.log('fail');
				console.log(err);
			});
		}
	}
}
</script>

<style scoped>
* {
	box-sizing: border-box;
}

input[type="text"], select, textarea {
	width: 100%;
	padding: 12px;
	border: 1px solid #ccc;
	border-radius: 4px;
	resize: vertical;
}

label {
	padding: 12px 12px 12px 0;
	display: inline-block;
}

button {
	background-color: #4CAF50;
	color: white;
	padding: 12px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	float: right;
}

button:hover {
	background-color: #45a049;
}

.container {
	border-radius: 5px;
	background-color: #f2f2f2;
	padding: 20px;
}

.col-25 {
	float: left;
	width: 25%;
	margin-top: 6px;
}

.col-75 {
	float: left;
	width: 75%;
	margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
	content: "";
	display: table;
	clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media (max-width: 600px) {
	.col-25, .col-75, button {
		width: 100%;
		margin-top: 0;
	}
}

.category-checkbox input {
	display: inline-block;
	margin-right: 10px;
}

.category-checkbox label {
	display: inline-block;
}

</style>
<template>
	<div class="single_blog">
		<h2 class="blog_title">
			<span v-model="blog.title" v-show="!showField('title')" @click="focusField('title')">{{ blog.title | to-uppercase }}</span>
			<input type="text" v-model="blog.title" v-show="showField('title')" @blur="blurField('title')" ref="title" />
		</h2>
		<div class="btn_group">
			<button v-show="!confirm" class="btn_blue" v-on:click="confirmDel">Delete this post</button>
			<button v-show="confirm" class="btn_confirm btn_red" @click="remove">Yes</button>
			<button v-show="confirm" class="btn_confirm" @click="confirmDel">No</button>
		</div>
		<div class="blog_info">{{ blog.date }}, by {{ blog.author }}</div>
		<div class="blog_content">
			<span v-model="blog.content" v-show="!showField('content')" @click="focusField('content')">{{ blog.content }}</span>
			<input type="text" v-model="blog.content" v-show="showField('content')" @blur="blurField('content')" ref="content" />
		</div>
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
			},
			confirm: false,
			editField: ''
		}
	},
	methods: {
		focusField: function(value) {
			this.editField = value;
			this.$nextTick(() => {
				this.$refs[value].focus();
			});

		},
		blurField: function() {
			var obj = {};
			obj[this.editField] = this.blog[this.editField];
			this.$http.put('http://localhost:4000/api/blogs/' + this.id, obj).then(function() {
				console.log('Success!');
			});
			this.editField = '';
		},
		showField: function(value) {
			return this.editField == value;
		},
		confirmDel: function() {
			console.log(this.confirm);
			this.confirm = !this.confirm;
		},
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
		});
	},
	directives: {
		'confirm': {
			bind: function(el, binding, vnode) {
				console.log(el);
				console.log(binding);
				console.log(vnode);
			}
		}
	}

}
</script>

<style scoped>	
.single_blog {
	margin: 0 auto;
	width: 80%;
	box-sizing: border-box;
	background-color: #eee;
	padding: 20px 80px;
	margin-top: 20px;
}
.blog_title input {
	font-size: 1.5rem;
	font-weight: bold;
}
.blog_info {
	color: #585858;
	font-style: italic;
}
.blog_content {
	margin: 20px 0 40px 0;
}
.btn_group {
	float: right;
}
button {
	color: white;
	padding: 12px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	width: 150px;
}
button.btn_confirm {
	display: inline-block;
}
button.btn_blue {
	background-color: #2d319a;
}
button.btn_blue:hover {
	background-color: #202269;
}
button.btn_red {
	background-color: #c52424;
}
button.btn_red:hover {
	background-color: #9c1c1c;
}
</style>
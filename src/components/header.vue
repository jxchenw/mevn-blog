<template>
	<div>
		<ul class="topnav">
			<li><router-link to="/" exact>Home</router-link></li>
			<li><router-link to="/blogs" exact>Blogs</router-link></li>
			<li><router-link to="/add" exact>Post a blog</router-link></li>
			<li class="right">
				<router-link v-if="!userHere" to="/user/register" exact>Register</router-link>
				<a v-if="userHere" @click="logout">Logout</a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: ['userHere'],
	watch: {
		userHere: function(newVal) {
			this.userHere = newVal;
		}
	},
	data() {
		return {
		}
	},
	methods: {
		logout: function() {
			this.$session.remove('jwt');
			this.$emit('userComing');
			this.$router.push({ path: '/' });
		}
	},
	created: function() {
		var userid = this.$session.get('jwt');
		if(userid)
			this.userHere = true;
	}
}
</script>

<style scoped>
ul.topnav {
	list-style-type: none;
	margin: 0;
	padding: 0;
	overflow: hidden;
	background-color: #333;
}

ul.topnav li {
	float: left;
}

ul.topnav li a {
	display: block;
	color: white;
	text-align: center;
	padding: 14px 16px;
	text-decoration: none;
	cursor: pointer;
}

ul.topnav li a:hover:not(.router-link-active) {
	background-color: #111;
}

ul.topnav li a.router-link-active, ul.topnav li.right a {
	background-color: #4CAF50;
}

ul.topnav li.right {
	float: right;
}

@media screen and (max-width: 600px){
	ul.topnav li.right, ul.topnav li {
		float: none;
	}
}
</style>
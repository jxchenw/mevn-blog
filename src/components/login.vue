<template>
	<div class="container">
		<form>
			<div>{{ error_message }}</div>
			<div class="row">
				<div class="col-25">
					<label for="username">Username/Email Address</label>
				</div>
				<div class="col-75">
					<input type="text" name="username" v-model="user.username" />
				</div>
			</div>
			<div class="row">
				<div class="col-25">
					<label for="password">Password</label>
				</div>
				<div class="col-75">
					<input type="password" name="password" v-model="user.password" />
				</div>
			</div>
			<div class="row submit_form">
				<button @click.prevent="login" type="submit">Login</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			error_message: '',
			user: {
				username: '',
				password: ''
			}
		}
	},
	methods: {
		'login': function() {
			this.$http.post('http://localhost:4000/api/login', this.user).then(function(info) {
				this.$session.start();
				this.$session.set('jwt', info.body);
				this.$router.push({ path: '/user/personal' });
			}).catch(function(err) {
				this.error_message = err.bodyText;
			});
		}
	},
	beforeCreate: function() {
		if(this.$session.exists()) {
			this.$router.push({ path: '/user/personal' });
		}
	}
}
</script>

<style scoped>
.container {
	width: 80%;
	margin: 0 auto;
}
* {
	box-sizing: border-box;
}
form {
	width: 80%;
	margin: 0 auto;
}
.submit_form {
	text-align: center;
}
input {
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
}
button:hover {
	background-color: #45a049;
}
.container {
	border-radius: 5px;
	background-color: #f2f2f2;
	padding: 20px;
}
.row {
	margin: 30px 0;
}
.row > div {
	float: left;
	margin-top: 6px;
}
.col-25 {
	width: 25%;
}
.col-75 {
	width: 75%;
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
</style>
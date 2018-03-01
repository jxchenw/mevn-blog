<template>
	<div class="container">
		<p v-if="error_messages.length">
			<b>Please correct the following error(s):</b>
			<ul>
				<li v-for="error in error_messages">{{ error }}</li>
			</ul>
		</p>
		<div class="row">
			<div class="col-35 login_area">
				<h2>Log in</h2>
				<form id="loginForm">
					<div class="row">
						<label for="username">Username/Email Address</label>
						<input type="text" name="username" v-model="userLog.username" />
					</div>
					<div class="row">
						<label for="password">Password</label>
						<input type="password" name="password" v-model="userLog.password" />
					</div>
					<div class="row submit_form">
						<button class="btn btn_blue" @click.prevent="login" type="submit">Login</button>
					</div>
				</form>
			</div>
			<div class="col-65 register_area">
				<h2>Not yet registered?</h2>
				<form enctype="multipart/form-data">
					<div class="row">
						<div class="col-10">Profile</div>
						<div class="col-90 uploaded_box">
							<transition name="fade" mode="out-in">
								<div class="imageprev" v-if="hasUploaded" key="uploaded">
									<img id="preview" v-bind:src="tmpImage" />
									<img id="close" src="../assets/close.png" @click="cancleUploading">
								</div>
								<div class="dropbox" v-if="!hasUploaded" key="initial">
									<input type="file" :name="uploadFieldName" @change="uploadProfile($event.target.name, $event.target.files)" />
									<p>Drag your file(s) here to begin<br> or click to browse</p>
								</div>
							</transition>
						</div>
					</div>
					<div class="row">
						<div class="col-45">
							<label for="username">Username</label>
							<input type="text" name="username" v-model="userReg.username" />
						</div>
						<div class="col-10 mobile_hide"></div>
						<div class="col-45">
							<label for="email">Email Address</label>
							<input type="text" name="email" v-model="userReg.email" />
						</div>
					</div>
					<div class="row">
						<div class="col-45">
							<label for="phone">Password</label>
							<input type="password" name="password" v-model="userReg.password" />
						</div>
						<div class="col-10 mobile_hide"></div>
						<div class="col-45">
							<label for="confirm_password">Confirm Password</label>
							<input type="password" name="confirm_password" v-model="confirm_password" />
						</div>
					</div>
					<div class="row submit_form">
						<button class="btn btn_green" @click.prevent="register" type="submit">Create new account</button>
					</div>
				</form>
			</div>
		</div>
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
			base_url: '/uploads/',
			hasUploaded: false,
			tmpImage: '',
			uploadFieldName: 'avator',
			error_messages: [],
			confirm_password: '',
			userReg: {
				username: '',
				password: '',
				email: '',
				image: ''
			},
			userLog: {
				username: '',
				password: ''
			}
		}
	},
	methods: {
		uploadProfile: function(fieldName, fileList) {
			var formData = new FormData();
			if(!fileList.length) return;
			formData.append(fieldName, fileList[0], fileList[0].name);

			this.$http.post("http://localhost:4000/api/upload/image", formData).then(function(info) {
				this.tmpImage = this.base_url + info.body.path;
				this.hasUploaded = true;
				this.$session.set('tmp', info.body.path);
			}).catch(function(err) {
				this.error_messages.push(err.bodyText);
			});
		},
		login: function() {
			if(this.userLog.username && this.userLog.password) {
				this.$http.post('http://localhost:4000/api/login', this.userLog).then(function(info) {
					this.$session.set('jwt', info.body);
					this.$emit("userComing");
					this.$router.push({ path: '/user/personal' });
				}).catch(function(err) {
					this.error_messages = [];
					this.error_messages.push(err.bodyText);
				});
			} else {
				this.error_messages = [];
				if(!this.userLog.username)
					this.error_messages.push("Login name required.");
				if(!this.userLog.password)
					this.error_messages.push("Login password required.");
			}
		},
		register: function() {
			if(this.userReg.username && this.userReg.password && this.userReg.email && this.confirm_password && this.userReg.password == this.confirm_password) {
				var tmp = this.$session.get('tmp');
				if(tmp) {
					this.userReg.image = tmp;
				}
				console.log(this.userReg);
				this.$http.post('http://localhost:4000/api/signup', this.userReg).then(function(info) {
					this.$session.set('jwt', info.body);
					this.$emit("userComing");
					this.$router.push({ path: '/user/personal' });
				}).catch(function(err) {
					this.error_messages = [];
					this.error_messages.push(err.bodyText);
				});
			} else {
				this.error_messages = [];
				if(!this.userReg.username)
					this.error_messages.push("Register name required.");
				if(!this.userReg.password)
					this.error_messages.push("Register password required.");
				if(!this.userReg.email)
					this.error_messages.push("Register email required.");
				if(!this.confirm_password)
					this.error_messages.push("confirm password required.");
				if(this.userReg.password != this.confirm_password)
					this.error_messages.push("password and confirm password do not match.");
			}
		},
		cancleUploading: function() {
			var tmp = this.$session.get('tmp');
			this.$http.delete('http://localhost:4000/api/image/' + tmp).then(function(info) {
				this.hasUploaded = false;
				this.$session.remove('tmp');
			}).catch(function(err) {
				this.error_messages.push(err.bodyText);
			});
		}
	},
	created: function() {
		this.$session.start();
		var tmp = this.$session.get('tmp');
		if(tmp) {
			this.tmpImage = this.base_url + tmp;
			this.hasUploaded = true;
			this.$nextTick(() => {});
		}
		
	},
	beforeDestroy: function() {
		if(this.hasUploaded) {
			this.cancleUploading();
		}
	}
}
</script>

<style scoped>
/* Gerenal Style */
* {
	box-sizing: border-box;
	font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
}

a {
	text-decoration: none;
}

form, h2 {
	width: 80%;
	margin: 30px auto;
}

input, select, textarea {
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

.fade-enter-active, .fade-leave-active {
	transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
	opacity: 0
}

/* Big Box */
.register_area {
	border-left: 2px dashed #000;
	background: #d3d3d3;
}

.container {
	border-radius: 5px;
	background-color: #f2f2f2;
	padding: 20px;
}

.row {
	margin: 30px 0;
}

.row:after {
	content: "";
	display: table;
	clear: both;
}

.row > div {
	float: left;
	margin-top: 6px;
}

.col-10 {
	width: 10%;
}

.col-35 {
	width: 35%;
}

.col-50 {
	width: 50%;
}

.col-65 {
	width: 65%;
}

.col-90 {
	width: 90%;
}

.btn {
	color: #fff;
	padding: 12px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.btn_green {
	background-color: #4CAF50;
}

.btn_green:hover {
	background-color: #45a049;
}

.btn_blue {
	background-color: blue;
}

.btn_blue:hover {
	background-color: darkblue;
}

/* Login Area */


/* Registeration Area */
.uploaded_box > div {
	position: relative;
	width: 60%;
}

img#preview {
	width: 100%;
	border: 1px solid #000;
	padding: 3px;
}

img#close {
	width: 24px;
	position: absolute;
	top: -12px;
	right: -12px;
	opacity: 0;
}

.imageprev:hover #close {
	opacity: 1;
}

.dropbox {
	outline: 2px dashed #808080;
	outline-offset: -10px;
	background: #e0ffff;
	color: #696969;
	padding: 10px;
	min-height: 200px;
	position: relative;
	cursor: pointer;
}

.dropbox input {
	opacity: 0;
	width: 100%;
	height: 200px;
	position: absolute;
	cursor: pointer;
}

.dropbox:hover {
	background: #add8e6;
}

.dropbox p {
	font-size: 1.2em;
	text-align: center;
	padding: 50px 0;
}

.submit_form {
	text-align: center;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media (max-width: 600px) {
	.col-10, .col-20, .col-30, .col-25, .col-75, .btn {
		width: 100%;
		margin-top: 0;
	}
	.mobile_hide {
		display: none;
	}
}
</style>
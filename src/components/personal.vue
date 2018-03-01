<template>
	<div class="container">
		<h1>{{ user.username }}: Profile</h1>
		<div class="row">
			<div class="col-25">
				<form enctype="multipart/form-data">
					<div class="prof_img" v-bind:style="{ backgroundImage: 'url(' + this.imgPath + user.image + ')' }">
						<img class="hidden_prof_img" v-bind:src="this.imgPath + user.image">
						<div class="uploadBox">
							<div class="overlay_btn">Upload new image</div>
							<input class="overlay" type="file" @change="uploadImg($event.target.files)" accept="image/*">
						</div>
					</div>
				</form>
			</div>
			<div class="col-50">
				<h3>Contact Information</h3>
				<div class="row">
					<div class="col-15">username: </div>
					<div class="infoArea">
						<div :class="{ hasNoValue : user.username == null }" v-show="!showCase('username')" @click="editBegin('username')">{{ user.username }}</div>
						<input v-show="showCase('username')" @blur="editEnd('username')" type="text" name="username" v-model="user.username" ref="username" />
					</div>
				</div>
				<h3>General Information</h3>
				<div class="row">
					<div class="col-15">phone number: </div>
					<div class="infoArea">
						<div :class="{ hasNoValue : user.phone == null }" v-show="!showCase('phone')" @click="editBegin('phone')">{{ user.phone }}</div>
						<input v-show="showCase('phone')" @blur="editEnd('phone')" type="text" name="phone" v-model="user.phone" ref="phone" />
					</div>
				</div>
				<div class="row">
					<div class="col-15">email address: </div>
					<div class="infoArea">
						<div :class="{ hasNoValue : user.email == null }" v-show="!showCase('email')" @click="editBegin('email')">{{ user.email }}</div>
						<input v-show="showCase('email')" @blur="editEnd('email')" type="text" name="email" v-model="user.email" ref="email" />
					</div>
				</div>
				<h3>Additional Information</h3>
				<div class="row">
					<div class="col-15">address: </div>
					<div class="infoArea">
						<div :class="{ hasNoValue : user.address == null }" v-show="!showCase('address')" @click="editBegin('address')">{{ user.address }}</div>
						<input v-show="showCase('address')" @blur="editEnd('address')" type="text" name="address" v-model="user.address" ref="address" />
					</div>
				</div>
				<div class="row">
					<div class="col-15">city: </div>
					<div class="infoArea">
						<div :class="{ hasNoValue : user.city == null }" v-show="!showCase('city')" @click="editBegin('city')">{{ user.city }}</div>
						<input v-show="showCase('city')" @blur="editEnd('city')" type="text" name="city" v-model="user.city" ref="city" />
					</div>
				</div>
				<div class="row">
					<div class="col-15">province: </div>
					<div class="infoArea">
						<div :class="{ hasNoValue : user.province == null }" v-show="!showCase('province')" @click="editBegin('province')">{{ user.province }}</div>
						<input v-show="showCase('province')" @blur="editEnd('province')" type="text" name="province" v-model="user.province" ref="province" />
					</div>
				</div>
				<div class="row">
					<div class="col-15">postcode: </div>
					<div class="infoArea">
						<div :class="{ hasNoValue : user.postcode == null }" v-show="!showCase('postcode')" @click="editBegin('postcode')">{{ user.postcode }}</div>
						<input v-show="showCase('postcode')" @blur="editEnd('postcode')" type="text" name="postcode" v-model="user.postcode" ref="postcode" />
					</div>
				</div>
			</div>
			<div class="col-25">
				<div class="sticky wind">
					<h3>Action</h3>
					<router-link to="/user/editp">Edit Password</router-link>
					<br/>
					<a @click="deleteUser">Delete User</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			userid: '',
			default_image: '../assets/default_user.png',
			user: {
				username: '',
				phone: '',
				email: '',
				address: '',
				city: '',
				province: '',
				postcode: '',
				image: ''
			},
			editField: '',
			initValue: '',
			imgPath: ''
		}
	},
	methods: {
		deleteUser: function() {
			this.$http.delete(this.$base_url + '/api/user/' + this.userid).then(function(info) {
				this.userid = '';
				this.$session.remove('jwt');
				this.$router.push({ path: '/' });
			}).catch(function(err) {
				console.log(err);
			});
		},
		editBegin: function(val) {
			this.editField = val;
			this.initValue = this.user[val];
			this.$nextTick(() => {
				this.$refs[val].focus();
			});
		},
		showCase: function(val) {
			return this.editField == val;
		},
		editEnd: function(val) {
			var result = this.user[val];
			if(result != this.initValue) {
				var obj = {};
				obj[val] = this.user[val];
				this.$http.put('http://localhost:4000/api/user/' + this.userid, obj).then(function(info) {
					console.log("info has been updated");
				}).catch(function(err) {
					console.log(err);
				})
			}
			this.editField = '';
			this.initValue = '';
		},
		uploadImg: function(filelist) {
			if(!filelist.length) return;
			var formData = new FormData();
			formData.append('avator', filelist[0], filelist[0].name);
			this.$http.post('http://localhost:4000/api/upload/image', formData).then(function(info) {
				if(this.user.image != '') {
					this.$http.delete('http://localhost:4000/api/image/' + this.user.image).then(function(info) {
						console.log('deleted the previous image');
					})
				}
				this.user.image = info.body.path;
				this.$http.put('http://localhost:4000/api/user/' + this.userid, { image: info.body.path }).then(function(info) {
					console.log(info);
				}).catch(function(err) {
					console.log(err);
				});
			}).catch(function(err) {
				console.log(err);
			});
		}
	},
	created: function() {
		if(!this.$session.get('jwt')) {
			this.$router.push({ path: '/user/register'});
		} else {
			this.userid = this.$session.get('jwt');
			this.$http.get(this.$base_url + '/api/user/' + this.userid).then(function(info) {
				this.user = info.body;
				if(info.body.image == '') {
					this.user.image = this.default_image;
					this.imgPath = '/src/assets/';
				} else {
					this.imgPath = '/uploads/';
				}
			}).catch(function(err) {
				console.log(err);
			});
		}
	},
	mounted: function() {
	}
}
</script>

<style scoped>
a {
	color: blue;
	cursor: pointer;
	text-decoration: none;
	margin: 5px 0;
}

.container {
	width: 80%;
	margin: 0 auto;
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

.col-15 {
	width: 15%;
}

.col-25 {
	width: 25%;
}

.col-50 {
	width: 50%;
}

.col-85 {
	width: 85%;
}

.prof_img {
	position: relative;
	text-align: center;
	border: 1px solid #000;
	padding: 3px;
	width: 80%;
	height: 200px;
	background-size: auto 200px;
	background-repeat: no-repeat;
	background-position: center;
}

img {
	visibility: hidden;
}

.uploadBox {
	position: absolute;
	opacity: 0;
	top: 0;
	left: 0;
	width: 100%;
	height: 206px;
	line-height: 200px;
	margin: 0 auto;
	background: #008CBA;
	overflow: hidden;
}

.uploadBox .overlay_btn {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 70%;
	transform: translate(-50%, -50%);
	text-align: center;
	height: 50px;
	line-height: 50px;
	background: transparent;
	border: 2px solid #fff;
	border-radius: 8px;
	font-size: 1.1rem;
	font-weight: bold;
	color: #fff;
}

.uploadBox .overlay {
	position: absolute;
	top: 50%;
	left: 50%;
	opacity: 0;
	height: 50px;
	transform: translate(-50%, -50%);
}

.prof_img:hover .uploadBox {
	animation: showDiaBox .6s forwards;
}

.infoArea * {
	min-height: 18px;
}

.infoArea .hasNoValue {
	width: 200px;
}

.sticky {
	position: sticky;
	top: 0;
	border-left: 2px solid #808080;
	padding-left: 20px;
}

@keyframes showDiaBox {
	from {
		opacity: 0;

	}
	to {
		opacity: 1;
	}
}

</style>
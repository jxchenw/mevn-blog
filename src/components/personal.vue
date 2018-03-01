<template>
	<div>
		<h1>{{ user.username }}: Profile</h1>
		<div class="row">
			<div class="col-25">
				<div class="prof_img">
					<img v-bind:src="'/src/assets/' + user.image">
				</div>
			</div>
			<div class="col-50">
				<h3>Contact Information</h3>
				<div class="row">
					<div class="col-15">username: </div>
					<div class="col-85">
						<span v-show="!showCase('username')" @click="editBegin('username')">{{ user.username }}</span>
						<input v-show="showCase('username')" @blur="editEnd('username')" type="text" name="username" v-model="user.username" />
					</div>
				</div>
				<h3>General Information</h3>
				<div class="row">
					<div class="col-15">phone number: </div>
					<div class="col-85">
						<span v-show="!showCase('phone')" @click="editBegin('phone')">{{ user.phone }}</span>
						<input v-show="showCase('phone')" @blur="editEnd('phone')" type="text" name="phone" v-model="user.phone" />
					</div>
				</div>
				<div class="row">
					<div class="col-15">email address: </div>
					<div class="col-85">
						<span v-show="!showCase('email')" @click="editBegin('email')">{{ user.email }}</span>
						<input v-show="showCase('email')" @blur="editEnd('email')" type="text" name="email" v-model="user.email" />
					</div>
				</div>
				<div class="row">
					<div class="col-15">address: </div>
					<div class="col-85">
						<span v-show="!showCase('address')" @click="editBegin('address')">{{ user.address }}</span>
						<input v-show="showCase('address')" @blur="editEnd('address')" type="text" name="address" v-model="user.address" />
					</div>
				</div>
				<div class="row">
					<div class="col-15">city: </div>
					<div class="col-85">
						<span v-show="!showCase('city')" @click="editBegin('city')">{{ user.city }}</span>
						<input v-show="showCase('city')" @blur="editEnd('city')" type="text" name="city" v-model="user.city" />
					</div>
				</div>
				<div class="row">
					<div class="col-15">province: </div>
					<div class="col-85">
						<span v-show="!showCase('province')" @click="editBegin('province')">{{ user.province }}</span>
						<input v-show="showCase('province')" @blur="editEnd('province')" type="text" name="province" v-model="user.province" />
					</div>
				</div>
				<div class="row">
					<div class="col-15">postcode: </div>
					<div class="col-85">
						<span v-show="!showCase('postcode')" @click="editBegin('postcode')">{{ user.postcode }}</span>
						<input v-show="showCase('postcode')" @blur="editEnd('postcode')" type="text" name="postcode" v-model="user.postcode" />
					</div>
				</div>
				<h3>Additional Information</h3>
				<p></p>
			</div>
			<div class="col-25">
				<div class="sticky wind">
					<h3>Action</h3>
					<router-link to="/user/editp">Edit Password</router-link>
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
			initValue: ''
		}
	},
	methods: {
		deleteUser: function() {
			this.$http.delete(this.$base_url + '/api/user/' + this.userid).then(function(info) {
				this.userid = '';
				this.$session.remove('jwt');
			}).catch(function(err) {
				console.log(err);
			});
		},
		editBegin: function(val) {
			this.editField = val;
			this.initValue = this.user[val];
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
					console.log(info);
				}).catch(function(err) {
					console.log(err);
				})
			}
			this.editField = '';
			this.initValue = '';
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
				}
			}).catch(function(err) {
				console.log(err);
			});
		}
	}
}
</script>

<style scoped>
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
}

img {
	border: 1px solid #000;
	padding: 3px;
	max-height: 200px;
}
</style>
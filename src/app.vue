<template>
	<div>
		<app-header @userComing="changeLoginStatus" :userHere="hasLogin"></app-header>
		<router-view @userComing="changeLoginStatus" :userHere="hasLogin"></router-view>
	</div>
</template>

<script>
import header from './components/header';

export default {
	data() {
		return {
			hasLogin: false
		}
	},
	watch: {
		userHere: function(newVal) {
			this.hasLogin = newVal;
		}
	},
	components: {
		'app-header': header
	},
	methods: {
		changeLoginStatus: function() {
			this.hasLogin = !this.hasLogin;
		}
	},
	created: function() {
		var username = this.$session.get('jwt');
		if(username)
			this.hasLogin = true;
	}
}
</script>

<style scoped></style>
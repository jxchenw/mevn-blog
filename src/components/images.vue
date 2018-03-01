<template>
	<div>
		<h2>Good Job, now upload your images</h2>
		<form enctype="multipart/form-data" method="post">
			<input class="uploadSingle_hide" type="file" :name="uploadFileName" @change="uploadChange($event.target.name, $event.target.files)" />
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			uploadFileName: 'avator'
		}
	},
	methods: {
		uploadChange: function(fileName, fileObj) {
			if(!fileObj.length) return;

			var formData = new FormData();
			formData.append(fileName, fileObj[0], fileObj[0].filename);
			var userId = this.$session.get('jwt')._id;
			formData.append('userId', userId);

			this.$http.post('http://localhost:4000/api/upload/image', formData).then(function(info) {
				console.log(info);
			}).catch(function(err) {
				console.log(err);
			});
		}
	}
}
</script>

<style scoped></style>
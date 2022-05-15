<template>
	<v-flex column wrap class="mt-16 pt-16" >
		<div class="text-center text-h3 font-weight-light">
			Please log in to access site
		</div>
		<div class="d-flex justify-center mt-16">
			<v-btn  rounded color="primary" @click="goHome()">Sign in</v-btn>
		</div>
	</v-flex>
</template>

<script>
export default {
	name: 'PleaseLogIn',
	methods: {
		goHome() {
			this.$router.push(`/`)
		}
	}
}
</script>
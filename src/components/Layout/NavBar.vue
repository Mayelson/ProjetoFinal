<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<img src="../../../src/assets/logo.png" class="navbar-brand logo">
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<router-link  to="/home" class="nav-link">Home</router-link >
				</li>
				<li class="nav-item active">
					<router-link  to="/navigation" class="nav-link">Navigation</router-link >
				</li>
				<li class="nav-item active">
					<router-link  to="/about" class="nav-link">About Us</router-link >
				</li>
			</ul>
			</div>
		</nav>
	</div>
</template>

<script type="text/javascript">

    export default {

    }
</script>

<style type="text/css">
	.logo{
		width: 60px;
		height: 60px;
	}
</style>
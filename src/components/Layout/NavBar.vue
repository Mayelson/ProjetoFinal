<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<router-link to="/home"><img src="../../../src/assets/logo.png" class="navbar-brand logo"></router-link>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<router-link  to="/home" id="home" class="nav-link">Home</router-link >
				</li>
				<li class="nav-item active">
					<router-link  to="/navigation" id="navigation" class="nav-link">Navegação</router-link >
				</li>
				<li class="nav-item active">
					<router-link  to="/about" id="about" class="nav-link">Sobre Nós</router-link >
				</li>
			</ul>
			</div>
			<div id="google_translate_element"></div>
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
	#language{
		background-color: #841818;
		border-radius: 50%;
		width: 55px;
		height: 55px;
		border: 0px;
		color: #e9ecef;
		
	}
	#language:hover{
		opacity: 0.8;
		cursor: pointer;

	}
	li{
		margin-left: 30px;
	}
	a.goog-te-menu-value > span {
		color: black;
	}
	a.goog-te-menu-value {
		text-decoration: none;
	}
	div.goog-te-gadget-simple {
		border-radius: 15px;
		background-color: #841818;
		padding: 7px;
	}
/*	.skiptranslate{
		display: none;
	}*/
</style>
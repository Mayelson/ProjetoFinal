<template>
	<div class="row">
		<div class="col-12">
			<div class="jumbotron">
				<center>
			  		<h1 class="display-4"><b>Bem Vindo à Reconstrução Miróbriga </b></h1>
				</center>
				<center>
			  		<p class="lead"><h6>Esta é uma plataforma de interação virtual de duas habitações Miróbrigas!</h6></p>
			  	</center>
			  	<hr class="my-4">
			 	<div class="row">
				  	<div class="col-8 col-md4 offset-md-2">
						<router-link class="btn btn-lg btn-block" to="navigation" id="btnNavigations"><b>Navigation</b></router-link>
				  	</div>
			  	</div>
			  	<br>
			  	<center>
		  			<p>Ainda não conheces Míróbriga? Click no botão acima para começares a tua experiência</p>
			  	</center>
			</div>

			<div class="card">
				<h4 class="card-header">História</h4>
				<div class="card-body">
					<div class="row">
						<div class="col" >
							<p id="historia">Miróbriga ou Miróbrica dos Célticos, mais conhecida somente como Miróbriga ou Miróbrica, é uma antiga cidade romana situada perto da vila e freguesia de Santiago do Cacém, no município de mesmo nome no sul-oeste de Portugal. “A arqueologia revelou que a cidade ocupou o local de um antigo povoado da Idade do Ferro que existia desde o século IX a.C.”</p>
							<p id="historia">Miróbriga representa um dos mais marcantes vestígios da ocupação dos romanos no Sudoeste de Portugal. Foi classificada de Imóvel de Interesse Público, em 1940. A cidade romana estende-se por mais de 2 km, apresentando ruínas de edifícios de habitação, dois dos quais fizemos a modelação 3D, ruas pavimentadas, um hipódromo, termas, uma ponte e um fórum. </p> 
						</div>
						<div class="col">
							<figure>
								<img src="../../src/assets/termas.jpg" class="img">	
								<figcaption>Fig.1 - Ruínas Miróbriga, Termas</figcaption>
							</figure>
						</div>
					</div>
				</div>
			</div>
			<br>
		</div>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		data(){
			return {
				element: null
			}
		},
		mounted () {
			this.element = document.getElementById("home");
			this.element.style.backgroundColor = "#841818";
			this.element.style.borderRadius = "5px"

		},
		destroyed(){
			this.element.style.backgroundColor = "#f8f9fa";

		}
	}
</script>

<style type="text/css">
	.img { 
		width: 100%;	
	}
	#btnNavigations{
		border: 10px;
		background-color:  #841818;
		padding-top: 12px;
		height: 60px;
		color: #e9ecef;

	}
	#btnNavigations:hover{
		cursor: pointer;
		opacity: 0.8;
	}
	#historia{
		text-align: justify;
    	text-justify: inter-word;
    	line-height: 30px;

	}
	figure	{
		border: 4px solid;
		border-color: #841818;
		text-align: center;
	}
</style>
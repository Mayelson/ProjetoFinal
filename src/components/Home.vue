<template>
	<div class="row">
		<div class="col-12">
			<div class="jumbotron">
			  <h1 class="display-4">Welcome to Miróbriga Reconstruction</h1>
			  <p class="lead">Esta é uma plataforma de interação virtual de duas habitações Miróbrigas!</p>
			  <hr class="my-4">
			  <p>Miróbriga é uma cidade romana situada perto da vila e freguesia de Santiago de Cacém, no município de mesmo nome no sul-oeste de Portugal.</p>
			  <p>Ainda não conheces Míróbriga? Não te preocupes! A ERM veio para te ajudar! Click no botão abaixo para começares a tua visita.</p>
			  <div class="row">
				  <div class="col-8 col-md4 offset-md-2">
				  	 <router-link class="btn btn-primary btn-lg btn-block" to="navigation" role="button">Navigation</router-link>
				  </div>
			  </div>
			</div>

			<div class="card">
				<h5 class="card-header">História</h5>
				<div class="card-body">
					<div class="row">
						<div class="col">
							<p align="justiffy">Miróbriga ou Miróbrica dos Célticos, mais conhecida somente como Miróbriga ou Miróbrica, é uma antiga cidade romana situada perto da vila e freguesia de Santiago do Cacém, no município de mesmo nome no sul-oeste de Portugal. “A arqueologia revelou que a cidade ocupou o local de um antigo povoado da Idade do Ferro que existia desde o século IX a.C.”</p>
							<p>Miróbriga representa um dos mais marcantes vestígios da ocupação dos romanos no Sudoeste de Portugal. Foi classificada de Imóvel de Interesse Público, em 1940. A cidade romana estende-se por mais de 2 km, apresentando ruínas de edifícios de habitação, dois dos quais fizemos a modelação 3D, ruas pavimentadas, um hipódromo, termas, uma ponte e um fórum. </p>
							<p>A sua origem etimológica deriva de dois vocábulos celtas antigos miro/more (mar) e briga (fortaleza), pelo que o topónimo significa Fortaleza do Mar.
							O despovoamento de Miróbriga, terá ocorrido, segundo os testemunhos arqueológicos até agora apurados, no século IV, altura da decadência do império romano registado amiúde em outras cidades.</p>

						</div>
						<div class="col">
							<img src="../../src/assets/Mirobriga.jpg" class="img">
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
		
	}
</script>

<style type="text/css">
	.img { 
		width: 100%;	
	}
</style>
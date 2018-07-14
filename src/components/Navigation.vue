<template>
	<div class="row">
		<div class="col-12">
			<div class="card">
				<h4 class="card-header">Navegação</h4>
				<div class="card-body">
					<a id="btnNavigations" class="btn" href="http://localhost:8080/fases.html?fase=1">Primeira Fase</a>
					<hr>
					<div class="row">
						<div class="col-md-4">
							<center>
								
							<figure>
								<img src="../../src/assets/fase1.png" class="img" width="250px" height="250px">	
								<figcaption>Fig.1 - Primeira Fase, Casa 1</figcaption>
							</figure>
							</center>
						</div>
						<div class="col" >
								<h5>Primeira Fase</h5>
								<p id="textos">
									&emsp;&emsp;Correspondem a cronologia de fundação de ambos os edificios, ou seja, ....
								</p>
								<p id="textos">
									Em relação ao edificio nº 1, ele deixa de contar com um átrio aberto, que forneceria luz às divisões circundantes e passa a ser um edifício todo fechado.
								</p>
						</div>
						<div class="col-md-4">
							<center>
							<figure>
								<img src="../../src/assets/fase1.png" class="img" width="250px" height="250px">	
								<figcaption>Fig.2 - Primeira Fase, Casa 2</figcaption>
							</figure>
							</center>
						</div>	
					</div>
					<br><br>
					<a id="btnNavigations" class="btn" href="http://localhost:8080/fases.html?fase=2">Segunda Fase</a>
					<hr>
					<div class="row">
						<div class="col-md-4">
							<center>
								
							<figure>
								<img src="../../src/assets/fase1.png" class="img" width="250px" height="250px">	
								<figcaption>Fig.1 - Segunda Fase, Casa 1</figcaption>
							</figure>
							</center>
						</div>
						<div class="col" >
							<h5>Segunda Fase</h5>
							<p id="textos">
								&emsp;&emsp;Em relação ao edificio nº 1, ele deixa de contar com um átrio aberto, que forneceria luz às divisões circundantes e passa a ser um edifício todo fechado.
							</p>
							<p id="textos">
								Já o edificio nº 2, corresponde a amortização do dos espaço aberto ficando apenas o espaço fechado em funcionamento
							</p>
						</div>
						<div class="col-md-4">
							<center>
							<figure>
								<img src="../../src/assets/fase1.png" class="img" width="250px" height="250px">	
								<figcaption>Fig.2 - Segunda Fase, Casa 2</figcaption>
							</figure>
							</center>
						</div>	
					</div>
				</div>
			</div>
		</div>
	</div>

</template>
<script type="text/javascript">
export default	{
	data(){
		return {
			 element: null		}
	},
	mounted () {
		this.element = document.getElementById("navigation");
		this.element.style.backgroundColor = "#841818";
		this.element.style.borderRadius = "5px";

	},
	destroyed(){
		this.element.style.backgroundColor = "#f8f9fa";

	}
}
</script>
<style type="text/css">
	#btnNavigations{
		border: 10px;
		background-color:  #841818;
		padding-top: 18px; 
		color: #e9ecef;
		height: 60px;
		width: 100%;


	}
	#btnNavigations:hover{
		cursor: pointer;
		opacity: 0.8;
	}
	figure{
		border: 4px solid;
		border-color: #841818;
		text-align: center;
		width: 259px;
	}
	#textos{
		text-align: justify;
    	text-justify: inter-word;
    	line-height: 30px;

	}
	hr{
		border: 2px solid;
		border-color: #841818;
	}
/*	.row{
		border: 4px solid;
	}
	.col{
		border: 4px silver solid;
	}*/
</style>
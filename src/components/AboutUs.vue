<template>
	<div class="row">
		<div class="col-12">
			<div class="card">
				<h4 class="card-header">Sobre Nós</h4>
				<div class="card-body">
					<div class="row">
						<div class="col-md-8 offset-md-2">
							<p><h5>Equipa</h5></p>
							<p id="texto">
								&emsp;&emsp;Somos uma equipa composta por dois alunos do Institulo Politécnico de Leiria, do terceiro ano do curso de licenciatura em Engenharia Informática e por três orientadores, onde recosntruimos no âmbito do Projeto Informático, duas fases de duas habitações romanas, com o propósito de proporcionar aos nossos utilizadores uma visita interativa na web graças ao recurso a nova tecnologia WebGl.
							</p>
						</div>
					</div>

					<div class="row">			
						<div class="col-md-8 offset-md-2">
							<p><h5>Logotipo</h5></p>
							<img src="../../src/assets/logo.png"><br> ERM - Equipa de Recontrução miróbriga <br>
							EIMSBS - Engeharia informática Mayelson de Sousa Bruno de Sousa
						</div>
					</div>
					<br>
					<div class="row">
						<div class="col-md-8 offset-md-2">
							<p><h5>Contactos dos Alunos</h5></p>
							<table class="table">
							  <thead class="thead-light">
							    <tr>
							      <th scope="col">Nome</th>
							      <th scope="col">Número</th>
							      <th scope="col">Email</th>
							    </tr>
							  </thead>
							  <tbody>
							    <tr>
							      <td>Mayelson de Sousa</td>
							      <td>2151582</td>
							      <td>2151582@my.ipleiria.pt</td>
							    </tr>
							    <tr>
							      <td>Bruno Miguel Viana de Sousa</td>
							      <td>2172021</td>
							      <td>2172021@my.ipleiria.pt</td>
							    </tr>
							  </tbody>
							</table>
						</div>
					</div>

					<div class="row">
						<div class="col-md-8 offset-md-2">
							<p><h5>Contactos dos Orientador</h5></p>
							<table class="table">
							  <thead class="thead-light">
							    <tr>
							      <th scope="col">Nome</th>
							      <th scope="col">Cargo</th>
							      <th scope="col">Email</th>
							    </tr>
							  </thead>
							  <tbody>
							    <tr>
							      <td>Anabela Gonçalves Rodrigues Marto </td>
							      <td>Professora</td>
							      <td>anabela.marto@ipleiria.pt</td>
							    </tr>
							    <tr>
							      <td>Alexandrino José Marques Gonçalves</td>
							      <td>Professor</td>
							      <td>alex@ipleiria.pt</td>
							    </tr>
							    <tr>
							      <td>Nuno Carlos Sousa Rodrigues</td>
							      <td>Professor e Coordenador</td>
							      <td>nunorod@ipleiria.pt</td>
							    </tr>
							  </tbody>
							</table>
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
				element: null
			}
		},
		mounted () {
			this.element = document.getElementById("about");
			this.element.style.backgroundColor = "#841818";
			this.element.style.borderRadius = "5px"

		},
		destroyed(){
			this.element.style.backgroundColor = "#f8f9fa";

		}
	}
</script>

<style  type="text/css">

	#texto{
		text-align: justify;
    	text-justify: inter-word;
    	line-height: 30px;
	}
</style>
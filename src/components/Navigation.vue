<template>
	<div class="row">
		<div class="col-12">
			<div class="card">
				<h5 class="card-header">Navigation</h5>
				<div class="card-body">
					<p class="card-text">
						A Navegação permite proporciona ao utilizador uma visita interativa na web de duas habitações (Edifício nº1 e Edifício nº2) Miróbriga graças ao recurso a nova tecnologia WebGl.
					</p>
					<p>
						<b>Primeira fase:</b> <br>
						Correspondem a cronologia de fundação de ambos os edificios.
					</p>
					<p>
						<b>Segunda fase:</b><br>
						Em relação ao edificio nº 1, ele deixa de contar com um átrio aberto, que forneceria luz às divisões circundantes e passa a ser um edifício todo fechado.
						<p>Ja o edificio nº2  corresponde a amortização do dos espaço aberto ficando apenas o espaço fechado em funcionamento</p>
					</p>
					<div class="row">
						<div class="col-8 offset-md-2">
							<router-link :to="{ name: 'fases', params: { fase: 1 }}"  class="btn btn-primary btn-lg btn-block">Primeira Fase</router-link>
						</div>
					</div>
					<br>
					<div class="row">
						<div class="col-8 offset-md-2">
							<a class="btn btn-primary btn-lg btn-block" href="http://localhost:8080/fase2.html">Segunda Fase</a>
						</div>
					</div>
					<br>
				</div>
			</div>
		</div>
	</div>

</template>
<script type="text/javascript">
export default	{

}
</script>
<style type="text/css">
	button{
		background-color: #841818;
	}
</style>
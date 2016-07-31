angular.module('starter')
.controller('ListagemController', function($scope, CarService) {

	CarService.obterCarros()
	.then(function(dados) {
		$scope.listaDeCarros = dados;
	});

});

angular.module('starter')
.controller('CarroEscolhidoController', function($stateParams, $scope) {

	$scope.carroEscolhido = angular.fromJson($stateParams.carro);

	$scope.listaDeAcessorios = [{"nome": "Freios ABS", "preco": 800},
								{"nome": "Ar Condicionado", "preco": 1000},
								{"nome": "MP3 Player", "preco": 500}];

	$scope.atualizaValor = function(acessorio, marcado) {

		if (marcado) {
			$scope.carroEscolhido.preco += acessorio.preco; 
		}
		else {
			$scope.carroEscolhido.preco -= acessorio.preco; 
		}
	};
});

angular.module('starter')
.controller('FinalizarPedidoController', function($stateParams, $scope, $ionicPopup, $state, CarService) {

	$scope.carroFinalizado = angular.fromJson($stateParams.carro);

	$scope.pedido = {};

	$scope.finalizarPedido = function() {

		var pedidoFinalizado = {
			params: {
				carro: $scope.carroFinalizado.nome,
				preco: $scope.carroFinalizado.preco,
				nome: $scope.pedido.nome,
				endereco: $scope.pedido.endereco,
				email: $scope.pedido.email
			}
		}

		CarService.salvarPedido(pedidoFinalizado)
		.then(function() {
			$ionicPopup.alert({
				title: 'Parabéns',
				template: 'Você acaba de comprar um carro.'
			})
			.then(function() {
				$state.go('listagem');
			});
		}, function(erro) {
			$ionicPopup.alert({
				title: 'Deu erro',
				template: 'Campos obrigatórios.'
			});
		})
	}
});
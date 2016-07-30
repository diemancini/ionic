angular.module('starter')
.controller('ListagemController', function($scope) {
	
	$scope.listaDeCarros = [{"nome": "BMW 120i", "preco": 70000}];
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
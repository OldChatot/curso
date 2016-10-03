var pokedexMod = angular.module('pokedex',['ngRoute']);

pokedexMod.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when("/",{ // Vista principal (lista de Pokémon)
		templateUrl: "vistas/vista1.html",
		controller: Ctrl.todosCtrl
	})
	.when("/id/:id",{ // Info sobre los Pokémon
		templateUrl: "vistas/vista2.html",
		controller: Ctrl.idCtrl
	})
	.when("/move/:move",{ // Info sobre los movimientos
		templateUrl: "vistas/vista3.html",
		controller: Ctrl.movesCtrl
	})
	.when("/moves/",{ // Lista de movimientos
		templateUrl: "vistas/vista5.html",
		controller: Ctrl.listaMovesCtrl
	})
	.when("/moves/pagina/:pag",{ // Pasar página en los movimientos
		templateUrl: "vistas/vista5.html",
		controller: Ctrl.pasaPaginaMoves
	})
	.when("/pagina/:pag",{ // Pasar página en los Pokémon
		templateUrl: "vistas/vista1.html",
		controller: Ctrl.pasaPagina
	})
	.otherwise({
		redirectTo: "/"
	});
}])
pokedexMod.filter("guionesFuera", function(){
    return function(text) {
        if(text != null){
            return text.replace("-", " "); // No se pueden meter 2 returns seguidos!!!
        }
    }
})
pokedexMod.directive('ngNav',function(){ // Menú
	return {
		restrict: 'E', // Etiqueta
		templateUrl: 'vistas/vista4.html', // código HTML del menú
		controller: Ctrl.Drtvs.navegacion, // inicializa el modelo
		link: Ctrl.Drtvs.Links.barraNav // modificar DOM
	}
})
pokedexMod.directive('ngCambioEstilo',function(){ // Cursiva al pasar el ratón
	return {
		restrict: 'A', // Atributo
		link: Ctrl.Drtvs.Links.cambioEstilo // para modificar DOM
	}
})
pokedexMod.directive('ngImg',function(){ // Plantilla de imágenes
	return {
		restrict: 'E', // Etiqueta
		templateUrl: 'vistas/img.html', // código HTML del menú
		controller: Ctrl.Drtvs.img, // inicializa el modelo
		scope: true,
		transclude: true
	}
})
pokedexMod.directive('cajaBusqueda',function(){ // Caja de búsqueda de Pokémon
	return {
		restrict: 'E',
		template: '<p class="busquedaPkmn"><label>Búsqueda de Pokémon por nombre o ID:</label> <input type="text" ng-model="filtroPkmn" ng-keypress="teclaIntro($event)"></p>',
		controller: Ctrl.Drtvs.busqueda
	}
})
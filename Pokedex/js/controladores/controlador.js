var Ctrl = (function(){
	var _todosCtrl = function($scope,$rootScope,$http,$window,$log){
		$rootScope.indice = 1; // Número a asignar como ID
		$http.get("http://pokeapi.co/api/v2/pokemon/")
		.success(function(pokemon){
			$scope.pokemon = pokemon.results;
			angular.forEach($scope.pokemon,function(k,v){
				k.id = $rootScope.indice; // Asignar IDs a los pokemon
				$rootScope.indice = $rootScope.indice + 1
			})
			$rootScope.raiz = true // Confirma que es el inicio de la lista
			$rootScope.num = 0; // Número de página
			$rootScope.urlNext = pokemon.next; // URL de la página siguiente
		})
		.error(function(err){
			$window.alert("Fallo en la petición AJAX: " + err.code + " - " + err.message);
		});
	}
	var _listaMovesCtrl = function($scope,$rootScope,$http,$window,$log){
		$rootScope.indiceMov = 1;
		$http.get("http://pokeapi.co/api/v2/move/")
		.success(function(moves){
			$scope.moves = moves.results;
			angular.forEach($scope.moves,function(k,v){
				k.id = $rootScope.indiceMov; // Asignar IDs a los pokemon
				$rootScope.indiceMov = $rootScope.indiceMov + 1
			})
			$rootScope.raiz1 = true
			$rootScope.num1 = 0;
			$rootScope.urlNext1 = moves.next;
		})
		.error(function(err){
			$window.alert("Fallo en la petición AJAX: " + err.code + " - " + err.message);
		});
	}
	var _idCtrl = function($scope,$http,$window,$routeParams,$log,$rootScope){
		$http.get("http://pokeapi.co/api/v2/pokemon/" + $routeParams.id)
		.success(function(pokemon){
			$scope.pokemon = pokemon;
			$scope.moves = pokemon.moves;
			$scope.tipos = pokemon.types;
			$scope.listaMoves = []; // Lista de movimientos del Pokémon
			angular.forEach($scope.moves,function(v,k){ // Por algún motivo Angular recoge la clave y el valor al revés
				var datosMov = {};
				datosMov.name = v.move.name;
				datosMov.url = v.move.url;
				$http.get(datosMov.url)
					.success(function(nombres){
						datosMov.nombreEsp = nombres.names[2].name
					})
				datosMov.indice = v.move.url.substr(30); // Aísla la ID asociada con el movimiento
				$scope.listaMoves.push(datosMov);
			})
			$scope.listaTipos = []; // Tipos del Pokémon
			angular.forEach($scope.tipos,function(v,k){
				var datosTipo = {};
				datosTipo.name = v.type.name;
				datosTipo.url = v.type.url;
				$http.get(datosTipo.url)
					.success(function(nombres){
						datosTipo.nombreEsp = nombres.names[4].name // Recoge el nombre en español
					})
				datosTipo.indice = v.type.url.substr(30); // Aísla la ID asociada con el tipo
				$scope.listaTipos.push(datosTipo);
			})
		})
		.error(function(err){
			$window.alert("Fallo en la petición AJAX: " + err.code + " - " + err.message);
		});
		$scope.criterio = {}; // Criterio de orden
		$scope.criterio.columna = 'id';
		$scope.criterio.sentido = false;
		$scope.filtro = {};
		$rootScope.spriteId = (parseInt($routeParams.id));
	}
	var _movesCtrl = function($scope,$http,$window,$routeParams,$log,$rootScope){
		$http.get("http://pokeapi.co/api/v2/move/" + $routeParams.move) // Variable asociada a la ruta (de app.js)
		.success(function(move){
			$scope.move = move;
		})
		.error(function(err){
			$window.alert("Fallo en la petición AJAX: " + err.code + " - " + err.message);
		});
		$scope.damage = function(cad){ // Comprueba si el movimiento contiene "damage" en su nombre de categoría
			var contiene = false;
			if (cad.indexOf("damage") >= 0){
				contiene = true;
			}
			return contiene;
		}
		$scope.tipoAtaqueIng = function(tipo){ // Traducción de los tipos
			salida = true;
			switch (tipo) {
			    case "ice":
			        $scope.tipoAtaqueEsp = "Hielo";
			        break;
			    case "fire":
			        $scope.tipoAtaqueEsp = "Fuego";
			        break;
			    case "normal":
			        $scope.tipoAtaqueEsp = "Normal";
			        break;
			    case "ghost":
			        $scope.tipoAtaqueEsp = "Fantasma";
			        break;
			    case "dragon":
			        $scope.tipoAtaqueEsp = "Dragón";
			        break;
			    case "water":
			        $scope.tipoAtaqueEsp = "Agua";
			        break;
			    case "fighting":
			        $scope.tipoAtaqueEsp = "Lucha";
			        break;
			    case "fairy":
			        $scope.tipoAtaqueEsp = "Hada";
			        break;
			    case "dark":
			        $scope.tipoAtaqueEsp = "Siniestro";
			        break;
			    case "steel":
			        $scope.tipoAtaqueEsp = "Acero";
			        break;
			    case "grass":
			        $scope.tipoAtaqueEsp = "Planta";
			        break;
			    case "poison":
			        $scope.tipoAtaqueEsp = "Veneno";
			        break;
			    case "electric":
			        $scope.tipoAtaqueEsp = "Eléctrico";
			        break;
			    case "ground":
			        $scope.tipoAtaqueEsp = "Tierra";
			        break;
			    case "rock":
			        $scope.tipoAtaqueEsp = "Roca";
			        break;
			    case "flying":
			        $scope.tipoAtaqueEsp = "Volador";
			        break;
			    case "psychic":
			        $scope.tipoAtaqueEsp = "Psíquico";
			        break;
			    case "bug":
			        $scope.tipoAtaqueEsp = "Bicho";
			        break;
			    default:
			    	salida = false;
			}
			return salida;
		}
		$scope.cambioEstadoIng = function(tipo){ // Alteraciones de estado
			salida = true;
			switch (tipo) {
				case "freeze":
					$scope.cambioEstadoEsp = "congelar";
					break;
				case "burn":
					$scope.cambioEstadoEsp = "quemar";
					break;
				case "poison":
					$scope.cambioEstadoEsp = "envenenar";
					break;
				case "confusion":
					$scope.cambioEstadoEsp = "confundir";
					break;
				case "infatuation":
					$scope.cambioEstadoEsp = "enamorar";
					break;
				case "sleep":
					$scope.cambioEstadoEsp = "dormir";
					break;
				case "paralysis":
					$scope.cambioEstadoEsp = "paralizar";
					break;
				case "trap":
					$scope.cambioEstadoEsp = "atrapar";
					break;
				case "nightmare":
					$scope.cambioEstadoEsp = "provocar pesadillas";
					break;
			    default:
			    	salida = false;
			}
			return salida;
		}
		$scope.statsIng = function(tipo){ // Cambios de características
			salida = true;
			switch (tipo) {
				case "attack":
					$scope.statsEsp = "Ataque";
					break;
			    case "defense":
					$scope.statsEsp = "Defensa";
					break;
				case "speed":
			        $scope.statsEsp = "Velocidad";
					break;
				case "accuracy":
					$scope.statsEsp = "Precisión";
					break;
				case "evasion":
					$scope.statsEsp = "Evasión";
					break;
				case "special-attack":
					$scope.statsEsp = "At. Especial";
					break;
				case "special-defense":
					$scope.statsEsp = "Def. Especial";
					break;
			    default:
			    	salida = false;
			}
			return salida;
		}
		$scope.tipoPoderIng = function(tipo){ // Tipo de movimiento (daño físico, daño especial, estado)
			salida = true;
			switch (tipo) {
				case "physical":
					$scope.tipoPoderEsp = "físico";
					break;
				case "special":
					$scope.tipoPoderEsp = "especial";
					break;
				case "status":
					$scope.tipoPoderEsp = "estado";
					break;
			    default:
			    	salida = false;
			}
			return salida;
		}
		$scope.alcanceIng = function(tipo){ // Alcance del movimiento
			salida = true;
			switch (tipo) {
				case "user":
					$scope.alcanceEsp = "Usuario";
					break;
				case "selected-pokemon":
					$scope.alcanceEsp = "Un Pokémon";
					break;
				case "all-opponents":
					$scope.alcanceEsp = "Todos los enemigos";
					break;
				case "user-or-ally":
					$scope.alcanceEsp = "Un aliado";
					break;
				case "all-other-pokemon":
					$scope.alcanceEsp = "Todos menos el usuario";
					break;
				case "random-opponent":
					$scope.alcanceEsp = "Aleatorio";
					break;
				case "all-pokemon":
					$scope.alcanceEsp = "Todos los combatientes";
					break;
				case "ally":
					$scope.alcanceEsp = "Un aliado (no puede ser el usuario)";
					break;
				case "user-and-allies":
					$scope.alcanceEsp = "Aliados";
					break;
				case "random-opponent":
					$scope.alcanceEsp = "Enemigo aleatorio";
					break;
				case "specific-move":
					$scope.alcanceEsp = "Varía según el contexto";
					break;
				case "selected-pokemon-me-first":
					$scope.alcanceEsp = "Un Pokémon, ejecuta su ataque";
					break;
				case "entire-field":
					$scope.alcanceEsp = "Genérico, no afecta directamente a los Pokémon";
					break;
				case "users-field":
					$scope.alcanceEsp = "Aliados, sin afectarles directamente";
					break;
				case "opponents-field":
					$scope.alcanceEsp = "Enemigos, sin afectarles directamente";
					break;
			    default:
			    	salida = false;
			}
			return salida;
		}
	}
	var _pasaPagina = function($scope,$http,$window,$routeParams,$log,$rootScope){
		$routeParams.pag = $rootScope.num; // Intento asociar el múmero de página con el de la ruta
		if ($rootScope.raiz == true && $rootScope.sentido =='alante'){ // La propiedad "raiz" sirve para detectar si la lista se encuentra en su posición raíz (principio)
			$http.get($rootScope.urlNext)
			.success(function(pokemon){
				$scope.pokemon = pokemon.results;
				angular.forEach($scope.pokemon,function(k,v){
					k.id = $rootScope.indice; // Asignar IDs a los pokemon
					$rootScope.indice = $rootScope.indice + 1
				})
					$rootScope.raiz = false;
					$rootScope.urlNext = pokemon.next;
					$rootScope.urlPrev = pokemon.previous; // URL de la página anterior
					$rootScope.num = parseInt($rootScope.num) + 1;
			})
			.error(function(err){
			$window.alert("Fallo en la petición AJAX: " + err.code + " - " + err.message);
		});
		}
		if ($rootScope.raiz == false && $rootScope.sentido =='alante'){
			$http.get($rootScope.urlNext)
			.success(function(pokemon){
				$scope.pokemon = pokemon.results;
				angular.forEach($scope.pokemon,function(k,v){
					k.id = $rootScope.indice; // Asignar IDs a los pokemon
					$rootScope.indice = $rootScope.indice + 1
				})
					$rootScope.raiz = false;
					$rootScope.urlNext = pokemon.next;
					$rootScope.urlPrev = pokemon.previous;
					$rootScope.num = parseInt($rootScope.num) + 1;
					if($rootScope.num >= 40){
						$rootScope.raiz = true; // En este caso no significa el principio de la lista, sino el final
					}
				})
				.error(function(err){
				$window.alert("Fallo en la petición AJAX: " + err.code + " - " + err.message);
			});
		}
		if ($rootScope.raiz == false && $rootScope.sentido =='atras'){
			$http.get($rootScope.urlPrev)
			.success(function(pokemon){
				$scope.pokemon = pokemon.results;
				$rootScope.indice = $rootScope.indice - 40;
				angular.forEach($scope.pokemon,function(k,v){
					k.id = $rootScope.indice; // Asignar IDs a los pokemon
					$rootScope.indice = $rootScope.indice + 1
				})
					$rootScope.raiz = false;
					$rootScope.urlNext = pokemon.next;
					$rootScope.urlPrev = pokemon.previous;
					$rootScope.num = parseInt($rootScope.num) - 1;		
			})
			if($rootScope.num < 1){
					$rootScope.raiz = true;
				}
			}
			if ($rootScope.raiz == true && $rootScope.sentido =='atras'){
				$http.get($rootScope.urlPrev)
				.success(function(pokemon){
					$rootScope.indice = $rootScope.indice - 31;
					$scope.pokemon = pokemon.results;
					angular.forEach($scope.pokemon,function(k,v){
						k.id = $rootScope.indice; // Asignar IDs a los pokemon
						$rootScope.indice = $rootScope.indice + 1
					})
					$rootScope.raiz = false;
					$rootScope.urlNext = pokemon.next;
					$rootScope.urlPrev = pokemon.previous;
					$rootScope.num = parseInt($rootScope.num) - 1;
				})
				.error(function(err){
				$window.alert("Fallo en la petición AJAX: " + err.code + " - " + err.message);
			});	
		}
	}
	var _pasaPaginaMoves = function($scope,$http,$window,$routeParams,$log,$rootScope){
		if ($rootScope.raiz1 == true && $rootScope.sentido1 =='alante'){
			$http.get($rootScope.urlNext1)
			.success(function(moves){
				$scope.moves = moves.results;
				angular.forEach($scope.moves,function(k,v){
					k.id = $rootScope.indiceMov; // Asignar IDs a los pokemon
					$rootScope.indiceMov = $rootScope.indiceMov + 1
				})
					$rootScope.raiz1 = false;
					$rootScope.urlNext1 = moves.next;
					$rootScope.urlPrev1 = moves.previous;
					$rootScope.num1 = parseInt($rootScope.num1) + 1;
			})
			.error(function(err){
			$window.alert("Fallo en la petición AJAX: " + err.code + " - " + err.message);
		});
		}
		if ($rootScope.raiz1 == false && $rootScope.sentido1 =='alante'){
			$http.get($rootScope.urlNext1)
			.success(function(moves){
				$scope.moves = moves.results;
				angular.forEach($scope.moves,function(k,v){
					k.id = $rootScope.indiceMov; // Asignar IDs a los pokemon
					$rootScope.indiceMov = $rootScope.indiceMov + 1
				})
					$rootScope.raiz1 = false;
					$rootScope.urlNext1 = moves.next;
					$rootScope.urlPrev1 = moves.previous;
					$rootScope.num1 = parseInt($rootScope.num1) + 1;
			})
			.error(function(err){
			$window.alert("Fallo en la petición AJAX: " + err.code + " - " + err.message);
		});
		}
		if ($rootScope.raiz1 == false && $rootScope.sentido1 =='atras'){
			$http.get($rootScope.urlPrev1)
			.success(function(moves){
				$scope.moves = moves.results;
				$rootScope.indiceMov = $rootScope.indiceMov - 40;
				angular.forEach($scope.moves,function(k,v){
					k.id = $rootScope.indiceMov; // Asignar IDs a los pokemon
					$rootScope.indiceMov = $rootScope.indiceMov + 1
				})
					$rootScope.raiz1 = false;
					$rootScope.urlNext1 = moves.next;
					$rootScope.urlPrev1 = moves.previous;
					$rootScope.num1 = parseInt($rootScope.num1) - 1;
					
			})
			if($rootScope.num1 < 1){
					$rootScope.raiz1 = true;
				}
			}
			if ($rootScope.raiz1 == true && $rootScope.sentido1 =='atras'){
			$http.get("http://pokeapi.co/api/v2/move/")
			.success(function(moves){
				$rootScope.indiceMov = 1;
				$scope.moves = moves.results;
				angular.forEach($scope.moves,function(k,v){
				k.id = $rootScope.indiceMov; // Asignar IDs a los pokemon
				$rootScope.indiceMov = $rootScope.indiceMov + 1
			})
			$rootScope.raiz1 = true;
			$rootScope.num1 = 0;
			$rootScope.urlNext1 = moves.next;
			})
			.error(function(err){
			$window.alert("Fallo en la petición AJAX: " + err.code + " - " + err.message);
		});
		}
	}
	var _Drtvs = (function(){ // Menú de navegación
		var _navegacion = function($scope,$element,$attrs){ // Recibo el scope, el elemento como jQuery y otros attrs del elemento
			$scope.links = {}; // Array de enlaces
			$scope.links.m1 = "Inicio"; // Texto del enlace
			$scope.links.m1href = ""; // Dirección del enlace
			$scope.links.m2 = "Movimientos";
			$scope.links.m2href = "moves/";
			$scope.filtroPkmn = {};
		}
		var _img = function ($scope,$element,$attrs,$rootScope,$log,$http) { // Imágenes
			$scope.idImgPkmn = $rootScope.spriteId;
			if ($attrs.class == "shiny") { // Asigna unos atributos u otros según tenga o no la clase "shiny"
				$element.find('div > img').attr({'src':"imagenes/pokemon/shiny/" + $scope.idImgPkmn + ".png"});
				$element.find('div > div > i').html('Forma variocolor (shiny)');
			}
			else if ($attrs.class == "") {
				$element.find('div > img').attr({'src':"imagenes/pokemon/" + $scope.idImgPkmn + ".png"});
				$element.find('div > div > i').html('Forma normal');
			}
			else {
				$element.find('div > img').attr({'src':"imagenes/pokemon/" + $scope.idImgPkmn + ".png"});
			}
		}
		var _Links = (function(){ // Controladores especiales para modificar el DOM
			var _barraNav = function($scope,iElm,iAttrs){
				iElm.find('.titulo').on('mouseover',function(){
					angular.element(this).css({'color':'#ff80aa','text-shadow':'2px 2px 2px purple'})
				})
				iElm.find('.titulo').on('mouseleave',function(){
					angular.element(this).css({'color':'','text-shadow':''})
				})
				iElm.find('.pestana').on('mouseover',function(){
					angular.element(this).css({'text-shadow':'1px 1px 0 #f2d9f2','background-color':'#ff80aa'})
				})
				iElm.find('.pestana').on('mouseleave',function(){
					angular.element(this).css({'text-shadow':'','background-color':''})
				})
			}
			var _cambioEstilo = function($scope,iElm,iAttrs){
				iElm.find('li > a').on('mouseover',function(){
					angular.element(this).css({'font-style':'italic'})
				})
				iElm.find('li > a').on('mouseleave',function(){
					angular.element(this).css({'font-style':''})
				})
			}
			return{
				barraNav: _barraNav,
				cambioEstilo: _cambioEstilo
			}
		})()
		var _busqueda = function($log, $http, $scope, $window){ // Caja de búsqueda de Pokémon
			$scope.teclaIntro = function($event){
				var keyCode = $event.which || $event.keyCode;
			    if (keyCode === 13) {
			        $http.get("http://pokeapi.co/api/v2/pokemon/" + $scope.filtroPkmn)
					.success(function(pkmn){
						//$log.log(pkmn.id)
						location.href = "#/id/" + pkmn.id;
					})
					.error(function(e){
						$window.alert("Lo sentimos, el Pokémon que ha buscado no existe.")
					});
			    }
			}
		}
		return {
			navegacion: _navegacion,
			img: _img,
			Links: _Links,
			busqueda: _busqueda
		}
	})()
	return {
		todosCtrl: _todosCtrl,
		listaMovesCtrl: _listaMovesCtrl,
		idCtrl: _idCtrl,
		movesCtrl: _movesCtrl,
		pasaPagina: _pasaPagina,
		pasaPaginaMoves: _pasaPaginaMoves,
		Drtvs: _Drtvs
	}
})();
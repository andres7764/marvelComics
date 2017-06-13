(function(){

	angular.module('marvelComics',['controllers','services','ngMaterial','ngRoute'])

	.config(['$routeProvider','$mdThemingProvider',function($routeProvider,$mdThemingProvider){
		$mdThemingProvider.theme('default')
    	.primaryPalette('red')
    	.accentPalette('orange');

	$routeProvider
		.when('/',{
			templateUrl: './templates/catalog.html',
			controller: 'catalogCtrl',
			controllerAs: 'catalog'
		})
	}])

}());

(function(){

	angular.module('marvelComics',['controllers','services','ngMaterial','ngRoute'])

	.config(['$routeProvider',function($routeProvider){

	$routeProvider
	.when('/',{
		templateUrl: './templates/catalog.html',
		controller: 'catalogCtrl',
		controllerAs: 'catalog'
	})
	.when('profile',{
		templateUrl: './templates/profiile.html',
		controller: 'profileCtrl',
		controllerAs: 'profile'
	})

	}])

}());

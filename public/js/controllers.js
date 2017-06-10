angular.module('controllers',[])

.controller('catalogCtrl',function($scope,conectionApi,$mdDialog){
	let data;
	let infoModal;
	$scope.responses = {};
	conectionApi.searchCharacters().then(getCatalog).catch(getErrorCatalog);

	$scope.searchHero = function(){
	  if($scope.responses.search.length > 2)
		conectionApi.getSuperHero($scope.responses.search).then(getResults).catch(getErrors)
	}

	$scope.getInfoHeroById = function(data){
		let iterator = $scope.responses.results;
		for(let a= 0; a < iterator.length; a++){
			if(data.values.id === iterator[a].id)
				infoModal = iterator[a];
		}
		showModalInfo();
		//conectionApi.getInfoHeroById(data.values.id).then(getRowHero).catch(getRowError)
	}

	function showModalInfo(){
       $mdDialog.show({
	      controller: modalController,
	      templateUrl: 'templates/infoByHero.html',
	      parent: angular.element(document.body),
	      clickOutsideToClose:true,
	      fullscreen: false // Only for -xs, -sm breakpoints.
	    })
	    .then(function(answer) {}, function() {});
	}

	function modalController($scope){
		$scope.heroInfo = infoModal;
		console.log(infoModal);
	}

/*	function getRowError(error){
		console.log(error);
	}*/

	function getCatalog(response){
	  $scope.responses.catalog = response.data.results; 
	}

	function getErrorCatalog(err){
	  console.log(err);
	}

	function getResults(response){
	  $scope.responses.results = response.data.results;
	}

	function getErrors(err){
	  console.log(err);
	}

})

.controller('profileCtrl',function($scope){

})
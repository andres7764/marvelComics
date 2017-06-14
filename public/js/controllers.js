(function(){
angular.module('controllers',[])

.controller('catalogCtrl',function($rootScope,$scope,conectionApi,$mdDialog,$timeout){
	let data;
	let infoModal;

	$scope.responses = {};
	$rootScope.comicsSaved = (localStorage.getItem('comics') !== null)? JSON.parse(localStorage.getItem('comics')) : [];
	showSections(1);
	conectionApi.searchCharacters().then(getCatalog).catch(getErrors);

	$scope.showProfile = function(ev){
	 $mdDialog.show({
      controller: profileController,
      templateUrl: 'templates/profile.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	    })
	    .then(function(answer) {
	      $scope.status = 'You said the information was "' + answer + '".';
	    }, function() {
	      $scope.status = 'You cancelled the dialog.';
	    });
	}
	
	$scope.searchHero = function(){
	  $scope.responses.show = false;
	  if($scope.responses.search.length > 2) {
		conectionApi.getSuperHero($scope.responses.search).then(getResults).catch(getErrors)
	  	$scope.responses.show = true;
	  } else {
	  	$scope.responses.show = false;
	  }
	}

	$scope.getInfoHeroById = function(data,op){
		$scope.responses.show = false;
		let iterator = (op === 1)?$scope.responses.results:$scope.responses.catalog;
		for(let a= 0; a < iterator.length; a++){
		  if(data.values.id === iterator[a].id)
		   $scope.heroInfo = iterator[a];
		}
		showSections(2);
	}

	function getCatalog(response){
	  $scope.responses.catalog = response.data.results; 
	}

	function getResults(response){
	  $scope.responses.results = response.data.results;
	}

	function comicInfo(response){
		infoModal = response.data.results[0];
	}

	function getErrors(err){
	  console.log(err);
	}

	function showSections(op){
	  if(op === 1){
		$scope.responses.showInfoByCharacter = false;
	 	$scope.responses.showCatalog = true;
	  } else {
		$scope.responses.showInfoByCharacter = true;
	 	$scope.responses.showCatalog = false;
	  }
	}

	$scope.showComicById = function(data){
	 let setId = data.comic.resourceURI;
		 setId = setId.substr(43,setId.length-43);
		 conectionApi.getInfoComicById(setId).then(comicInfo).catch(getErrors)
		$timeout(function(){
			$mdDialog.show({
		      controller: modalController,
		      templateUrl: 'templates/infoByHero.html',
		      parent: angular.element(document.body),
		      clickOutsideToClose:true,
		      fullscreen: false // Only for -xs, -sm breakpoints.
		    })
		    .then(function(answer) {}, function() { $scope.comicInfo = {}; });
		},500);
	}

	function modalController($scope,$mdDialog,$rootScope) {
		$scope.comicInfo = {};
		$scope.comicInfo = infoModal;
		$scope.comicInfo.price = $scope.comicInfo.prices[0].price;
		$scope.closeModal = function(){
		  $scope.comicInfo = {};
		  $mdDialog.cancel();
		}

		$scope.addFavourites = function(){
		 let favBtn = document.getElementById("favourites");
			 favBtn.classList.remove('addFa');
			 favBtn.classList.add('addFav');
			 favBtn = document.getElementById("favouris");
			 favBtn.classList.remove('iconFa');
			 favBtn.classList.add('iconFav');
		 let data = { id:$scope.comicInfo.id,
		 	  		   name:$scope.comicInfo.title,
		 	  		   description:$scope.comicInfo.description,
		 	  		   photo:$scope.comicInfo.thumbnail.path+"."+$scope.comicInfo.thumbnail.extension,
		 	  		 };
		 	 $rootScope.comicsSaved.push(data);
		 	 localStorage.setItem('comics',JSON.stringify($rootScope.comicsSaved));
		}
	}

	function profileController($scope, $mdDialog, $rootScope){
		$scope.comicsSaved = $rootScope.comicsSaved;

		$scope.deleteComic = function(data){
			confirmDeleteComic(data);
		}
		$scope.closeModal = function(){$mdDialog.cancel();}
		
		function confirmDeleteComic(data){
		 var confirm = $mdDialog.confirm()
	          .title('Confirm')
	          .textContent('Are you sure to delete this comic')
	          .ariaLabel('delete')
	          .ok('yes ')
	          .cancel('no');

		    $mdDialog.show(confirm).then(function() {
		      searchAndDestroy(data);
		    }, function() {});
		}
		function searchAndDestroy(id){
			for(var a= 0; a < $scope.comicsSaved.length;a++){
			  if($scope.comicsSaved[a].id === id)
			  	$scope.comicsSaved.splice(a,1);
			}
			$rootScope.comicsSaved = $scope.comicsSaved;
		}
	}

	$scope.cancel = function(){
	  showSections(1);
	  $scope.comicInfo = {};

	}

})

}());
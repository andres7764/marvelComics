angular.module('controllers',[])

.controller('catalogCtrl',function($scope,conectionApi){

conectionApi.getSuperHero()
.then(getResults)
.catch(getErrors)

function getResults(response){
	console.log(response)
}

function getErrors(err){
	console.log(err);
} 

})

.controller('profileCtrl',function($scope){

})
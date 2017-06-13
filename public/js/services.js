(function(){
  angular.module('services',[])
  
  .constant('getConstants',{
  	APITOKEN: 'f490836c211a6a495a10eacd7ddebded',
  	PRIVATEKEY: '747ad2cc51a70b8c6e91b8fd916cec0cb6cbd07a'
  })

  .service('conectionApi',getllRequests)

  function getllRequests($http,$q,getConstants) {
  	return {
  		getSuperHero : function(word){
  			let deferred = $q.defer();
  			$http({ 
  				method: 'GET',
  				url: 'https://gateway.marvel.com:443/v1/public/characters?apikey='+getConstants.APITOKEN+'&nameStartsWith='+word+'&limit=10'

  			})
  			.then(function(response){
  				deferred.resolve(response.data);
  			})
  			.catch(function(err){
  				deferred.reject(err.data);
  			})
  			return deferred.promise;
  		},
  		searchCharacters: function(){
  			let random = Math.floor(Math.random()*100);
  			let deferred = $q.defer();
  			$http({
  				method: 'GET',
  				url: 'https://gateway.marvel.com:443/v1/public/characters?orderBy=name&limit=10&offset='+random+'&apikey='+getConstants.APITOKEN
  			})
  			.then(function(response){
  				deferred.resolve(response.data);
  			})
  			.catch(function(err){
  				deferred.reject(err.data);
  			})
  			return deferred.promise;
  		},
  		getInfoComicById: function(data){
  			let deferred = $q.defer();
  			$http({
  			  method: 'GET',
  			  url: 'http://gateway.marvel.com:80/v1/public/comics/'+data+'?apikey='+getConstants.APITOKEN
  			})
  			.then(function(response){
  				deferred.resolve(response.data);
  			})
  			.catch(function(err){
  				deferred.reject(err.data);
  			})
  			return deferred.promise;
  		}}
  }

}());
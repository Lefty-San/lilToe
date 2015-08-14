angular.module('movieApp', []).controller('movieCtrl',function($scope, $http){
	var movieList = this;
	console.log(localStorage);
	movieList.movies = [];
	if (window.localStorage.length != 0){
		for (i in localStorage){
			movieList.movies.push(JSON.parse(localStorage[i]));
			console.log(localStorage[i].Title);
		}
	}
	movieList.addMovie = function() {
		var url = "http://www.omdbapi.com/?t=" + movieList.movieSearch + "&y=&plot=long&r=json";
		$http.get(url).success(function(response){
			console.log(response);
			if(response.Response == "True"){
				response.Poster = response.Poster.replace("SX300", "SX280");
				movieList.movies.push(response);
				localStorage[localStorage.length] = JSON.stringify(response);
			}
			else{
				movieList.movies.push({Title: "No Movie Found", Plot:"N/A"});
			}
		});
	}
	movieList.clearMovies = function() {
		window.localStorage.clear();
		movieList.movies = [];
	}
	movieList.remove = function(i) {
		movieList.movies.splice(i, 1);
		localStorage.clear();
		for (i in movieList.movies){
			localStorage[localStorage.length] = JSON.stringify(movieList.movies[i]);
		}
	}
});
// $http.get("js.json").success(function (response){
//         $scope.users = response.person;
//         convertXml2JSon();
//       });

angular.module('movieApp', []).controller('movieCtrl',function($scope, $http){
	var movieList = this;
	movieList.shown = false;
	//console.log(localStorage);
	movieList.movies = [];
	movieList.results = [];
	if (window.localStorage.length != 0){
		var butt = document.getElementsByClassName("butt");
		for (i in localStorage){
			movieList.movies.push(JSON.parse(localStorage[i]));
		}
		butt[0].className = "butt show";
	}

	movieList.addListener = function(){
		var poster = document.getElementsByClassName("poster");

		// console.log(poster.length);

		for(i=0;i<poster.length;i++){
			// console.log(poster[i].parentNode);
			poster[i].addEventListener("click", function(e) {
				var clicked = document.getElementsByClassName("clicked");
				for (j=0; j<clicked.length; j++){
					clicked[j].className = "";
				}
				e.target.parentNode.className = "clicked";
				// console.log(e.target.parentNode.className);
			}, false);
		}
	}

		movieList.addListener();


	movieList.search = function(){
		var searchURL = "http://api.themoviedb.org/3/search/multi?api_key=7dade5423034e93008a73e5f77b2b017&query="+movieList.movieSearch+"&Accept=application/json";
		movieList.results = [];
		$http.get(searchURL).success(function(response){
			console.log(response);
			movieList.results = response;
			//console.log(movieList.results);
			setTimeout(function() {movieList.addListener();}, 10);
		});
	}

	movieList.close = function(){
		var clicked = document.getElementsByClassName("clicked");
		for (i=0; i<clicked.length; i++){
			clicked[i].className = "";
		}
	}

	movieList.addMovie = function(id) {
		var url = "http://api.themoviedb.org/3/movie/"+id+"?api_key=7dade5423034e93008a73e5f77b2b017";
		var temp = {};
		$http.get(url).success(function(response){
			temp.poster_url = "http://image.tmdb.org/t/p/w300"+response.poster_path;
			temp.plot = response.overview;
			temp.title = response.original_title;
			movieList.movies.push(temp);
			//console.log(JSON.stringify(temp));
			localStorage[localStorage.length] = JSON.stringify(temp);
		});
		var butt = document.getElementsByClassName("butt");
		butt[0].className = "butt show";
	}

	movieList.clearMovies = function() {
		window.localStorage.clear();
		movieList.movies = [];
	}
	movieList.remove = function(i) {
		var butt = document.getElementsByClassName("butt");
		var myMovies = document.getElementsByClassName("myMovies");
		movieList.movies.splice(i, 1);
		localStorage.clear();
		if (movieList.movies.length == 0){
			butt[0].className = "butt hidden";
			myMovies[0].className = "myMovies not-shown";
			movieList.shown = false;
		}
		for (i in movieList.movies){
			localStorage[i] = JSON.stringify(movieList.movies[i]);
		}
	}
	movieList.toggleMyMovies = function(){
		var myMovies = document.getElementsByClassName("myMovies");
		var toShow;
		if(movieList.shown == false){
			toShow = "shown";
			movieList.shown = true;
		}
		else{
			toShow = "not-shown";
			movieList.shown = false;
		}

		myMovies[0].className = "myMovies " + toShow;
	}
});
// $http.get("js.json").success(function (response){
//         $scope.users = response.person;
//         convertXml2JSon();
//       });

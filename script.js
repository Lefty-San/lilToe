angular.module('movieApp', []).controller('movieCtrl',function($scope, $http){
  var movieList = this;
  movieList.movies = [
    {title:'Pulp Fiction', url:"url"}
  ];
  movieList.addTitle = function() {
    movieList.movies.push({text:movieList.movieTitle, url:"url"});
    $http.get("http://www.omdbapi.com/?t=Frozen&y=&plot=short&r=json")
    .success(function(response) {console.log(response)});
  }
});
// $http.get("js.json").success(function (response){
//         $scope.users = response.person;
//         convertXml2JSon();
//       });

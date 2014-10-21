if (window.location.href.indexOf('http') != 0) {
    alert("This demo must be run on a web server (i.e. the url must start with http/https), it won't work by opening the file directly in a browser.");
}

angular.module('myApp', ['angulike'])
  .run([
      '$rootScope', function ($rootScope) {
          $rootScope.facebookAppId = '[FacebookAppId]'; // set your facebook app id here
      }
  ]);

angular.module('myApp')
  .controller('myController', [
      '$scope', function ($scope) {
          $scope.myModel = {
              Name: "Jason Watmore's Blog", // text for tweet and pinIt buttons
              ImageUrl: 'http://www.jasonwatmore.com/pics/jason-watmore.jpg' // image url for pinIt button
          };

          // Use this if you want to link a different URL to the facebook like button, also update demo.html
          // $scope.myModel.FbLikeUrl = 'http://www.jasonwatmore.com';
      }
  ]);
/**
 * AngularJS directives for social sharing buttons - Facebook Like, Google+, Twitter and Pinterest 
 * @author Jason Watmore <jason@pointblankdevelopment.com.au> (http://jasonwatmore.com)
 * @version 1.2.0
 */
(function () {
    angular.module('angulike', [])

      .directive('fbLike', [
          '$window', '$rootScope', function ($window, $rootScope) {
              return {
                  restrict: 'A',
                  scope: {
                      fbLike: '=?'
                  },
                  link: function (scope, element, attrs) {
                      if (!$window.FB) {
                          // Load Facebook SDK if not already loaded
                          $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
                              $window.FB.init({
                                  appId: $rootScope.facebookAppId,
                                  xfbml: true,
                                  version: 'v2.0'
                              });
                              renderLikeButton();
                          });
                      } else {
                          renderLikeButton();
                      }

                      var watchAdded = false;
                      function renderLikeButton() {
                          if (!!attrs.fbLike && !scope.fbLike && !watchAdded) {
                              // wait for data if it hasn't loaded yet
                              watchAdded = true;
                              var unbindWatch = scope.$watch('fbLike', function (newValue, oldValue) {
                                  if (newValue) {
                                      renderLikeButton();
                                      
                                      // only need to run once
                                      unbindWatch();
                                  }
                                  
                              });
                              return;
                          } else {
                              element.html('<div class="fb-like"' + (!!scope.fbLike ? ' data-href="' + scope.fbLike + '"' : '') + ' data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>');
                              $window.FB.XFBML.parse(element.parent()[0]);
                          }
                      }
                  }
              };
          }
      ])

      .directive('googlePlus', [
          '$window', function ($window) {
              return {
                  restrict: 'A',
                  scope: {
                      googlePlus: '=?'
                  },
                  link: function (scope, element, attrs) {
                      if (!$window.gapi) {
                          // Load Google SDK if not already loaded
                          $.getScript('//apis.google.com/js/platform.js', function () {
                              renderPlusButton();
                          });
                      } else {
                          renderPlusButton();
                      }

                      var watchAdded = false;
                      function renderPlusButton() {
                          if (!!attrs.googlePlus && !scope.googlePlus && !watchAdded) {
                              // wait for data if it hasn't loaded yet
                              watchAdded = true;
                              var unbindWatch = scope.$watch('googlePlus', function (newValue, oldValue) {
                                  if (newValue) {
                                      renderPlusButton();

                                      // only need to run once
                                      unbindWatch();
                                  }

                              });
                              return;
                          } else {
                              element.html('<div class="g-plusone"' + (!!scope.googlePlus ? ' data-href="' + scope.googlePlus + '"' : '') + ' data-size="medium"></div>');
                              $window.gapi.plusone.go(element.parent()[0]);
                          }
                      }
                  }
              };
          }
      ])

      .directive('tweet', [
          '$window', '$location',
          function ($window, $location) {
              return {
                  restrict: 'A',
                  scope: {
                      tweet: '=',
                      tweetUrl: '='
                  },
                  link: function (scope, element, attrs) {
                      if (!$window.twttr) {
                          // Load Twitter SDK if not already loaded
                          $.getScript('//platform.twitter.com/widgets.js', function () {
                              renderTweetButton();
                          });
                      } else {
                          renderTweetButton();
                      }

                      var watchAdded = false;
                      function renderTweetButton() {
                          if (!scope.tweet && !watchAdded) {
                              // wait for data if it hasn't loaded yet
                              watchAdded = true;
                              var unbindWatch = scope.$watch('tweet', function (newValue, oldValue) {
                                  if (newValue) {
                                      renderTweetButton();
                                  
                                      // only need to run once
                                      unbindWatch();
                                  }
                              });
                              return;
                          } else {
                              element.html('<a href="https://twitter.com/share" class="twitter-share-button" data-text="' + scope.tweet + '" data-url="' + (scope.tweetUrl || $location.absUrl()) + '">Tweet</a>');
                              $window.twttr.widgets.load(element.parent()[0]);
                          }
                      }
                  }
              };
          }
      ])

      .directive('pinIt', [
          '$window', '$location',
          function ($window, $location) {
              return {
                  restrict: 'A',
                  scope: {
                      pinIt: '=',
                      pinItImage: '=',
                      pinItUrl: '='
                  },
                  link: function (scope, element, attrs) {
                      if (!$window.parsePins) {
                          // Load Pinterest SDK if not already loaded
                          (function (d) {
                              var f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
                              p.type = 'text/javascript';
                              p.async = true;
                              p.src = '//assets.pinterest.com/js/pinit.js';
                              p['data-pin-build'] = 'parsePins';
                              p.onload = function () {
                                  if (!!$window.parsePins) {
                                      renderPinItButton();
                                  } else {
                                      setTimeout(p.onload, 100);
                                  }
                              };
                              f.parentNode.insertBefore(p, f);
                          }($window.document));
                      } else {
                          renderPinItButton();
                      }

                      var watchAdded = false;
                      function renderPinItButton() {
                          if (!scope.pinIt && !watchAdded) {
                              // wait for data if it hasn't loaded yet
                              watchAdded = true;
                              var unbindWatch = scope.$watch('pinIt', function (newValue, oldValue) {
                                  if (newValue) {
                                      renderPinItButton();
                                      
                                      // only need to run once
                                      unbindWatch();
                                  }
                              });
                              return;
                          } else {
                              element.html('<a href="//www.pinterest.com/pin/create/button/?url=' + (scope.pinItUrl || $location.absUrl()) + '&media=' + scope.pinItImage + '&description=' + scope.pinIt + '" data-pin-do="buttonPin" data-pin-config="beside"></a>');
                              $window.parsePins(element.parent()[0]);
                          }
                      }
                  }
              };
          }
      ]);

})();

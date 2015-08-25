'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */

var baseurl ="https://huaweicultureclub.co.za/admin/index.php/hcc_api/";
angular.module('HccApp')
 //factory for authentication and login signup 
.factory('Authentication',function($http,storageService,$q){

  return{
    login:function(item){

           storageService.save('loggedIn','user_token_123');

           var Url = baseurl+'login';
           var defer = $q.defer();

           $http.post(Url,item).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
    },

    logout:function(){
       storageService.remove('loggedIn');
    },

    Register:function(item){
           var Url = baseurl+'register';
           var defer = $q.defer();

           $http.post(Url,item).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;

    },

    auth_token:function(){
      var user_data =  storageService.get('user_data');
      var data = JSON.parse(user_data);
      if(!data[0]){
        return false;
      }else{
        return  data[0].auth_token;
      }
    }

  }

})
 
 //localstorage factory
.factory('storageService', function ($rootScope) {

    return {
        
        get: function (key) {
           return localStorage.getItem(key);
        },

        save: function (key, data) {
           localStorage.setItem(key, JSON.stringify(data));
        },

        remove: function (key) {
            localStorage.removeItem(key);
        },
        
        clearAll : function () {
            localStorage.clear();
        }
    };
})

//faceboook api's
.factory('FbApi', function ($rootScope,$http,$q,$cordovaFacebook) {
    return {
        like: function (post_id,access_token) {
           var Url = 'https://graph.facebook.com/'+post_id+'/likes?access_token='+access_token;
           var defer = $q.defer();

           $http.post(Url).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });
 
            return defer.promise;
        },
        comment: function (post_id,access_token,message) {
           var Url = 'https://graph.facebook.com/'+post_id+'/comments?message='+message+'&access_token='+access_token;
           var defer = $q.defer();

           $http.post(Url).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
        }

      }
})
//competitions service
    .factory('Competitions', function ($rootScope,$http,$q) {

        return {
            get: function (item) {
                var Url = baseurl+'competitions';
                var defer = $q.defer();

                $http.post(Url,item).
                    success(function (data, status, headers, config) {
                        defer.resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        defer.reject();
                    });

                return defer.promise;
            },
            enter_competition:function(item){
                var Url = baseurl+'enter_competition';
                var defer = $q.defer();

                $http.post(Url,item).
                    success(function (data, status, headers, config) {
                        defer.resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        defer.reject();
                    });

                return defer.promise;

            }
        }
    })
// products service
    .factory('Products', function ($rootScope,$http,$q) {

    return {
        get: function (item) {
            var Url = baseurl+'products';
            var defer = $q.defer();

            $http.post(Url,item).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    defer.reject();
                });

            return defer.promise;
        }
    }
})
//events service
.factory('Events', function ($rootScope,$http,$q) {

    return {
        get: function (item) {
           var Url = baseurl+'events';
           var defer = $q.defer();

           $http.post(Url,item).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
        },
        getNews: function (item) {
            var Url = baseurl+'news';
            var defer = $q.defer();

            $http.post(Url,item).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    defer.reject();
                });

            return defer.promise;
        },
       fbinfo:function(){
           var $token = '1519766774946314|JoVYAX1-tLFIFe2nNIzm68fubPo';

           var Url = "https://graph.facebook.com/301881223200808/posts?fields=comments.limit(1).summary(true),likes.limit(1).summary(true),created_time,message,picture,from,icon&access_token="+$token;

           var defer = $q.defer();

           $http.get(Url).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });
            return defer.promise;

       },
       TwitterTimeline:function(){

           var Url = "http://www.huaweicultureclub.co.za/app_tweets/gandg-tweets.php";

           var defer = $q.defer();

           $http.get(Url).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });
            return defer.promise;
       } ,
       FbPage:function(){
           var Url = "http://graph.facebook.com/301881223200808";

           var defer = $q.defer();

           $http.get(Url).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });
            return defer.promise;
       }, 
       gtemore:function(item){
           var defer = $q.defer();

           $http.jsonp(item+"&callback=JSON_CALLBACK").
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });
            return defer.promise;
           

       }

      
    };
})
  //instagram pics and youtube service
 .factory('instagram', ['$http','$q','$rootScope',
        function($http,$q,$rootScope) {
            return {
                fetchPopular: function() {
                    var access_token = "295178498.76b13ab.e57b1dcc526c4095a7adb641dadf1e58";
                    var user_id = "1269326164";

                    var endPoint = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c8bd2224ea7c0268756466f7cf53925f&user_id=130202134%40N05&extras=media&per_page=&page=&format=json&nojsoncallback=1';

                    
                    var defer = $q.defer();
                    $http.post(endPoint).
                    success(function (data, status, headers, config) {
						
                        defer.resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        defer.reject();
                    });
                   return defer.promise;

                },
                
                fetchAlbum: function() {
                    var access_token = "295178498.76b13ab.e57b1dcc526c4095a7adb641dadf1e58";
                    var user_id = "1269326164";

                    var endPoint = ' https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=c8bd2224ea7c0268756466f7cf53925f&user_id=130202134%40N05&format=json&nojsoncallback=1';

                    
                    var defer = $q.defer();
                    $http.post(endPoint).
                    success(function (data, status, headers, config) {
						
                        defer.resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        defer.reject();
                    });
                   return defer.promise;

                },
                
                fetchAlbumpic: function(id) {
		
                    var access_token = "295178498.76b13ab.e57b1dcc526c4095a7adb641dadf1e58";
                    var user_id = "1269326164";

                    var endPoint = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=c8bd2224ea7c0268756466f7cf53925f&photoset_id='+id+'&user_id=130202134%40N05&extras=media&format=json&nojsoncallback=1';

                    
                    var defer = $q.defer();
                    $http.post(endPoint).
                    success(function (data, status, headers, config) {
						
                        defer.resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        defer.reject();
                    });
                   return defer.promise;

                },
                
                
                
               fetchMore:function(endPoint){

                    var defer = $q.defer();
                    $http.jsonp(endPoint+"&callback=JSON_CALLBACK").
                    success(function (data, status, headers, config) {
						
                        defer.resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        defer.reject();
                    });
                   return defer.promise;
                
               },
               video:function(){
                var defer = $q.defer();
                //https://www.googleapis.com/youtube/v3/search?key=AIzaSyDs6Xom8tFnbowHczc7jZvliMUmEl1Qro0&channelId=GGPRODUCTIONSSA&part=snippet,id&order=date&maxResults=20&callback=JSON_CALLBACK"
                    $http.jsonp("http://gdata.youtube.com/feeds/api/users/UCM_zp2dVNflkGFWAFM_N7lg/uploads?alt=json&max-results=10&callback=JSON_CALLBACK").
                    success(function (data, status, headers, config) {
                        defer.resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        defer.reject();
                    });
                   return defer.promise;
               },
               videoyou:function(){
                    var defer = $q.defer();
                    var url = "http://gdata.youtube.com/feeds/api/users/UCM_zp2dVNflkGFWAFM_N7lg?alt=json&callback=JSON_CALLBACK";
                
                    $http.jsonp(url).
                    success(function (data, status, headers, config) {
                        defer.resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        defer.reject();
                    });
                   return defer.promise;
               }  
            }
        }
    ])
.factory("current_news",function(){
    return {};
})
.factory("current_product",function(){
    return {};
})
.factory("current_competitions",function(){
    return {};
})
.factory("current_dj",function(){
    return {};
})
  //services for dj's 
 .factory('Djs',function($http,$q,$rootScope,Authentication){
  return{
      all:function(){
          var defer = $q.defer();
          var auth_token = Authentication.auth_token();
          var Url = baseurl+'dj';
          $http.post(Url,'auth_token='+auth_token).
           success(function (data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function (data, status, headers, config) {
                defer.reject();
            });
           return defer.promise;
      },
       getgig:function(item){
          var defer = $q.defer();
         
          var Url = baseurl+'djgigs';
          $http.post(Url,item).
           success(function (data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function (data, status, headers, config) {
                defer.reject();
            });
           return defer.promise;
      },
      clubxlusive:function(item){
          var defer = $q.defer();
         
          var Url = baseurl+'clubexclusives';
          $http.post(Url,item).
           success(function (data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function (data, status, headers, config) {
                defer.reject();
            });
           return defer.promise;

      }
  }
  
 })
    .filter('trustAsResourceUrl', ['$sce', function($sce) {
        return function(val) {
            return $sce.trustAsResourceUrl(val);
        };
    }])



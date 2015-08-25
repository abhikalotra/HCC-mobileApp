'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
angular.module('HccApp')
    .controller('DashController', function ($scope, $rootScope) {
        $rootScope.user_valid_icon = false;
        $scope.hccexperience_active = false;
        //TODO: set this to false if not the correct date range
        //***********************************
        // Experience Specific Variables
        //***********************************
        $scope.start_date = new Date('2015-02-08T00:00:00');
        $scope.end_date = new Date('2015-02-16T00:00:00');
        $scope.today = new Date();
        if ($scope.start_date <= $scope.today && $scope.end_date >= $scope.today) {
            $scope.hccexperience_active = true;
        }
        //***********************************
    })


//controller for galley images. feed from instagram 
    .controller('InstaController', function ($scope,$location, $rootScope, instagram, $modal) {
        
         var pagesShown = 1;
		 var pageSize = 10;

        $rootScope.user_valid_icon = true;
        $scope.pics = [];
        $scope.images=[];
        $scope.album=[];
        $scope.have = [];
        $scope.show_load_more = true;
        $rootScope.loading = true;
        //get first data
        $scope.getMore = function () {

            instagram.fetchPopular().then(function (response) {

                
                 instagram.fetchAlbum().then(function (responses) {
				
			$scope.process(response.photos.total,response,responses.photosets.total,responses);
            });
                
                
                
            });
 
            
        };

        $scope.getMore();
     
        
        $scope.itemsLimit = function() {
        return pageSize * pagesShown;
		};
		$scope.hasMoreItemsToShow = function() {
        return pagesShown < ($scope.images.length / pageSize);
		};
		$scope.loadmore = function() {
        pagesShown = pagesShown + 1;         
		};
        $scope.showImage = function(index,id,title) {
	
     
		$location.path('/flickrs/'+id);
  
		}
        //lesser code
        $scope.process = function (data,response,datas,responses) {
			
			
			
			for (var i = 0; i < datas; i++) {
				
				var result = (responses.photosets.photoset)[i];
				
				var img_src ="http://farm" + result.farm + ".static.flickr.com/" + result.server + "/" + result.primary + "_" + result.secret + "_" + "s.jpg|gif|png";
				 var img_src_lrg ="http://farm" + result.farm + ".static.flickr.com/" + result.server + "/" + result.primary + "_" + result.secret + "_" + "n.jpg";
				// console.log(img_src);
				var title=result.title._content;
				var id=result.id;
				var primary=result.primary;
				var json={'image':img_src,'title':title,'imagelarge':img_src_lrg,'id':id,'primary':primary};
				// var linked='https://www.flickr.com/photos/'+item.owner+'/'+item.id+'/';
           
				$scope.images.push(json);

                
                
            }
			
			
            for (var i = 0; i < data; i++) {
				
				var result = (response.photos.photo)[i];
	
				 var img_src ="http://farm" + result.farm + ".static.flickr.com/" + result.server + "/" + result.id + "_" + result.secret + "_" + "s.jpg|gif|png";
				 var img_src_lrg ="http://farm" + result.farm + ".static.flickr.com/" + result.server + "/" + result.id + "_" + result.secret + "_" + "n.jpg|gif|png";
				//alert(img_src);
				
				var title=result.title;
				var id=result.id;
				var primary="";
				var json={'image':img_src,'title':title,'imagelarge':img_src_lrg,'id':id,'primary':primary};
           
           
				$scope.images.push(json);
               
            }
            

            
        }

        //open image in modal with hogh resolution
        $scope.open = function (size) {

            $scope.selecteddata = size;

            var modalInstance = $modal.open({
                templateUrl: 'templates/modal.html',
                controller: 'ModalController',
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.selecteddata;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                //$scope.selected = selectedItem;
            }, function () {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };

    })
//modal controller
    .controller('ModalController', function ($scope, $rootScope, items, $modalInstance, $cordovaSocialSharing) {


        $scope.selectedItem = items;

        $scope.ok = function () {
            // $modalInstance.close($scope.selected.item);
        };
        //share image to social sites
        $scope.shareAnywhere = function () {
            $cordovaSocialSharing.share("HCC", null, $scope.selectedItem, null);
        }

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };

    })

	.controller('flickrCtrl', function($scope,$routeParams,$location, $rootScope, instagram, $modal) {
		  //console.log('here');
		  //console.log($routeParams);
		 var  id= $routeParams.id;
		 
		 var pagesShown = 1;
		 var pageSize = 10;

        $rootScope.user_valid_icon = true;
        $scope.pics = [];
        $scope.images=[];
        $scope.album=[];
        $scope.have = [];
        $scope.show_load_more = true;
        $rootScope.loading = true;
       //get first data
        $scope.getMore = function () {

            instagram.fetchAlbumpic(id).then(function (response) {

			
			$scope.flickrprocess(response.photoset.total,response);

            });
   
            
        };

        $scope.getMore();
        
          $scope.itemsLimit = function() {
        return pageSize * pagesShown;
		};
		$scope.hasMoreItemsToShow = function() {
        return pagesShown < (($scope.images.length+$scope.imagesdata.length) / pageSize);
		};
		$scope.loadmore = function() {
        pagesShown = pagesShown + 1;         
		};
        $scope.flickrprocess = function (data,response) {
		
			
			
            for (var i = 0; i < data; i++) {
				
				var result = (response.photoset.photo)[i];
			
				
				var img_src ="http://farm" + result.farm + ".static.flickr.com/" + result.server + "/" + result.id + "_" + result.secret + "_" + "s.jpg|gif|png";
				var img_src_lrg ="http://farm" + result.farm + ".static.flickr.com/" + result.server + "/" + result.id + "_" + result.secret + "_" + "n.jpg|gif|png";
				// console.log(img_src);
				var title=result.title;
				var id=result.id;
				var json={'image':img_src,'title':title,'imagelarge':img_src_lrg};
					// var linked='https://www.flickr.com/photos/'+item.owner+'/'+item.id+'/';
           
				$scope.album.push(json);
                
            }  
			}
		  $scope.open = function (size) {

            $scope.selecteddata = size;

            var modalInstance = $modal.open({
                templateUrl: 'templates/modal.html',
                controller: 'ModalController',
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.selecteddata;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                //$scope.selected = selectedItem;
            }, function () {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };

		})
    .controller('EventController', function ($scope, $rootScope, Events, Authentication) {

        $rootScope.user_valid_icon = true;
        //user token
        var token = Authentication.auth_token();
        //get events
        $rootScope.loading = true;

        $scope.events = function () {
            var item = 'auth_token=' + token;
            Events.get(item).then(function (response) {

                $rootScope.loading = false;
                $scope.eventsall = response.data;
                for (var i = 0; i < $scope.eventsall.length; i++) {
                    if ($scope.eventsall[i].original_price == 0) {
                        $scope.eventsall[i].percentageOff = 100;
                    } else {
                        $scope.eventsall[i].percentageOff = Math.round(100 - (100 * ($scope.eventsall[i].discounted_price / $scope.eventsall[i].original_price)));
                    }
                    $scope.eventsall[i].date = new Date($scope.eventsall[i].date.substring(0, 10));
                }
            });
        }

        $scope.goto_link = function (link_url) {
            window.open(link_url, '_blank', 'location=no');
        }

        $scope.events();

    })
    .controller('NewsController', function ($scope, $rootScope, Events, Authentication, current_news, $location, $cordovaDialogs) {

        $rootScope.user_valid_icon = true;
        //user token
        var token = Authentication.auth_token();
        //get events
        $rootScope.loading = true;

        $scope.events = function () {
            var item = 'auth_token=' + token;
            Events.getNews(item).then(function (response) {
                if (!response.success && response.message == "Please Login First") {
                    $location.path('/');
                    $cordovaDialogs.alert('Sorry, please login to view this', 'Message', 'OK');
                } else {
                    $rootScope.loading = false;
                    $scope.newsall = response.data;
                    for (var i = 0; i < $scope.newsall.length; i++) {
                        $scope.newsall[i].date = new Date($scope.newsall[i].date.substring(0, 10));
                    }
                }
            });
        }

        $scope.show_news = function (news_item) {
            current_news.data = news_item;
            $location.path("/news_details");
        };

        $scope.events();

    })
    .controller('NewsDetailsController', function ($scope, $rootScope, current_news, $location) {
        $scope.news = current_news.data;

        $scope.go_back = function () {
            $location.path("/news");
        };
    })
    .controller('ProductsController', function ($scope, $rootScope, Products, Authentication, current_product, $location, $cordovaDialogs) {

        $rootScope.user_valid_icon = true;
        //user token
        var token = Authentication.auth_token();
        //get events
        $rootScope.loading = true;

        $scope.products = function () {
            var item = 'auth_token=' + token;
            Products.get(item).then(function (response) {
                if (!response.success && response.message == "Please Login First") {
                    $location.path('/');
                    $cordovaDialogs.alert('Sorry, please login to view this', 'Message', 'OK');
                } else {
                    $rootScope.loading = false;
                    $scope.productsall = response.data;
                }
            });
        }

        $scope.show_product = function (product_item) {
            current_product.data = product_item;
            $location.path("/product_details");
        };

        $scope.products();

    })
    .controller('ProductDetailsController', function ($scope, $rootScope, current_product, $location) {
        $scope.product = current_product.data;
        $scope.slides = [
            {image: 'images/tempimages/img00.jpg'},
            {image: 'images/tempimages/img01.jpg'},
            {image: 'images/tempimages/img02.jpg'},
            {image: 'images/tempimages/img03.jpg'},
            {image: 'images/tempimages/img04.jpg'}
        ];
        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };

        $scope.go_back = function () {
            $location.path("/products");
        };
    })
    .animation('.slider-animation', function () {
        return {
            addClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    //element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }
                    TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
    })
    .controller('CompetitionsController', function ($scope, $rootScope, Competitions, Authentication, current_competitions, $location) {
        $rootScope.user_valid_icon = true;
        $scope.today = new Date();
        $scope.has_previous = false;
        $scope.has_current = false;
        $scope.isApple = false;
        //user token
        var token = Authentication.auth_token();
        //get competitions
        $rootScope.loading = true;

        $scope.load_competitions = function () {
            var item = 'auth_token=' + token;
            Competitions.get(item).then(function (response) {
                $rootScope.loading = false;
                $scope.competitionsall = response.data;
                for (var i = 0; i < $scope.competitionsall.length; i++) {
                    $scope.competitionsall[i].date_to = new Date($scope.competitionsall[i].date_to.toString().replace(' ', 'T'));
                    if ($scope.competitionsall[i].date_to >= $scope.today) {
                        $scope.has_current = true;
                    } else {
                        $scope.has_previous = true;
                    }
                }
                if ($scope.competitionsall.length == 1) {
                    //current_competitions.data = $scope.competitionsall[0];
                    //$location.path("/competition_details");
                }
            });
        }

        $scope.show_competition = function (competition_item) {
            current_competitions.data = competition_item;
            $location.path("/competition_details");
        };

        $scope.load_competitions();

    })

    .controller('CompetitionDetailsController', function ($scope, $rootScope, current_competitions, $window, Competitions, Authentication, $location) {
        //user token
        var token = Authentication.auth_token();
        $scope.today = new Date();
        $scope.competition = current_competitions.data;
        $scope.competition_entry = {};
        $scope.competition_entry.answer1 = "";
        $scope.competition_entry.answer2 = "";
        $scope.competition_entry.answer3 = "";
        $scope.competition_entry.answer4 = "";
        $scope.competition_entry.answer5 = "";
        $scope.state = "initial_screen";
        $scope.competition_end_date = new Date($scope.competition.date_to);
        if ($scope.competition_end_date <= $scope.today) {
            $scope.state = "previous_competition";
        }
        $scope.error = "";
        $scope.go_back = function () {
            $location.path("/competitions");
        };
        //TODO: currently, can handle select and text answers, need to be able to handle take picture, and share questions.
        $scope.goto_step1 = function () {
            var elem = document.getElementById('scrollable_content');
            elem.scrollTop = 0;
            // first check if there is a question for this competition:
            if ($scope.competition.q1_type == "" || $scope.competition.q1_type == "none" || $scope.competition.q1_type == null) {
                // no questions, just enter the guy
                $scope.submit_entry();
            } else {
                // show question 1
                $scope.competition_entry.answer1 = "";
                if ($scope.competition.q1_details.indexOf(",") > 0) {
                    $scope.competition.q1_options = $scope.competition.q1_details.split(",");
                }
                $scope.state = "question_1";
            }
        }

        $scope.process_question1 = function () {
            var elem = document.getElementById('scrollable_content');
            elem.scrollTop = 0;
            // verify the answer?
            $scope.error = "";
            if ($scope.competition_entry.answer1 == "" && ($scope.competition.q1_type == "select" || $scope.competition.q1_type == "text")) {
                $scope.error = "Please answer the question above.";
            }
            // if all good, check if we have a next question.
            if ($scope.error == "") {
                $scope.competition_entry.answer2 = "";
                if ($scope.competition.q2_type == "" || $scope.competition.q1_type == "none" || $scope.competition.q2_type == null) {
                    // no more questions, just enter the guy
                    $scope.submit_entry();
                } else {
                    // show question 2
                    $scope.state = "question_2";
                }
            }
        }
        $scope.process_question2 = function () {
            var elem = document.getElementById('scrollable_content');
            elem.scrollTop = 0;
            // verify the answer?
            $scope.error = "";
            if ($scope.competition_entry.answer2 == "" && ($scope.competition.q2_type == "select" || $scope.competition.q2_type == "text")) {
                $scope.error = "Please answer the question above.";
            }
            // if all good, check if we have a next question.
            if ($scope.error == "") {
                $scope.competition_entry.answer3 = "";
                if ($scope.competition.q3_type == "" || $scope.competition.q3_type == "none" || $scope.competition.q3_type == null) {
                    // no more questions, just enter the guy
                    $scope.submit_entry();
                } else {
                    // show question 3
                    $scope.state = "question_3";
                }
            }
        }
        $scope.process_question3 = function () {
            var elem = document.getElementById('scrollable_content');
            elem.scrollTop = 0;
            // verify the answer?
            $scope.error = "";
            if ($scope.competition_entry.answer3 == "" && ($scope.competition.q3_type == "select" || $scope.competition.q3_type == "text")) {
                $scope.error = "Please answer the question above.";
            }
            // if all good, check if we have a next question.
            if ($scope.error == "") {
                $scope.competition_entry.answer4 = "";
                if ($scope.competition.q4_type == "" || $scope.competition.q4_type == "none" || $scope.competition.q4_type == null) {
                    // no more questions, just enter the guy
                    $scope.submit_entry();
                } else {
                    // show question 4
                    $scope.state = "question_4";
                }
            }
        }
        $scope.process_question4 = function () {
            var elem = document.getElementById('scrollable_content');
            elem.scrollTop = 0;
            // verify the answer?
            $scope.error = "";
            if ($scope.competition_entry.answer4 == "" && ($scope.competition.q4_type == "select" || $scope.competition.q4_type == "text")) {
                $scope.error = "Please answer the question above.";
            }
            // if all good, check if we have a next question.
            if ($scope.error == "") {
                $scope.competition_entry.answer5 = "";
                if ($scope.competition.q5_type == "" || $scope.competition.q5_type == "none" || $scope.competition.q5_type == null) {
                    // no more questions, just enter the guy
                    $scope.submit_entry();
                } else {
                    // show question 5
                    $scope.state = "question_5";
                }
            }
        }
        $scope.process_question5 = function () {
            var elem = document.getElementById('scrollable_content');
            elem.scrollTop = 0;
            // verify the answer?
            $scope.error = "";
            if ($scope.competition_entry.answer5 == "" && ($scope.competition.q5_type == "select" || $scope.competition.q5_type == "text")) {
                $scope.error = "Please answer the question above.";
            }
            // if all good, submit
            if ($scope.error == "") {
                $scope.submit_entry();
            }
        }

        $scope.submit_entry = function () {
            var elem = document.getElementById('scrollable_content');
            elem.scrollTop = 0;
            var entry_data = 'auth_token=' + token + '&competition_id=' + $scope.competition.competition_id +
                '&q1_answer=' + $scope.competition_entry.answer1 +
                '&q2_answer=' + $scope.competition_entry.answer2 +
                '&q3_answer=' + $scope.competition_entry.answer3 +
                '&q4_answer=' + $scope.competition_entry.answer4 +
                '&q5_answer=' + $scope.competition_entry.answer5;
            $scope.state = "loading";
            Competitions.enter_competition(entry_data).then(function (response) {
                $scope.response_text = response;
                var status = response.success;
                //console.log(response);
                //if true
                if (status === true) {
                    $scope.state = "done";
                    $scope.done_heading = "Thanks!";
                    $scope.done_message = response.message;
                } else {
                    $scope.state = "done";
                    $scope.done_heading = "Sorry!";
                    $scope.done_message = response.message;
                }
            });
        }
    })

    .controller('YoutubeController', function ($scope, $rootScope, instagram) {

        $rootScope.user_valid_icon = true;

        $scope.feeds = [];

        instagram.video().then(function (data) {
            $scope.channelname = data.feed.author[0].name.$t;
            var data = data.feed.entry;
            //customize and sanitize data. push into scope
            for (var i = 0; i < data.length; i++) {
                var video_url = data[i].link[2].href;
                var video_id = video_url.split('=');
                var title = data[i].title.$t;
                var pageviews = data[i].yt$statistics.viewCount;
                var publish = data[i].published.$t;
                var package_test = {id: video_id[1], title: title, view: pageviews, publish: publish};
                $scope.feeds.push(package_test);

            }

        });

        //get youtube subscribers count
        instagram.videoyou().then(function (response) {
            $scope.counts = response.entry.yt$statistics.subscriberCount;
        });
    })

    .controller('FbController', function ($scope, $rootScope, Events, $cordovaFacebook, storageService, FbApi) {


        $rootScope.loading = true;
        $rootScope.user_valid_icon = true;
        $scope.fbdata = [];


        //load fb feed
        $scope.loadfb = function () {
            //get feed
            Events.fbinfo().then(function (success) {
                console.log(success);
                $scope.fbinfo_data = success.data;
                $rootScope.loading = false;
            })
        }

        $scope.loadfb();
        //get fb page like
        $scope.check = function () {

            Events.FbPage().then(function (response) {
                console.log(response);
                $scope.pageinfo = response;
            })
        }

        $scope.check();

        //check login status if not found take him to login with facebook
        $scope.checkloginStatus = function () {
            $cordovaFacebook.getLoginStatus().then(function (success) {
                if (success.status !== 'connected') {
                    $cordovaFacebook.login(["public_profile", "email", "user_friends", "publish_actions"])
                        .then(function (success) {
                            var status = success.status;
                            if (status === 'connected') {
                                var response = success.authResponse;
                                storageService.save('LoggedInFb', response);
                            }
                        });
                }
            });
        }


        //comment fb post
        $scope.CommentPostFb = function (post_id) {
            $scope.checkloginStatus();
            //post static comment for testing purpose
            $cordovaFacebook.getAccessToken()
                .then(function (success_token) {
                    FbApi.comment(post_id, success_token, 'cool thanks').then(function (success) {
                        console.log(success);

                    })
                })
        }


        //like fb post
        $scope.LIkePostFb = function (post_id) {
            $scope.checkloginStatus();
            $cordovaFacebook.getAccessToken()
                .then(function (success_token) {
                    FbApi.like(post_id, success_token).then(function (success) {
                        console.log(success);
                    })
                })
        }


    })

//twitter feed controller
    .controller('TweetController', function ($scope, $rootScope, Events) {

        $rootScope.loading = true;

        $rootScope.user_valid_icon = true;
        //get timeline
        $scope.loadtweet = function () {
            Events.TwitterTimeline().then(function (response) {
                $rootScope.loading = false;
                $scope.tweets = response.statuses;
            })
        }

        $scope.loadtweet();

    })


//dj's controller
    .controller('DjController', function ($scope, Djs, $location, current_dj, Authentication, $rootScope) {
        $rootScope.user_valid_icon = true;
        $scope.djlist = [];
        $rootScope.loading = true;
        //list all djs
        $scope.listdjs = function () {
            Djs.all().then(function (response) {
                $scope.djlist = response.data;
                $rootScope.loading = false;
            })
        }
        $scope.showDJ = function (dj) {
            current_dj.dj_data = dj;
            $location.path("/dj_details");
        }

        $scope.listdjs();
    })
    .controller('DjDetailsController', function ($scope, Djs, current_dj, $location, Authentication, $rootScope) {
        $scope.showMixCloud = false;
        $scope.dj = current_dj.dj_data;
        $scope.bioLimit = 100;
        $scope.subview = 'bio';
        $scope.gigs = {};
        $scope.isLoading = false;
        //get dj's gig guide
        $scope.getgig = function (id) {
            $scope.isLoading = true;
            var item = 'djid=' + id + "&auth_token=" + Authentication.auth_token();
            Djs.getgig(item).then(function (response) {
                $scope.isLoading = false;
                $scope.gigs = response.data;
                for (var i = 0; i < $scope.gigs.length; i++) {
                    $scope.gigs[i].event_datetime = new Date($scope.gigs[i].event_datetime.substring(0, 10));
                }
            })
        }
        $scope.changeSubView = function(toWhat){
            if(toWhat == 'gig_guide'){
                $scope.getgig($scope.dj.id);
            }
            $scope.subview = toWhat;
        }
        $scope.toggleMixCloud = function(){
            $scope.showMixCloud = !$scope.showMixCloud;
        }
        $scope.go_back = function (dj) {
            current_dj.dj_data = {};
            $location.path("/djs");
        }
        $scope.goto_link = function (link_url) {
            window.open(link_url, '_blank', 'location=no');
        }

    })
    .controller('HCCExperienceController', function ($scope, Authentication, $rootScope, Competitions) {
        $rootScope.user_valid_icon = true;
        //user token
        var token = Authentication.auth_token();
        //***********************************
        // Experience Specific Variables
        //***********************************
        var competition_id = 6;
        $scope.start_date = new Date('2015-02-08T00:00:00');
        $scope.end_date = new Date('2015-02-16T12:00:00');
        $scope.exp_title = 'Ultra Music Festival';
        $scope.exp_image = 'hcc_exp_ultra.jpg';
        $scope.qr_code = 'starttheactivation';
        $scope.exp_description = '<br/>Are you at Ultra Music Festival in Cape Town or Joburg?<br/><br/>Head over to the Huawei Culture Club activation area and scan the activation QR code to win amazing prizes!<br/><br/>Winners will be drawn instantly on entering. One entry is permitted per user. Apple is not a sponsor of this competition nor are any of the prizes Apple products. Competition closes 15 Feb 2015.';
        //***********************************

        $scope.state = "not_active";
        $scope.today = new Date();
        if ($scope.start_date <= $scope.today && $scope.end_date >= $scope.today) {
            $scope.state = "instructions";
        }

        $scope.scanQR = function () {
            if (cordova.plugins == undefined || cordova.plugins.barcodeScanner == undefined) {
                $scope.show_scan = false;
                $scope.state = "scanFailed";
                $scope.error_heading = "Sorry!";
                $scope.error_message = "The QR Code scanner is not available.";
                $scope.$apply();
            } else {
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        // we got a QR code. make sure its the correct format and then scan based on that user_id
                        var temp = result.text.toString();
                        if (temp == $scope.qr_code) {
                            // all good, go check if they won a prize
                            $scope.state = "scanSuccess";
                            $scope.$apply();
                            var entry_data = 'auth_token=' + token + '&competition_id=' + competition_id +
                                '&q1_answer=' + temp;
                            $scope.state = "loading";
                            Competitions.enter_competition(entry_data).then(function (response) {
                                $scope.response_text = response;
                                var status = response.success;
                                if (status === true) {
                                    $scope.top_image = 'hcc_exp_win_congrats.jpg';
                                    $scope.state = "scanSuccess";
                                    $scope.win_outcome = "Congratulations!";
                                    $scope.win_prize = response.message;
                                } else {
                                    $scope.top_image = 'hcc_exp_win_sorry.jpg';
                                    $scope.state = "scanSuccess";
                                    $scope.show_scan = false;
                                    $scope.win_outcome = "Sorry!";
                                    $scope.win_prize = response.message;
                                }
                            });
                        } else {
                            $scope.show_scan = true;
                            $scope.state = "scanFailed";
                            $scope.error_heading = "Sorry!";
                            console.log(temp + "vs" + $scope.qr_code);
                            $scope.error_message = "That is not the correct QR Code";
                            $scope.$apply();
                        }
                    },
                    function (error) {
                        $scope.show_scan = true;
                        $scope.state = "scanFailed";
                        $scope.error_heading = "Sorry!";
                        $scope.error_message = "Scanning failed: " + error;
                        $scope.$apply();
                    }
                );
            }
        }
    })

'use strict';
(function ($) {
  $(document).ready(function(){

    // hide .navbar first
    $(".navbar").hide();

    // fade in .navbar
    $(function () {
        $(window).scroll(function () {

                 // set distance user needs to scroll before we start fadeIn
            if ($(this).scrollTop() > 40) {
                $('.navbar')
                .removeClass('animated fadeOutUp')
                .addClass('animated fadeInDown')
                .fadeIn();
                
            } else {
                $('.navbar')
                .removeClass('animated fadeInDown')
                .addClass('animated fadeOutUp')
                .fadeOut();
            }
        });
    });

});
  }(jQuery));

$(document).ready(function() {
    $("#images").mouseover(function() {
        $(".arrows").animate({
            opacity: 0
        }, 300);
    }).mouseout(function() {
        $(".arrows").animate({
            opacity: 1
        }, 300)
    });
});

	angular.module('website')
		.directive('animateOnChange', function($animate,$timeout) {
		  return function(scope, elem, attr) {
		      scope.$watch(attr.animateOnChange, function(nv,ov) {
		        if (nv!=ov) {
		          var c = nv > ov?'change-up':'change';
		          $animate.addClass(elem,c).then(function() {
		           // $timeout(function() {$animate.removeClass(elem,c);});
		          });
		        }
		      });
		   };
		})

//angular.module('website')
	.controller('mainController',['$scope','$window','dataProvider','ngDialog','$timeout',
		function($scope,$window,dataProvider,ngDialog,$timeout){
			dataProvider.getAboutData().then(function(promise){
				$scope.about = promise.data;	
			});

			dataProvider.getServicesData().then(function(promise){
				$scope.services = promise.data;	
			});

			dataProvider.getPortfolioData().then(function(promise){
				$scope.portfolio = promise.data;	
			});

			dataProvider.getTestimonialData().then(function(promise){
				$scope.testimonials = promise.data;	
			});
			
			$scope.openDetailedView = function(detailedPortfolio,current){
				$scope.currentIndex = current;
				//alert(img.width + "x" +img.height);
				
				$scope.portfolioDetailed = detailedPortfolio;
				ngDialog.open({ template: 'templates/detailedPortfolio.html',
    							scope: $scope,
    							overlay: true});

				$scope.setModalContentRatio(detailedPortfolio);
				//bodyFreezeScroll();
			}

			$scope.setModalContentRatio = function(detailedPortfolio){
				var img = new Image();
				img.src = detailedPortfolio.img;

				var ratio = img.width/img.height;
				
				if (ratio>1.5){
            		$scope.dataClass = "col-xs-18 col-sm-12 col-lg-12 img-responsive ";
            		$scope.imgClass = "col-xs-18 col-sm-12 col-lg-12 img-responsive";
            	}
          		else if(ratio>0.7 && ratio < 1){
            		$scope.dataClass = "col-xs-18 col-sm-12 col-lg-3";
            		$scope.imgClass = "col-xs-18 col-sm-12 col-lg-9";
            	}
			}

			$scope.getPreviousData = function(){
				var index;
				$timeout(function() {

					if($scope.currentIndex-1 < 0){
						index = 0;
					}else{
						index = --$scope.currentIndex;
					}
					$scope.setModalContentRatio($scope.portfolio[index]);
					$scope.portfolioDetailed = $scope.portfolio[index];
				});
				
			}

			$scope.getNextData = function(){
				var index;
				$timeout(function() {
					if($scope.currentIndex+1 == $scope.portfolio.length){
						index = $scope.currentIndex;
					}else{
						index = ++$scope.currentIndex;
					}
					$scope.setModalContentRatio($scope.portfolio[index]);
					$scope.portfolioDetailed = $scope.portfolio[index];
				});
			}

			$scope.openInNewTab = function(link){
            	$window.open(link, '_blank');
        	};

        	//jQuery scroll To
        	$('.scrollTo').on('click', function(e){
			    e.preventDefault();
			    var target = $($(this).attr("href"));
			    
			    $('html, body').stop().animate({
			       scrollTop: target.offset().top
			    }, 1000);
			});

        	//For left and right shortcuts
        	$(document).keydown(function(e) {
    			if (e.keyCode == 39)
			        $scope.getNextData();
			    else if (e.keyCode == 37)
			        $scope.getPreviousData();
			});
		}
	]);


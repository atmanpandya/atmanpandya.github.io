'use strict';

angular.module('website')
	.controller('mainController',['$scope','$window','dataProvider','ngDialog',
		function($scope,$window,dataProvider,ngDialog){
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
			
			$scope.openDetailedView = function(detailedPortfolio){
				/* FOR LATER USE
				var img = new Image();
				img.src = detailedPortfolio.img;
				alert(img.width + "x" +img.height);

				var ratio = img.width/img.height;
				alert(ratio);

				if(ratio>1.6)
					angular.element('.ngdialog-content').css('margin-top', '5%');

				*/
				$scope.portfolioDetailed = detailedPortfolio;
				ngDialog.open({ template: 'templates/detailedPortfolio.html',
    							scope: $scope,
    							overlay: true});
				
				var modalRatio = $('.ngdialog-content').width()/$('.ngdialog-content').height();
				//bodyFreezeScroll();
				/*alert(modalRatio);*/
			}

			$scope.openInNewTab = function(link){
            	$window.open(link, '_blank');
        	};

        	
		}
	]);
'use strict';

angular.module('website.services')
	.factory('dataProvider',['$http','$q',
		function($http,$q){

			//Return Data for the ABOUT Section
			function getAboutData(){
				var about ;
				
				var promise = $http.get('data/about.json')
					.success(function(data){
						about = data;
					})
					.error(function(data){
						console.log(data);
					});

				return promise;
			}

			//Return Data for the SERVICES Section
			function getServicesData(){
				var services ;
				
				var promise = $http.get('data/services.json')
					.success(function(data){
						services = data;
					})
					.error(function(data){
						console.log(data);
					});

				return promise;
			}

			//Return Data for the PORTFOLIO Section
			function getPortfolioData(){
				var services ;
				
				var promise = $http.get('data/portfolio.json')
					.success(function(data){
						services = data;
					})
					.error(function(data){
						console.log(data);
					});

				return promise;
			}

			//Return Data for the TESTIMONIAL Section
			function getTestimonialData(){
				var testimonials ;
				
				var promise = $http.get('data/testimonials.json')
					.success(function(data){
						testimonials = data;
					})
					.error(function(data){
						console.log(data);
					});

				return promise;
			}


			return {
			getAboutData: getAboutData,
			getServicesData : getServicesData,
			getPortfolioData: getPortfolioData,
			getTestimonialData: getTestimonialData
		}
	}]);
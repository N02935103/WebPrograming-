'use strict';

var LogApp = angular.module('LogApp',['ui.bootstrap', 'ui.bootstrap.datetimepicker','angular-scroll-animate']);

LogApp.filter('unsafe', ['$sce', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
}]);

LogApp.factory('LogAppService',function($http){
    
    return {
        fnGetFoodQuery:function(){
           return $http({
                url:"db/food.json",
                method:"GET",
                responseType:"json"
            });
        },
        fnGetExerciseQuery:function(){
            return $http({
                url:"db/exercise.json",
                method:"GET",
                responseText:"json"
            });
        }
        
        
    };
    
});

LogApp.factory('LogAppHelper',function(){
    return {
        fnGetTemplateUI:function(model,scope){
            if (model.id === scope.db.selected.id) return 'editPanel';
            else return 'displayPanel';
        },
        
        fnSelectedItem:function($event,id,$scope){    
            
            var checkbox = $event.target;
                        
            if(checkbox.checked){
                $scope.selected.push(id);        
            }else{
                $scope.selected.splice($scope.selected.indexOf(id), 1);
            }
            
            console.log($scope.selected);
                
            
        }
    };
});
    
LogApp.controller('LogListController',function($scope,LogAppHelper,LogAppService){
        
        var today= new Date();
    
        LogAppService.fnGetFoodQuery().success(function(res){
            $scope.food=res;
        });
 
        $scope.db={
            logListData:[
                
                {id:123,meal_name:'pizza', calories:'500', date_added: today , marked:false},
                {id:321,meal_name:'burger', calories:'500', date_added: today , marked:false},
                {id:132,meal_name:'salad', calories:'300', date_added: today , marked:false}
            ],
            selected: {},
        };
        
    
        //To Save Selected Data
        $scope.selected=[];
    
        //initialize data for the table   
        $scope.fnInit=function(){
            return $scope.db.logListData;
        }
        
        //To Add Log Data from from to an array
        $scope.fnAddLog=function(){
            
            $scope.marked=false;
            $scope.id=Math.random();
            
            var logData={
                id:$scope.id,
                meal_name:$scope.meal_name,
                calories:$scope.calories,
                date_added:$scope.date_added,
                marked:$scope.marked
            }
            
            console.log(logData);
            
            
            $scope.db.logListData.push(logData);
        }
        
        //To Edit Log Data
        $scope.fnEditLog=function(logData){
            $scope.db.selected = angular.copy(logData);
        }
        
        //To Save Log data
        $scope.fnSaveLog=function(id){
            console.log('you clicked the save button'); 
            $scope.db.logListData[id] = angular.copy($scope.db.selected);
            $scope.fnReset();
        }
        
        //Delete Log Data
        $scope.fnDeleteLog=function(id){
             console.log('you clicked the delete button');
            
            $scope.db.logListData.splice(id, 1);
            $scope.fnReset();
        }
        
        
        $scope.isOpen = false;
        $scope.isOpenCalSearch=false;
        $scope.isOpenEdit=false;
        
    
        $scope.openCalendar = function(e,dt) {
            e.preventDefault();
            e.stopPropagation();

            $scope.isOpen = true;
        };
    
    
        $scope.openCalendarEdit=function(e,dt){
            e.preventDefault();
            e.stopPropagation();

            $scope.isOpenEdit = true;
        }
        
        $scope.openCalendarSearch=function(e,dt){
            e.preventDefault();
            e.stopPropagation();

            $scope.isOpenCalSearch = true;
        }
    
    
        $scope.fnReset=function(){
            $scope.db.selected = {};
        }
        
        
        $scope.fnDeleteSelected=function(){
            //console.log('you clicked the delete selected'); 
            //console.log($scope.selected);
            
           // for(var i=0; i <=$scope.selected.length;i++){
                angular.forEach($scope.db.logListData,function(key,val){
                    console.log($scope.selected.indexOf(key.id));  
                    
                   $scope.db.logListData.splice($scope.selected.indexOf(key.id), 1);
                   $scope.selected.splice($scope.selected.indexOf(key.id), 1);
                    //$scope.db.logListData.splice($scope.selected.indexOf(key.id), 1);
                });
                
           // }
            
            
          
            
            
            
        }
        
       
        $scope.fnSelectedItem=function($event,id){    
            
            LogAppHelper.fnSelectedItem($event,id,$scope);
     
        }
            
          
        //Get The Panel: EditMode or DisplayMode
        $scope.getTemplateUI = function (logData) {
          return LogAppHelper.fnGetTemplateUI(logData,$scope);
        };
          
        
    });

LogApp.controller('ProfileController',function($scope){
    
    console.log('profile controller loaded..');


	$scope.FoodLog = [{
		image:'img/sb1.jpg',
		title: '1.First Food Log heading',
		date: new Date(),
		content: 'Some awesome content.'
	}, {
		image:'img/sb1.jpg',
		title: '2.First Food Log heading',
		date: new Date(),
		content: 'Some awesome content.'
	}, {
		image: 'img/sb1.jpg',
        date: new Date(),
		title: '3.Final Heading',
		content:'<h4>Keep up<br>The<br>Good work!</h4>'
	},
                     {
		image: 'img/sb1.jpg',
        date: new Date(),
		title: '4.Final Heading',
		content:'<h4>Keep up<br>The<br>Good work!</h4>'
	},
                     {
		image: 'img/sb1.jpg',
        date: new Date(),
		title: '5.Final Heading',
		content:'<h4>Keep up<br>The<br>Good work!</h4>'
	},{
        timelineEnd:true,
	}];
    
    
    // optional: not mandatory (uses angular-scroll-animate)
	$scope.animateElementIn = function($el) {
		$el.removeClass('timeline-hidden');
		$el.addClass('bounce-in');
	};

	// optional: not mandatory (uses angular-scroll-animate)
	$scope.animateElementOut = function($el) {
		$el.addClass('timeline-hidden');
		$el.removeClass('bounce-in');
	};
    
 
    $scope.isLastIndex=function(idx){
       console.log(idx);
    };
    
    
    
    
    
    
    
});

LogApp.controller('ExerciseController',function($scope,LogAppHelper,LogAppService,$http){

   var today=new Date();
    
   $scope.selected=[];
    
  //$scope.selectedMeal=undefined;
    
   $http.get('db/exercise.json').success(function(data) {
            $scope.exercise = data;
            console.log($scope.exercise);
   });
  
    
   $scope.db={
            exerciseData:[
                
                {id:123,meal_name:'pizza', calories:'500', date_added: today , time_added:today.getTime() ,marked:false},
                {id:321,meal_name:'burger', calories:'500', date_added: today , time_added:today.getTime() ,marked:false},
                {id:132,meal_name:'salad', calories:'300', date_added: today ,time_added:today.getTime() , marked:false}
            ],
            selected: {},
   };
    
    console.log('load exerise controller..');
    
    $scope.fnSaveExercise=function(id){
        console.log('you click the save button..');
        
        var exerData={
            meal_name:$scope.meal_name,
            calories:$scope.calories,
            date_added:$scope.date_added,
            time_added:$scope.time_added
        };
        
        
        $scope.db.exerciseData[id] = angular.copy($scope.db.selected);
        $scope.fnResetExercise();
             
    }
    
    $scope.fnEditExercise=function(exerData){
        $scope.db.selected = angular.copy(exerData);
    }
    
    $scope.fnSearchExercise=function(){
        
        console.log($scope.search_meal);
    }
    
    $scope.fnDeleteExercise=function(id){
         console.log('you clicked the delete button');
          
         $scope.db.exerciseData.splice(id, 1);
         $scope.fnResetExercise();
    }
    
    $scope.fnAddExercise=function(){
            $scope.marked=false;
            $scope.id=Math.random();
        
        console.log($scope.frmAddExer);
                
            var exerData={
                id:$scope.id,
                meal_name:$scope.meal_name,
                calories:$scope.calories,
                date_added:$scope.date_added,
                time_added:$scope.time_added,
                marked:$scope.marked
            }
            
        
            
           $scope.db.exerciseData.push(exerData);
    }
    
    $scope.isOpenTimerAdd=false;
    $scope.isOpenDateAdd=false;
    $scope.isOpenCalSearch=false;
    $scope.isOpenTimepickerSearch=false;
    
    $scope.openTimepicker=function(e,dt){
        e.preventDefault();
        e.stopPropagation();
        $scope.isOpenTimerAdd = true;
    }
    
    
    $scope.openCalendar=function(e,dt){
        e.preventDefault();
        e.stopPropagation();
        $scope.isOpenDateAdd = true;
    }
    
    $scope.openCalendarSearch=function(e,dt){
        e.preventDefault();
        e.stopPropagation();
        $scope.isOpenCalSearch = true;
    }
    
    $scope.openTimepickerSearch=function(e,dt){
        e.preventDefault();
        e.stopPropagation();
        $scope.isOpenTimepickerSearch = true;
    }
    
    
    $scope.getTemplateUI=function(model){
      return LogAppHelper.fnGetTemplateUI(model,$scope);
    }
    
    $scope.fnSelectedItem=function($event,id){
        
        LogAppHelper.fnSelectedItem($event,id,$scope);
    }
    
    $scope.fnResetExercise=function(){
            $scope.db.selected = {};
    }
    
    $scope.fnDeleteSelected=function(){
                angular.forEach($scope.db.exerciseData,function(key,val){
                    console.log($scope.selected.indexOf(key.id));  
                    
                   $scope.db.exerciseData.splice($scope.selected.indexOf(key.id), 1);
                   $scope.selected.splice($scope.selected.indexOf(key.id), 1);
                   
                });
    }
        
    
});

LogApp.directive('timeline',function(){
    return {
        restrict: 'AE',
        transclude: true,
        replace:true,
        template: '<ul class="timeline" ng-transclude></ul>'
   };
    
});
    
LogApp.directive('timelineEvent',function(){
    
    return {
        require: '^timeline',
        restrict: 'AE',
        transclude: true,
        replace:true,
        template: '<li ng-class-even="\'timeline-inverted\'" ng-transclude></li>'
  };
    
});

LogApp.directive('timelineImage',function(){
  return {
    require: '^timelineEvent',
    restrict: 'AE',
    transclude: true,
    template: '<div ng-transclude class="timeline-image"></div>'
  };  
});

LogApp.directive('timelinePanel',function(){
    return {
        require: '^timeline',
        restrict: 'AE',
        transclude: true,
        replace:true,
        template: '<div class="timeline-panel" ng-transclude></div>'
    };
});

LogApp.directive('timelineFooter', function() {
  return {
    require: '^timelinePanel',
    restrict: 'AE',
    transclude: true,
    replace:true,
    template: '<div class="timeline-footer" ng-transclude></div>'
  };
});

LogApp.directive('timelineBody', function() {
  return {
    require: '^timelinePanel',
    restrict: 'AE',
    transclude: true,
    replace:true,
    template: '<div class="timeline-body" ng-transclude></div>'
  };
});

LogApp.directive('timelineHeading', function() {
  return {
    require: '^timelinePanel',
    restrict: 'AE',
    transclude: true,
    replace:true,
    template: '<div class="timeline-heading" ng-transclude></div>'
  };
});







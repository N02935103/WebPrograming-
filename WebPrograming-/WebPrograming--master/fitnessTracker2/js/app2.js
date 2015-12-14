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
                
            
        },
        fnConvertDate:function(oDate){
            
            var nHrs = oDate.getHours();
            var nMin = oDate.getMinutes();
            var nDate = oDate.getDate();
            var nMnth = oDate.getMonth();
            var nYear = oDate.getFullYear();
            
            return nMnth+'/'+nDate+'/'+nYear;
        },
        fnConvertTime:function(oDate){
            
            var nHrs = oDate.getHours();
            var nMin = oDate.getMinutes();
            var nDate = oDate.getDate();
            var nMnth = oDate.getMonth();
            var nYear = oDate.getFullYear();
            
            return nHrs+':'+nMin;
        },
        fnConvertDatev2:function(oDate){
           return moment(oDate).format('MM/DD/YYYY').toString();
        }
        
    };
});
    
LogApp.controller('LogListController',function($scope,LogAppHelper,LogAppService){
        
        var today= LogAppHelper.fnConvertDatev2(new Date());
    
    
        $scope.selectedCount=0;
    
        $scope.LogAppHelper=LogAppHelper;
    
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
        $scope.fnAddLog=function(e){
            
            console.log(frmAddLog.$valid);
            
            e.preventDefault();
            
            $scope.marked=false;
            $scope.id=Math.random();
            
           //console.log(moment($scope.date_added).format('MM/DD/YYYY'));
            
            var logData={
                id:$scope.id,
                meal_name:$scope.meal_name,
                calories:$scope.calories,
                date_added:LogAppHelper.fnConvertDatev2($scope.date_added),
                marked:$scope.marked
            }
            
            console.log(logData);
            
            
            $scope.db.logListData.push(logData);
        }
        
        
         $scope.fnAddRow=function(){
            
           $scope.marked=false;
           $scope.id=Math.random();
           $scope.meal_name='new meal';
           $scope.calories=0;
           $scope.date_added=today;

            
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
        $scope.fnSaveLog=function(id,mode){
            console.log('you clicked the save button'); 
            if(mode=='edit'){
                $scope.db.logListData[id] = angular.copy($scope.db.selected);
                $scope.fnReset();
            }else{
                
                console.log($scope.db.logListData[id]);              
                //$scope.db.logListData.push($scope.db.logListData[id]);
                alert('it should save to an array. But where it will be saved');
                
            }
            
        }
        
        
        $scope.fnResetManualEntryForm=function(){
                $scope.meal_name='';
                $scope.calories='';
                $scope.date_added='';
                $scope.marked='';  
        }
        
        
        
        //Delete Log Data
        $scope.fnDeleteLog=function(id){
            
            $scope.db.logListData.splice(id, 1);
            $scope.fnReset();
        }
        
        
        $scope.isOpen = false;
        $scope.isOpenCalSearch=false;
        //$scope.isOpenEdit=false;
        
    
        $scope.openCalendar = function(e,dt) {
            e.preventDefault();
            e.stopPropagation();

            $scope.isOpen = true;
        };
    
    
        $scope.openCalendarEdit=function(e,dt){
            e.preventDefault();
            e.stopPropagation();
            
            if (typeof($scope.dpStatus) === 'undefined'){
                $scope.dpStatus = {};
            }
            $scope.dpStatus.isOpenEdit = true;

            
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
            
            for (var i = $scope.db.logListData.length - 1; i >= 0; i--) {
              if ($scope.selected[i]) {
                //delete row from data
                $scope.db.logListData.splice(i, 1);
                //delete rowSelection property
                $scope.selected.splice(i, 1);
                
              }
            }     
            
                 
        }
        
        $scope.fnAddFromSearch=function(){
            
            $scope.marked=false;
            $scope.id=Math.random();
            
            var logData={
                id:$scope.search_food.id,
                meal_name:$scope.search_food.log_name,
                calories:$scope.search_food.calories,
                date_added:$scope.search_date,
                marked:$scope.marked
            }
            
            $scope.db.logListData.push(logData);
            
            $scope.search_food='';
            $scope.search_date='';
            
            
        }
        
        $scope.fnResetSearch=function(){
            $scope.search_meal='';
            $scope.search_date='';
        }
        
       
        $scope.fnSelectedItem=function($event,id){    
            
            LogAppHelper.fnSelectedItem($event,id,$scope);
     
        }
            
          
        //Get The Panel: EditMode or DisplayMode
        $scope.getTemplateUI = function (logData) {
          return LogAppHelper.fnGetTemplateUI(logData,$scope);
        };
          
        
    });

LogApp.controller('ProfileController',function($scope,LogAppHelper){
    
    console.log('profile controller loaded..');
    var today=LogAppHelper.fnConvertDatev2(new Date());
    
    $scope.timelinedb=[
        {type:'food',date_added:today,goal:'My Food Goals',calories:300,specified_goal:'Today I would like to eat more healthy and drink planty of water!',img_url:'img/setting_goals1.jpg' },
        {type:'exercise',date_added:today,goal:'My Exercise Goals',calories:500,specified_goal:'Today I would like to exercise for 2:00 hrs and drink planty of water!',img_url:'img/setting_goals1.jpg' },
       
    ];
    
    console.log($scope.timelinedb);
    
    $scope.fnOnChangeType=function(txt){
        
        console.log('clicked' + txt);
        $scope.type=txt;
    }
    
    
    $scope.fnAddToTimeline=function(){
        
        console.log('you click the fnAdd');
        
        var timelineData={
            type:$scope.type,
            date_added:LogAppHelper.fnConvertDatev2($scope.date_added),
            goal:$scope.goal,
            calories:$scope.calories,
            specified_goal:'',
            img_url:'img/setting_goals1.jpg'
        };
        
        console.log(timelineData);
        
        $scope.timelinedb.push(timelineData);
    }
    
    
    $scope.openCalendarProfile=function(e,dt){
            e.preventDefault();
            e.stopPropagation();
            
            if (typeof($scope.dpStatus) === 'undefined'){
                $scope.dpStatus = {};
            }
            $scope.dpStatus.isOpenCalendarProfile = true;

            
        }
    
    
    /*
    $scope.db={
            logListData:[               
                {id:123,meal_name:'pizza', calories:'500', date_added: today , marked:false},
                {id:321,meal_name:'burger', calories:'500', date_added: today , marked:false},
                {id:132,meal_name:'salad', calories:'300', date_added: today , marked:false}
            ],
            exerciseData:[              
                {id:123,meal_name:'pizza', calories:'500', date_added: today , time_added:today ,marked:false},
                {id:321,meal_name:'burger', calories:'500', date_added: today , time_added:today ,marked:false},
                {id:132,meal_name:'salad', calories:'300', date_added: today ,time_added:today , marked:false}
            ],
            selected: {},
    };*/

    //This is the array data for Timeline. 

    
	$scope.FoodLog = [{
        image:'img/sb3.jpg',
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

LogApp.controller('ExerciseController',function($scope,LogAppHelper,LogAppService,$http,$window){

   var today=LogAppHelper.fnConvertDatev2(new Date());
    
    console.log(today);
    
   $scope.LogAppHelper=LogAppHelper;
    
   $scope.selected=[];
    
  //$scope.selectedMeal=undefined;
    
   $http.get('db/exercise.json').success(function(data) {
            $scope.exercise = data;
            console.log($scope.exercise);
   });
  
    
   $scope.db={
            exerciseData:[
                
                {id:123,meal_name:'running', calories:'250', date_added: today  ,marked:false},
                {id:321,meal_name:'swimming', calories:'300', date_added: today ,marked:false},
                {id:132,meal_name:'push-up', calories:'150', date_added: today , marked:false}
            ],
            selected: {},
   };
    
    console.log('load exerise controller..');
    
    $scope.fnSaveExercise=function(id,mode){
        console.log('you click the save button..');
        
        var exerData={
            meal_name:$scope.meal_name,
            calories:$scope.calories,
            date_added:LogAppHelper.fnConvertDatev2($scope.date_added),
            time_added:$scope.time_added
        };
        
        if(mode=='edit'){
            $scope.db.exerciseData[id] = angular.copy($scope.db.selected);
            $scope.fnResetExercise();
        }else{
            alert('This will be save in an array. Where do you add me.');
        }
        
        
             
    }
    
    $scope.fnEditExercise=function(exerData){
        $scope.db.selected = angular.copy(exerData);
    }
    
    $scope.fnSaveFromSearch=function(){
        
        $scope.marked=false;
        $scope.id=Math.random();
        console.log($scope.search_food);
                
        var exerData={
                id:$scope.id,
                meal_name:$scope.search_food.log_name,
                calories:$scope.search_food.calories,
                date_added:$scope.search_date,
                time_added:$scope.search_time,
                marked:$scope.marked
        };
            
        $scope.db.exerciseData.push(exerData);
        
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
                date_added:LogAppHelper.fnConvertDatev2($scope.date_added),
                time_added:$scope.time_added,
                marked:$scope.marked
            }
            
        
            
          $scope.db.exerciseData.push(exerData);
         
    }
    
    
    $scope.fnAddExerciseRow=function(){
            $scope.marked=false;
            $scope.id=Math.random();
            $scope.meal_name='new exersize';
           $scope.calories=0;
           $scope.date_added=today;
        
        console.log($scope.frmAddExer);
                
            var exerData={
                id:$scope.id,
                meal_name:$scope.meal_name,
                calories:$scope.calories,
                date_added:$scope.date_added,
                marked:$scope.marked
            }
            
        
            
          $scope.db.exerciseData.push(exerData);
         
    }
    
    
    
    $scope.dpStatus = {};
    
    
    $scope.isOpenTimerAdd=false;
    $scope.isOpenDateAdd=false;
    $scope.isOpenCalSearch=false;
    $scope.isOpenTimepickerSearch=false;
   // $scope.isOpenCalExerEdit=false;
   // $scope.isOpenTimepickerEdit=false;
    
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
    
    $scope.openCalendarExerEdit=function(e,dt){
        e.preventDefault();
        e.stopPropagation();
        if (typeof($scope.dpStatus) === 'undefined'){
                $scope.dpStatus = {};
        }
        $scope.dpStatus.isOpenCalExerEdit = true;
    }
    
    $scope.openTimepickerSearch=function(e,dt){
        e.preventDefault();
        e.stopPropagation();
        $scope.isOpenTimepickerSearch = true;
        
    }
    
    $scope.openTimepickerEdit=function(e,dt){
        e.preventDefault();
        e.stopPropagation();
        if (typeof($scope.dpStatus) === 'undefined'){
                $scope.dpStatus = {};
        }
        $scope.dpStatus.isOpenTimepickerEdit = true;
    }
    
    
    $scope.openStartTimepicker=function(e,dt){
        e.preventDefault();
        e.stopPropagation();
        if (typeof($scope.dpStatus) === 'undefined'){
                $scope.dpStatus = {};
        }
        $scope.dpStatus.isOpenStartTimepicker = true;
    }
    
    
    $scope.openEndTimepicker=function(e,dt){
        e.preventDefault();
        e.stopPropagation();
        if (typeof($scope.dpStatus) === 'undefined'){
                $scope.dpStatus = {};
        }
        $scope.dpStatus.isOpenEndTimepicker = true;
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
    
    
    $scope.fnResetManualEntryForm=function(){
            
            $scope.meal_name='';
            $scope.calories='';
            $scope.date_added='';
            $scope.time_added='';
            $scope.marked='';
    }
    
    $scope.fnDeleteSelected=function(){
        
        
        for (var i = $scope.db.exerciseData.length - 1; i >= 0; i--) {
          if ($scope.selected[i]) {
            //delete row from data
            $scope.db.exerciseData.splice(i, 1);
            $scope.selected.splice(i, 1);
            //delete $scope.selected[i];
          }
        }
        
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









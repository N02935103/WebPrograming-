
angular.module('LogApp', [])
  .controller('LogListController', function() {
   var logList = this;
    var today = new Date();
    var name;
    var Calories;
    var date;
    //today.setDate(today.getDate());
    
      logList.logs = [
      {name:'pizza', calories:'500', date: today , marked:false},
      {name:'burger', calories:'500', date: today , marked:false},
      {name:'salad', calories:'300', date: today , marked:false}];
 
     logList.addLog = function() {
     logList.logs.push({});
     logList.logName = '';
    };
    
     logList.editing = function() {
     logList.logs.push({});
     logList.logName = '';
     logList.logName = '';

    };
    
 
     logList.remaining = function() {
      var count = 0;
      angular.forEach(logList.selected, function(log) {
        count += log.selected ? 0 : 1;
      });
      return count;
    };
 
 
    logList.delete = function() {
      var deletedLogs = logList.logs;
      logList.logs = [];
      angular.forEach(deletedLogs, function(log) {
        if (!log.selected) logList.logsv .push(log);
      });
    };
  });
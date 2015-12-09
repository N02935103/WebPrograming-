angular.module('app')
.service('mealService', function($http, $q){
    return {
        get: function(){
            return $http.get("/meal");
        },
        post: function(row){
            return $http.post('/meal/', row);
        },
        delete: function(id){
            $http.delete('/meal/' + id);
        }
    };
});
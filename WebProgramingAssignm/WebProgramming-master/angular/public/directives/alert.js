///    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular.min.js"></script>

angular.module('mplotkin.directives', [])
.directive('mpAlert', function () {
    return {
        template:   '<div class="alert" ng-if="vm.msg" ng-class="vm.msg.type">'
                +   '<button ng-click="vm.msg = null" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                +   '{{vm.msg.body}}'
                +   '</div>'
    };
});
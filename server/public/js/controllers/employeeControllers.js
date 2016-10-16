mainApp.controller('GetOrdersController', function($rootScope, $scope, $http, AuthService) {
    $rootScope.$on('AuthEvent', function() {
        if (AuthService.isAuth()) {
            $http.get('api/empl/').success(function (response) {
                $scope.empls = response;
            })
        }
    });
});


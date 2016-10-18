mainApp.controller('LoginController',
    function LoginController($rootScope, $scope, $http, AuthService) {
        $scope.login = function(data) {
            $http.post('/login', data).success(function (response) {
                if (response.token) {
                    AuthService.setAuth(true);
                    AuthService.setToken(response.token);
                    $rootScope.$broadcast('AuthEvent');
                    $rootScope.user = response;
                }
            })
        };
    }
);

mainApp.controller('LogoutController', function LogoutController($rootScope, $scope, $http, AuthService) {
    $scope.logout = function() {
        $http.post('/logout', $rootScope.user).success(function (response) {
            AuthService.setAuth(false);
            AuthService.setToken({});
            $rootScope.user = {};
        })
    }
});

mainApp.controller('RegController',
    function RegController($scope, $http) {
        $scope.user={};
        $scope.reg = function(data) {
            $http.post('/reg', data).success(function (response) {
                $scope.user = response;
            })
        };
    }
);
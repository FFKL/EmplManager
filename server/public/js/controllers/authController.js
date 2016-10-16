mainApp.controller('LoginController',
    function LoginController($rootScope, $scope, $http, AuthService) {
        $scope.user={};
        $scope.login = function(data) {
            $http.post('/login', data).success(function (response) {
                if (response.token) {
                    AuthService.setAuth(true);
                    AuthService.setToken(response.token);
                    $rootScope.$broadcast('AuthEvent');
                }
                $scope.user = response;
            })
        };
    }
);

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
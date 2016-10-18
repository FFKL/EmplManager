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
            }).error(function (err) {
                $scope.data = {};
                $rootScope.message = err + ' Проверьте правильность ввода логина/пароля';
            })
        };
    }
);

mainApp.controller('LogoutController', function LogoutController($rootScope, $scope, $http, AuthService) {
    $scope.logout = function() {
        $http.post('/logout', $rootScope.user).success(function () {
            AuthService.setAuth(false);
            AuthService.setToken({});
            $rootScope.user = {};
            $rootScope.message = 'Вы разлогинились';
        })
    }
});

mainApp.controller('RegController',
    function RegController($scope, $rootScope, $http) {
        $scope.user={};
        $scope.reg = function(data) {
            $http.post('/reg', data).success(function (response) {
                $scope.data = {};
                $rootScope.message = response.message;
            }).error(function(err) {
                $scope.data = {};
                $rootScope.message = err.error + ' Ошибка регистрации';
            })
        };
    }
);
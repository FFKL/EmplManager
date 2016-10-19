mainApp.factory('tokenInjector', ['AuthService', function(AuthService) {
    var tokenInjector = {
        request: function(config) {
            if (AuthService.isAuth()){
                config.headers['Authorization'] = 'Bearer ' + AuthService.getToken();
            }
            return config;
        }
    };
    return tokenInjector;
}]);

mainApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('tokenInjector');
}]);
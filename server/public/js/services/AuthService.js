mainApp.service('AuthService',
    function($rootScope)  {
        var auth = false;
        var authToken = {};
        function isAuth() {
            return auth;
        }
        function setAuth(state) {
            $rootScope.isAuth = state;
            auth = state;
        }
        function setToken(token) {
            authToken = token;
        }
        function getToken() {
            return authToken;
        }
        return {
            isAuth: isAuth,
            setAuth: setAuth,
            setToken: setToken,
            getToken: getToken
        }
    }
);
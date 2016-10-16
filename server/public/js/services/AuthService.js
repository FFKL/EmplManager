mainApp.service('AuthService',
    function()  {
        var auth = false;
        var authToken = {};
        function isAuth() {
            console.log(auth)
            return auth;
        }
        function setAuth(state) {
            auth = state;
        }
        function setToken(token) {
            console.log(token);
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
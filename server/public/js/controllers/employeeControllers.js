mainApp.controller('employeesController', function($rootScope, $scope, $http, AuthService, DataService) {
    var refresh = function() {
        $http.get('api/empl/').success(function (response) {
            $scope.empls = response;
        })
    };
    $rootScope.$on('AuthEvent', function() {
        if (AuthService.isAuth()) {
            refresh();
        }
    });
    $scope.createEmployee = function(employee) {
        var day = employee.day.split('-');
        employee.day = new Date(day[0], (day[1] - 1), day[2]).getTime();
        var start = employee.start.split(':');
        employee.start = new Date(day[0], (day[1] - 1), day[2], start[0], start[1]).getTime();
        var end = employee.end.split(':');
        employee.end = new Date(day[0], (day[1] - 1), day[2], end[0], end[1]).getTime();
        $http.post('api/empl/', employee).success(function(response) {
                refresh();
            }
        )
    };
    $scope.createTime = function(time) {
        var day = time.day.split('-');
        time.day = new Date(day[0], (day[1] - 1), day[2]).getTime();
        var start = time.start.split(':');
        time.start = new Date(day[0], (day[1] - 1), day[2], start[0], start[1]).getTime();
        var end = time.end.split(':');
        time.end = new Date(day[0], (day[1] - 1), day[2], end[0], end[1]).getTime();
        $http.post('api/empl/' + DataService.getData() + '/time/', time).success(function(response) {
                refresh();
            }
        )
    };
    $scope.changeEmployee = function(data) {
        $http.put('/api/empl/' + data._id, data).success(function(response) {
            refresh()
        })
    };
    $scope.deleteEmployee = function(data) {
        $http.delete('api/empl/' + data._id).success(function(response) {
            refresh();
        })
    };
    $scope.deleteTime = function(id, timeId) {
        $http.delete('api/empl/' + id + '/time/' + timeId).success(function(response) {
            refresh();
        })
    }
});
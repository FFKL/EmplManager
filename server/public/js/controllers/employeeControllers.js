mainApp.controller('employeesController', function($rootScope, $scope, $http, AuthService, DataService) {
    var refresh = function() {
        $http.get('api/empl/').success(function (response) {
            $scope.emplss = response;
            $scope.getPage(0);
            initTable();
        })
    };
    $rootScope.$on('AuthEvent', function() {
        if (AuthService.isAuth()) {
            refresh();
        }
    });
    function initTable() {
        $scope.currentPage = 0;
        $scope.pageSize = 2;
        $scope.numberOfPages = function(){
            return Math.ceil($scope.emplss.length / $scope.pageSize);
        };
    }
    $scope.getPage = function (start) {
        $scope.empls = $scope.emplss.slice(start)
    };

    $scope.createEmployee = function(employee) {
        employee.start.setDate(employee.day.getDate());
        employee.start.setFullYear(employee.day.getFullYear());
        employee.start.setMonth(employee.day.getMonth());
        employee.end.setDate(employee.day.getDate());
        employee.end.setFullYear(employee.day.getFullYear());
        employee.end.setMonth(employee.day.getMonth());
        var newEmpl = {
            name: employee.name,
            surname: employee.surname,
            patronymic: employee.patronymic,
            sex: employee.sex,
            contacts: employee.contacts,
            day: employee.day.getTime(),
            start: employee.start.getTime(),
            end: employee.end.getTime()
        };
        $http.post('api/empl/', newEmpl).success(function(response) {
                refresh();
            }
        )
    };
    $scope.createTime = function(time) {
        time.day = new Date(day[2], (day[1] - 1), day[0]).getTime();
        var start = time.start.split(':');
        time.start = new Date(day[2], (day[1] - 1), day[0], start[0], start[1]).getTime();
        var end = time.end.split(':');
        time.end = new Date(day[2], (day[1] - 1), day[0], end[0], end[1]).getTime();
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
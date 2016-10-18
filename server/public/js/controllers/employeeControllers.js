mainApp.controller('employeesController', function($rootScope, $scope, $http, AuthService, DataService) {
    var refresh = function() {
        $http.get('api/empl/').success(function (response) {
            $scope.allEmpls = response;
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
        $scope.pageSize = 4;
        $scope.numberOfPages = function(){
            return Math.ceil($scope.allEmpls.length / $scope.pageSize);
        };
    }
    $scope.getPage = function (start) {
        $scope.empls = $scope.allEmpls.slice(start)
    };

    $scope.createEmployee = function(employee) {
        var employeeClone = correctAndCloneEmployee(employee);
        $http.post('api/empl/', employeeClone).success(function(response) {
                refresh();
            }
        )
    };

    $scope.createTime = function(time) {
        var timeClone = correctAndCloneTime(time);
        $http.post('api/empl/' + DataService.getData() + '/time/', timeClone).success(function(response) {
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
    };

    function correctAndCloneEmployee(employee) {
        employee.start.setDate(employee.day.getDate());
        employee.start.setFullYear(employee.day.getFullYear());
        employee.start.setMonth(employee.day.getMonth());
        employee.end.setDate(employee.day.getDate());
        employee.end.setFullYear(employee.day.getFullYear());
        employee.end.setMonth(employee.day.getMonth());
        return {
            name: employee.name,
            surname: employee.surname,
            patronymic: employee.patronymic,
            sex: employee.sex === 'м',
            contacts: employee.contacts,
            day: employee.day.getTime(),
            start: employee.start.getTime(),
            end: employee.end.getTime()
        };
    }

    function correctAndCloneTime(time) {
        time.start.setDate(time.day.getDate());
        time.start.setFullYear(time.day.getFullYear());
        time.start.setMonth(time.day.getMonth());
        time.end.setDate(time.day.getDate());
        time.end.setFullYear(time.day.getFullYear());
        time.end.setMonth(time.day.getMonth());
        console.log(time.end);
        return {
            day: time.day.getTime(),
            start: time.start.getTime(),
            end: time.end.getTime()
        };
    }
});
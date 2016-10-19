mainApp.controller('employeesController', function($rootScope, $scope, $http, AuthService, DataService) {
    var refresh = function() {
        $http.get('api/empl/').success(function (response) {
            $scope.empls = response;
            $scope.empls.length === 0 ? $scope.isEmpls = false : $scope.isEmpls = true;
            initTable();
        }).error(function(err) {
            $rootScope.message = err.message;
        })
    };
    $rootScope.$on('AuthEvent', function() {
        if (AuthService.isAuth()) {
            refresh();
        }
    });
    function initTable() {
        $scope.empls.forEach(function (empl) {
            empl.sex = empl.sex ? 'м' : 'ж';
            empl.times.forEach(function (time) {
                time.day = new Date(time.day);
                time.start = new Date(time.start);
                time.end = new Date(time.end);
            })
        });
        var subjectList = [];
        $scope.empls.forEach(function(empl) {
            subjectList.push({
                subjId: empl._id,
                surname: empl.surname
            })
        });
        $scope.subjectList = subjectList;
        $scope.currentPage = 0;
        $scope.pageSize = 4;
        $scope.numberOfPages = function(){
            return Math.ceil($scope.empls.length / $scope.pageSize);
        };
    }

    $scope.createEmployee = function(employee) {
        var employeeClone = correctAndCloneEmployee(employee);
        $http.post('api/empl/', employeeClone).success(function() {
            $rootScope.message = 'Сотрудник добавлен';
            refresh();
        }).error(function (err) {
            $rootScope.message = err.message;
        })
    };

    $scope.createSubject = function(subj) {
        $http.post('api/empl/' + DataService.getData() + '/subj/', subj).success(function() {
            $rootScope.message = 'Подчиненный добавлен';
            refresh();
        })
    };

    $scope.createTime = function(time) {
        var timeClone = correctAndCloneTime(time);
        $http.post('api/empl/' + DataService.getData() + '/time/', timeClone).success(function() {
            $rootScope.message = 'Рабочее время добавлено';
            refresh();
        }).error(function (err) {
            $rootScope.message = err.message;
        })
    };
    $scope.changeEmployee = function(data) {
        data.sex = data.sex === 'м';
        $http.put('/api/empl/' + data._id, data).success(function() {
            $rootScope.message = 'Данные о сотруднике изменены';
            refresh();
        }).error(function (err) {
            $rootScope.message = err.message;
        })
    };
    $scope.deleteEmployee = function(data) {
        $http.delete('api/empl/' + data._id).success(function() {
            $rootScope.message = 'Подчиненный удален';
            refresh();
        }).error(function (err) {
            $rootScope.message = err.message;
        })
    };
    $scope.deleteTime = function(id, timeId) {
        $http.delete('api/empl/' + id + '/time/' + timeId).success(function() {
            $rootScope.message = 'Рабочее время удалено';
            refresh();
        }).error(function (err) {
            $rootScope.message = err.message;
        })
    };
    $scope.deleteSubj = function(id, subjId) {
        $http.delete('api/empl/' + id + '/subj/' + subjId).success(function() {
            $rootScope.message = 'Подчиненный удален';
            refresh();
        }).error(function (err) {
            $rootScope.message = err.message;
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
        return {
            day: time.day.getTime(),
            start: time.start.getTime(),
            end: time.end.getTime()
        };
    }
});
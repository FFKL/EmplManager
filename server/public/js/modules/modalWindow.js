mainApp.controller('ModalController', function ($uibModal, $scope, DataService) {
    var $ctrl = this;

    $ctrl.animationsEnabled = true;

    $ctrl.openEmplWindow = function (employee) {
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'changeEmplWindow.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            scope: $scope
        });

        modalInstance.opened.then(function () {
            $scope.employeeClone = {
                _id: employee._id,
                name: employee.name,
                surname: employee.surname,
                patronymic: employee.patronymic,
                sex: employee.sex ? 'м' : 'ж',
                contacts: employee.contacts
            };
            DataService.setData(employee.id);
        });
    };

    $ctrl.openTimeWindow = function (id) {
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'addTimeWindow.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            scope: $scope
        });

        modalInstance.opened.then(function () {
            DataService.setData(id);
        });
    };
    $ctrl.openAddWindow = function () {
        $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'addWindow.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            scope: $scope
        });
    };

});

mainApp.controller('ModalInstanceCtrl', function ($uibModalInstance) {
    var $ctrl = this;

    $ctrl.ok = function () {
        $uibModalInstance.close();
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

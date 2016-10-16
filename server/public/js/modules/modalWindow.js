mainApp.controller('ModalCtrl', function ($uibModal, $scope, $log, $document, DataService) {
    var $ctrl = this;

    $ctrl.animationsEnabled = true;

    $ctrl.openEmplWindow = function (employee, size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'changeEmplWindow.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: size,
            scope: $scope,
            appendTo: parentElem
        });

        modalInstance.opened.then(function () {
            $scope.employee = employee;
            DataService.setData(employee.id);
        });

        modalInstance.result.then(function () {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $ctrl.openTimeWindow = function (id, size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'addTimeWindow.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: size,
            scope: $scope,
            appendTo: parentElem
        });

        modalInstance.opened.then(function () {
            DataService.setData(id);
        });

        modalInstance.result.then(function () {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $ctrl.open = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            scope: $scope,
            size: size,
            appendTo: parentElem
        });

        modalInstance.result.then(function () {
            console.log('sadf');
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

mainApp.controller('ModalInstanceCtrl', function ($uibModalInstance) {
    var $ctrl = this;

    $ctrl.ok = function () {
        $uibModalInstance.close();
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

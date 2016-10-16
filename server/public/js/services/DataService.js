mainApp.service('DataService',
    function()  {
        var savedData = {};
        function getData() {
            return savedData;
        }
        function setData(data) {
            savedData = data;
        }
        return {
            getData: getData,
            setData: setData
        }
    }
);
mainApp.filter('formatStartEndTime', function() {
    return function (date) {
        var hours = date.getHours(), minutes = date.getMinutes();
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        return hours + ':' + minutes;
    }
});
mainApp.filter('formatDay', function() {
    return function (date) {
        var month = date.getMonth() + 1, day = date.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day
        }
        return date.getFullYear() + '-' + month + '-' + day;
    }
});
mainApp.filter('startFrom', function() {
    return function(input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
    }
});
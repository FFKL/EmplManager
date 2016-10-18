mainApp.filter('formatStartEndTime', function() {
    return function (time) {
        var date = new Date(time);
        return date.getHours() + ':' + date.getMinutes();
    }
});
mainApp.filter('formatDay', function() {
    return function (time) {
        var date = new Date(time);
        return date.getFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getDate();
    }
});
mainApp.filter('formatSex', function() {
    return function (sex) {
        return sex ? 'м' : 'ж';
    }
});

(function() {

//TODO angular module

var utils = window.utils = {};

utils.fixNull = function(values) {
    return values.map(function(val) {
        return val == -999 ? null : val;
    });
};

utils.mapDecimalValues = function(values) {
    return values.map(function(val) {
        if (val === null) return null;
        return val / 10.0;
    });
};

utils.mapPercentValues = function(values) {
    return values.map(function(val) {
        if (val === null) return null;
        return Math.round(val / 1.024) / 10.0;
    });
};

utils.formatDate = function(date, fmt) {
    //using parser in Bootstrap Datetime Picker
    var g = $.fn.datetimepicker.DPGlobal;

    var utcDate = new Date();
    var time = date.getTime() - date.getTimezoneOffset() * 60 * 1000;
    utcDate.setTime(time);
    return g.formatDate(utcDate, g.parseFormat(fmt, 'standard'), 'cs', 'standard');
};

utils.daysInMonth = function daysInMonth(month, year) {
    return new Date(year, month+1, 0).getDate();
};

utils.arrayPad = function(arr, size, value) {
    var missing = size - arr.length;
    var a = arr.slice();
    while (missing-- > 0) {
        a.push(value);
    }
    return a;
};

utils.timeToMinutes = function(val) {
    var t = val.split(':');
    return parseInt(t[0], 10)*60+parseInt(t[1], 10);
};

utils.minutesToTime = function(val) {
    var h = parseInt(val / 60, 10), m = val % 60;
    //TODO padstr fn
    return (h < 10 ? '0': '') + h + ":" + (m < 10 ? '0' : '') + m;
};

})();
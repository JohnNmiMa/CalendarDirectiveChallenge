angular.module('calendarDemoApp', [])

.controller('CalendarCtrl', function($scope) {
    var calendarData,
        firstDayInMonth,
        lastDayInMonth;

    function populateWeeks(date) {
        var numWeeks,
            week = [];

        calendarData = CalendarRange.getMonthlyRange(date);
        firstDayInMonth = calendarData.start;
        lastDayInMonth = calendarData.end;
        numWeeks = calendarData.days.length / 7;

        $scope.weeks = [];
        for (var i=0, day = 0; i<numWeeks; i+=1) {
            week = [];
            for (var j=0; j<7; j+=1, day+=1) {
                week.push(calendarData.days[day]);
            }
            $scope.weeks.push(week);
        }
    };

    $scope.isDayNotInMonth = function(day) {
        if (day.date < firstDayInMonth || day.date > lastDayInMonth) {
            return true;
        }
    };
    $scope.isDayToday = function(day) {
        var today = new Date(),
            todayDate = today.getDate(),
            todayMonth = today.getMonth(),
            dayDate = day.date.getDate(),
            dayMonth = day.date.getMonth();

        if (dayDate == todayDate && dayMonth == todayMonth) {
            return true;
        }
    }

    populateWeeks(new Date());
})

.directive('computeDays', function() {
    return {
        link: function($scope, element, attrs) {
            angular.element(window).bind('resize', function() {
                $scope.$apply(function () {
                    computeDays();
                });
            });

            function computeDays() {
                var mq = window.matchMedia("(min-width: 768px)");
                if (mq.matches) {
                    $scope.days = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                } else {
                    $scope.days = ["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"];
                }
            };
            computeDays();
        },
    }
});


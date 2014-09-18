angular.module('calendarDemoApp', [])

// The 'calendar' element directive will build a calendar. Upon startup, the
// calendar will display the current month. The 'populateWeeks' function
// will take a javascript Date() object, and from that produce a table
// such that each cell will be a day in the chosen month.
.directive('calendar', function() {
    return {
        restrict: 'E',
        templateUrl: 'calendarTemplate.html',
        transclude: true,
        scope: true,
        controller: function($scope, $element, $attrs) {
            var firstDayInMonth,
                lastDayInMonth;

            $scope.isToday = function(day) {
                var today = new Date();
                if (day.date.getYear()  == today.getYear()  &&
                    day.date.getMonth() == today.getMonth() &&
                    day.date.getDate()  == today.getDate()) {
                    return true;
                }
            }

            $scope.isDayNotInMonth = function(day) {
                if (day.date < firstDayInMonth || day.date > lastDayInMonth) {
                    return true;
                }
            };

            this.populateWeeks = function(date) {
                var calendarData = CalendarRange.getMonthlyRange(date);
                numWeeks = calendarData.days.length / 7,
                    week = [];

                firstDayInMonth = calendarData.start;
                lastDayInMonth = calendarData.end;

                $scope.weeks = [];
                for (var i=0, day = 0; i<numWeeks; i+=1) {
                    week = [];
                    for (var j=0; j<7; j+=1, day+=1) {
                        week.push(calendarData.days[day]);
                    }
                    $scope.weeks.push(week);
                }
            }
        },
        link: function($scope, element, attrs, calendarController) {
            var initialDate = new Date();
            calendarController.populateWeeks(initialDate);
        }
    }
})

// The 'datePicker' attribute directive is used to let the user
// select a calendar's month and year.
.directive('datePicker', function() {
    return {
        require: '?^calendar',
        restrict: 'A',
        templateUrl: 'datePickerTemplate.html',
        link: function(scope, element, attrs, calendarController) {
            scope.data = {};

            function init() {
                var today = new Date(),
                    year = today.getFullYear(), startYear = year - 100, endYear = year + 20;

                scope.months = ['January','February','March','April','May','June',
                                'July','August','September','October','November','December'];
                scope.data.month = scope.months[today.getMonth()];
                scope.data.year = year;
                scope.data.years = [];
                for (var i = startYear; i<=endYear; i+=1) {
                    scope.data.years.push(i);
                }
            }

            scope.setToday = function() {
                var today = new Date();
                calendarController.populateWeeks(today);
                scope.data.year = today.getFullYear();
                scope.data.month = scope.months[today.getMonth()];
            };

            scope.$watch('data.year', function(year) {
                var monthIndex = scope.months.indexOf(scope.data.month),
                    date = new Date(year, monthIndex, 1);
                calendarController.populateWeeks(date);
            });
            scope.$watch('data.month', function(month) {
                var monthIndex = scope.months.indexOf(month),
                    date = new Date(scope.data.year, monthIndex, 1);
                calendarController.populateWeeks(date);
            });

            init();
        }
    }
})

// The 'sizeit' attribute directive will attempt to keep the
// td cell height at 75% of its width. This helps keep the
// calendar propotional in size.
.directive('sizeit', function() {
    return {
        link: function($scope, element, attrs) {
            $(window).on('resize', function() {
                $scope.$apply(function () {
                    computeDayCellHeight();
                })
            });
            function computeDayCellHeight() {
                element.height(element.width() * 0.75);
            }
            computeDayCellHeight();
        }
    }
})

// The 'computeDays' attribute directive is used to set the calendar weekday names
// to a size that will fit the viewport.
.directive('computeDays', function() {
    return {
        link: function($scope, element, attrs) {
//            angular.element(window).bind('resize', function() {
            $(window).on('resize', function() {
                console.log("In computeDays resize event");
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
            }
            computeDays();
        }
    }
});


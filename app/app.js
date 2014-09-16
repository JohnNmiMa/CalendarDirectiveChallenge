angular.module('calendarDemoApp', [])

.controller('CalendarCtrl', function($scope) {
    var calendarData = CalendarRange.getMonthlyRange(new Date()),
        numWeeks = calendarData.days.length / 7,
        week = [];

    $scope.weeks = [];
    for (var i=0, day = 0; i<numWeeks; i+=1) {
        week = [];
        for (var j=0; j<7; j+=1, day+=1) {
            week.push({day: calendarData.days[day].day});
        }
        $scope.weeks.push(week);
    }
});

// your controller and directive code go here

// A day: {date:22, day:Wednesday}
// A week: [{},{},{},{},{},{},{}]; --> seven days
// A month: [ [], [], [], [], [] ] -- an array of weeks
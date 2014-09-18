describe('a set date calendar', function() {
    var scope, element, compiled, html;

    beforeEach(module("calendarApp"));
    beforeEach(module("calendarTemplate.html"));
    beforeEach(inject(function($rootScope, $compile) {
        var today = new Date().toString();
        html   = "<calendar initial-date='June 21, 2002'>";
        html  += "  <div></div>";
        html  += "</calendar>";

        scope = $rootScope.$new();
        compiled = $compile(html);
        element = compiled(scope);
        scope.$digest();
    }));

    it('should create a June, 2002 calendar with 42 days', function() {
        expect(element.find('td').length).toBe(42);
    });
    it('should have 12 padding days shown not in the current month', function() {
        var count = 0;
        $.each(element.find('td'), function(index, item) {
            if ($(item).hasClass('notInMonth')) count++;
        });
        expect(count).toBe(12);
    });
    it('controller\'s isToday() should NOT let the isToday class be set', function() {
        // There is no 'isToday' class since we are in June of 2002
        var result = element[0].getElementsByClassName('datenum');
        expect(angular.element(result).hasClass('isToday')).toBeFalsy();
    });
    it('should expose a controller to populate the calendar', function() {
        var ctrl = element.data('$calendarController');
        expect(angular.isFunction(ctrl.populateWeeks)).toBe(true);
        ctrl.populateWeeks(new Date());
        scope.$digest();
        var result = element[0].getElementsByClassName('datenum');
        expect(angular.element(result).hasClass('isToday')).toBeTruthy();
    });
});

describe('todays calendar', function() {
    var scope, element, compiled, html;

    beforeEach(module("calendarApp"));
    beforeEach(module("calendarTemplate.html"));
    beforeEach(inject(function($rootScope, $compile) {
        var today = new Date().toString();
        html   = "<calendar initial-date='today'>";
        html  += "  <div></div>";
        html  += "</calendar>";

        scope = $rootScope.$new();
        compiled = $compile(html);
        element = compiled(scope);
        scope.$digest();
    }));

    it('controller\'s isToday() should let the isToday class be set', function() {
        var result = element[0].getElementsByClassName('datenum');
        expect(angular.element(result).hasClass('isToday')).toBeTruthy();
    });
});

describe('date-picker', function() {
    var scope, element, compiled, html;

    beforeEach(module("calendarApp"));
    beforeEach(module("calendarTemplate.html"));
    beforeEach(module("datePickerTemplate.html"));
    beforeEach(inject(function($rootScope, $compile) {
        var today = new Date().toString();
        html   = "<calendar>";
        html  += "  <div date-picker initial-date='June 21, 2002'></div>";
        html  += "</calendar>";

        scope = $rootScope.$new();
        compiled = $compile(html);
        element = compiled(scope);
        scope.$digest();
    }));

    it('should create a June, 2002 calendar with 42 days', function() {
        expect(element.find('td').length).toBe(42);
    });
    it('should expose a controller to populate the calendar', function() {
        var ctrl = element.data('$calendarController');
        expect(angular.isFunction(ctrl.populateWeeks)).toBe(true);
        ctrl.populateWeeks(new Date());
        scope.$digest();
        var result = element[0].getElementsByClassName('datenum');
        expect(angular.element(result).hasClass('isToday')).toBeTruthy();
    });
});

describe('sizeit', function() {
    var scope, element, compiled, html;

    beforeEach(module("calendarApp"));
    beforeEach(inject(function($rootScope, $compile) {
        html  = "<table>";
        html += "    <tr>";
        html += "      <td sizeit style='width: 100px;'>";
        html += "    </tr>";
        html += "</table>";

        scope = $rootScope.$new();
        compiled = $compile(html);
        element = compiled(scope);
        scope.$digest();
    }));

    it('date cell height should be a percentage of its width', function() {
        var td = element.find('td');
        expect(td.width()).toBe(100);
        expect(td.height()).toBe(td.width() * (scope.heightPct/100));
    })
});

describe('compute-days', function() {
    var scope, element, compiled, html;

    beforeEach(module("calendarApp"));
    beforeEach(inject(function($rootScope, $compile) {
        html = "<thead compute-days>";

        scope = $rootScope.$new();
        compiled = $compile(html);
        element = compiled(scope);
        scope.$digest();
    }));

    it('should make weekday names have 7 elements', function() {
        expect(scope.days.length).toBe(7);
    })
});
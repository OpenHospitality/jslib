function CalendarMonth(month, year, parentCalendar, index) {
    var currMonth = month,
        currYear = year,
        nextMonth = currMonth === 11 ? 0 : currMonth + 1,
        nextYear = currMonth === 11 ? currYear + 1 : currYear;

    this.index = index
    this.parent = parentCalendar;   
    this.useTables = this.parent.useTables;
    this.startingDate = this.parent.startingDate;
    this.month = currMonth;
    this.year = currYear;
    this.firstDay = new Date(currYear, currMonth, 1);
    this.startingDay = new Date(currYear, currMonth, 1).getDay();
    this.daysInMonth = new Date((new Date(nextYear, nextMonth, 1).getTime() - 86400000)).getDate();
}


CalendarMonth.prototype = {
    createTeaserHeader: function() {
        var cal_months_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          , html = '<thead>';

        html += '<tr>';

        html += (this.index === 0) ? '  <th id="teaserPrev" class="ymtprevious disabled"></th>' 
                                   : '  <th id="teaserPrev" class="ymtprevious">«</th>';

        html += '  <th class="ymtymh" colspan="5">' + cal_months_labels[this.month] + "&nbsp;" + this.year + '</th>';

        html += (this.index+1 < this.parent.monthCount) ? '  <th id="teaserNext" class="ymtnext">»</th>' 
                                                        : '  <th id="teaserNext" class="ymtnext">&nbsp;</th>';
        html += this.createDaysOfWeek();
        html += '</tr>';
        html += '</thead>';
        return html;
    },
    createDaysOfWeek: function() {
        var cal_days_labels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
          , html = (this.useTables === true) ? '<tr>' : '<div class="row ">';

        for (var i = 0; i <= 6; i++) {
            html += (this.useTables === true) ? '<th>' : '<div class="dateCol">';
            html += cal_days_labels[i];
            html += (this.useTables === true) ? '</th>' : '</div>';
        }
        html += (this.useTables === true) ? '</tr>' : '</div>';
        return html;
    },
    renderDayOutOfRange: function(dt, calMonth) {
        return this.useTables === true ? '<td class="col ymdrangeinvalid">' + dt.getDate() + '</td>' : '<div class="col ymdrangeinvalid">' + dt.getDate() + '</div>'
    },
    getDailyCss: function(dt, calMonth) {
        var today = Utils.stripTime(new Date())
          , dtSt = Utils.stripTime(dt)
          , cssClasses = 'col '
          , dateAsYYYYMMDD = Utils.dateToYYYYMMDD(dtSt)
          , notAvailable = ($.inArray(dateAsYYYYMMDD, this.parent.unavailableDates) >= 0)
          , isDisabled = false
          , isCurrentDate = false
          , isAvailable = false
          , isPrevSelected = false
          , isSelected = false
          , hotelDate = this.parent.hotelDate;

        if (this.parent.highlightedDate !== undefined) {
            if (dt.getTime() === this.parent.highlightedDate.getTime()){
                isPrevSelected = true;
            }
        }

        if (dt.getTime() < this.parent.firstSelectableDate.getTime()){
            isDisabled = true;
        };
        
        // DM +++
        if (hotelDate.date.getDate() === dt.getDate() && hotelDate.date.getHours() >= hotelDate.hourCutoff) {
            isDisabled = true;
        }

        if (notAvailable) {
            isDisabled = true; //cssClasses += 'disabled '
        } else {
            if (dtSt.getTime() >= today.getTime() && dtSt.getTime() >= this.parent.firstSelectableDate.getTime()) {
                isAvailable = true; //cssClasses += 'available '
            } else {
                isDisabled = true; //cssClasses += 'disabled '
            };
        }

        if (this.parent.selectedDate.getTime() === dt.getTime()) {
            isSelected = true //cssClasses += 'selected '
        };

        if (today.getTime() === dt.getTime()) {
            isCurrentDate = true; //cssClasses += 'currentDay '
        };

        if ((isPrevSelected === true) && (isDisabled === true)) {
            isDisabled = false;
            cssClasses += 'prevSelected ';
        }
        if (isDisabled === true){
            cssClasses += 'ymdrangeinvalid '
        }
        if(isAvailable === true){
            cssClasses += 'available '
        }
        if (isSelected === true){
            cssClasses += 'selected '
        }

        if (isCurrentDate === true){
            cssClasses += 'currentDay '
        }

        return cssClasses
    },
    renderDayInRange: function(dt, calMonth) {
        var today = Utils.stripTime(new Date())
          , tags = (this.useTables === true) ? { open: '<td ', close: '</td>'} : { open: '<div ', close: '</div>'}
          , html = tags.open + 'id="d' + Utils.dateToYYYYMMDD(dt) + '" class="' + this.getDailyCss(dt, calMonth) + '">' + dt.getDate() + tags.close;

        return html;
    },
    isInRange: function(day, weekNbr, dayOfWeek) {
        return (day <= this.daysInMonth && (weekNbr > 0 || dayOfWeek >= this.startingDay));
    },
    generateHTML: function() {
        var day = 1
          , offset = this.startingDay
          , html = '<div id="teaser007">'

        html += (this.useTables === true) ? '<table class="ymtb">'
                                          : '<div class="ymtb">';
        html += this.createTeaserHeader()
        
        for (var weekNbr = 0; weekNbr < 9; weekNbr++) {
            for (var dayOfWeek = 0; dayOfWeek <= 6; dayOfWeek++) {
                var inRange = this.isInRange(day, weekNbr, dayOfWeek);
                var dt = new Date(this.year, this.month, day);
                if (inRange) {
                    html += this.renderDayInRange(dt, this);
                    day++
                } else {
                    dt = new Date(dt.getTime() - (86400000 * offset)); 
                    html += this.renderDayOutOfRange(dt, this);
                    offset = offset - 1
                };
            }
            // stop making rows if we've run out of days
            if (day > this.daysInMonth) {
                break;
            } else {
                html += (this.useTables === true) ? '</tr><tr class="row">' : '</div><div class="row">';
            }
        }

        html += (this.useTables === true) ? '</table>' : '</div>';  // teaserboxCalendar
        html += '<div style="clear: both; "></div>';
        html += '<div id="closebuttoncontainer"><button id="closeButton">close</button></div>';
        html += '</div>'; // teaserWrapper
        return html;
    }
};


function Calendar(options) {
    this.unavailableDates = options.unavailableDates || [];
    this.useTables = options.useTables || false;
    this.monthCount = options.monthCount || 24;
    this.startingDate = options.startingDate || Utils.stripTime(new Date());
    this.dateLabel = options.dateLabel;
    this.container = options.container;
    this.currentIndex = 0;
    this.selectedDate = this.startingDate;
    this.hotelDate = options.hotelDate;
    if (options.checkInLabel === '') {
        this.updateDateLabel(this.startingDate);
    };
};

Calendar.prototype = {
    monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    activate: function(activationOptions) { 
        var dbTime = +new Date();

        this.firstSelectableDate = activationOptions.firstSelectableDate;
        this.calendars = this._createCalendars();

        var that = this;
        if (activationOptions.selectedDate !== undefined) {
            this.selectedDate = activationOptions.selectedDate;
            var idx = this._getCalendarIndexForDate(activationOptions.selectedDate);
            this.currentIndex = idx > -1 ? idx : 0;
        }

        this.render();
    },
    render: function() {
        $(document.body).unbind('click.teaser');
        this.container.empty();

        var calendarMarkup = this.calendars[this.currentIndex].generateHTML();
        this.container.append(calendarMarkup);
        var that = this;
        
        $(document.body).bind('click.teaser', function(e) {

            if (e.target.id === 'teaserNext') {
                Utils.stopEvent(e);
                that.next();
                return false;
            };

            if (e.target.id === 'teaserPrev') {
                Utils.stopEvent(e);
                that.prev();
                return false;
            }

            var isValid = $(e.target).hasClass('available');
            if (isValid === true) {
                var yr_mnth_dy = e.target.id.substr(1,8)
                  , inYear = parseInt(yr_mnth_dy.substr(0, 4), 10)
                  , inMonth = parseInt(yr_mnth_dy.substr(4, 2), 10) - 1
                  , inDay = parseInt(yr_mnth_dy.substr(6, 2), 10)
                  , selectedDate = new Date(inYear, inMonth, inDay);
                that.selectedDate = selectedDate;
                that.destroy();
                that.updateDateLabel(selectedDate);
                
                $(that).trigger('DateChanged', [selectedDate, e.target.id]);
            } else {
                that.destroy();
            }
            return false
        });
    },
    _createCalendars: function() {
        var currMonth = this.startingDate.getMonth()
          , currYear = this.startingDate.getFullYear()
          , monthYears = [];

        for (var i = 1; i <= this.monthCount; i++) {
            monthYears.push(new CalendarMonth(currMonth, currYear, this, i-1));
            currMonth += 1
            if (currMonth === 12) {
                currMonth = 0;
                currYear += 1;
            };
        };
        return monthYears;
    },
    _getCalendarIndexForDate: function(dt) {
        var monthCount = this.calendars.length - 1
          , foundIndex = -1;

        for (var i = 0; i <= monthCount; i++) {
            if (this.calendars[i].year === dt.getFullYear() && this.calendars[i].month === dt.getMonth()) {
                foundIndex = i;
                break;
            }
        }
        return foundIndex;
    },  
    first: function() {
        this.currentIndex = 0;
        this.render();
    },
    next: function() {
        this.currentIndex = (this.currentIndex + 1) < this.calendars.length ? this.currentIndex + 1 : this.calendars.length-1;        
        this.render();
    },
    prev: function() {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : 0;        
        this.render();
    },
    destroy: function() {
        this.container.empty();
        $(document).unbind('keydown.teaser');
        $(document.body).unbind('click.teaser');        
    },
    updateDateLabel: function(dt) {
        $("input[name=pdcheckinyyyymmdd]").val(Utils.dateToYYYYMMDD(TB.inDateCal.selectedDate));
        $("input[name=pdcheckoutyyyymmdd]").val(Utils.dateToYYYYMMDD(TB.outDateCal.selectedDate));
        // DM - Updates calendar label in MM/DD/YYYY format
        this.dateLabel.flex_label.val((dt.getMonth() + 1).toString() + '/' + Utils.padZero(dt.getDate().toString(), 2) + '/' + dt.getFullYear().toString());
        // DM - Updates calendar label in Month Date, Year format
        // this.dateLabel.flex_label.val(this.monthNames[dt.getMonth()] + ' ' + Utils.padZero(dt.getDate().toString(), 2) + ', ' + dt.getFullYear().toString());
    }
}

function LocalDate (utcOffset, hourCutoff) {
    this.utcOffset = utcOffset;
    this.hourCutoff = hourCutoff;
    utcTime = function() {
        var now = new Date();
        return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());    
    }
    this.date = utcTime();
    // this.tomorrow = Utils.utcTime();
    // this.tomorrow.setDate(this.date.getDate() + 1);
    this.date.setHours(this.date.getHours() + this.utcOffset);

/*    var yyyy = this.date.getFullYear().toString()
      , mm = this.date.getMonth() < 9 ? '0' + (this.date.getMonth() + 1).toString() : this.date.getMonth().toString()
      , dd = (this.date.getDate() <= 9) ? '0' + this.date.getDate().toString() : this.date.getDate().toString()
      , tmwyyyy = this.tomorrow.getFullYear().toString()
      , tmwmm = this.tomorrow.getMonth() < 9 ? '0' + (this.tomorrow.getMonth() + 1).toString() : this.tomorrow.getMonth().toString()
      , tmwdd = (this.tomorrow.getDate() <= 9) ? '0' + this.tomorrow.getDate().toString() : this.tomorrow.getDate().toString();

    this.todayYYYYMMDD = yyyy + mm + dd;
    this.tmwYYYYMMDD = tmwyyyy + tmwmm + tmwdd;
    this.todaySelector = "td[id='" + "d" + this.todayYYYYMMDD + "\']";
    this.tmwSelector = "td[id='" + "d" + this.tmwYYYYMMDD + "\']";*/
}

/*LocalDate.prototype = {
    isValidForToday: function() {return this.date.getHours() < this.hourCutoff;},
    getHotelTime: function(dt) {
        return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),this.date.getHours(),this.date.getMinutes(),this.date.getSeconds());
    }
}*/
// Copyright 2012 Open Hospitality. All Rights Reserved.

/**
 * @fileoverview A script containing utility functions used throughout all sites
 * @author sgravitz@openhospitality.com (Steve Gravitz), daniel@openhospitality.com (Daniel Mickleburgh)
 * @module Utils
 * @change SG 2012-02-10 Added "trim" method
 * @change DM 2012-03-28 Fixed bug in "areDatesEqual" method
 * @change DM 2012-04-02 Cleaned up code
 * @change DM 2012-06-21 Add new methods: 
 */


/**
 * Namespace
 * @type {Object}
 */
var Utils = Utils || {};

/**
 * @method dir enumerates through properties of the current object.
 * @param obj {Object} the object to enumerate
 * @return {string} returns the trimmed string
 */
Utils.dir = function(obj) {
    obj = obj || this;	
	for(var propertyName in obj) {
	    if (obj.hasOwnProperty(propertyName)) {
	        console.log(propertyName, typeof obj[propertyName]);
	        console.log(obj[propertyName]);
	  	}    
	}
};

/**
 * @method trim removes any leading and trailing spaces from string.
 * @param str {string} The string to trim
 * @return {string} Returns the trimmed string
 */
Utils.trim = function(str) {
    var str = str.replace(/^\s\s*/, '')
      , ws = /\s/
      , i = str.length;

    while (ws.test(str.charAt(--i)));
    return str.slice(0, i + 1);
};

/**
 * @method encodeParameter Replaces any space characters with the plus sign.
 * @param value {string} The value to encode
 * @return {string} Returns the string from calling replace on value
 */
Utils.encodeParameter = function(value) {
	return value.replace(' ','+');
};

/**
 * @method makeOption Creates an opening and closing option tag.
 * @param value {string} The option value.
 * @param description {string} The option description - defaults to value if missing.
 * @return {string} Returns a string version of an html option element.
 */
Utils.makeOption = function(value, description) { 
	return "<option value=\"" + value + "\">" + (description || value) + "</option>"; 
};

/**
 * @method getPageFromUrl Splits the pathname by / 
 * @return {object} Returns an array of the pathname split up by /
 */
Utils.getPageFromUrl = function(){
	var parts = location.pathname.split('/')    
	return parts[parts.length-1];                           
}

/**
 * @method pad Inserts an integer before a value
 * @param padChar {string} The integer you wish to place before the value passed.
 * @param value {string}
 * @param length {string} Length of padding and value
 * @return {string} 
 */
Utils.pad =  function (padChar, value, length) {
	var str = '' + value;
	while (str.length < length) { str = padChar + str; }
	return str;
}

/**
 * @method padZero Inserts a 0 before the passed number.
 * @param number {number}
 * @param length {number}
 * @return {number} Returns a padded integer. Ex. Pass in 5, the method returns 05.
 */
Utils.padZero = function (number, length) {
	var str = '' + number;
	while (str.length < length) { str = '0' + str; }
	return str;
}

/**
 * @method removeSelectOptions Removes a select option if the length of child nodes is less than 1
 * @param select {object}
 */
Utils.removeSelectOptions = function(select) {
	while (select.childNodes.length > 1) {
		select.removeChild(select.lastChild);
	}
}

/**
 * @method setSelected Iterates through an options list to find the selected element
 * @param id {object}
 * @param value {string}
 * @return {string} Returns selected element
 */
Utils.setSelected = function (id, value) {
	var options = document.getElementById(id).getElementsByTagName("option");
	for (var i = 0; i < options.length; i++) {
		options[i].selected = options[i].value === value;
	}
}

/**
 * @method stopEvent Stops the event from propagating and prevents the browser default event action
 * @param e {object} Pass an event object
 */
Utils.stopEvent = function(e) {
	if (e.stopPropagation) e.stopPropagation();
	else e.cancelBubble = true;

	if (e.preventDefault) e.preventDefault();
	else e.returnValue = false;
}

/**
 * @method areDatesEqual Check eqaulity of two date objects 
 * @param dt1 {date} First date object.
 * @param dt2 {date} Second date onject. 
 * @return {Boolean} True if dates are equal, otherwise false.
 */
Utils.areDatesEqual = function(dt1, dt2) {
	return (dt1 === dt2) ? true : false;
};

/**
 * @method dateToYYYYMMDD
 * @param dt {date} Pass a date object.
 * @return Converts passed date to display YYYYMMDD.
 */
Utils.dateToYYYYMMDD = function(dt) {
	return dt.getFullYear().toString() + ((dt.getMonth() + 1).toString().length === 1 ? "0" + (dt.getMonth() + 1).toString() : (dt.getMonth() + 1).toString()) + (dt.getDate().toString().length === 1 ? "0" + dt.getDate().toString() : dt.getDate().toString());
}

/**
 * @method dateToYYYYMM
 * @param dt {date} Pass a date object.
 * @return Converts passed date to display YYYYMM.
 */
Utils.dateToYYYYMM = function(dt) {
	return dt.getFullYear().toString() + ((dt.getMonth() + 1).toString().length === 1 ? "0" + (dt.getMonth() + 1).toString() : (dt.getMonth() + 1).toString());
}

/**
 * @method toShortDate
 * @param dt {date} Pass a date object.
 * @return {string} Converts date t0 MM/DD/YYYY.
 */
Utils.toShortDate = function(dt) {
	return (dt.getMonth() + 1).toString() + '/' + dt.getDate().toString() + '/' + dt.getFullYear().toString();
}

/**
 * @method dateToDD
 * @param dt {date} Pass a date object.
 * @return {string} Returns day in 2 digit format.
 */
Utils.dateToDD = function(dt) {
	return dt.getDate().toString().length === 1 ? "0" + dt.getDate().toString() : dt.getDate().toString();
}

/**
 * @method stripTime Removes Hours, Minutes and Seconds from the Date object.
 * @param dt {date} Pass a date object.
 * @return {date} Returns Date object with only Years, Months and Days.
 */
Utils.stripTime = function(dt) {
	return new Date(dt.getFullYear(),dt.getMonth(),dt.getDate()); 
}

/**
 * @method getDaysInMonth Number of days in the month.
 * @param dt {date} Pass a date object.
 * @return {date} Returns a new date containing the number of days in a month.
 */
Utils.getDaysInMonth = function(dt) {
	var nextYear = dt.getMonth() === 11 ? dt.getFullYear()+1 : dt.getFullYear()
	  , nextMonth = dt.getMonth() === 11 ? 1 : dt.getMonth() + 1
	  , firstOfNextMonth = new Date(nextYear, nextMonth, 1);
	
	return new Date(firstOfNextMonth.getTime() - 86400000).getDate();
}

/**
 * @method makeDays Dynamically creates days.
 * @param dt {date} Pass a date object.
 * @return {object} Returns day elements
 */
Utils.makeDays = function(dt) {
	var days = []
	  , currDaysInMonth = getDaysInMonth(dt || new Date());
	for (var i = 1; i < currDaysInMonth+1; i++) { days.push(makeOption(pad(i,2)));};    
		return days;
}

/**
 * @method makeMonths Dynamically creates months.
 * @return {object} Returns an array of 12 month names and date numbers.
 */
Utils.makeMonths = function () {
	var months = [];
	for (var i = 1; i < 13; i++) { months.push(makeOption(pad(i,2),monthNames[i-1])); };
		return months;
}

/**
 * @method makeYears Create years based on what number you pass.
 * @param yearCount {number} 
 * @return {object} Returns an object containing the number of years you passed to the function
 */
Utils.makeYears = function(yearCount) {
	var currYear = new Date().getFullYear()
	  , years = []
	  , cnt = yearCount || 2;
	
	for (var i = 0; i < (yearCount+1); i++) {years.push(makeOption(currYear+i)); };
	return years;
}

/**
 * @method makeYearMonths Dynamically creates months and years.
 * @param periodCount
 * @return {object} Returns an object containing the dynamically created  month and years.
 */
Utils.makeYearMonths = function(periodCount) {
	var currMonth = new Date().getMonth()+1        
	  , currYear = new Date().getFullYear()
	  , monthYears = []
	  , periods = periodCount || 24;
	
	for (var i = 1; i < (periods+1); i++) { 
		var key = String(currYear) + pad(currMonth,2);
		var val = monthNames[currMonth-1] + ' ' + String(currYear);
		monthYears.push(makeOption(key, val));         
		currMonth += 1
		if (currMonth === 13) {
			currMonth = 1;
			currYear += 1;
		};
	};
   
	return monthYears;
}

/**
 * @method addDays Adds a day(s) to the date passed by the dt parameter.
 * @param dt {date} Pass a date object.
 * @param days {number} 
 * @return {date} Returns a new date with the added day(s).
 */
Utils.addDays = function(dt, days) {
	return new Date((dt.getTime() + (86400000 * days || 1))); 
}

/**
 * @method toDays Calculates the remaining time between the two dates.
 * @param begDate {date} Pass a date object.
 * @param endDate {date} Pass a date object.
 * @return {number} Returns remaining time between begDate and endDate parameters.
 */
Utils.toDays = function(begDate, endDate) {
	return ( (endDate-begDate > 0 ? endDate-begDate : begDate-endDate)/(1000*60*60*24) ); 
}

/**
 * @method getLocalTime Finds the local time by offsetting the necessary amount of hours from UTC.
 * @param offset {number} This number can be negative to fit accordingly with the desired timezone. Ex. To get Pacific Statndard Time (PST) pass -8 to the offset.
 * @param dt {date}
 * @return {date} Returns the Local date as specified by the offset parameter.
 */
Utils.getLocalTime = function (offset, dt) {
	var d = dt || Utils.utcTime();
	return new Date((d.getTime() + (3600000 * offset)));
}

/**
 * @method utcTime Takes a standard date object an coverts it to UTC time.
 * @return Returns UTC date in the following order: Year, Month, Day, Hours, Minutes and Seconds.
 */
Utils.utcTime = function() {
	var now = new Date();
	return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());    
}

/*
 * @method cloneDate clones a date
 * @param dt {date}
 * @return {date}Clones the passed date object and returns it
 */
Utils.cloneDate = function (dt) {
	var date = new Date(dt.getTime());
	return date;
}

/**
 * @method subtractDays - subtracts a day(s) to the date passed by the dt parameter.
 * @param dt {date} Pass a date object.
 * @param days {number} 
 * @return {date} Returns a new date with the subtracted day(s).
 */
Utils.subtractDays = function(dt, days) {
    return new Date((dt.getTime() - (86400000 * days || 1))); 
};

/**
 * @method bindThis - binds function to a specific conetext
 * @param scope - object context 
 * @return {function} scoped to given context
 */
Function.prototype.bindThis = function(scope) {
	var _function = this;

	return function() {
		return _function.apply(scope, arguments);
	}
};

/**
 * @method YYYYMMDDtoDate
 * @param str {string} Pass a string date in YYYYMMDD format.
 * @return Converts passed YYYYMMDD string to date.
 */
Utils.YYYYMMDDtoDate = function(str) {
    return new Date(
        Number(str.substring(0, 4)), 
        Number(str.substring(4, 6)) - 1, 
        Number(str.substring(6, 8))
    );
}
// Copyright 2012 Open Hospitality. All Rights Reserved.

/**
 * @fileoverview A script containing utility functions used throughout all sites
 * @author sgravitz@openhospitality.com (Steve Gravitz), daniel.mickleburgh@openhospitality.com (Daniel Mickleburgh)
 * @module Utils
 */

/**
 * Namespace
 * @type {Object}
 */
var Utils = Utils || {};
Utils.version = Utils.v = 0.3;
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
 * @method encodeParameter Replaces any space characters within a string with a plus sign.
 * @param value {string} The value to encode
 * @return {string} Returns the string from calling replace on value
 */
Utils.encodeParameter = function(value) {
	return value.replace(/(\s)/g,'+');
};

/**
 * @method Dynamically creates an option tag with a specified value.
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
	var parts = location.pathname.split('/');
	return parts[parts.length-1];
};

/**
 * @method 
 * @param padChar {string}
 * @param value {string}
 * @param length {number}
 * @return {string} 
 */
Utils.pad =  function (padChar, value, length) {
	var str = '' + value;
	while (str.length < length) { str = padChar + str; }
	return str;
};

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
};

/**
 * @method removeSelectOptions Removes a select option if the length of child nodes is less than 1
 * @param select {object}
 */
Utils.removeSelectOptions = function(select) {
	while (select.childNodes.length > 1) {
		select.removeChild(select.lastChild);
	}
};

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
};

/**
 * @method stopEvent Stops the event from propagating and prevents the browser default event action
 * @param e {object} Pass an event object
 */
Utils.stopEvent = function(e) {
	if (e.stopPropagation) e.stopPropagation();
	else e.cancelBubble = true;

	if (e.preventDefault) e.preventDefault();
	else e.returnValue = false;
};

/**
 * @method areDatesEqual Check if two dates are equal 
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
};

/**
 * @method dateToYYYYMM
 * @param dt {date} Pass a date object.
 * @return Converts passed date to display YYYYMM.
 */
Utils.dateToYYYYMM = function(dt) {
	return dt.getFullYear().toString() + ((dt.getMonth() + 1).toString().length === 1 ? "0" + (dt.getMonth() + 1).toString() : (dt.getMonth() + 1).toString());
};

/**
 * @method toShortDate
 * @param dt {date} Pass a date object.
 * @return {string} Converts date t0 MM/DD/YYYY.
 */
Utils.toShortDate = function(dt) {
	return (dt.getMonth() + 1).toString() + '/' + dt.getDate().toString() + '/' + dt.getFullYear().toString();
};

/**
 * @method dateToDD
 * @param dt {date} Pass a date object.
 * @return {string} Returns day in 2 digit format.
 */
Utils.dateToDD = function(dt) {
	return dt.getDate().toString().length === 1 ? "0" + dt.getDate().toString() : dt.getDate().toString();
};

Utils.monthNamesArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/**
 * @method stripTime Removes Hours, Minutes and Seconds from the Date object.
 * @param dt {date} Pass a date object.
 * @return {date} Returns Date object with only Years, Months and Days.
 */
Utils.stripTime = function(dt) {
	return new Date(dt.getFullYear(),dt.getMonth(),dt.getDate()); 
};

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
};

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
};

/**
 * @method makeMonths Dynamically creates months.
 * @return {object} Returns an array of 12 month names and date numbers.
 */
Utils.makeMonths = function () {
	var months = [];
	for (var i = 1; i < 13; i++) { months.push(makeOption(pad(i,2),monthNamesArray[i-1])); }
		return months;
};

/**
 * @method makeYears Create years based on what number you pass.
 * @param yearCount {number} 
 * @return {object} Returns an object containing the number of years you passed to the function
 */
Utils.makeYears = function(yearCount) {
	var currYear = new Date().getFullYear()
	  , years = []
	  , cnt = yearCount || 2;
	
	for (var i = 0; i < (yearCount+1); i++) {years.push(makeOption(currYear+i)); }
	return years;
};

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
		var val = monthNamesArray[currMonth-1] + ' ' + String(currYear);
		monthYears.push(makeOption(key, val));
		currMonth += 1;
		if (currMonth === 13) {
			currMonth = 1;
			currYear += 1;
		}
	}

	return monthYears;
};

/**
 * @method addDays Adds a day(s) to the date passed by the dt parameter.
 * @param dt {date} Pass a date object.
 * @param days {number} 
 * @return {date} Returns a new date with the added day(s).
 */
Utils.addDays = function(dt, days) {
	var newDate = new Date(dt);
	for (var i=0;i < days;i++) {
		newDate = new Date((newDate.getTime() + 86400000));
	}
	return newDate;
};

/**
 * @method toDays Calculates the remaining time between the two dates.
 * @param begDate {date} 
 * @param endDate {date} 
 * @return {number} Returns remaining time between begDate and endDate parameters.
 */
Utils.toDays = function(begDate, endDate) {
	return ( (endDate - begDate > 0 ? endDate - begDate : begDate - endDate)/(1000*60*60*24) );
};

/**
 * @method getLocalTime Finds the local time by offsetting the necessary amount of hours from UTC.
 * @param offset {number} This number can be negative to fit accordingly with the desired timezone. Ex. To get Pacific Statndard Time (PST) pass -8 to the offset.
 * @param dt {date}
 * @return {date} Returns the Local date as specified by the offset parameter.
 */
Utils.getLocalTime = function (offset, dt) {
	var d = dt || Utils.utcTime();
	return new Date((d.getTime() + (3600000 * offset)));
};

/**
 * @method utcTime Takes a standard date object an coverts it to UTC time.
 * @return Returns UTC date in the following order: Year, Month, Day, Hours, Minutes and Seconds.
 */
Utils.utcTime = function() {
	var now = new Date();
	return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
};

/*
 * @method cloneDate clones a date
 * @param dt {date}
 * @return {date}Clones the passed date object and returns it
 */
Utils.cloneDate = function (dt) {
	var date = new Date(dt.getTime());
	return date;
};

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
 * @method bindThis - binds function to a specific conetext - similar to Native ES5 method bind
 * @param scope - object context 
 * @return {function} scoped to given context
 */
Function.prototype.bindThis = function(scope) {
	var _function = this;

	return function() {
		return _function.apply(scope, arguments);
	};
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
};

/**
 * Mixes an object's prototype method(s) into another object's prototype
 * @method augment
 */
Utils.augment = function (destination, source) {
	if (arguments[2]) {
		for (var i = 2; i < arguments.length; i++) {
			destination.prototype[arguments[i]] = source.prototype[arguments[i]];
		}
	} else {
		for (methodName in source.prototype) {
			if (!destination.prototype[methodName]) {
				destination.prototype[methodName] = source.prototype[methodName];
			}
		}
	}
};

/**
* @method queryStringDictionary
* @param passedUrl {string} Pass a Url to parse paraemeters
* @return object containing key for each queryParm
*/
Utils.queryStringDictionary = function (passedUrl) {

	var queryString = {},
		url = passedUrl || window.location.search || '';

	if (url.length > 1) {
		var parameters = url.substr(1).split("&");
		for (i = 0; i < parameters.length; i++) {
			var entry = parameters[i].split("=");
			queryString[decodeURI(entry[0])] = entry.length > 1 ? decodeURI(entry[1]) : "";
		}
	}
	queryString.asString = function () { return JSON.stringify(queryString, null, '\t');};
	return queryString;
};

/**
* @method toBoolean
* @param value {string} Pass a value to be evaluated as Boolean
* @return boolean 
*/
Utils.toBoolean = function (value) {
	return String(value)[0] === 't' || String(value)[0] === '1' || String(value)[0] === 'y';
};

/**
* @method getNestedValue
* @param obj {object} The object to be evaluated
* @param prop {string} The property name in . notation
* @return object 
*/
Utils.getNestedValue = function(obj, prop) {
	var props = prop.split('.');
	for (var i = 0; i < props.length; i++) {
		if (typeof obj != "undefined") { obj = obj[props[i]]; }
	}
	return obj;
};


/**
* @method setNestedValue
* @param obj {object} The object to be evaluated
* @param prop {string} The property name in . notation
* @param val {object} The value to set
* @return object 
*/
Utils.setNestedValue = function(obj, prop, val) {
	var name, props = prop.split('.');

	if (props.length === 1) {
		obj[prop] = val;
	} else {
		name = props.pop();
		var parentObj = Utils.getNestedValue(obj, props.join('.'));
		parentObj[name] = val;
	}
};

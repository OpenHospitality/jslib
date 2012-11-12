/**
 Namespace
 @type {object}
**/
var oh.jq.Utils = function() {};

/**
Find elements with a certain data- attribute within a certain context
@method getElementByData
@return found jQuery object
**/
oh.jq.Utils.prototype.getElementByData = function(attr, attrVal, context, defValue) {
	var dataArray = $("[data-" + attr + "]", context);
    var foundSelector;
    if (dataArray.length === 0) throw new Error('No data attributes found.');
        $.each(dataArray, function (itr, el) {
            if ($(el).data(attr) === attrVal) {
                foundSelector = $(el);
            }
        })
        return foundSelector || { val: function () { return defValue; }
        };
    };
};
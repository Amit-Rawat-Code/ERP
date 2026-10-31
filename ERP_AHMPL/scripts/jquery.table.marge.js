/*
 * Function: used to merge cells
 * Dependency: jquery.1.7.1 and above
 */

(function($, window, document, undefined) {
    'use strict'; //strict javascript mode
    var margetable = function($eles, opt) {
        this.opt = opt; //User configuration
        this.defaults = {
            //Merge type
            //1: Indicates that the index of the column to be merged is specified, and the column index that depends on the merged column is given (in order)
            //   E.g:
            // colindex:[{
            // index: 2,//column index to be merged
            // dependent: [0,1]//The column index that the merged column depends on
            // }]
            //2: Specify the column index to be merged at the same time, and the latter column depends on the previous column index when merging
            //   E.g:
            // colindex:[0,1,2]//The merged column, the index of the latter column depends on the index of the former column
            type: 1,
            colindex: [{
                index: 0, //column index to be merged
                dependent: [0] //The column index that the merged column depends on, if the index is 0, then this value does not need to be assigned
            }]
        };

        this.options = $.extend({}, this.defaults, this.opt);
        var me = this;

        return $eles.each(function () {
            var $this = $(this);
            var colIndexs = me.options.colindex;
            if (me.options.type == "1") {
                //Cycle the configuration to be merged and perform the merge operation
                for (var i = 0; i < colIndexs.length; i++) {
                    margetColumn($this, colIndexs[i]);
                }
            } else if (me.options.type == "2") {
                margetColumn2($this, me.options);
            }
        });
    };

 // merge columns
    // $ele the table to be merged
    // option option set by the user
    var margetColumn = function($ele, option) {
        var me = this;
        var $trs = $ele.find('tbody tr');
        var preRecord = {
            index: 0,
            rowspan: 1,
            text: new Object()
        }; //Used to record the last value when the value is different
        var curText = new Object(); //Used to record the value of the current noon
        var isSame = true; //Whether the values ​​of upper and lower noon are the same
        for (var i = 0; i < $trs.length; i++) {
            if (i == 0) {
                preRecord.index = i;
                preRecord.text = setPreRecord($trs.eq(i), option);
            } else {
                isSame = true;
                if (option.index > 0 && option.dependent && option.dependent.length > 0) {
                    for (var deIndex = 0; deIndex < option.dependent.length; deIndex++) {
                        if (preRecord.text['col' + option.dependent[deIndex]] != $trs.eq(i).find('td').eq(option.dependent[deIndex]).text()) {
                            isSame = false;
                        }
                    }
                }
                if (isSame == false || preRecord.text['col' + option.index] != $trs.eq(i).find('td').eq(option.index).text()) {
                    $trs.eq(preRecord.index).find('td').eq(option.index).attr('rowspan', preRecord.rowspan);
                    preRecord.index = i;
                    preRecord.rowspan = 1;
                    preRecord.text = setPreRecord($trs.eq(i), option);
                } else {
                    preRecord.rowspan++;
                    $trs.eq(i).find('td').eq(option.index).hide();
                }
            }
        }
        $trs.eq(preRecord.index).find('td').eq(option.index).attr('rowspan', preRecord.rowspan);
    };
    // merge columns
    // $ele the table to be merged
    // option option set by the user
    var margetColumn2 = function($ele, option) {
        var me = this;
        var $trs = $ele.find('tbody tr');
        var preRecord = []; //Used to record the last value when the value is different
        var curText = "";
        for (var i = 0; i < $trs.length; i++) {
            var $tr = $trs.eq(i);
            if (i == 0) {
                for (var j = 0; j < option.colindex.length; j++) {
                    preRecord.push({
                        index: i,
                        rowspan: 1,
                        text: $tr.find('td').eq(option.colindex[j]).text()
                    });
                }
            } else {
                for (var j = 0; j < option.colindex.length; j++) {
                    var curText = $tr.find('td').eq(option.colindex[j]).text();
                    if (preRecord[j].text != curText) {
                        $trs.eq(preRecord[j].index).find('td').eq(option.colindex[j]).attr('rowspan', preRecord[j].rowspan);
                        preRecord[j].index = i;
                        preRecord[j].rowspan = 1;
                        preRecord[j].text = curText;
                        for (var m = j + 1; m < option.colindex.length; m++) {
                            $trs.eq(preRecord[m].index).find('td').eq(option.colindex[m]).attr('rowspan', preRecord[m].rowspan);
                            preRecord[m].index = i;
                            preRecord[m].rowspan = 1;
                            preRecord[m].text = $tr.find('td').eq(option.colindex[m]).text();
                        }
                        break;
                    } else {
                        $tr.find('td').eq(option.colindex[j]).hide();
                        preRecord[j].rowspan++;
                    }
                }
            }
        }
        for (var m = 0; m < option.colindex.length; m++) {
            $trs.eq(preRecord[m].index).find('td').eq(option.colindex[m]).attr('rowspan', preRecord[m].rowspan);
        }
    };

// record the last different value
    // index current index
    // $tr current line
    // option option set by the user
    var setPreRecord = function($tr, option) {
        var textinfo = new Object();
        textinfo['col' + option.index] = $tr.find('td').eq(option.index).text();
        if (option.index > 0 && option.dependent && option.dependent.length > 0) {
            for (var i = 0; i < option.dependent.length; i++) {
                textinfo['col' + option.dependent[i]] = $tr.find('td').eq(option.dependent[i]).text();
            }
        }
        return textinfo;
    }

    $.fn.margetable = function(options) {
        new margetable(this, options);
    }
})(jQuery, window, document);
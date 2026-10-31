
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
//----Amit--//
Array.prototype.sum = function (prop, minfrac) {
    if (minfrac == null)
        minfrac = 0;
    var total = 0
    for (var i = 0, _len = this.length; i < _len; i++) {
        if (!isNaN(Number(this[i][prop]))) {
            total += Number(this[i][prop])
        }
    }
    return total.toLocaleString("en", { useGrouping: false, minimumFractionDigits: minfrac })
}
const twodecimalformat = (num, decimals) => num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
//---Satrt Show Tab---//

function ResetImage(imagenUrl, inputfileid) {
    ////
    var drEvent = $(inputfileid).dropify();
    drEvent = drEvent.data('dropify');
    drEvent.resetPreview();
    drEvent.clearElement();
    drEvent.settings.defaultFile = imagenUrl;
    drEvent.destroy();
    drEvent.init();
}

function ConverttoDate(date) {
    var m = moment(date, 'YYYY-MMM-DD');
    if (m.isValid()) {
        return new Date(date);
    }
    else {
        return date;
    }
};
function FileExists(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if (xhr.status == "404") {
        return false;
    }
    else {
        return true;
    }
};

function setScrollPosition(focuselementid, scrollClass) {
    var element = $(focuselementid);
    element.stop().animate({ scrollTop: 0 }, 1000, 'swing', function () {
        if ($(scrollClass) == null || typeof ($(scrollClass)) === 'undefined') {
            $(scrollClass).css("top", "0");
        }
        else {
            $('.slimScrollBar').css("top", "0");
        }
    });
}

function Showtab(id) {
    $('.iframedesign').addClass('iframe-close');
    $('.refresh-box').attr('disabled', true);
    $(id).removeClass('iframe-close');
    $('#btnrefresh' + id.replace('#', '')).removeAttr("disabled");
}

function ReloadBox(id) {
    ////
    var frameID = id.replace('#', '');
    var tabID = "#btnrefresh" + frameID;
    $(tabID).addClass('fa-spin');

    document.getElementById(id.replace('#', '')).contentDocument.location.reload(true);

    var interval = setInterval(function () {
        if (document.readyState === 'complete') {
            clearInterval(interval);
            $(tabID).removeClass('fa-spin');
        };
    }, 100);
}
//---End Show Tab---//

//---Satrt Close Tab---//
function FindText(string) {
    ////
    if (string == null) return;
    return string.replace(/<(?:.|\n)*?>/gm, '');
}
function FindHtml(string) {
    try {
        if (string == null) return;
        return string.replace(string.replace(/<(?:.|\n)*?>/gm, ''), '');
    } catch (err) {
        return;
    }
}

function CloseTab(iframid, tabid) {


    $(tabid, document).remove();
    $(iframid, document).remove();

    var tablastli = $('.iframe-wrapper-tab li:last-child').attr("id");
    var tablastlianchor = $('.iframe-wrapper-tab li:last-child a').attr("href");

    $('tablastlianchor').removeClass('active');
    $('#' + tablastli).addClass('active');
    Showtab(tablastlianchor);
}
//---End Close Tab---//

function showMsgBox(response, title, text, type, ButtonClass)
{
    
    var msgbox_class = "";
    var msgbox_icon_class = "";
    var returnflag = true;

    switch (response.replace(/"/g, "")) {
        case "-1": /*Duplicate Record found!*/
            swal({
                title: "Duplicate",
                text: "Sorry, Duplicate Record found!",
                type: "warning",
                confirmButtonClass: 'btn-warning',
                timer: 1000,
            });
            returnflag = false;
            try {
                angular.element(document).scope().hideLoader();
                if (angular.element(document).scope().IsAllow == true) {
                    angular.element(document).scope().disableAdd = false;
                }
            }
            catch (ex) { }

            break;
        case "1": /*Submitted successfully*/
            swal({
                title: "Save",
                text: "Submitted successfully.",
                type: "success",
                confirmButtonClass: 'btn-success',
                timer: 1000,
            });
            try {
                angular.element(document).scope().hideLoader();
                if (angular.element(document).scope().IsAllow == true) {
                    angular.element(document).scope().disableAdd = false;
                } }
            catch (ex) { }
            try {
                angular.element(document).scope().ClearOk();
            }
            catch (ex) {
                console.log(ex.message);
            }

            break;
        case "2": /*Updated successfully.*/
            swal({
                title: "Update",
                text: "Updated successfully.",
                type: "success",
                confirmButtonClass: 'btn-success',
                timer: 1000,
            });
            try {
                angular.element(document).scope().hideLoader();
                if (angular.element(document).scope().IsAllow == true) {
                    angular.element(document).scope().disableAdd = false;
                }
            }
            catch (ex) { }
            try {
                angular.element(document).scope().ClearOk();
            }
            catch (ex) {
                console.log(ex.message);
            }
            break;
        case "3": /*Deleted successfully.*/
            swal({
                title: "Delete",
                text: "Deleted successfully.",
                type: "success",
                confirmButtonClass: 'btn-success',
                timer: 1000,
            });
            try {
                angular.element(document).scope().hideLoader();
                if (angular.element(document).scope().IsAllow == true) {
                    angular.element(document).scope().disableAdd = false;
                }
            }
            catch (ex) { }
            try {
                angular.element(document).scope().ClearOk();
            }
            catch (ex) {
                console.log(ex.message);
            }
            break;
        case "4": /*Cleare successfully.*/
            swal({
                title: "Clear",
                text: "Fields have been cleared.",
                type: "success",
                confirmButtonClass: 'btn-success',
                timer: 1000,
            });
            try {
                angular.element(document).scope().hideLoader();
                if (angular.element(document).scope().IsAllow == true) {
                    angular.element(document).scope().disableAdd = false;
                }
            }
            catch (ex) { }
            try {
                angular.element(document).scope().ClearOk();
            }
            catch (ex) {
                console.log(ex.message);
            }
            break;
        case "5": /*Voucher Not Found Message*/
            swal({
                title: "Voucher Not Found",
                text: "Create Voucher First.",
                type: "warning",
                confirmButtonClass: 'btn-warning',
                timer: 1000,
            });
            try {
                angular.element(document).scope().hideLoader();
                if (angular.element(document).scope().IsAllow == true) {
                    angular.element(document).scope().disableAdd = false;
                }
            }
            catch (ex) { }
            try {
                angular.element(document).scope().ClearOk();
            }
            catch (ex) {
                console.log(ex.message);
            }
            break;
        case "0":  /*Sorry Record not validate!*/
            swal({
                title: "Validate",
                text: "This is system generated error! Please contact to admin.",
                type: "warning",
                confirmButtonClass: 'btn-warning'
            });
            returnflag = false;
            try {
                angular.element(document).scope().hideLoader();
                if (angular.element(document).scope().IsAllow == true) {
                    angular.element(document).scope().disableAdd = false;
                }
            }
            catch (ex) { }
            break;
        case "9999":  /*Cr/Dr  Validation*/
            swal({
                title: "Warning",
                text: "Cr Amount is not equal to Dr Amount.",
                type: "warning",
                confirmButtonClass: 'btn-warning'
            });
            returnflag = false;
            try {
                angular.element(document).scope().hideLoader();
                if (angular.element(document).scope().IsAllow == true) {
                    angular.element(document).scope().disableAdd = false;
                }
            }
            catch (ex) { }
            break;
        case "999":  /*For Title Change*/
            swal({
                title: title,
                text: text,
                type: type,
                confirmButtonClass: ButtonClass
            });
            returnflag = false;
            try {
                angular.element(document).scope().hideLoader();
                if (angular.element(document).scope().IsAllow == true) {
                    angular.element(document).scope().disableAdd = false;
                }
            }
            catch (ex) { }
            break;
        default:  /*Sorry Record not validate!*/
            swal({
                title: "Warning",
                text: response.replace(/"/g, ""),
                type: "warning",
                confirmButtonClass: 'btn-warning'
            });
            try {
                angular.element(document).scope().hideLoader();
                if (angular.element(document).scope().IsAllow == true) {
                    angular.element(document).scope().disableAdd = false;
                }
            }
            catch (ex) { }
            returnflag = false;
            break;
    }
    return returnflag;
}

function deleteConfirmbox(confirmText, functions) {
    swal({
        title: "Are you sure?",
        text: confirmText,
        type: "error",
        showCancelButton: true,
        confirmButtonClass: 'btn-danger',
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, functions);
}

function proceedConfirmbox(confirmText, functions) {
    swal({
        title: "Are you sure?",
        text: confirmText,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: 'btn-warning',
        confirmButtonText: "Yes, proceed it!",
        closeOnConfirm: true
    }, functions);
}


function clearConfirmbox(confirmText, functions) {
    swal({
        title: "Are you sure?",
        text: confirmText,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: 'btn-warning',
        confirmButtonText: "Yes, clear it!",
        closeOnConfirm: false
    }, functions);
}

function editConfirmbox(confirmText, functions) {
    swal({
        title: "Are you sure?",
        text: confirmText,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: 'btn-warning',
        confirmButtonText: "Yes, edit it!",
        closeOnConfirm: false
    }, functions);
}

function submitConfirmbox(confirmText, functions) {
    swal({
        title: "Are you sure?",
        text: confirmText,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: 'btn-warning',
        confirmButtonText: "Submit",
        closeOnConfirm: false
    }, functions);
}

//---End---//

//------Start JS for Clear All Textbox--------------//
function clearControl(flag) {
    $('#btnSave').val("Save");
    $('#btnSavetxt').text("Save");
    $('#Id').text("-1");

    var id1 = $('#collapseinputbox select[id]').each(function () {
        var id = $(this).attr("id");
        document.getElementById(id).selectedIndex = "0";
        return this.id;
    }).get();

    $('input.clear[type="text"]').each(function () {
        $(this).val("");
    });

    $('textarea.clear').each(function () {
        $(this).val("");
    });

    $('input.clear[type="date"]').each(function () {
        $(this).val("");
    });

    $('input.clear[type="checkbox"]').each(function () {
        $(this).prop("checked", false);
    });

    $('select.clear').each(function () {
        $(this).prop('selectedIndex', 0);
    });

    if (flag != 0)
        showMsgBox('4');
}

function defaultValueOnFailure() {
    $('#btnSave').val("Save");
    $('#btnSave').prop('disabled', false);
    $('#btnDelete').prop('disabled', true);
    $('#Id').text("-1");
};
//------End JS for Clear All Textbox--------------//
function checkAllCheckBox(handler, parentDivId, type) {
    if (type == 'checkbox')
        var parentDiv = parentDivId + ' input[type="checkbox"]';

    if (type == "checkbox") {
        if ($(handler).prop('checked'))
            $(parentDiv).prop('checked', true);
        else
            $(parentDiv).prop('checked', false);
    };

    if (type == 'checkbox')
        var findControls = 'input[type = "checkbox"]:checked';

    if ($(parentDivId).find(findControls).length == 0) {
        $(parentDivId).addClass("red-validation");
    }
    else {
        $(parentDivId).removeClass("red-validation");
    }
};

function checkChkAllByJs(handler, parentDivId, type) {
    if (type == 'checkbox')
        var parentDiv = parentDivId + ' input[type="checkbox"]';

    var inputControls = $(parentDiv);
    var flag = true;
    for (var i = 0; i < inputControls.length; i++) {
        if (!$(inputControls[i]).prop('checked'))
            flag = false;
    };
    if (type == "checkbox")
        $(handler).prop('checked', flag);
};
//------Start JS for Fill DropDown List--------------//
function loadSubject(selectedvalue) {
    var subjectGroupid = $('#ddlSubjectGroup option:selected').val();
    $.ajax({
        url: '../Administrator/SubjectMasterList',
        type: 'POST',
        data: '{sessionId:' + JSON.stringify(sessionId) + ',schoolcode:' + JSON.stringify(schoolCode) + ',branchcode:' + JSON.stringify(branchCode) + ',subjectgroupid:' + JSON.stringify(subjectGroupid) + '}',
        dataType: 'json',
        contentType: 'application/json charset:utf-8',
        success: function (response) {
            fillSubject(response, selectedvalue);
        }
    });
}
function fillSubject(data, selectedvalue) {
    var ddlSubject = $('#ddlSubject');
    var optionfirst = $('<option value="-1">Select Subject</option>');
    ddlSubject.html(optionfirst);
    if ($('#ddlSubjectGroup option:selected').index() > 0) {
        $.each(data, function (i, val) {
            var option = $('<option value=' + val.SubjectId + '>' + val.SubjectName + '</option>');
            ddlSubject.append(option);
        });

        if (selectedvalue != null) {
            $('#ddlSubject option').each(function (index) {
                if ($(this).text() == selectedvalue) {
                    $(this).prop("selected", true);
                }
            });
        }

    }
};
function loadSection(selectedvalue) {
    var classid = $('#ddlClass option:selected').val();
    $.ajax({
        url: '../Administrator/SectionMasterList',
        type: 'POST',
        data: '{sessionId:' + JSON.stringify(sessionId) + ',schoolcode:' + JSON.stringify(schoolCode) + ',branchcode:' + JSON.stringify(branchCode) + ',classid:' + JSON.stringify(classid) + '}',
        dataType: 'json',
        contentType: 'application/json charset:utf-8',
        success: function (response) {
            fillSection(response, selectedvalue);
        }
    });
}
function fillSection(data, selectedvalue) {
    var ddlSection = $('#ddlSection');
    var optionfirst = $('<option value="-1">Select Section</option>');
    ddlSection.html(optionfirst);
    if ($('#ddlClass option:selected').index() > 0) {
        $.each(data, function (i, val) {
            var option = $('<option value=' + val.SectionId + '>' + val.SectionName + '</option>');
            ddlSection.append(option);
        });

        if (selectedvalue != null) {
            $('#ddlSection option').each(function (index) {

                if ($(this).text() == selectedvalue) {
                    $(this).prop("selected", true);
                }
                if ($(this).val() == selectedvalue) {
                    $(this).prop("selected", true);
                }
            });
        }
    }
};
function loadCaste(selectedvalue) {
    var categoryid = $('#ddlCategory option:selected').val();
    $.ajax({
        url: '../Administrator/CasteMasterList',
        type: 'POST',
        data: '{categoryid:' + JSON.stringify(categoryid) + ',sessionId:' + JSON.stringify(sessionId) + ',schoolcode:' + JSON.stringify(schoolCode) + ',branchcode:' + JSON.stringify(branchCode) + '}',
        dataType: 'json',
        contentType: 'application/json charset:utf-8',
        success: function (response) {
            fillCaste(response, selectedvalue);

        }
    });
}
function fillCaste(data, selectedvalue) {
    var ddlCaste = $('#ddlCaste');
    var optionfirst = $('<option value="-1">Select Caste</option>');
    ddlCaste.html(optionfirst);
    if ($('#ddlCategory option:selected').index() > 0) {
        $.each(data, function (i, val) {
            var option = $('<option value=' + val.CasteId + '>' + val.CasteName + '</option>');
            ddlCaste.append(option);
        });

        if (selectedvalue != null) {
            $('#ddlCaste option').each(function (index) {
                if ($(this).text() == selectedvalue) {
                    $(this).prop("selected", true);
                }
            });
        }
    }
};
function loadState(ddlCountryId, ddlSatateId, selectedvalue) {
    var countryid = $(ddlCountryId + ' option:selected').val();
    $.ajax({
        url: '../Administrator/StateMasterList',
        type: 'POST',
        data: '{countryid:' + JSON.stringify(countryid) + ',}',
        dataType: 'json',
        contentType: 'application/json charset:utf-8',
        success: function (response) {
            fillState(ddlCountryId, ddlSatateId, response, selectedvalue);

        }
    });
}
function fillState(ddlCountryId, ddlSatateId, data, selectedvalue) {
    var ddlState = $(ddlSatateId);
    var optionfirst = $('<option value="-1">Select State</option>');
    ddlState.html(optionfirst);
    if ($(ddlCountryId + ' option:selected').index() > 0) {
        $.each(data, function (i, val) {
            var option = $('<option value=' + val.StateId + '>' + val.StateName + '</option>');
            ddlState.append(option);
        });

        if (selectedvalue != null) {
            $(ddlSatateId + ' option').each(function (index) {
                if ($(this).text() == selectedvalue) {
                    $(this).prop("selected", true);
                }
            });
        }
    }
};
function loadCity(ddlSatateId, ddlCityId, selectedvalue) {
    var stateid = $(ddlSatateId + ' option:selected').val();
    $.ajax({
        url: '../Administrator/CityMasterList',
        type: 'POST',
        data: '{stateid:' + JSON.stringify(stateid) + '}',
        dataType: 'json',
        contentType: 'application/json charset:utf-8',
        success: function (response) {
            fillCity(ddlSatateId, ddlCityId, response, selectedvalue);
        }
    });
}
function fillCity(ddlSatateId, ddlCityId, data, selectedvalue) {
    var ddlCity = $(ddlCityId);
    var optionfirst = $('<option value="-1">Select City</option>');
    ddlCity.html(optionfirst);
    if ($(ddlSatateId + ' option:selected').index() > 0) {
        $.each(data, function (i, val) {
            var option = $('<option value=' + val.CityId + '>' + val.CityName + '</option>');
            ddlCity.append(option);
        });

        if (selectedvalue != null) {
            $(ddlCityId + ' option').each(function (index) {
                if ($(this).text() == selectedvalue) {
                    $(this).prop("selected", true);
                }
            });
        }
    }
};
function loadClass(ddlCourseId, ddlClassId, selectedvalue) {

    var courseid = $(ddlCourseId + ' option:selected').val();
    $.ajax({
        url: '../Administrator/ClassMasterList',
        type: 'POST',
        data: '{courseid:' + JSON.stringify(courseid) + ',sessionId:' + JSON.stringify(sessionId) + ',schoolcode:' + JSON.stringify(schoolCode) + ',branchcode:' + JSON.stringify(branchCode) + '}',
        dataType: 'json',
        contentType: 'application/json charset:utf-8',
        success: function (response) {

            fillClassusingcourse(ddlCourseId, ddlClassId, response, selectedvalue);
        }
    });
}
function fillClassusingcourse(ddlCourseId, ddlClassId, data, selectedvalue) {
    var ddlClass = $(ddlClassId);
    var optionfirst = $('<option value="-1">Select Class</option>');
    ddlClass.html(optionfirst);
    if ($(ddlCourseId + ' option:selected').index() > 0) {
        $.each(data, function (i, val) {
            var option = $('<option value=' + val.ClassId + '>' + val.ClassName + '</option>');
            ddlClass.append(option);
        });

        if (selectedvalue != null) {
            $(ddlClassId + ' option').each(function (index) {
                if ($(this).text() == selectedvalue) {
                    $(this).prop("selected", true);
                }
            });
        }
    }
};
//------End JS for Fill DropDown List--------------//

//------Start Add ToolTip--------------//
function addToolTip(control, tooltipmesage) {
    control.attr("data-original-title", tooltipmesage);
    control.attr("data-toggle", "tooltip");
    control.tooltip();
    control.focus();
}
//------End Add ToolTip--------------//

//------Start JS for Remove ToolTip--------------//
function removeToolTip(control) {
    control.removeAttr("data-toggle", "tooltip");
    control.removeAttr("data-original-title");
}
//------End JS for Remove ToolTip--------------//

//------Start JS for Validate Control--------------//
$(document).ready(function () {
    $('input.validate').keyup(function () {
        checktextbox($(this));
    });
    $('button.btn-validate').blur(function () {
        checkdiv($(this));
    });
    $('textarea.validate').keyup(function () {
        checktextarea($(this));
    });
    $('input.validate').blur(function () {
        checktextbox($(this));
    });
    $('select.validate').change(function () {
        checkddl($(this));
    });
    $('select.validate').blur(function () {
        checkddl($(this));
    });
    $('.validate-chk input[type="checkbox"]').change(function () {
        checkchk($(this));
    });
    $('.chk-validate.validate input[type="checkbox"]').blur(function () {
        checkchk($(this));
    });
    $('input.numbersOnly').keyup(function () {
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
    });
    $('input.time').change(function () {

        $(this).attr('maxlength', '5');
        $(this).mask('99:99');
    });
    $('input.prefix').keyup(function () {
        var txtprefixincrementno = $('#txtPrefixIncrementNo');
        var txtprefix = $('#txtPrefix');
        if (txtprefixincrementno.val() > 0 && !Number(txtprefix.val())) {
            txtprefixincrementno.val(0);
            addToolTip(txtprefixincrementno, "Prefix must be numeric vlaue!");
        }
        else {
            removeToolTip(txtprefixincrementno);
        }
    });
    $('input.sufix').keyup(function () {
        var txtsufixincrementno = $('#txtSufixIncrementNo');
        var txtsufix = $('#txtSufix');
        if (txtsufixincrementno.val() > 0 && !Number(txtsufix.val())) {
            txtsufixincrementno.val('0');
            addToolTip(txtsufixincrementno, "Sufix must be numeric vlaue!");
        }
        else {
            removeToolTip(txtsufixincrementno);
        }
    });
    //$('#btnClear').click(function () {
    //    if (confirm('do u want to clear controls?'))
    //        clearControl();
    //});
    //$('#btnSave').click(function () {
    //    if (isValidate())
    //    $(this).prop('disabled', true);
    //});
});
function isValidateList(parendiv) {

    var modelStateIsvalid = true;
    var firstElement = null;
    if (parendiv != null) {
        var inputelement = parendiv.find('input.newvalidate');
        var textarea = parendiv.find('textarea.newvalidate');
        var ddlelement = parendiv.find('select.newvalidate');

        $.each(inputelement, function (index) {
            if ($(this).val() == "") {
                $(this).addClass("red-validation");
                modelStateIsvalid = false;
                if (firstElement == null)
                    firstElement = $(this);
            }
            else {
                $(this).removeClass("red-validation");
            }
        });

        $.each(textarea, function (index) {
            if ($(this).val() == "") {
                $(this).addClass("red-validation");
                modelStateIsvalid = false;
                if (firstElement == null)
                    firstElement = $(this);
            }
            else {
                $(this).removeClass("red-validation");
            }
        });

        $.each(ddlelement, function (index) {
            if ($(this).children('option:selected').index() == 0) {
                $(this).addClass("red-validation");
                modelStateIsvalid = false;
                if (firstElement == null)
                    firstElement = $(this);
            } else {
                $(this).removeClass("red-validation");
            }
        });
    }
    else {
        $.each($('input'), function (index) {
            if ($(this).hasClass('newvalidate')) {
                if ($(this).val() == "") {
                    $(this).addClass("red-validation");
                    modelStateIsvalid = false;
                    if (firstElement == null)
                        firstElement = $(this);
                }
                else {
                    $(this).removeClass("red-validation");
                }

            }
            else {
                $(this).removeClass("red-validation");
            }

        });

        $.each($('textarea.validate'), function (index) {
            if ($(this).val() == "") {
                $(this).addClass("red-validation");
                modelStateIsvalid = false;
                if (firstElement == null)
                    firstElement = $(this);
            }
            else {
                $(this).removeClass("red-validation");
            }
        });

        $.each($('select.newvalidate'), function (index) {
            if ($(this).children('option:selected').index() == 0) {
                $(this).addClass("red-validation");
                modelStateIsvalid = false;
                if (firstElement == null)
                    firstElement = $(this);
            } else {
                $(this).removeClass("red-validation");
            }
        });

        $.each($('.validate-chk'), function (index) {
            if ($(this).find('input[type = "checkbox"]:checked').length == 0) {
                $(this).addClass("red-validation");
                modelStateIsvalid = false;
                if (firstElement == null)
                    firstElement = $(this);
            }
            else {
                $(this).removeClass("red-validation");
            }
        });
    }
    if (firstElement != null) {
        firstElement.focus();
    }

    return modelStateIsvalid;
}
function isValidate(parendiv) {
    var modelStateIsvalid = true;
    var firstElement = null;
    if (parendiv != null) {
        var inputelement = parendiv.find('input.validate');
        var textarea = parendiv.find('textarea.validate');
        var ddlelement = parendiv.find('select.validate');
        var chkelement1 = parendiv.find('.validate-chk');
        var chkelement2 = parendiv.find('.chk-validate.validate');
        
        $.each(inputelement, function (index) {
            if ($(this).val() == "") {
                $(this).addClass("red-validation");
                modelStateIsvalid = false;
                if (firstElement == null)
                    firstElement = $(this);
            }
            else {
                $(this).removeClass("red-validation");
            }
        });

        $.each(textarea, function (index) {
            if ($(this).val() == "") {
                $(this).addClass("red-validation");
                modelStateIsvalid = false;
                if (firstElement == null)
                    firstElement = $(this);
            }
            else {
                $(this).removeClass("red-validation");
            }
        });

        $.each(ddlelement, function (index) {
            if ($(this).children('option:selected').index() == 0) {
                $(this).addClass("red-validation");
                modelStateIsvalid = false;
                if (firstElement == null)
                    firstElement = $(this);
            } else {
                $(this).removeClass("red-validation");
            }
        });

        $.each(chkelement1, function (index) {
            if (chkelement1.parent().parent().find('input[type = "checkbox"]:checked').length == 0) {
                chkelement1.parent().parent().addClass("red-validation");
                modelStateIsvalid = false;
                if (firstElement == null)
                    firstElement = $(this);
            }
            else {
                chkelement1.parent().parent().removeClass("red-validation");
            }
        });

        $.each(chkelement2, function (index) {
            if (chkelement2.parent().parent().find('input[type="checkbox"]:checked').length == 0) {
                chkelement2.parent().parent().addClass("red-validation");
                modelStateIsvalid = false;
                if (firstElement == null)
                    firstElement = $(this);
            }
            else {
                chkelement2.parent().parent().removeClass("red-validation");
            }
        });

    }
    else {
        $.each($('input'), function (index) {
            if ($(this).hasClass('validate')) {
                if ($(this).val() == "") {
                    $(this).addClass("red-validation");
                    modelStateIsvalid = false;
                    if (firstElement == null)
                        firstElement = $(this);
                }
                else {
                    $(this).removeClass("red-validation");
                }

            }
            else {
                $(this).removeClass("red-validation");
            }

        });

        $.each($('textarea.validate'), function (index) {
            if ($(this).val() == "") {
                $(this).addClass("red-validation");
                modelStateIsvalid = false;
                if (firstElement == null)
                    firstElement = $(this);
            }
            else {
                $(this).removeClass("red-validation");
            }
        });

        $.each($('select.validate'), function (index) {
            if ($(this).children('option:selected').index() == 0) {
                $(this).addClass("red-validation");
                modelStateIsvalid = false;
                if (firstElement == null)
                    firstElement = $(this);
            } else {
                $(this).removeClass("red-validation");
            }
        });

        $.each($('button.btn-validate'), function (index) {
            if ($(this).parent().parent().find('input[type = "checkbox"]:checked').length == 0) {
                $(this).parent().parent().addClass("red-validation");
                modelStateIsvalid = false;
                if (firstElement == null)
                    firstElement = $(this);
            }
            else {
                $(this).parent().parent().removeClass("red-validation");
            }
        });

        $.each($('.validate-chk'), function (index) {
            if ($(this).find('input[type = "checkbox"]:checked').length == 0) {
                $(this).addClass("red-validation");
                modelStateIsvalid = false;
                if (firstElement == null)
                    firstElement = $(this);
            }
            else {
                $(this).removeClass("red-validation");
            }
        });

        $.each($('.chk-validate.validate'), function (index) {
            if ($(this).find('input[type = "checkbox"]:checked').length == 0) {
                $(this).addClass("red-validation");
                modelStateIsvalid = false;
                if (firstElement == null)
                    firstElement = $(this);
            }
            else {
                $(this).removeClass("red-validation");
            }
        });
    }
    if (firstElement != null) {
        firstElement.focus();
    }
    if (modelStateIsvalid==false) {
        if (angular.element(document).scope().IsAllow == true) {
            angular.element(document).scope().disableAdd = false;
        }
    }
    return modelStateIsvalid;
}
function RemoveRedValidate(parendiv) {
    if (parendiv != null) {
        var inputelement = parendiv.find('input.validate');
        var textarea = parendiv.find('textarea.validate');
        var ddlelement = parendiv.find('select.validate');

        $.each(inputelement, function (index) {
            $(this).removeClass("red-validation");
        });

        $.each(textarea, function (index) {
            $(this).removeClass("red-validation");
        });

        $.each(ddlelement, function (index) {
            $(this).removeClass("red-validation");
        });
    }
    else {
        $.each($('input'), function (index) {
            $(this).removeClass("red-validation");
        });

        $.each($('textarea.validate'), function (index) {
            $(this).removeClass("red-validation");
        });

        $.each($('select.validate'), function (index) {
            $(this).removeClass("red-validation");
        });

        $.each($('.validate-chk'), function (index) {
            $(this).removeClass("red-validation");
        });
    }
}
function checktextbox(txtbox) {
    if (txtbox.val() == "") {
        txtbox.addClass("red-validation");
    }
    else {
        txtbox.removeClass("red-validation");
    }
}
function checkdiv(btnelement) {
    if (btnelement.parent().parent().find('input[type = "checkbox"]:checked').length == 0) {
        btnelement.parent().parent().addClass("red-validation");
    }
    else {
        btnelement.parent().parent().removeClass("red-validation");
    }
}
function checktextarea(txtarea) {
    if (txtarea.val() == "") {
        txtarea.addClass("red-validation");
    }
    else {
        txtarea.removeClass("red-validation");
    }
}
function checktextboxhtml(txtboxid) {
    var txtbox = $(txtboxid);
    if (txtbox.val() == "") {
        txtbox.addClass("red-validation");
    }
    else {
        txtbox.removeClass("red-validation");
    }
}
function checkddl(ddl) {
    if (ddl.children('option:selected').index() == 0) {
        ddl.addClass("red-validation");
        var s2id_ddl = $('#s2id_' + ddl.attr('id'));
        if (s2id_ddl != null) {
            s2id_ddl.children().addClass("red-validation");
        }
    }
    else {
        ddl.removeClass("red-validation");
        var s2id_ddl = $('#s2id_' + ddl.attr('id'));
        if (s2id_ddl != null) {
            s2id_ddl.children().removeClass("red-validation");
        }
    }
}
function checkchk(chk) {
    if (chk.parent().parent().find('input[type = "checkbox"]:checked').length == 0) {
        chk.parent().parent().addClass("red-validation");
    }
    else {
        chk.parent().parent().removeClass("red-validation");
    }
}
function validateEmail(txtemailid) {
    var txtemail = $(txtemailid);
    var semail = txtemail.val();
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (semail == "" || filter.test(semail)) {
        removeToolTip(txtemail);
        return true;
    }
    else {
        addToolTip(txtemail, "Please fill correct e-mail address!");
        return false;
    }
}
function validatePhoneNo(txtmobilenoid, text) {
    if (text == null)
        text = "PN";
    var msg;
    var range;
    switch (text) {
        case 'PN':
            msg = 'Phone number';
            range = 10;
            break;
        case 'MN':
            msg = 'Mobile number';
            range = 10;
            break;
        case 'CN':
            msg = 'Contact number';
            range = 15;
            break;
        case 'PC':
            msg = 'Pin code';
            range = 6;
            break;
    }
    var txtmobileno = $(txtmobilenoid);
    var smobileno = txtmobileno.val();
    var filter = /^[0-9]+$/;
    if (smobileno == "" || filter.test(smobileno)) {
        if (smobileno == "" || smobileno.length == range) {
            removeToolTip(txtmobileno);
            return true;
        }
        else {
            $(txtmobilenoid).val('');
            addToolTip(txtmobileno, "" + msg + " must be " + range + " digits!");
            return false;
        }
    }
    else {
        $(txtmobilenoid).val('');
        addToolTip(txtmobileno, "" + msg + " must be " + range + " digits!");
        return false;
    }
}

//------End JS for Validate Control--------------//
function loadDataTable(tblheader, tblrows, showColumn, imageColumn) {

    var tab = $('<table id="example" class="table compact table-hover table-striped table-bordered nowrap" style="width:100%"></table>');
    var thead = $('<thead></thead>');
    var theadrow = $('<tr></tr>');

    var tfoot = $('<tfoot></tfoot>');
    var tfootrow = $('<tr></tr>');
    var colspan = 0;
    for (var i = 0; i < l; i++) {
        colspan = colspan + 1;
    }

    var hideColumn = [];
    var l = tblheader.length;
    for (var i = 0; i < l; i++) {
        var val = tblheader[i]
        var flag = true;
        if (showColumn != null)
        { flag = jQuery.inArray(i, showColumn) == -1 ? false : true; }
        if (flag) {
            if ($('#anchor label').text() != '') {
                if ($('#anchor label').text().indexOf(val.Header) == -1) {
                    hideColumn.push({ orderable: tblheader[i].orderable == false ? false:true, targets: i, visible: true});
                    $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="">' + val.Header + '</label></div>');
                }
            }
            else {
                hideColumn.push({ orderable: tblheader[i].orderable == false ? false : true, targets: i, visible: true });
                $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="">' + val.Header + '</label></div>');
            }

        }
        else {
            if ($('#anchor label').text().indexOf(val.Header) == -1) {
                hideColumn.push({ orderable: tblheader[i].orderable == false ? false : true, targets: i, visible: false });
                $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + '><label class="">' + val.Header + '</label></div>');
            }
        }
        // Append header here
        theadrow.append('<th>' + val.Header + '</th>');
        // Append footerrow here
        tfootrow.append('<th><input type="text" class="form-control form-control-sm" style="width:' + val.Width + '" placeholder="' + val.Header + '" /></th>');
    }

    thead.append(theadrow);
    tab.append(thead);
    if (JSON.stringify(tblrows).length > 2) {
        var tbody = $('<tbody></tbody>');
        var p = tblrows.length;
        for (var i = 0; i < p; i++) {
            var val = tblrows[i]
            var trow = $('<tr></tr>');
            for (var key in val) {
                if (key == "Id" || key == "#") {
                    trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (i + 1) + '<input type="hidden" id="hdId_' + i + '" name="Id" value=' + val[key] + ' /></td>');
                }
                else {
                    if (imageColumn != null) {
                        var showImage = jQuery.inArray(key, imageColumn) == -1 ? false : true;

                        if (showImage) {
                            trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><img src="../' + (val[key] == null ? '../content/photos/default-user.png' : val[key]) + '" width="50px" height="50px"></td>');
                        }
                        else {
                            trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + val[key] + '</td>');
                        }
                    }
                    else {
                        trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + val[key] + '</td>');
                    }
                }
            };
            tbody.append(trow);
        };
    } else {
        var trow = $('<tr><td style="text-align:center" colspan=' + colspan + '>No Record Found!</td></tr>');
        tbody.append(trow);
    }
    tab.append(tbody);

    tfoot.append(tfootrow);
    tab.append(tfoot);

    $("#UpdatePanel").html(tab);

    
    //var m = $('#anchor input[type="checkbox"]');
    //for (var i = 0; i < m.length; i++) {

    //    if (!$(m[i]).prop('checked')) {
    //        hideColumn.push(i);
    //    }
    //}
    if (JSON.stringify(tblrows).length > 2) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.append("datatable('" + hideColumn + "')");

        $("#UpdatePanel").append(script);
    }
    angular.element(document).scope().hideLoader();
};

function loadDataTableForLargeAmountData(tblheader, tblrows, showColumn, imageColumn) {
    var tab = $('<table id="example" class="table compact table-hover table-striped table-bordered nowrap" style="width:100%"></table>');
    var thead = $('<thead></thead>');
    var theadrow = $('<tr></tr>');

    var tfoot = $('<tfoot></tfoot>');
    var tfootrow = $('<tr></tr>');
    var colspan = 0;
    for (var i = 0; i < l; i++) {
        colspan = colspan + 1;
    }

    var l = tblheader.length;
    for (var i = 0; i < l; i++) {
        var val = tblheader[i]
        var flag = true;
        if (showColumn != null)
        { flag = jQuery.inArray(i, showColumn) == -1 ? false : true; }
        else
            if(val.ShowColumn == "No") {
            flag = false;
        }
        if (flag) {
            if ($('#anchor label').text() != '') {
                if ($('#anchor label').text().indexOf(val.HeaderText) == -1) {
                    $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="">' + val.HeaderText + '</label></div>');
                }
            }
            else {
                $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="">' + val.HeaderText + '</label></div>');
            }

        }
        else {
            if ($('#anchor label').text().indexOf(val.HeaderText) == -1) {
                $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + '><label class="">' + val.HeaderText + '</label></div>');
            }
        }
        // Append header here
        theadrow.append('<th>' + val.HeaderText + '</th>');
        // Append footerrow here
        tfootrow.append('<th><input type="text" class="form-control form-control-sm" style="width:' + val.Width + '" placeholder="' + val.HeaderText + '" value="" /></th>');
    }

    thead.append(theadrow);
    tab.append(thead);
    var tbody = $('<tbody></tbody>');

    var trow = $('<tr></tr>');
    trow.append("<th colspan=" + tblheader.length + " style='text-align: center;'>Please wait...</th>");
    tbody.append(trow);

    tab.append(tbody);
    tfoot.append(tfootrow);
    tab.append(tfoot);

    $("#UpdatePanel").html(tab);

    var hideColumn = [];
    var m = $('#anchor input[type="checkbox"]');
    for (var i = 0; i < m.length; i++) {

        if (!$(m[i]).prop('checked')) {
            hideColumn.push(i);
        }
    }
    if (JSON.stringify(tblrows).length > 2) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.append("datatableForLargeAmountData('" + hideColumn + "'," + JSON.stringify(tblrows) + "," + JSON.stringify(tblheader) + ")");

        $("#UpdatePanel").append(script);
    }
    
};
var colIndex = 0;
var colOrder = "asc";
var rowGroupIndex = [];

function loadDataUsingPreDefinedColumn(headerColumn, data, displayOrder)
{
  
    if (displayOrder != null && displayOrder != '')
    {
        colOrder = displayOrder;
    }
    loadDataTablesUsingPreDefinedColumn(headerColumn, data);
    //else {
    //    var tblRows = [];
    //    var rowObj = { "": "Sorry No Record's Found!" };
    //    tblRows.push(rowObj);

    //    loadDataTablesUsingPreDefinedColumn(headerColumn, tblRows);
    //}
};
var externalcss = '';
function loadDataTablesUsingPreDefinedColumn(tblheader, data) {
   
    if (JSON.stringify(data).length > 2) {
        var tab = $('<table id="example" class="table compact table-hover table-striped table-bordered nowrap ' + externalcss + '" ></table>');
        var thead = $('<thead></thead>');
        var theadrow = $('<tr></tr>');

        var tfoot = $('<tfoot></tfoot>');
        var tfootrow = $('<tr></tr>');
        
        var l = tblheader.length;
        for (var i = 0; i < l; i++) {
            var val = tblheader[i]
            var headertext = "Sr.No.";
            if (val.HeaderText != "Id") {
                headertext = val.HeaderText;
            }
            if (val.ShowColumn == "Yes") {
                if ($('#anchor label').text() != '') {
                    if ($('#anchor label').text().indexOf(headertext) == -1) {
                        $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="">' + headertext + '</label> </div>');
                    }
                }
                else {
                    $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="">' + headertext + '</label></div>');
                }

            }
            else {
                if ($('#anchor label').text().indexOf(headertext) == -1) {
                    $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + '><label class="">' + headertext + '</label></div>');
                }
            }
            if (val.CssClass == 'undefined' || val.CssClass == null)
                // Append header here
                //if (val.HeaderText == "Id") {
                //    theadrow.append('<th>Sr.No.</th>');
                //}
                //else {
                theadrow.append('<th>' + headertext + '</th>');
                //}

            else
                theadrow.append('<th class=' + val.CssClass + '>' + headertext + '</th>');
            // Append footerrow here
            tfootrow.append('<th><input type="text" class="form-control form-control-sm" style="width:' + val.Width + '" placeholder="' + headertext + '" /></th>');
        }

        thead.append(theadrow);

        tab.append(thead);
        var tbody = $('<tbody></tbody>');
        var sumList = [];
     
        $.each(data, function (i, obj) {
            var trow = $('<tr></tr>');
            $.each(tblheader, function (j, val) {
                var key = val.HeaderValue;
               
                var value = obj[key];

                if (value == 'undefined' || value == null) { value = "" }
                if (key == "Id" || key == "#") {
                    if (obj[val.Value] == 'undefined' || obj[val.Value] == null)
                        trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (i + 1) + '</td>');
                    else
                        trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (i + 1) + '<input type="hidden" id="hdId_' + i + '" name="Id" value=' + obj[val.Value] + ' /></td>');
                }
                else {
                    if (val.ImageColumn != 'undefined' && val.ImageColumn != null && val.ImageColumn == "Yes") {
                        if (val.CssClass == 'undefined' || val.CssClass == null)
                            //trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="50px" height="50px"></td>');
                            trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="' + val.Width + '"></td>');
                        else
                            //trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="50px" height="50px"></td>');
                            trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '"></td>');
                    }
                    else if (val.DocumentColumn != 'undefined' && val.DocumentColumn != null && val.DocumentColumn == "Yes") {
                        if (val.CssClass == 'undefined' || val.CssClass == null)
                            trow.append('<td><a href="../' + ((value == null || value == "") ? '#' : value) + '" download>Download Attachment</a></td>');
                        else
                            trow.append('<td class=' + val.CssClass + '><a href="../' + ((value == null || value == "") ? '#' : value) + '" download>Download Attachment</a></td>');
                    }
                    else if (val.tooltip == "Yes") {
                        if (obj[val.Value] == 'undefined' || obj[val.Value] == null) {
                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                trow.append('<td  ondblclick="angular.element(this).scope().dbClick();"><span class="spnDetails">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</span><span class="spnTooltip">' + obj[val.tooltipvalue] + '</span></td>');
                            else
                                trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><span class="spnDetails">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</span><span class="spnTooltip">' + obj[val.tooltipvalue] + '</span></td>');
                        }
                        else {

                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><span class="spnDetails">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</span><input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /><span class="spnTooltip">' + obj[val.tooltipvalue] + '</span></td>');
                            else
                                trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><span class="spnDetails">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</span><input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /><span class="spnTooltip">' + obj[val.tooltipvalue] + '</span></td>');
                        }
                    }
                    else if (val.IdDateType == "Yes") {
                        if (obj[val.Value] == 'undefined' || obj[val.Value] == null) {
                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                trow.append('<td  ondblclick="angular.element(this).scope().dbClick();"><span style="Display:none;">'+Number(moment(value).format('YYYYMMDD'))+'</span>' + value +'</td>');
                            else
                                trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><span style="Display:none;">' + Number(moment(value).format('YYYYMMDD')) +'</span>' + value +'</td>');
                        }
                        else {

                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><span style="Display:none;">' + Number(moment(value).format('YYYYMMDD')) +'</span><input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /></td>');
                            else
                                trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><span style="Display:none;">' + Number(moment(value).format('YYYYMMDD')) +'</span>' + value +'<input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /></td>');
                        }
                    }
                    else {

                        if (obj[val.Value] == 'undefined' || obj[val.Value] == null) {
                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                trow.append('<td  ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</td>');
                            else
                                trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</td>');
                        }
                        else {

                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '<input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /></td>');
                            else
                                trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '<input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /></td>');
                        }

                    }
                }
                if (sumList[j] == "" || sumList[j] == 'undefined' || sumList[j] == null)
                    sumList[j] = 0;
                if (val.Fun == 'undefined' || val.Fun == null) {
                    if (val.FooterText == 'undefined' || val.FooterText == null) {
                        sumList[j] = "";
                    }
                    else {
                        sumList[j] = val.FooterText;
                    }
                }
                else {
                    addfunfoot = 1;
                    sumList[j] = Number(sumList[j]) + (isNaN(value) ? 0 : Number(value));
                }
            });
            tbody.append(trow);
        });

        tab.append(tbody);
        if (addfunfoot == 1) {
            var ftrow = $('<tr class="print"></tr>');
            $.each(sumList, function (index, value) {
                var footval = (value == '0' ? '-' : ((isNaN(value) || value == "") ? value : Number(value).toLocaleString("en", { useGrouping: false, maximumFractionDigits: 0 })));

                ftrow.append('<th class="text-right">' + footval + '</th>');
            });
            //tfoot.append(tfootrow);
            tfoot.addClass("print")
            tfoot.append(ftrow);

            tab.append(tfoot);
        }
        else {
            tfoot.append(tfootrow);
            tab.append(tfoot);
        }
        //tfoot.append(tfootrow);
        //tab.append(tfoot);

        $("#UpdatePanel").html(tab);

        var hideColumn = [];
        var m = $('#anchor input[type="checkbox"]');
        for (var i = 0; i < m.length; i++) {
            if (!$(m[i]).prop('checked')) {
                hideColumn.push(i);
            }
        }


        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.append("datatable('" + hideColumn + "')");

        $("#UpdatePanel").append(script);


    }
    else {
        var tab = $('<table id="example" class="table compact table-hover table-striped table-bordered nowrap" ></table>');
        var thead = $('<thead></thead>');
        var theadrow = $('<tr></tr>');

        var l = tblheader.length;
        for (var i = 0; i < l; i++) {
            var val = tblheader[i]
            var headertext = "Sr.No.";
            if (val.HeaderText != "Id") {
                headertext = val.HeaderText;
            }
            if (val.ShowColumn == "Yes") {
                if ($('#anchor label').text() != '') {
                    if ($('#anchor label').text().indexOf(headertext) == -1) {
                        $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="">' + headertext + '</label> </div>');
                    }
                }
                else {
                    $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="">' + headertext + '</label></div>');
                }

            }
            else {
                if ($('#anchor label').text().indexOf(headertext) == -1) {
                    $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + '><label class="">' + headertext + '</label></div>');
                }
            }
            if (val.CssClass == 'undefined' || val.CssClass == null)
                // Append header here
                theadrow.append('<th>' + headertext + '</th>');
            else
                theadrow.append('<th class=' + val.CssClass + '>' + headertext + '</th>');
        }

        thead.append(theadrow);

        tab.append(thead);


        var tbody = $('<tbody></tbody>');

        var trow = $('<tr></tr>');
        trow.append("<th colspan=" + tblheader.length + " style='text-align: center;'>No Record Found!</th>");
        tbody.append(trow);

        tab.append(tbody);
        $("#UpdatePanel").html(tab);

    }

    angular.element(document).scope().hideLoader();
};

function loadDataUsingPreDefinedColumnOnPage(headerColumn, data, displayOrder, displayid, tableid) {
    ////
    if (displayOrder != null && displayOrder != '') {
        colOrder = displayOrder;
    }
    loadDataTablesUsingPreDefinedColumnOnPage(headerColumn, data, displayid, tableid);
    //}
    //else {
    //    var tblRows = [];
    //    var rowObj = { "": "Sorry No Record's Found!" };
    //    tblRows.push(rowObj);

    //    loadDataTablesUsingPreDefinedColumnOnPage(headerColumn, tblRows, displayid, tableid);
    //}
};

function Replace(value) {
    var str = value.toString().split('$');
    var returnstring = "";
    var para = $('<p></p>');
    for (var i = 0; i < str.length; i++) {
        para.append('<p>' + str[i] + '</p>');
    }
    return para.html();
};

function loadDataTablesUsingPreDefinedColumnOnPage(tblheader, data, displayid, tableid) {
    if (tableid == null) {
        tableid = 'example';
    }
    var tab = $('<table id=' + tableid + ' class="table compact table-hover table-striped table-bordered nowrap" ></table>');
    var thead = $('<thead></thead>');
    var theadrow = $('<tr></tr>');

    var l = tblheader.length;
    var colspan = 0;
    for (var i = 0; i < l; i++) {
        var val = tblheader[i]
        colspan = colspan + 1;
        // Append header here
        theadrow.append('<th>' + val.HeaderText + '</th>');
    }

    thead.append(theadrow);

    tab.append(thead);
    var tbody = $('<tbody></tbody>');
    if (JSON.stringify(data).length > 2) {
        $.each(data, function (i, obj) {
            var trow = $('<tr></tr>');
            $.each(tblheader, function (j, val) {
                var key = val.HeaderValue;
                var value = obj[key];
                if (value == 'undefined' || value == null) { value = "" }
                if (key == "Id" || key == "#") {
                    trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (i + 1) + '<input type="hidden" id="hdId_' + i + '" name="Id" value=' + obj[val.Value] + ' /></td>');
                }
                else {
                    if (val.ImageColumn == "Yes") {
                        trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="50px" height="50px"></td>');
                    }
                    else {
                        trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</td>');
                    }
                }
            });
            tbody.append(trow);
        });
    }
    else {
        var trow = $('<tr><td style="text-align:center" colspan=' + colspan + '>No Record Found!</td></tr>');
        tbody.append(trow);
    }
    tab.append(tbody);

    if (displayid == null)
        $("#UpdatePanel").html(tab);
    else
        $(displayid).html(tab);

    if (JSON.stringify(data).length > 2) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.append("BasicDatatable('" + tableid + "')");

        if (displayid == null)
            $("#UpdatePanel").append(script);
        else
            $(displayid).append(script);
    }

    angular.element(document).scope().hideLoader();
};

function BasicDatatable(tableid) {

    if (tableid == null) {
        tableid = "example";
    }
    var message = "";
    var seprator = "";
    var filter = "<span class='filter' >Filter  : </span> ";

    if (messagevalues.length > 0)
        $.each(messagevalues, function (i, values) {
            $.each(values, function (key, val) {
                if (val != null && val != "") {
                    message = message + seprator + filter;
                    message = message + "<span class='filter-title-name' >" + key + "</span> : <span class='filter-title'>" + val + "</span>"
                    seprator = ", ";
                    filter = "";
                };
            });
        });
    if (message.length > 0) {
        message = '(' + message + ')';
    }
    $('#' + tableid).append('<caption style="caption-side: center"><div id="FilterTitle">' + message + '</div></caption>');
    var table = $('#' + tableid).DataTable({
        "paging": false,
        "ordering": true,
        "info": false,
        "searching": false,
        realtime: true,
        responsive: false,
        dom: 'lBfrtip',
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        buttons: [
                   {
                       extend: 'copyHtml5',
                       titleAttr: 'Copy',
                       //messageTop: message,
                       exportOptions: {
                           columns: function (idx, data, node) {
                               return table.column(idx).visible();
                           }
                       }
                   },
                   {
                       extend: 'csvHtml5',
                       titleAttr: 'CSV',
                       //messageTop: message,
                       exportOptions: {
                           columns: function (idx, data, node) {
                               return table.column(idx).visible();
                           }
                       }
                   },
                   {
                       extend: 'excelHtml5',
                       titleAttr: 'Excel',
                       //messageTop: message,
                       exportOptions: {
                           columns: function (idx, data, node) {
                               return table.column(idx).visible();
                           }
                       }
                   },
                   //{
                   //    extend: 'pdfHtml5',
                   //    titleAttr: 'PDF',
                   //    //messageTop: message,
                   //    exportOptions: {
                   //        columns: function (idx, data, node) {

                   //            return table.column(idx).visible();
                   //        }
                   //    }
                   //},
                   {
                       extend: 'print',
                       titleAttr: 'Print',
                       messageTop: message,
                       //autoPrint: false,
                       exportOptions: {
                           stripHtml: false,
                           columns: function (idx, data, node) {
                               return table.column(idx).visible();
                           }
                       }
                   }
        ],
        select: true
    });

}

var addfunfoot = 0;
function loadDatawithTotalCss(headerColumn, data, displayOrder) {
    if (displayOrder != null && displayOrder != '') {
        colOrder = displayOrder;
    }
    loadDatawithTotalCss(headerColumn, data);
};

function loadDatawithTotalCss(tblheader, data) {
    if (JSON.stringify(data).length > 2) {
        var tab = $('<table id="example" class="table compact table-hover table-striped table-bordered nowrap" ></table>');
        var thead = $('<thead></thead>');
        var theadrow = $('<tr></tr>');

        var tfoot = $('<tfoot></tfoot>');
        var tfootrow = $('<tr></tr>');

        var l = tblheader.length;
        for (var i = 0; i < l; i++) {
            var val = tblheader[i]
            var headertext = "Sr.No.";
            if (val.HeaderText != "Id") {
                headertext = val.HeaderText;
            }

            if (val.ShowColumn == "Yes") {
                if ($('#anchor label').text() != '') {
                    if ($('#anchor label').text().indexOf(headertext) == -1) {
                        $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="">' + headertext + '</label> </div>');
                    }
                }
                else {
                    $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="">' + headertext + '</label></div>');
                }

            }
            else {
                if ($('#anchor label').text().indexOf(headertext) == -1) {
                    $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + '><label class="">' + headertext + '</label></div>');
                }
            }
            if (val.CssClass == 'undefined' || val.CssClass == null)
                // Append header here
                //if (val.HeaderText == "Id") {
                //    theadrow.append('<th>Sr.No.</th>');
                //}
                //else {
                theadrow.append('<th>' + headertext + '</th>');
                //}

            else
                theadrow.append('<th class=' + val.CssClass + '>' + headertext + '</th>');
            // Append footerrow here
            tfootrow.append('<th><input type="text" class="form-control form-control-sm" style="width:' + val.Width + '" placeholder="' + headertext + '" /></th>');
        }

        thead.append(theadrow);

        tab.append(thead);
        var tbody = $('<tbody></tbody>');
        var sumList = [];

        $.each(data, function (i, obj) {
            var trow = $('<tr></tr>');
            $.each(tblheader, function (j, val) {
                var key = val.HeaderValue;
                var value = obj[key];

                if (value == 'undefined' || value == null) { value = "" }
                if (key == "Id" || key == "#") {
                    if (obj[val.Value] == 'undefined' || obj[val.Value] == null)
                        trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (i + 1) + '</td>');
                    else
                        trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (i + 1) + '<input type="hidden" id="hdId_' + i + '" name="Id" value=' + obj[val.Value] + ' /></td>');
                }
                else {
                    if (val.ImageColumn == "Yes") {
                        if (val.CssClass == 'undefined' || val.CssClass == null)
                            trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="50px" height="50px"></td>');
                        else
                            trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="50px" height="50px"></td>');

                    }
                    else if (val.tooltip == "Yes") {
                        if (obj[val.Value] == 'undefined' || obj[val.Value] == null) {
                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                trow.append('<td  ondblclick="angular.element(this).scope().dbClick();"><span class="spnDetails">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</span><span class="spnTooltip">' + obj[val.tooltipvalue] + '</span></td>');
                            else
                                trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><span class="spnDetails">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</span><span class="spnTooltip">' + obj[val.tooltipvalue] + '</span></td>');
                        }
                        else {

                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><span class="spnDetails">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</span><input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /><span class="spnTooltip">' + obj[val.tooltipvalue] + '</span></td>');
                            else
                                trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><span class="spnDetails">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</span><input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /><span class="spnTooltip">' + obj[val.tooltipvalue] + '</span></td>');
                        }
                    }
                    else {

                        if (obj[val.Value] == 'undefined' || obj[val.Value] == null) {
                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                trow.append('<td  ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</td>');
                            else
                                trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</td>');
                        }
                        else {

                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '<input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /></td>');
                            else
                                trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '<input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /></td>');
                        }

                    }
                }
                if (sumList[j] == "" || sumList[j] == 'undefined' || sumList[j] == null)
                    sumList[j] = 0;
                if (val.Fun == 'undefined' || val.Fun == null) {
                    if (val.FooterText == 'undefined' || val.FooterText == null) {
                        sumList[j] = "";
                    }
                    else {
                        sumList[j] = val.FooterText;
                    }
                }
                else {
                    addfunfoot = 1;
                    sumList[j] = Number(sumList[j]) + (isNaN(value) ? 0 : Number(value));
                }
            });

            tbody.append(trow);
        });

        tab.append(tbody);

        if (addfunfoot == 1) {
            var ftrow = $('<tr class="print"></tr>');
            $.each(sumList, function (index, value) {
                var footval = (value == '0' ? '-' : ((isNaN(value) || value == "") ? value : Number(value).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2 })));

                ftrow.append('<th class="text-right">' + footval + '</th>');
            });
            //tfoot.append(tfootrow);
            tfoot.addClass("print")
            tfoot.append(ftrow);

            tab.append(tfoot);
        }
        else {
            tfoot.append(tfootrow);
            tab.append(tfoot);
        }


        $("#UpdatePanel").html(tab);

        var hideColumn = [];
        var m = $('#anchor input[type="checkbox"]');
        for (var i = 0; i < m.length; i++) {
            if (!$(m[i]).prop('checked')) {
                hideColumn.push(i);
            }
        }


        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.append("datatable('" + hideColumn + "')");

        $("#UpdatePanel").append(script);


    }
    else {
        var tab = $('<table id="example" class="table compact table-hover table-striped table-bordered nowrap" ></table>');
        var thead = $('<thead></thead>');
        var theadrow = $('<tr></tr>');

        var l = tblheader.length;
        for (var i = 0; i < l; i++) {
            var val = tblheader[i]
            var headertext = "Sr.No.";
            if (val.HeaderText != "Id") {
                headertext = val.HeaderText;
            }
            if (val.ShowColumn == "Yes") {
                if ($('#anchor label').text() != '') {
                    if ($('#anchor label').text().indexOf(headertext) == -1) {
                        $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="">' + headertext + '</label> </div>');
                    }
                }
                else {
                    $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="">' + headertext + '</label></div>');
                }

            }
            else {
                if ($('#anchor label').text().indexOf(headertext) == -1) {
                    $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + '><label class="">' + headertext + '</label></div>');
                }
            }
            if (val.CssClass == 'undefined' || val.CssClass == null)
                // Append header here
                theadrow.append('<th>' + headertext + '</th>');
            else
                theadrow.append('<th class=' + val.CssClass + '>' + headertext + '</th>');
        }

        thead.append(theadrow);

        tab.append(thead);


        var tbody = $('<tbody></tbody>');

        var trow = $('<tr></tr>');
        trow.append("<th colspan=" + tblheader.length + " style='text-align: center;'>No Record Found!</th>");
        tbody.append(trow);

        tab.append(tbody);
        $("#UpdatePanel").html(tab);

    }

    angular.element(document).scope().hideLoader();
};

function loadDataUsingPreDefinedColumnOnPage1(tblheader, data, displayOrder, displayid, tableid) {
    if (tableid == null) {
        tableid = 'example';
    }
    var tab = $('<table id=' + tableid + ' class="table compact table-hover table-striped table-bordered nowrap" ></table>');
    var thead = $('<thead></thead>');
    var theadrow = $('<tr></tr>');

    var tfoot = $('<tfoot></tfoot>');
    var tfootrow = $('<tr></tr>');

    var l = tblheader.length;
    var colspan = 0;
    for (var i = 0; i < l; i++) {
        var val = tblheader[i]
        colspan = colspan + 1;
        // Append header here
        if (i > 0) {
            theadrow.append('<th class="sum">' + val.HeaderText + '</th>');
        }
        else {
            theadrow.append('<th>' + val.HeaderText + '</th>');
        }
        // Append footerrow here        
    }

    thead.append(theadrow);

    tab.append(thead);
    var tbody = $('<tbody></tbody>');
    if (JSON.stringify(data).length > 2) {
        $.each(data, function (i, obj) {

            var trow = $('<tr></tr>');
            $.each(tblheader, function (j, val) {
                var key = val.HeaderValue;
                var value = obj[key];
                if (value == 'undefined' || value == null) { value = "" }
                if (key == "Id" || key == "#") {
                    trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (i + 1) + '<input type="hidden" id="hdId_' + i + '" name="Id" value=' + obj[val.Value] + ' /></td>');
                }
                else {
                    if (val.ImageColumn == "Yes") {
                        trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="50px" height="50px"></td>');
                    }
                    else {
                        var cellvalue = (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : Replace(value));
                        if (j > 0) {
                            trow.append('<td class="sum" ondblclick="angular.element(this).scope().dbClick();">' + cellvalue + '</td>');
                        }
                        else {
                            trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + cellvalue + '</td>');
                        }
                    }
                }
            });

            tbody.append(trow);
        });
        //alert($($(tab).html()).find('tbody tr').length)
        ////
        $.each($(tbody).find('tr'), function () {
            var tatalamount;
            var index = $(this).index();
            var tbodytd = $(this).find('td');
            $.each(tbodytd, function (i, val) {
                var cellvalue = angular.element(val).text();
                if ($.isNumeric(cellvalue)) {
                    if ($.isNumeric(tatalamount))
                        tatalamount = tatalamount + Number(cellvalue);
                    else
                        tatalamount = Number(cellvalue);
                }
            });


            if ($.isNumeric(tatalamount)) {
                $(tbody).find('tr:eq(' + (index) + ') td:eq(' + (tbodytd.length - 1) + ')').html('<p style="font-weight:500">' + tatalamount + '</p>');
            }
        });

        $.each($(thead).find('tr th'), function () {
            var tatalamount;
            var index = $(this).index();
            $.each($(tbody).find('tr'), function () {
                var tbodytd = $(this).find('td')[index];
                var cellvalue = angular.element(tbodytd).text();
                if ($.isNumeric(cellvalue)) {
                    if ($.isNumeric(tatalamount))
                        tatalamount = tatalamount + Number(cellvalue);
                    else
                        tatalamount = Number(cellvalue);
                }
            });

            if ($.isNumeric(tatalamount))
                tfootrow.append('<td><p style="font-weight:500">' + tatalamount + '</p></td>');
            else
                tfootrow.append('<td><p style="font-weight:500">Total</p></td>');
        });
    }
    else {
        var trow = $('<tr><td style="text-align:center" colspan=' + colspan + '>No Record Found!</td></tr>');
        tbody.append(trow);
    }

    tab.append(tbody);

    tfoot.append(tfootrow);
    tab.append(tfoot);



    if (displayid == null)
        $("#UpdatePanel").html(tab);
    else
        $(displayid).html(tab);

    if (JSON.stringify(data).length > 2) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.append("BasicDatatable1('" + tableid + "')");

        if (displayid == null)
            $("#UpdatePanel").append(script);
        else
            $(displayid).append(script);
    }

    angular.element(document).scope().hideLoader();
};

function BasicDatatable1(tableid) {
    if (tableid == null) {
        tableid = "example";
    }
    var table = $('#' + tableid).DataTable({
        "paging": false,
        "ordering": false,
        "info": false,
        "searching": false,
        //"scrollX": true,
        colReorder: true,
        realtime: true,
        responsive: false
    });
}

var logo = "";

function getBase64Image() {
    try {
        var element = $('.ReportHeader');
        //var h = $(element)[0].ownerDocument.defaultView.innerHeight;
        //$(element)[0].ownerDocument.defaultView.innerHeight = $(element).height();

        html2canvas(element).then(canvas => {
            try {
                logo = canvas.toDataURL("image/png");
                $('#cover-spin').attr('style', 'display:none;');
            }
            catch (err) {
                $('#cover-spin').attr('style', 'display:none;');
            }
        });
    }
    catch (err) {
        $('#cover-spin').attr('style', 'display:none;');
    }

}
var oldClass = "";
var fontSize = "12";
function resizeFont() {
    ////
    var classname = $('#ddlFonts option:selected').val();
    fontSize = $('#ddlFonts option:selected').text();
    $('.dataTable').find('thead th').removeClass(oldClass);
    $('#example').find('td').removeClass(oldClass);
    $('#FilterTitle').removeClass(oldClass);
    oldClass = classname;
    $('.dataTable').find('thead th').addClass(classname);
    $('#example').find('td').addClass(classname);
    $('#FilterTitle').addClass(oldClass);
}

var messagevalues = [];

function datatable(hideColumn) {
    $("#example").colResizable({ disable: true });

    var message = "";
    var seprator = "";
    var filter = "<span class='filter' ></span> ";
    var j = 0;
    if (messagevalues.length > 0)
        $.each(messagevalues, function (i, values) {

            $.each(values, function (key, val) {
                j = j + 1;
                if (val != null && val != "") {
                    if (j == 3) {
                        message = message + "</br>"
                        j = 0;
                    }
                    else { message = message + seprator + filter; }
                    message = message + "<span class='filter-title-name' >" + key + "</span> : <span class='filter-title'>" + val + "</span>"
                    seprator = ", ";

                    filter = "";
                };
            });
        });
    if (message.length > 0) {
        message = '' + message + '';
    }

    if (hideColumn != null) {
        hideColumn = hideColumn.split(',');
    };
    if (hideColumn != null && hideColumn.length > 0 && hideColumn[0] != "") {
        var columnDefs = [];
        for (var i = 0; i < hideColumn.length; i++) {
            var val = hideColumn[i]
            columnDefs.push({
                "targets": [Number(val)],
                "visible": false
                //"searchable": false 
            })
        }
        $('#example').append('<caption style="caption-side: center"><div id="FilterTitle">' + message + '</div></caption>');
        //alert(JSON.stringify(columnDefs));
        var table = $('#example').DataTable({
            "order": [[colIndex, colOrder]],
            "columnDefs": columnDefs,
            rowGroup: {
                dataSrc: rowGroupIndex
            },
            colReorder: true,
            realtime: true,
            responsive: false,
            "scrollX": true,
            dom: 'lBfrtip',
            "iDisplayLength": -1,
            "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
            fnInitComplete: function () {
                var div = $('<div class="ReportHeader"></div>')
                div.append($('#ReportHeader').html());
                $(div).insertBefore($("#example_wrapper"));
                setTimeout(function () {
                    $('#cover-spin').attr('style', 'display:block;');
                    setTimeout(getBase64Image, 500);
                }, 100);
            },
            buttons: [
                       {
                           extend: 'copyHtml5',
                           titleAttr: 'Copy',
                           //messageTop: message,
                           exportOptions: {
                               columns: function (idx, data, node) {
                                   return table.column(idx).visible();
                               }
                           }
                       },
                       {
                           extend: 'csvHtml5',
                           titleAttr: 'CSV',
                           //messageTop: message,
                           exportOptions: {
                               columns: function (idx, data, node) {
                                   return table.column(idx).visible();
                               }
                           }
                       },
                       {
                           extend: 'excelHtml5',
                           titleAttr: 'Excel',
                           //messageTop: message,
                           exportOptions: {
                               columns: function (idx, data, node) {
                                   return table.column(idx).visible();
                               }
                           },
                           customize: function (xlsx) {
                               var sheet = xlsx.xl['styles.xml'];
                               var tagName = sheet.getElementsByTagName('sz');
                               for (i = 0; i < tagName.length; i++) {
                                   tagName[i].setAttribute("val", fontSize)
                               }
                           }
                       },
                       //{
                       //    extend: 'pdfHtml5',
                       //    titleAttr: 'PDF',
                       //    //messageTop: message,
                       //    exportOptions: {
                       //        columns: function (idx, data, node) {

                       //            return table.column(idx).visible();
                       //        }
                       //    },
                       //    customize: function (doc) {
                       //        doc.defaultStyle.fontSize = fontSize;
                       //        //Remove the title created by datatTables
                       //        doc.content.splice(1, 0);
                       //        //Create a date string that we use in the footer. Format is dd-mm-yyyy
                       //        var now = new Date();
                       //        var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
                       //        // Logo converted to base64
                       //        doc.styles.tableHeader.alignment = 'left';
                       //        //var col = $('#example').DataTable().columns(':visible').nodes().length;
                       //        //var widths = ["*"];
                       //        //for (var i = 1; i < col; i++) {
                       //        //    widths.push("*");
                       //        //}
                       //        //doc.content[1].table.widths = widths;
                       //        //var imgs = $('.ReportHeader').find('img');
                       //        //var base64 = getBase64Image(document.getElementById("imageid"));
                       //        //var image1 = getBase64ImageUsingImage(imgs[0]);

                       //        // The above call should work, but not when called from codepen.io
                       //        // So we use a online converter and paste the string in.
                       //        // Done on http://codebeautify.org/image-to-base64-converter
                       //        // It's a LONG string scroll down to see the rest of the code !!!



                       //        // A documentation reference can be found at
                       //        // https://github.com/bpampuch/pdfmake#getting-started
                       //        // Set page margins [left,top,right,bottom] or [horizontal,vertical]
                       //        // or one number for equal spread
                       //        // It's important to create enough space at the top for a header !!!
                       //        doc.pageMargins = [10, 100, 20, 20];

                       //        // Set the font size fot the entire document
                       //        //doc.defaultStyle.fontSize = 7;
                       //        // Set the fontsize for the table header
                       //        //doc.styles.tableHeader.fontSize = 7;
                       //        // Create a header object with 3 columns
                       //        // Left side: Logo
                       //        // Middle: brandname
                       //        // Right side: A document title
                       //        //alert(logo)
                       //        doc['header'] = (function () {
                       //            return {
                       //                columns: [
                       //                    //{
                       //                    //    image: image1,
                       //                    //    width: 50
                       //                    //},
                       //                    {
                       //                        margin: [0, 30, 0, 0],
                       //                        alignment: 'center',
                       //                        image: logo,
                       //                        width: 600
                       //                    }
                       //                    //{
                       //                    //    alignment: 'right',
                       //                    //    fontSize: 14,
                       //                    //    text: 'Custom PDF export with dataTables'
                       //                    //}
                       //                ]

                       //            }
                       //        });
                       //        // Create a footer object with 2 columns
                       //        // Left side: report creation date
                       //        // Right side: current page and total pages
                       //        doc['footer'] = (function (page, pages) {
                       //            return {
                       //                columns: [
                       //                    {
                       //                        margin: [20, 0, 0, 0],
                       //                        alignment: 'left',
                       //                        text: ['Created on: ', { text: jsDate.toString() }]
                       //                    },
                       //                    {
                       //                        margin: [0, 0, 20, 0],
                       //                        alignment: 'right',
                       //                        text: ['page ', { text: page.toString() }, ' of ', { text: pages.toString() }]
                       //                    }
                       //                ]
                       //            }
                       //        });


                       //        // Change dataTable layout (Table styling)
                       //        // To use predefined layouts uncomment the line below and comment the custom lines below
                       //        // doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
                       //        //var objLayout = {};
                       //        //objLayout['hLineWidth'] = function (i) { return .5; };
                       //        //objLayout['vLineWidth'] = function (i) { return .5; };
                       //        //objLayout['hLineColor'] = function (i) { return '#aaa'; };
                       //        //objLayout['vLineColor'] = function (i) { return '#aaa'; };
                       //        //objLayout['paddingLeft'] = function (i) { return 4; };
                       //        //objLayout['paddingRight'] = function (i) { return 4; };
                       //        //doc.content[0].layout = objLayout;
                       //    }
                       //},
                       {
                           extend: 'print',
                           titleAttr: 'Print',
                           messageTop: message,
                           //autoPrint: false,
                           footer: addfunfoot == 1 ? true : false,
                           exportOptions: {
                               stripHtml: false,
                               columns: function (idx, data, node) {
                                   return table.column(idx).visible();
                               }
                           },
                           customize: function (win) {
                               var url = window.location.href.replace(window.location.pathname, '');
                               var title = $(win.document.head).find('title');
                               $(win.document.head).html('').append(title).append('<link href="' + url + '/Content/plugins/assets/css/print/print-bootstrap.min.css" rel="stylesheet" />').append('<link href="' + url + '/Content/plugins/assets/css/print/print-main.css" rel="stylesheet" />');

                               $(win.document.head).append('<style>table.dataTable thead .sorting:before, table.dataTable thead .sorting_asc:before, table.dataTable thead .sorting_desc:before, table.dataTable thead .sorting_asc_disabled:before, table.dataTable thead .sorting_desc_disabled:before {opacity: 0;}table.dataTable thead .sorting:after, table.dataTable thead .sorting_asc:after, table.dataTable thead .sorting_desc:after, table.dataTable thead .sorting_asc_disabled:after, table.dataTable thead .sorting_desc_disabled:after {opacity: 0;}</style>');

                               $(win.document.head).append('<script>var x = document.getElementsByTagName("img");for (var i = 0; i < x.length-1; i++) {var src=x[i].src; x[i].src = src;};</script>');
                               var div = $('<div class="ReportHeader"></div>')

                               div.append($('#ReportHeader').html());
                               $(win.document.body).prepend(div);
                               //$(win.document.body)
                               //    .prepend('<img src=' + logo + ' style="width:100%" />');

                               $(win.document.body).find('table')
                                   .addClass('compact')
                                   .css('font-size', 'inherit');

                               $(win.document.body).find('table tbody td')
                                  .css('font-size', fontSize);

                               $(win.document.body).find('table thead th')
                                 .css('font-size', fontSize);
                               var setFilterSize = Number(fontSize) + 3;

                               $(win.document.body).find('div').css('font-size', setFilterSize);
                               $(win.document.body).find('div').addClass('filter-toggle');

                               var tbl = $('.dataTables_scrollHeadInner').find('table');
                               var thead = $(tbl).find('thead');
                               $(win.document.body).find('thead').html($(thead).html());

                               var tbl1 = $('.dataTables_scrollBody').find('table');
                               var tbody = $(tbl1).find('tbody');
                               $(win.document.body).find('table.dataTable tbody').html($(tbody).html());

                               var tbl2 = $('.dataTables_scrollFootInner').find('table');
                               var tfoot = $(tbl2).find('tfoot');
                               $(win.document.body).find('table.dataTable tfoot').html($(tfoot).html());
                           }
                       }
            ],
            select: true

        });
    }
    else {

        $('#example').append('<caption style="caption-side: center"><div id="FilterTitle">' + message + '</div></caption>');
        var table = $('#example').DataTable({
            "order": [[colIndex, colOrder]],
            colReorder: true,
            rowGroup: {
                dataSrc: rowGroupIndex
            },
            realtime: true,
            responsive: false,
            "scrollX": true,
            dom: 'lBfrtip',
            "iDisplayLength": -1,
            "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
            fnInitComplete: function () {
                var div = $('<div class="ReportHeader"></div>')
                div.append($('#ReportHeader').html());
                $(div).insertBefore($("#example_wrapper"));
                setTimeout(function () { $('#cover-spin').attr('style', 'display:block;'); setTimeout(getBase64Image, 500); }, 100);
            },
            buttons: [
             {
                 extend: 'copyHtml5',
                 titleAttr: 'Copy',
                 //messageTop: message,
                 exportOptions: {
                     columns: function (idx, data, node) {
                         return table.column(idx).visible();
                     }
                 }
             },
             {
                 extend: 'csvHtml5',
                 titleAttr: 'CSV',
                 //messageTop: message,
                 exportOptions: {
                     columns: function (idx, data, node) {
                         return table.column(idx).visible();
                     }
                 }
             },
             {
                 extend: 'excelHtml5',
                 titleAttr: 'Excel',
                 //messageTop: message,
                 exportOptions: {
                     columns: function (idx, data, node) {
                         return table.column(idx).visible();
                     }
                 },
                 customize: function (xlsx) {
                     var sheet = xlsx.xl['styles.xml'];
                     var tagName = sheet.getElementsByTagName('sz');
                     for (i = 0; i < tagName.length; i++) {
                         tagName[i].setAttribute("val", fontSize)
                     }
                 }
             },
             //{
             //    extend: 'pdfHtml5',
             //    titleAttr: 'PDF',
             //    //messageTop: message,
             //    exportOptions: {
             //        columns: function (idx, data, node) {

             //            return table.column(idx).visible();
             //        }
             //    },
             //    customize: function (doc) {
             //        doc.defaultStyle.fontSize = fontSize;
             //        //Remove the title created by datatTables
             //        //doc.content.splice(1, 0);
             //        //Create a date string that we use in the footer. Format is dd-mm-yyyy
             //        doc.content.splice(1, 0);
             //        var now = new Date();
             //        var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
             //        // Logo converted to base64
             //        doc.styles.tableHeader.alignment = 'left';
             //        //var col = $('#example').DataTable().columns(':visible').nodes().length;
             //        //var widths = ["*"];
             //        //for (var i = 1; i < col; i++) {
             //        //    widths.push("*");
             //        //}
             //        //doc.content[1].table.widths = widths;
             //        //var imgs = $('.ReportHeader').find('img');
             //        //var base64 = getBase64Image(document.getElementById("imageid"));
             //        //var image1 = getBase64ImageUsingImage(imgs[0]);

             //        // The above call should work, but not when called from codepen.io
             //        // So we use a online converter and paste the string in.
             //        // Done on http://codebeautify.org/image-to-base64-converter
             //        // It's a LONG string scroll down to see the rest of the code !!!



             //        // A documentation reference can be found at
             //        // https://github.com/bpampuch/pdfmake#getting-started
             //        // Set page margins [left,top,right,bottom] or [horizontal,vertical]
             //        // or one number for equal spread
             //        // It's important to create enough space at the top for a header !!!
             //        doc.pageMargins = [10, 100, 20, 20];

             //        // Set the font size fot the entire document
             //        //doc.defaultStyle.fontSize = 7;
             //        // Set the fontsize for the table header
             //        //doc.styles.tableHeader.fontSize = 7;
             //        // Create a header object with 3 columns
             //        // Left side: Logo
             //        // Middle: brandname
             //        // Right side: A document title
             //        //alert(logo)
             //        doc['header'] = (function () {
             //            return {
             //                columns: [
             //                    //{
             //                    //    image: image1,
             //                    //    width: 50
             //                    //},
             //                    {
             //                        margin: [0, 30, 0, 0],
             //                        alignment: 'center',
             //                        image: logo,
             //                        width: 600
             //                    }
             //                    //{
             //                    //    alignment: 'right',
             //                    //    fontSize: 14,
             //                    //    text: 'Custom PDF export with dataTables'
             //                    //}
             //                ]

             //            }
             //        });
             //        // Create a footer object with 2 columns
             //        // Left side: report creation date
             //        // Right side: current page and total pages
             //        doc['footer'] = (function (page, pages) {
             //            return {
             //                columns: [
             //                    {
             //                        margin: [20, 0, 0, 0],
             //                        alignment: 'left',
             //                        text: ['Created on: ', { text: jsDate.toString() }]
             //                    },
             //                    {
             //                        margin: [0, 0, 20, 0],
             //                        alignment: 'right',
             //                        text: ['page ', { text: page.toString() }, ' of ', { text: pages.toString() }]
             //                    }
             //                ]
             //            }
             //        });


             //        // Change dataTable layout (Table styling)
             //        // To use predefined layouts uncomment the line below and comment the custom lines below
             //        // doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
             //        //var objLayout = {};
             //        //objLayout['hLineWidth'] = function (i) { return .5; };
             //        //objLayout['vLineWidth'] = function (i) { return .5; };
             //        //objLayout['hLineColor'] = function (i) { return '#aaa'; };
             //        //objLayout['vLineColor'] = function (i) { return '#aaa'; };
             //        //objLayout['paddingLeft'] = function (i) { return 4; };
             //        //objLayout['paddingRight'] = function (i) { return 4; };
             //        //doc.content[0].layout = objLayout;
             //    }
             //},
             {
                 extend: 'print',
                 titleAttr: 'Print',
                 messageTop: message,
                 //autoPrint: false,
                 footer: addfunfoot == 1 ? true : false,
                 exportOptions: {
                     stripHtml: false,
                     columns: function (idx, data, node) {
                         return table.column(idx).visible();
                     }
                 },
                 customize: function (win) {
                     var url = window.location.href.replace(window.location.pathname, '');
                     var title = $(win.document.head).find('title');
                     $(win.document.head).html('').append(title).append('<link href="' + url + '/Content/plugins/assets/css/print/print-bootstrap.min.css" rel="stylesheet" />').append('<link href="' + url + '/Content/plugins/assets/css/print/print-main.css" rel="stylesheet" />');

                     $(win.document.head).append('<style>table.dataTable thead .sorting:before, table.dataTable thead .sorting_asc:before, table.dataTable thead .sorting_desc:before, table.dataTable thead .sorting_asc_disabled:before, table.dataTable thead .sorting_desc_disabled:before {opacity: 0;}table.dataTable thead .sorting:after, table.dataTable thead .sorting_asc:after, table.dataTable thead .sorting_desc:after, table.dataTable thead .sorting_asc_disabled:after, table.dataTable thead .sorting_desc_disabled:after {opacity: 0;}</style>');

                     $(win.document.head).append('<script>var x = document.getElementsByTagName("img");for (var i = 0; i < x.length-1; i++) {var src=x[i].src; x[i].src = src;};</script>');
                     var div = $('<div class="ReportHeader"></div>')

                     div.append($('#ReportHeader').html());
                     $(win.document.body).prepend(div);
                     //$(win.document.body)
                     //    .prepend('<img src=' + logo + ' style="width:100%" />');

                     $(win.document.body).find('table')
                         .addClass('compact')
                         .css('font-size', 'inherit');

                     $(win.document.body).find('table tbody td')
                                 .css('font-size', fontSize);

                     $(win.document.body).find('table thead th')
                       .css('font-size', fontSize);

                     var setFilterSize = Number(fontSize) + 3;

                     $(win.document.body).find('div').css('font-size', setFilterSize);
                     $(win.document.body).find('div').addClass('filter-toggle');

                     var tbl = $('.dataTables_scrollHeadInner').find('table');
                     var thead = $(tbl).find('thead');
                     $(win.document.body).find('thead').html($(thead).html());

                     var tbl1 = $('.dataTables_scrollBody').find('table');
                     var tbody = $(tbl1).find('tbody');
                     $(win.document.body).find('table.dataTable tbody').html($(tbody).html());

                     var tbl2 = $('.dataTables_scrollFootInner').find('table');
                     var tfoot = $(tbl2).find('tfoot');
                     $(win.document.body).find('table.dataTable tfoot').html($(tfoot).html());

                 }
             }
            ],
            select: true
        });
    }

    var iframeBoxHeight = $(".autoheightset").height();
    var iframeBoxWidth = $(".autoheightset").width();


    var TabAddHeight = $("#TabAddHeight").attr("TabAddHeight");
    var AddHeight = isNaN(TabAddHeight) ? 0 : parseInt(TabAddHeight);

    if (iframeBoxWidth > 640) {
        var DataTablesHeight = iframeBoxHeight - (255 + AddHeight);  //228
        $("#example_wrapper .dataTables_scroll").find(".dataTables_scrollBody").css("max-height", DataTablesHeight);
        $('.dataTables_length').addClass('bs-select');
    }
    else if ((iframeBoxWidth <= 640) && (iframeBoxWidth > 480)) {
        var DataTablesHeight = iframeBoxHeight - (290 + AddHeight);  //228
        $("#example_wrapper .dataTables_scroll").find(".dataTables_scrollBody").css("max-height", DataTablesHeight);
        $('.dataTables_length').addClass('bs-select');
    }
    else if ((iframeBoxWidth <= 480) && (iframeBoxWidth >= 412)) {
        var DataTablesHeight = iframeBoxHeight - (335 + AddHeight);  //228
        $("#example_wrapper .dataTables_scroll").find(".dataTables_scrollBody").css("max-height", DataTablesHeight);
        $('.dataTables_length').addClass('bs-select');
    }
    else {
        var DataTablesHeight = iframeBoxHeight - 330;  //228
        $("#example_wrapper .dataTables_scroll").find(".dataTables_scrollBody").css("max-height", DataTablesHeight);
        $('.dataTables_length').addClass('bs-select');
    }



    if ($('#example thead th').length <= 1) {
        $('#example thead').attr("style", "display: none;");
        $('#example tfoot').attr("style", "display: none;");
    }
    //Apply the search
    table.columns().every(function () {
        var that = this;

        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                  .search(this.value)
                  .draw();
            }
        });
    });

    if (rowGroupIndex.length > 0) {
        // Change the fixed ordering when the data source is updated
        table.on('rowgroup-datasrc', function (e, dt, val) {
            table.order.fixed({ pre: [[val, 'asc']] }).draw();
        });

        $('a.group-by').on('click', function (e) {
            e.preventDefault();

            table.rowGroup().dataSrc($(this).data('column'));
        });
    }
    else {
        table.rowGroup().disable().draw();
    }

    $('input.toggle-vis').on('change', function (e) {

        e.preventDefault();

        //Get the column API object
        var column = table.column($(this).attr('data-column'));

        //Toggle the visibility
        column.visible(!column.visible());
    });

    $('#example thead').on('click', 'th', function (e) {

        e.preventDefault();

        colIndex = $(this).index();

        if (colOrder == "desc") {
            colOrder = "asc"
        }
        else {
            colOrder = "desc"
        }
    });



    //$('#example tbody').on('click', 'td', function (e) {
    //    e.preventDefault();
    //    var tfootinput = $('#example tfoot tr th input');
    //    tfootinput[$(this).index()].focus();
    //});
    //$("#example").colResizable({
    //    liveDrag: true,
    //    gripInnerHtml: "<div class='grip'></div>",
    //    draggingClass: "dragging",
    //    resizeMode: 'fit'
    //});

    setTimeout(function () {
        $('#example').DataTable().columns.adjust().draw();
    }, 500);

    $(".section-toggle").slideToggle('slow');
    $(".filter-toggle").css("display", "block");

    $('.refresh-container').fadeOut(2000);
}
//------End JS for DataTable--------------//
function datatableForLargeAmountData(hideColumn, tblrows, tblheader) {
    $("#example").colResizable({ disable: true });

    var message = "";
    var seprator = "";
    var filter = "<span class='filter' >Filter  : </span> ";

    if (messagevalues.length > 0)
        $.each(messagevalues, function (i, values) {
            $.each(values, function (key, val) {
                if (val != null && val != "") {
                    message = message + seprator + filter;
                    message = message + "<span class='filter-title-name' >" + key + "</span> : <span class='filter-title'>" + val + "</span>"
                    seprator = ", ";
                    filter = "";
                };
            });
        });
    if (message.length > 0) {
        message = '(' + message + ')';
    }

    if (hideColumn != null) {
        hideColumn = hideColumn.split(',');
    };
    if (hideColumn != null && hideColumn.length > 0 && hideColumn[0] != "") {
        var columnDefs = [];
        for (var i = 0; i < hideColumn.length; i++) {
            var val = hideColumn[i]
            columnDefs.push({
                "targets": [Number(val)],
                "visible": false
                //"searchable": false 
            })
        }
        $('#example').append('<caption style="caption-side: center"><div id="FilterTitle">' + message + '</div></caption>');
        //alert(JSON.stringify(columnDefs));

        var table = $('#example').DataTable({
            "order": [[colIndex, colOrder]],
            "columnDefs": columnDefs,
            colReorder: true,
            realtime: true,
            responsive: false,
            "scrollX": true,
            dom: 'lBfrtip',
            //"scrollCollapse": true,
            //"lengthChange": false,
            //"paging":         false,
            "iDisplayLength": -1,
            "lengthMenu": [[-1], ["All"]],
            //"searching": true,
            //serverSide: true,
            scrollY: 400,
            scroller: {
                loadingIndicator: true
            },
            "language": {
                "loadingRecords": ""
            },
            stateSave: false,
            "scrollCollapse": true,
            fnInitComplete: function () {
                var div = $('<div class="ReportHeader"></div>')
                div.append($('#ReportHeader').html());
                $(div).insertBefore($("#example_wrapper"));
                setTimeout(function () {
                    $('#cover-spin').attr('style', 'display:block;');
                    setTimeout(getBase64Image, 500);
                }, 100);
            },
            ajax: function (data, callback, settings) {
                var out = [];

                $.each(tblrows, function (index, row) {
                    var vals = [];
                    $.each(tblheader, function (i, r) {
                        if (r.HeaderValue.toUpperCase() == 'ID') {
                            val = index + 1;
                            vals.push(val + ' <input type="hidden" id="hdId_' + i + '" name="Id" value=' + row[r.Value] + ' />');
                        }
                        else if (r.Value != undefined && r.Value != null && r.Value != '') {
                            vals.push(row[r.HeaderValue].replace('&lt;br&gt;', '<br>') + ' <input type="hidden" id="hdId_' + i + '" name="Id" value=' + row[r.Value] + ' />');
                        }
                        else {
                            if (r.hasOwnProperty("LineBreak")) {
                                if (r.LineBreak == "Yes") {
                                    if (row[r.HeaderValue] != null)
                                        vals.push(row[r.HeaderValue].replaceAll(',', '<br>'));
                                    else
                                        vals.push(row[r.HeaderValue]);
                                }
                                else
                                    vals.push(row[r.HeaderValue]);
                            }
                            else
                                vals.push(row[r.HeaderValue]);
                                
                        }
                    });
                    out.push(vals);
                });

                callback({
                    //"order": [[colIndex, colOrder]],
                    //"columnDefs": columnDefs,
                    draw: data.draw,
                    data: out,
                    recordsTotal: out.length,
                    recordsFiltered: out.length
                });
            },
            buttons: [
                       {
                           extend: 'copyHtml5',
                           titleAttr: 'Copy',
                           //messageTop: message,
                           exportOptions: {
                               columns: function (idx, data, node) {
                                   return table.column(idx).visible();
                               }
                           }
                       },
                       {
                           extend: 'csvHtml5',
                           titleAttr: 'CSV',
                           //messageTop: message,
                           exportOptions: {
                               columns: function (idx, data, node) {
                                   return table.column(idx).visible();
                               }
                           }
                       },
                       {
                           extend: 'excelHtml5',
                           titleAttr: 'Excel',
                           //messageTop: message,
                           exportOptions: {
                               columns: function (idx, data, node) {
                                   return table.column(idx).visible();
                               }
                           },
                           customize: function (xlsx) {
                               var sheet = xlsx.xl['styles.xml'];
                               var tagName = sheet.getElementsByTagName('sz');
                               for (i = 0; i < tagName.length; i++) {
                                   tagName[i].setAttribute("val", fontSize)
                               }
                           }
                       },

                       {
                           extend: 'print',
                           titleAttr: 'Print',
                           messageTop: message,
                           //autoPrint: false,
                           exportOptions: {
                               stripHtml: false,
                               columns: function (idx, data, node) {
                                   return table.column(idx).visible();
                               }
                           },
                           customize: function (win) {
                               var url = window.location.href.replace(window.location.pathname, '');
                               var title = $(win.document.head).find('title');
                               $(win.document.head).html('').append(title).append('<link href="' + url + '/Content/plugins/assets/css/print/print-bootstrap.min.css" rel="stylesheet" />').append('<link href="' + url + '/Content/plugins/assets/css/print/print-main.css" rel="stylesheet" />');

                               $(win.document.head).append('<style>table.dataTable thead .sorting:before, table.dataTable thead .sorting_asc:before, table.dataTable thead .sorting_desc:before, table.dataTable thead .sorting_asc_disabled:before, table.dataTable thead .sorting_desc_disabled:before {opacity: 0;}table.dataTable thead .sorting:after, table.dataTable thead .sorting_asc:after, table.dataTable thead .sorting_desc:after, table.dataTable thead .sorting_asc_disabled:after, table.dataTable thead .sorting_desc_disabled:after {opacity: 0;}</style>');

                               $(win.document.head).append('<script>var x = document.getElementsByTagName("img");for (var i = 0; i < x.length-1; i++) {var src=x[i].src; x[i].src = src;};</script>');
                               var div = $('<div class="ReportHeader"></div>')

                               div.append($('#ReportHeader').html());
                               $(win.document.body).prepend(div);
                               //$(win.document.body)
                               //    .prepend('<img src=' + logo + ' style="width:100%" />');

                               $(win.document.body).find('table')
                                   .addClass('compact')
                                   .css('font-size', 'inherit');

                               $(win.document.body).find('td')
                                  .css('font-size', fontSize);

                               $(win.document.body).find('th')
                                 .css('font-size', fontSize);
                               var setFilterSize = Number(fontSize) + 3;

                               $(win.document.body).find('div').css('font-size', setFilterSize);
                               $(win.document.body).find('div').addClass('filter-toggle');

                               var tbl = $('.dataTables_scrollHeadInner').find('table');
                               var thead = $(tbl).find('thead');
                               $(win.document.body).find('thead').html($(thead).html());
                           }
                       }
            ],
            select: true

        });
    }
    else {

        $('#example').append('<caption style="caption-side: center"><div id="FilterTitle">' + message + '</div></caption>');
        var table = $('#example').DataTable({
            "order": [[colIndex, colOrder]],
            colReorder: true,
            realtime: true,
            responsive: false,
            "scrollX": true,
            dom: 'lBfrtip',
            "iDisplayLength": -1,
            "lengthMenu": [[-1], ["All"]],
            scrollY: 400,
            scroller: {
                loadingIndicator: true
            },
            "language": {
                "loadingRecords": ""
            },
            stateSave: false,
            "scrollCollapse": true,
            fnInitComplete: function () {
                var div = $('<div class="ReportHeader"></div>')
                div.append($('#ReportHeader').html());
                $(div).insertBefore($("#example_wrapper"));
                setTimeout(function () {
                    $('#cover-spin').attr('style', 'display:block;');
                    setTimeout(getBase64Image, 500);
                }, 100);
            },
            ajax: function (data, callback, settings) {
                var out = [];
        
                $.each(tblrows, function (index, row) {
                    var vals = [];
                    $.each(tblheader, function (i, r) {
                        if (r.HeaderValue.toUpperCase() == 'ID') {
                            val = index + 1;
                            vals.push(val + ' <input type="hidden" id="hdId_' + i + '" name="Id" value=' + row[r.Value] + ' />');
                        }
                        else if (r.Value != undefined && r.Value != null && r.Value != '') {
                            vals.push(row[r.HeaderValue] + ' <input type="hidden" id="hdId_' + i + '" name="Id" value=' + row[r.Value] + ' />');
                        }
                        else {
                            vals.push(row[r.HeaderValue]);
                        }
                    });
                    out.push(vals);
                });

                callback({
                    //"order": [[colIndex, colOrder]],
                    //"columnDefs": columnDefs,
                    draw: data.draw,
                    data: out,
                    recordsTotal: out.length,
                    recordsFiltered: out.length
                });
            },
            buttons: [
             {
                 extend: 'copyHtml5',
                 titleAttr: 'Copy',
                 //messageTop: message,
                 exportOptions: {
                     columns: function (idx, data, node) {
                         return table.column(idx).visible();
                     }
                 }
             },
             {
                 extend: 'csvHtml5',
                 titleAttr: 'CSV',
                 //messageTop: message,
                 exportOptions: {
                     columns: function (idx, data, node) {
                         return table.column(idx).visible();
                     }
                 }
             },
             {
                 extend: 'excelHtml5',
                 titleAttr: 'Excel',
                 //messageTop: message,
                 exportOptions: {
                     columns: function (idx, data, node) {
                         return table.column(idx).visible();
                     }
                 },
                 customize: function (xlsx) {
                     var sheet = xlsx.xl['styles.xml'];
                     var tagName = sheet.getElementsByTagName('sz');
                     for (i = 0; i < tagName.length; i++) {
                         tagName[i].setAttribute("val", fontSize)
                     }
                 }
             },

             {
                 extend: 'print',
                 titleAttr: 'Print',
                 messageTop: message,
                 //autoPrint: false,
                 exportOptions: {
                     stripHtml: false,
                     columns: function (idx, data, node) {
                         return table.column(idx).visible();
                     }
                 },
                 customize: function (win) {
                     var url = window.location.href.replace(window.location.pathname, '');
                     var title = $(win.document.head).find('title');
                     $(win.document.head).html('').append(title).append('<link href="' + url + '/Content/plugins/assets/css/print/print-bootstrap.min.css" rel="stylesheet" />').append('<link href="' + url + '/Content/plugins/assets/css/print/print-main.css" rel="stylesheet" />');

                     $(win.document.head).append('<style>table.dataTable thead .sorting:before, table.dataTable thead .sorting_asc:before, table.dataTable thead .sorting_desc:before, table.dataTable thead .sorting_asc_disabled:before, table.dataTable thead .sorting_desc_disabled:before {opacity: 0;}table.dataTable thead .sorting:after, table.dataTable thead .sorting_asc:after, table.dataTable thead .sorting_desc:after, table.dataTable thead .sorting_asc_disabled:after, table.dataTable thead .sorting_desc_disabled:after {opacity: 0;}</style>');

                     $(win.document.head).append('<script>var x = document.getElementsByTagName("img");for (var i = 0; i < x.length-1; i++) {var src=x[i].src; x[i].src = src;};</script>');
                     var div = $('<div class="ReportHeader"></div>')

                     div.append($('#ReportHeader').html());
                     $(win.document.body).prepend(div);
                     //$(win.document.body)
                     //    .prepend('<img src=' + logo + ' style="width:100%" />');

                     $(win.document.body).find('table')
                         .addClass('compact')
                         .css('font-size', 'inherit');

                     $(win.document.body).find('td')
                        .css('font-size', fontSize);

                     $(win.document.body).find('th')
                       .css('font-size', fontSize);
                     var setFilterSize = Number(fontSize) + 3;

                     $(win.document.body).find('div').css('font-size', setFilterSize);
                     $(win.document.body).find('div').addClass('filter-toggle');

                     var tbl = $('.dataTables_scrollHeadInner').find('table');
                     var thead = $(tbl).find('thead');
                     $(win.document.body).find('thead').html($(thead).html());
                 }
             }
            ],
            select: true
        });
    }

    var iframeBoxHeight = $(".autoheightset").height();
    var iframeBoxWidth = $(".autoheightset").width();


    var TabAddHeight = $("#TabAddHeight").attr("TabAddHeight");
    var AddHeight = isNaN(TabAddHeight) ? 0 : parseInt(TabAddHeight);

    if (iframeBoxWidth > 640) {
        var DataTablesHeight = iframeBoxHeight - (255 + AddHeight);  //228
        $("#example_wrapper .dataTables_scroll").find(".dataTables_scrollBody").css("max-height", DataTablesHeight);
        $('.dataTables_length').addClass('bs-select');
    }
    else if ((iframeBoxWidth <= 640) && (iframeBoxWidth > 480)) {
        var DataTablesHeight = iframeBoxHeight - (290 + AddHeight);  //228
        $("#example_wrapper .dataTables_scroll").find(".dataTables_scrollBody").css("max-height", DataTablesHeight);
        $('.dataTables_length').addClass('bs-select');
    }
    else if ((iframeBoxWidth <= 480) && (iframeBoxWidth >= 412)) {
        var DataTablesHeight = iframeBoxHeight - (335 + AddHeight);  //228
        $("#example_wrapper .dataTables_scroll").find(".dataTables_scrollBody").css("max-height", DataTablesHeight);
        $('.dataTables_length').addClass('bs-select');
    }
    else {
        var DataTablesHeight = iframeBoxHeight - 330;  //228
        $("#example_wrapper .dataTables_scroll").find(".dataTables_scrollBody").css("max-height", DataTablesHeight);
        $('.dataTables_length').addClass('bs-select');
    }



    if ($('#example thead th').length <= 1) {
        $('#example thead').attr("style", "display: none;");
        $('#example tfoot').attr("style", "display: none;");
    }
    //Apply the search
    table.columns().every(function () {
        var that = this;

        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                  .search(this.value)
                  .draw();
            }
        });
    });

    $('input.toggle-vis').on('change', function (e) {

        e.preventDefault();

        //Get the column API object
        var column = table.column($(this).attr('data-column'));

        //Toggle the visibility
        column.visible(!column.visible());
    });

    $('#example thead').on('click', 'th', function (e) {

        e.preventDefault();

        colIndex = $(this).index();

        if (colOrder == "desc") {
            colOrder = "asc"
        }
        else {
            colOrder = "desc"
        }
    });

    //$('#example tbody').on('click', 'td', function (e) {
    //    e.preventDefault();
    //    var tfootinput = $('#example tfoot tr th input');
    //    tfootinput[$(this).index()].focus();
    //});
    //$("#example").colResizable({
    //    liveDrag: true,
    //    gripInnerHtml: "<div class='grip'></div>",
    //    draggingClass: "dragging",
    //    resizeMode: 'fit'
    //});

    $('#example').DataTable().columns.adjust().draw();
    angular.element(document).scope().hideLoader();
    $(".section-toggle").slideToggle('slow');
    $(".filter-toggle").css("display", "block");

    $('.refresh-container').fadeOut(2000);
}


//------Start JS for Search DropDownList && Widget--------------//
function a() {
    $(".chzn-select").select2(), $("#destination").mask("99999"), $("#credit").mask("9999-9999-9999-9999"), $("#expiration-date").datetimepicker({
        format: !1
    }), $(".widget").widgster()
}
//------End JS for Search DropDownList && Widget--------------//
function MergeCommonRows(tableid) {
    //alert(table.find('th').length);

    var table = $(tableid);
    var firstColumnBrakes = [];
    // iterate through the columns instead of passing each column as function parameter:

    for (var i = 1; i <= table.find('th').length; i++) {
        var previous = null, cellToExtend = null, rowspan = 1;
        table.find("td:nth-child(" + i + ")").each(function (index, e) {
            var jthis = $(this), content = jthis.text();
            // check if current row "break" exist in the array. If not, then extend rowspan:
            if (previous == content && content !== "" && $.inArray(index, firstColumnBrakes) === -1) {
                // hide the row instead of remove(), so the DOM index won't "move" inside loop.
                jthis.addClass('hidden');
                cellToExtend.attr("rowspan", (rowspan = rowspan + 1));
            } else {
                // store row breaks only for the first column:
                if (i === 1) firstColumnBrakes.push(index);
                rowspan = 1;
                previous = content;
                cellToExtend = jthis;
            }
        });
    }
    // now remove hidden td's (or leave them hidden if you wish):
    $('td.hidden').remove();
}

//------Start JS for Virtual table--------------//
function loadPDataTable(tblconid, tblid, tblheader, tblrows, showColumn, imageColumn) {

    var tab = $('<table id=' + tblid + ' class="table table-striped table-bordered nowrap" style="width:100%"></table>');
    var thead = $('<thead></thead>');
    var theadrow = $('<tr></tr>');

    //var tfoot = $('<tfoot></tfoot>');
    //var tfootrow = $('<tr></tr>');

    var l = tblheader.length;
    for (var i = 0; i < l; i++) {
        var val = tblheader[i]
        var flag = true;
        if (showColumn != null)
        { flag = jQuery.inArray(i, showColumn) == -1 ? false : true; }
        if (flag) {
            if ($('#anchor label').text() != '') {
                if ($('#anchor label').text().indexOf(val.Header) == -1) {
                    $("#anchor").append('<input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="lbl-padding-25">' + val.Header + '</label>');
                }
            }
            else {
                $("#anchor").append('<input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="lbl-padding-25">' + val.Header + '</label>');
            }

        }
        else {
            if ($('#anchor label').text().indexOf(val.Header) == -1) {
                $("#anchor").append('<input type="checkbox" class="toggle-vis" data-column=' + i + '><label class="lbl-padding-25">' + val.Header + '</label>');
            }
        }
        // Append header here
        theadrow.append('<th>' + val.Header + '</th>');
        // Append footerrow here
        //tfootrow.append('<th><input type="text" class="form-control form-control-sm" style="width:' + val.Width + '" placeholder="' + val.Header + '" /></th>');
    }

    thead.append(theadrow);
    tab.append(thead);

    var p = tblrows.length;
    for (var i = 0; i < p; i++) {
        var val = tblrows[i]
        var trow = $('<tr></tr>');
        for (var key in val) {
            if (key == "Id" || key == "#") {
                trow.append('<td>' + (i + 1) + '<input type="hidden" id="hdId_' + i + '" name="Id" value=' + val[key] + ' /></td>');
            }
            else {
                if (imageColumn != null) {
                    var showImage = jQuery.inArray(key, imageColumn) == -1 ? false : true;

                    if (showImage) {
                        trow.append('<td><img src="../' + (val[key] == null ? '../content/photos/default-user.png' : val[key]) + '" width="50px" height="50px"></td>');
                    }
                    else {
                        trow.append('<td>' + val[key] + '</td>');
                    }
                }
                else {
                    trow.append('<td>' + val[key] + '</td>');
                }
            }
        };
        tab.append(trow);
    };

    //tfoot.append(tfootrow);
    //tab.append(tfoot);
    $("#" + tblconid).html(tab);


    var hideColumn = [];
    var m = $('#anchor input[type="checkbox"]');
    for (var i = 0; i < m.length; i++) {

        if (!$(m[i]).prop('checked')) {
            hideColumn.push(i);
        }
    }

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.append("datatable('" + hideColumn + "')");
    $("#" + tblconid).append(script);


    angular.element(document).scope().hideLoader();
};
function loadPSDataTable(tblid, tblrows, showColumn, imageColumn) {
    var p = tblrows.length;
    for (var i = 0; i < p; i++) {
        var val = tblrows[i]
        var trow = $('<tr></tr>');
        for (var key in val) {
            if (key == "Id" || key == "#") {
                trow.append('<td>' + (i + 1) + '<input type="hidden" id="hdId_' + i + '" name="Id" value=' + val[key] + ' /></td>');
            }
            else {
                if (imageColumn != null) {
                    var showImage = jQuery.inArray(key, imageColumn) == -1 ? false : true;

                    if (showImage) {
                        trow.append('<td><img src="../' + (val[key] == null ? '../content/photos/default-user.png' : val[key]) + '" width="50px" height="50px"></td>');
                    }
                    else {
                        trow.append('<td>' + val[key] + '</td>');
                    }
                }
                else {
                    trow.append('<td>' + val[key] + '</td>');
                }
            }
        };
        $("#" + tblid + " tbody").append(trow);
    };

    angular.element(document).scope().hideLoader();
};
function loadVirtualDataTablesUsingPreDefinedColumnOnPage(tblheader, data, displayid, tableid) {
    if (tableid == null) {
        tableid = 'vitual';
    }
    var tab = $('<table id=' + tableid + ' class="table compact table-hover table-striped table-bordered nowrap" ></table>');
    var thead = $('<thead></thead>');
    var theadrow = $('<tr></tr>');

    //var tfoot = $('<tfoot></tfoot>');
    //var tfootrow = $('<tr></tr>');

    var l = tblheader.length;
    for (var i = 0; i < l; i++) {
        var val = tblheader[i]
        // Append header here
        theadrow.append('<th>' + val.HeaderText + '</th>');
        // Append footerrow here
        //tfootrow.append('<th><input type="text" class="form-control form-control-sm" style="width:' + val.Width + '" placeholder="' + val.HeaderText + '" /></th>');
    }

    thead.append(theadrow);

    tab.append(thead);
    var tbody = $('<tbody></tbody>');
    $.each(data, function (i, obj) {
        var trow = $('<tr></tr>');
        $.each(tblheader, function (j, val) {
            var key = val.HeaderValue;
            var value = obj[key];
            if (value == 'undefined' || value == null) { value = "" }
            if (key == "Id" || key == "#") {
                trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (i + 1) + '<input type="hidden" id="hdId_' + i + '" name="Id" value=' + obj[val.Value] + ' /></td>');
            }
            else {
                if (val.ImageColumn == "Yes") {
                    trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="50px" height="50px"></td>');
                }
                else {
                    trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : Replace(value)) + '</td>');
                }
            }
        });
        tbody.append(trow);
    });
    tab.append(tbody);

    //tfoot.append(tfootrow);
    //tab.append(tfoot);
    if (displayid == null)
        $("#VUpdatePanel").html(tab);
    else
        $(displayid).html(tab);

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.append("BasicDatatable('" + tableid + "')");

    if (displayid == null)
        $("#VUpdatePanel").append(script);
    else
        $(displayid).append(script);

    angular.element(document).scope().hideLoader();
};
//------End JS for Virtual table--------------//
function loadVirtualDataTablesUsingPreDefinedColumnOnPage(tblheader, data, displayid, tableid) {
    if (tableid == null) {
        tableid = 'vitual';
    }
    var tab = $('<table id=' + tableid + ' class="table compact table-hover table-striped table-bordered nowrap" ></table>');
    var thead = $('<thead></thead>');
    var theadrow = $('<tr></tr>');

    //var tfoot = $('<tfoot></tfoot>');
    //var tfootrow = $('<tr></tr>');

    var l = tblheader.length;
    for (var i = 0; i < l; i++) {
        var val = tblheader[i]
        // Append header here
        theadrow.append('<th>' + val.HeaderText + '</th>');
        // Append footerrow here
        //tfootrow.append('<th><input type="text" class="form-control form-control-sm" style="width:' + val.Width + '" placeholder="' + val.HeaderText + '" /></th>');
    }

    thead.append(theadrow);

    tab.append(thead);
    var tbody = $('<tbody></tbody>');
    $.each(data, function (i, obj) {
        var trow = $('<tr></tr>');
        $.each(tblheader, function (j, val) {
            var key = val.HeaderValue;
            var value = obj[key];
            if (value == 'undefined' || value == null) { value = "" }
            if (key == "Id" || key == "#") {
                trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (i + 1) + '<input type="hidden" id="hdId_' + i + '" name="Id" value=' + obj[val.Value] + ' /></td>');
            }
            else {
                if (val.ImageColumn == "Yes") {
                    trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="50px" height="50px"></td>');
                }
                else {
                    trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : Replace(value)) + '</td>');
                }
            }
        });
        tbody.append(trow);
    });
    tab.append(tbody);

    //tfoot.append(tfootrow);
    //tab.append(tfoot);
    if (displayid == null)
        $("#VUpdatePanel").html(tab);
    else
        $(displayid).html(tab);

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.append("BasicDatatable('" + tableid + "')");

    if (displayid == null)
        $("#VUpdatePanel").append(script);
    else
        $(displayid).append(script);

    angular.element(document).scope().hideLoader();
};


function loadDataUsingPreDefinedColumnForMulitpleTable(headerColumn, tblid, data, displayOrder) {

    if (displayOrder != null && displayOrder != '') {
        colOrder = displayOrder;
    }
    loadDataTablesUsingPreDefinedColumnForMulitpleTable(headerColumn, tblid, data);
};
var addfunfoot = 0;
var addGransFooterRow = 0;
var closingRow = 'closingRow';
var tablelayout = 'fixed';
var tblClass = '';
var createFooter = true;

function loadDataTablesUsingPreDefinedColumnForMulitpleTable(tblheader, tblid, data) {
    if (JSON.stringify(data).length > 2) {

        var tab = $('<table id="' + tblid + '" class="table compact table-hover table-striped table-bordered nowrap closingRow" ></table>');
        var thead = $('<thead></thead>');
        var theadrow = $('<tr></tr>');

        var tfoot = $('<tfoot></tfoot>');
        var tfootrow = $('<tr></tr>');

        var l = tblheader.length;
        for (var i = 0; i < l; i++) {
            var val = tblheader[i]
            var headertext = "Sr.No.";
            if (val.HeaderText != "Id") {
                headertext = val.HeaderText;
            }
            if (val.CssClass == 'undefined' || val.CssClass == null)
                theadrow.append('<th>' + headertext + '</th>');
            else
                theadrow.append('<th class=' + val.CssClass + '>' + headertext + '</th>');
            tfootrow.append('<th><input type="text" class="form-control form-control-sm" style="width:' + val.Width + '" placeholder="' + headertext + '" /></th>');
        }

        thead.append(theadrow);

        tab.append(thead);
        var tbody = $('<tbody></tbody>');
        var sumList = [];

        $.each(data, function (i, obj) {
            var trow = $('<tr></tr>');
            $.each(tblheader, function (j, val) {
                var key = val.HeaderValue;
                var value = obj[key];
                value = (val.NumberType == 'undefined' || val.NumberType == null) ? value : ConvertToDecimalDynamicPoint(value, val.NumberType);
                if (value == 'undefined' || value == null) { value = "" }
                if (key == "Id" || key == "#") {
                    if (obj[val.Value] == 'undefined' || obj[val.Value] == null)
                        trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (i + 1) + '</td>');
                    else
                        trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (i + 1) + '<input type="hidden" id="hdId_' + i + '" name="Id" value=' + obj[val.Value] + ' /></td>');
                }
                else {
                    if (val.ImageColumn == "Yes") {
                        if (val.CssClass == 'undefined' || val.CssClass == null)
                            trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="50px" height="50px"></td>');
                        else
                            trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="50px" height="50px"></td>');

                    }
                    else if (val.tooltip == "Yes") {
                        if (obj[val.Value] == 'undefined' || obj[val.Value] == null) {
                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                trow.append('<td  ondblclick="angular.element(this).scope().dbClick();"><span class="spnDetails">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</span><span class="spnTooltip">' + obj[val.tooltipvalue] + '</span></td>');
                            else
                                trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><span class="spnDetails">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</span><span class="spnTooltip">' + obj[val.tooltipvalue] + '</span></td>');
                        }
                        else {
                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><span class="spnDetails">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</span><input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /><span class="spnTooltip">' + obj[val.tooltipvalue] + '</span></td>');
                            else
                                trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><span class="spnDetails">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</span><input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /><span class="spnTooltip">' + obj[val.tooltipvalue] + '</span></td>');
                        }
                    }
                    else if (val.IdDateType == "Yes") {
                        if (obj[val.Value] == 'undefined' || obj[val.Value] == null) {
                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                trow.append('<td  ondblclick="angular.element(this).scope().dbClick();"><span style="Display:none;">' + Number(moment(value).format('YYYYMMDD')) + '</span>' + value + '</td>');
                            else
                                trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><span style="Display:none;">' + Number(moment(value).format('YYYYMMDD')) + '</span>' + value + '</td>');
                        }
                        else {

                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><span style="Display:none;">' + Number(moment(value).format('YYYYMMDD')) + '</span><input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /></td>');
                            else
                                trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><span style="Display:none;">' + Number(moment(value).format('YYYYMMDD')) + '</span>' + value + '<input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /></td>');
                        }
                    }
                    else {

                        if (obj[val.Value] == 'undefined' || obj[val.Value] == null) {
                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                trow.append('<td  ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</td>');
                            else
                                trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</td>');
                        }
                        else {

                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '<input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /></td>');
                            else
                                trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '<input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /></td>');
                        }

                    }
                }
                if (sumList[j] == "" || sumList[j] == 'undefined' || sumList[j] == null)
                    sumList[j] = 0;
                if (val.Fun == 'undefined' || val.Fun == null) {
                    if (val.FooterText == 'undefined' || val.FooterText == null) {
                        sumList[j] = "";
                    }
                    else {
                        sumList[j] = val.FooterText;
                    }
                }
                else {
                    addfunfoot = 1;
                    sumList[j] = Number(sumList[j]) + (isNaN(value) ? 0 : Number(value));
                }
            });

            tbody.append(trow);
        });

        tab.append(tbody);

        if (addfunfoot == 1) {
            var ftrow = $('<tr class="print"></tr>');
            $.each(sumList, function (index, value) {
                var footval = (value == '0' ? '-' : ((isNaN(value) || value == "") ? value : Number(value).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2 })));

                ftrow.append('<th class="text-right">' + footval + '</th>');
            });
            //tfoot.append(tfootrow);
            tfoot.addClass("print")
            tfoot.append(ftrow);

            tab.append(tfoot);
        }
        else {
            tfoot.append(tfootrow);
            tab.append(tfoot);
        }



        $("#UpdatePanel").append(tab);

        var hideColumn = [];
        var m = $('#anchor input[type="checkbox"]');
        for (var i = 0; i < m.length; i++) {
            if (!$(m[i]).prop('checked')) {
                hideColumn.push(i);
            }
        }


        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.append("BasicDatatableMultipleTable('" + tblid + "')");

        $("#UpdatePanel").append(script);

    }
    else {
        var tab = $('<table id="example" class="table compact table-hover table-striped table-bordered nowrap" ></table>');
        var thead = $('<thead></thead>');
        var theadrow = $('<tr></tr>');

        var l = tblheader.length;
        for (var i = 0; i < l; i++) {
            var val = tblheader[i]
            var headertext = "Sr.No.";
            if (val.HeaderText != "Id") {
                headertext = val.HeaderText;
            }
            if (val.ShowColumn == "Yes") {
                if ($('#anchor label').text() != '') {
                    if ($('#anchor label').text().indexOf(headertext) == -1) {
                        $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="">' + headertext + '</label> </div>');
                    }
                }
                else {
                    $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="">' + headertext + '</label></div>');
                }

            }
            else {
                if ($('#anchor label').text().indexOf(headertext) == -1) {
                    $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + '><label class="">' + headertext + '</label></div>');
                }
            }
            if (val.CssClass == 'undefined' || val.CssClass == null)
                // Append header here
                theadrow.append('<th>' + headertext + '</th>');
            else
                theadrow.append('<th class=' + val.CssClass + '>' + headertext + '</th>');
        }

        thead.append(theadrow);

        tab.append(thead);


        var tbody = $('<tbody></tbody>');

        var trow = $('<tr></tr>');
        trow.append("<th colspan=" + tblheader.length + " style='text-align: center;'>No Record Found!</th>");
        tbody.append(trow);

        tab.append(tbody);
        $("#UpdatePanel").append(tab);

    }

    angular.element(document).scope().hideLoader();
};




function BasicDatatableMultipleTable(tableid) {
    

    if (tableid == null) {
        tableid = "example";
    }
    var message = "";
    var seprator = "";
    var filter = "<span class='filter' ></span> ";
    var j = 0;
    if (messagevalues.length > 0)
        $.each(messagevalues, function (i, values) {
            $.each(values, function (key, val) {
                j = j + 1;
                if (val != null && val != "") {
                    if (j == 3) {
                        message = message + "</br>"
                        j = 0;
                    }
                    else {
                        message = message + seprator + filter;
                    }
                    message = message + "<span class='filter-title-name' >" + key + "</span> : <span class='filter-title'>" + val + "</span>"

                    filter = " ";
                };
            });
        });
    if (message.length > 0) {
        message = '' + message + '';
    }
    $('#' + tableid).append('<caption style="caption-side: center"><div>' + message + '</div></caption>');

}

function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}
function ValidDate(date) {
    var m = moment(date, 'YYYY-MMM-DD');
    return m.isValid();

};
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function fnExcelReport() {
    var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';

    tab_text = tab_text + '<x:Name>' + $('.txt-dark').text() + '</x:Name>';

    tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';

    tab_text = tab_text + "<table border='1px'>";
    //tab_text = tab_text + "<thead>";
    //tab_text = tab_text + "<tr>";
    //tab_text = tab_text + "<th>";
    //tab_text = tab_text + $('#ExportDiv-Head').html();
    //tab_text = tab_text + "</th>";
    //tab_text = tab_text + "</tr>";
    //tab_text = tab_text + "</thead>";
    tab_text = tab_text + "<tbody>";
    tab_text = tab_text + "<tr>";
    tab_text = tab_text + "<td>";
    tab_text = tab_text + $('#ExportDiv').html();
    tab_text = tab_text + "</td>";
    tab_text = tab_text + "</tr>";
    tab_text = tab_text + "</tbody>";
    tab_text = tab_text + '</table></body></html>';

    var data_type = 'data:application/vnd.ms-excel';

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([tab_text], {
                type: "application/csv;charset=utf-8;"
            });
            navigator.msSaveBlob(blob, $('.txt-dark').text() + '.xls');
        }
    } else {
        $('#test').attr('href', data_type + ', ' + encodeURIComponent(tab_text));
        $('#test').attr('download', $('.txt-dark').text() + '.xls');
    }

}




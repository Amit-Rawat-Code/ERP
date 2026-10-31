app.EmployeeAttendanceDateWiseController = function ($scope, $element, $filter, myService) {
    //var userid = sessionStorage.getItem("userid");
    //$scope.$on('CustomFunction', function ()
    //{
    //    var message = '';
    //    var table = $("#tblEmployeeAttendanceList").DataTable({
    //        "searching": false,
    //        colReorder: false,
    //        dom: 'lBfrtip',
    //        fnInitComplete: function () {
    //            var div = $('<div class="ReportHeader"></div>')
    //            div.append($('#ReportHeader').html());
    //            $(div).insertBefore($("#example_wrapper"));
    //            setTimeout(function () { $('#cover-spin').attr('style', 'display:block;'); setTimeout(getBase64Image, 500); }, 100);
    //        },
            
    //        buttons: [
    //            {
    //                extend: 'copyHtml5',
    //                titleAttr: 'Copy',
    //                //messageTop: message,
    //                exportOptions: {
    //                    columns: function (idx, data, node) {
    //                        return table.column(idx).visible();
    //                    }
    //                }
    //            },
    //            {
    //                extend: 'csvHtml5',
    //                titleAttr: 'CSV',
    //                //messageTop: message,
    //                exportOptions: {
    //                    columns: function (idx, data, node) {
    //                        return table.column(idx).visible();
    //                    }
    //                }
    //            },
    //            {
    //                extend: 'excelHtml5',
    //                titleAttr: 'Excel',
    //                //messageTop: message,
    //                exportOptions: {
    //                    columns: function (idx, data, node) {
    //                        return table.column(idx).visible();
    //                    }
    //                },
    //                customize: function (xlsx) {
    //                    var sheet = xlsx.xl['styles.xml'];
    //                    var tagName = sheet.getElementsByTagName('sz');
    //                    for (i = 0; i < tagName.length; i++) {
    //                        tagName[i].setAttribute("val", fontSize)
    //                    }
    //                }
    //            },
    //            {
    //                extend: 'print',
    //                titleAttr: 'Print',
    //                messageTop: message,
    //                //autoPrint: false,
    //                footer: addfunfoot == 1 ? true : false,
    //                exportOptions: {
    //                    stripHtml: false,
    //                    columns: function (idx, data, node) {
    //                        return table.column(idx).visible();
    //                    }
    //                },
    //                customize: function (win) {
    //                    var url = window.location.href.replace(window.location.pathname, '');
    //                    var title = $(win.document.head).find('title');
    //                    $(win.document.head).html('').append(title).append('<link href="' + url + '/Content/plugins/assets/css/print/print-bootstrap.min.css" rel="stylesheet" />').append('<link href="' + url + '/Content/plugins/assets/css/print/print-main.css" rel="stylesheet" />');

    //                    $(win.document.head).append('<style>table.dataTable thead .sorting:before, table.dataTable thead .sorting_asc:before, table.dataTable thead .sorting_desc:before, table.dataTable thead .sorting_asc_disabled:before, table.dataTable thead .sorting_desc_disabled:before {opacity: 0;}table.dataTable thead .sorting:after, table.dataTable thead .sorting_asc:after, table.dataTable thead .sorting_desc:after, table.dataTable thead .sorting_asc_disabled:after, table.dataTable thead .sorting_desc_disabled:after {opacity: 0;}</style>');

    //                    $(win.document.head).append('<script>var x = document.getElementsByTagName("img");for (var i = 0; i < x.length-1; i++) {var src=x[i].src; x[i].src = src;};</script>');
    //                    var div = $('<div class="ReportHeader"></div>')

    //                    div.append($('#ReportHeader').html());
    //                    $(win.document.body).prepend(div);
    //                    //$(win.document.body)
    //                    //    .prepend('<img src=' + logo + ' style="width:100%" />');

    //                    $(win.document.body).find('table')
    //                        .addClass('compact')
    //                        .css('font-size', 'inherit');

    //                    $(win.document.body).find('table tbody td')
    //                        .css('font-size', fontSize);

    //                    $(win.document.body).find('table thead th')
    //                        .css('font-size', fontSize);

    //                    var setFilterSize = Number(fontSize) + 3;

    //                    $(win.document.body).find('div').css('font-size', setFilterSize);
    //                    $(win.document.body).find('div').addClass('filter-toggle');

    //                    var tbl = $('.dataTables_scrollHeadInner').find('table');
    //                    var thead = $(tbl).find('thead');
    //                    $(win.document.body).find('thead').html($(thead).html());

    //                    var tbl1 = $('.dataTables_scrollBody').find('table');
    //                    var tbody = $(tbl1).find('tbody');
    //                    $(win.document.body).find('table.dataTable tbody').html($(tbody).html());

    //                    var tbl2 = $('.dataTables_scrollFootInner').find('table');
    //                    var tfoot = $(tbl2).find('tfoot');
    //                    $(win.document.body).find('table.dataTable tfoot').html($(tfoot).html());

    //                }
    //            }
    //        ],
    //    });
    //});

    $scope.C = null;
    $scope.$watch('disableSearch', function () {
        if (typeof ($scope.disableSearch) === 'undefined') return;
        $scope.disableSearch = true;
        $scope.AttendanceDate = new Date();
        //$scope.Save = "Update";
    });

    $scope.flagSearch = 0;

    $scope.CheckALL = function () {
        $.each($scope.EmployeeAttendanceLists, function (index, obj) {
            obj.Chk = $scope.ChkAll;
        });
    }

    $scope.EmpStatus = null;

    $scope.InsertedAttendance = function () {
        $scope.EmployeeInsertedAttendance();
    }

    $scope.SaveRecord = function ()
    {
        if (isValidate())
        {
            setTimeout(function ()
            {
                $scope.DupList = $scope.EmployeeAttendanceLists;
                angular.forEach($scope.DupList, function (obj)
                {

                    if (obj.LogIn != undefined & 'Invalid date' != moment(obj.LogIn).format('HH:mm'))
                    {
                        obj.LogIn = moment(obj.LogIn).format('HH:mm');
                    }
                    if (obj.LogOut != undefined & 'Invalid date' != moment(obj.LogOut).format('HH:mm'))
                    {
                        obj.LogOut = moment(obj.LogOut).format('HH:mm');
                    }
                })
                debugger
                var collectionobj = {};
                collectionobj.AttendanceDate = moment($scope.AttendanceDate).format('YYYY-MMM-DD')
                collectionobj.SessionId = sessionId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.Action = 1;
                collectionobj.FYId = fyId;
                collectionobj.CreatedBy = userid;
                collectionobj.IsAttendanceLock = false;
                collectionobj.EmployeeAttendanceLists = JSON.stringify($filter('filter')($scope.DupList, { 'Chk': true }, true));
                var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/InsertEditEmployeeAttendanceDateWise", collectionobj);
                getData.then(function (response)
                {
                    if (showMsgBox(response.data))
                    {
                        $scope.ClearControl(1);
                        $scope.flagSearch = 0;
                    }
                });
            }, 500);
        }

    };
    $scope.UpdateAndLockRecord = function () {
        if (isValidate()) {
            setTimeout(function () {
                $scope.DupList = $scope.EmployeeAttendanceLists;
                angular.forEach($scope.DupList, function (obj) {

                    if (obj.LogIn != undefined & 'Invalid date' != moment(obj.LogIn).format('HH:mm')) {
                        obj.LogIn = moment(obj.LogIn).format('HH:mm');
                    }
                    if (obj.LogOut != undefined & 'Invalid date' != moment(obj.LogOut).format('HH:mm')) {
                        obj.LogOut = moment(obj.LogOut).format('HH:mm');
                    }
                })
                debugger
                var collectionobj = {};
                collectionobj.AttendanceDate = moment($scope.AttendanceDate).format('YYYY-MMM-DD')
                collectionobj.SessionId = sessionId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.Action = 1;
                collectionobj.FYId = fyId;
                collectionobj.CreatedBy = userid;
                collectionobj.IsAttendanceLock = true;
                collectionobj.EmployeeAttendanceLists = JSON.stringify($filter('filter')($scope.DupList, { 'Chk': true }, true));
                var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/InsertEditEmployeeAttendanceDateWise", collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                        $scope.flagSearch = 0;
                    }
                });
            }, 500);
        }
    };

    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.ResetControl = function (flag) {

        $scope.Save = "Update";
        $scope.disablePrint = true;
        $scope.EmployeeAttendanceLists = "";
        $scope.flagSearch = 0;
        if (flag == 0) {
            $scope.AttendanceDate = new Date();
            showMsgBox('4');
        };
        $scope.EmployeeAttendanceList($scope.AttendanceDate);
        $scope.InsertedAttendance();
        $scope.disableSearch = true;
    };

    $scope.ddl_DepartmentChange = function () {
        $scope.EmployeeAttendanceList($scope.AttendanceDate);
    }

    $scope.EmployeeAttendanceList = function (attendancedate) {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj["Action"] = 5;
        collectionobj["VDate"] = moment(attendancedate).format('YYYY-MMM-DD');
        collectionobj["DepartmentCode"] = $scope.DepartmentCode;
        collectionobj["RelationshipId"] = relationshipId;
        collectionobj["SessionId"] = sessionId;
        collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Api/AttendanceTransactionApi/EmployeeAttendanceDateWiseList', collectionobj);
        getData.then(function (response)
        {
            $scope.EmployeeAttendanceLists = response.data;
            
            $.each($scope.EmployeeAttendanceLists, function (i, val) {
                $scope.ChkAll = true;
                val.Chk = true;

                if (val.IsOnDuty == true) {
                    val.ChkIsOnDuty = true;
                }
                if (val.AttendanceDate != null) {
                    $scope.flagSearch = 1;
                    return;
                }
                else {
                    $scope.flagSearch = 0;
                }
            });
            $scope.hideLoader();
        });
    };
    $scope.timeobject = function (t) {
        a = t.replace('AM', '').replace('PM', '').split(':');
        h = parseInt(a[0]);
        m = parseInt(a[1]);
        ampm = (t.indexOf('AM') !== -1) ? 'AM' : 'PM';
        return { hour: h, minute: m, ampm: ampm };
    }
    function inRange(x, min, max)
    {
        return ((x - min) * (x - max) <= 0);
    }
    $scope.timediff = function (s, e) {
        s = $scope.timeobject(s);
        e = $scope.timeobject(e);
        e.hour = (e.ampm === 'PM' && s.ampm !== 'PM' && e.hour < 12) ? e.hour + 12 : e.hour;
        hourDiff = Math.abs(e.hour - s.hour);
        minuteDiff = e.minute - s.minute;

        if (minuteDiff < 0)
        {
            minuteDiff = Math.abs(60 + minuteDiff);
            hourDiff = hourDiff - 1;            
        }
        debugger
        if (inRange(hourDiff, 1, 9))
        {
            return '0'+hourDiff + ':' + Math.abs(minuteDiff);
        }
        else
        {
            return hourDiff + ':' + Math.abs(minuteDiff);
        }

       

    }
    $scope.EmployeeAttendanceListBioMetric = function (attendancedate) {
        var collectionobj = {};
        collectionobj["Action"] = 22;
        collectionobj["VDate"] = moment(attendancedate).format('YYYY-MMM-DD');
        collectionobj["DepartmentCode"] = $scope.DepartmentCode;
        collectionobj["RelationshipId"] = relationshipId;
        collectionobj["SessionId"] = sessionId;
        collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Api/AttendanceTransactionApi/EmployeeAttendanceDateWiseList', collectionobj);
        getData.then(function (response)
        {
            
            $scope.EmployeeAttendanceListsBioMetric = response.data;
            $.each($scope.EmployeeAttendanceListsBioMetric, function (i, val)
            {
                $.each($scope.EmployeeAttendanceLists, function (i1, val1)
                {
                    
                    if (val1.EmployeeCode == val.EmployeeCode)
                    {
                        
                        if ((val.LogOutDate != null) && (val.LogInDate != null))
                        {
                            var LID = val.LogInDate.substring(10, 19);
                            var LOD = val.LogOutDate.substring(10, 19);
                            debugger
                            if ((($scope.timediff(LID, LOD)) > '01:00') && (($scope.timediff(LID, LOD)) < '04:00'))
                            {
                                val1.AbbreviationCode = ($filter('filter')($scope.AbbreviationList, { Abbreviation: 'HD' }, true))[0].Code;
                                val1.LogIn = val.LogInDate != null ? new Date(val.LogInDate) : '';
                                if (val.LogOutDate != null)
                                {
                                    val1.LogOut = val.LogInDate != null ? new Date(val.LogOutDate) : '';
                                }
                            }
                            else if ((($scope.timediff(LID, LOD)) > '04:00'))
                            {
                                val1.AbbreviationCode = ($filter('filter')($scope.AbbreviationList, { Abbreviation: 'P' }, true))[0].Code;
                                val1.LogIn = val.LogInDate != null ? new Date(val.LogInDate) : '';
                                if (val.LogOutDate != null)
                                {
                                    val1.LogOut = val.LogInDate != null ? new Date(val.LogOutDate) : '';
                                }
                            }
                            else
                            {
                                val1.AbbreviationCode = ($filter('filter')($scope.AbbreviationList, { Abbreviation: 'A' }, true))[0].Code;
                                val1.LogIn = val.LogInDate != null ? new Date(val.LogInDate) : '';
                                if (val.LogOutDate != null)
                                {
                                    val1.LogOut = val.LogInDate != null ? new Date(val.LogOutDate) : '';
                                }
                            }
                        }
                        else if ((val.LogInDate != null) && (val.LogOutDate == null))
                        {
                            val1.AbbreviationCode = '20000007';
                            val1.LogIn = val.LogInDate != null ? new Date(val.LogInDate) : '';
                            val1.LogOut = '';
                        }
                        else if ((val.LogInDate == null) && (val.LogOutDate == null) && (('20000004' == val1.AbbreviationCode) || ('20000005' == val1.AbbreviationCode)))
                        {
                            //val1.AbbreviationCode = val1.AbbreviationCode;
                        }
                        else 
                        {
                            val1.AbbreviationCode = '20000002';
                            val1.LogIn = val.LogInDate != null ? new Date(val.LogInDate) : '';
                            val1.LogOut = '';
                        }
                    }
                });
            });
        });
    };

    $scope.GetStatus = function () {

        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj["RelationshipId"] = relationshipId;
        collectionobj["SessionId"] = sessionId;
        collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/EmployeeAttendanceDateWiseList", collectionobj);
        getData.then(function (response) {
            $scope.AbbreviationList = response.data;
        });
    };
    $scope.GetStatus();

    $scope.EmployeeInsertedAttendance = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj["Action"] = 7;
        collectionobj["VDate"] = moment($scope.AttendanceDate).format('YYYY-MMM-DD')
        collectionobj["RelationshipId"] = relationshipId;
        collectionobj["SessionId"] = sessionId;
        collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Api/AttendanceTransactionApi/EmployeeAttendanceDateWiseList', collectionobj);
        getData.then(function (response) {
            $scope.count = response.data;
            $scope.hideLoader();
        });
    };

    $scope.SearchbyValue = function () {
        $scope.AttendanceDate = '';
        var collectionobj = {};
        collectionobj.TransId = $('#Id').val();
        collectionobj.Action = 9;
        var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/EmployeeAttendanceDateWiseList", collectionobj);
        getData.then(function (response) {
            debugger;
            $scope.AttendanceDate = new Date(response.data[0]["AttendanceDate"]);
        });

    }
    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj["VDate"] = moment($scope.AttendanceDate).format('YYYY-MMM-DD')
        collectionobj.EmployeeAttendanceLists = JSON.stringify($scope.EmployeeAttendanceLists);
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/InsertEditEmployeeAttendanceDateWise", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };
}
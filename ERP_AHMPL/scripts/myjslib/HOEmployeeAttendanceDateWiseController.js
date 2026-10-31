app.HOEmployeeAttendanceDateWiseController = function ($scope, $element, $filter, myService)
{
    $scope.disableSearch = true;
    $scope.C = null;
    $scope.$watch('disableSearch', function () {
        if (typeof ($scope.disableSearch) === 'undefined') return;
        $scope.disableSearch = true;
        $scope.AttendanceDate = new Date();
        //$scope.Save = "Update";
    });

    $scope.flagSearch = 0;
    $scope.CheckALL = function ()
    {
        $.each($scope.HOEmployeeAttendanceLists, function (index, obj) {
            obj.Chk = $scope.ChkAll;
        });
    }

    $scope.EmpStatus = null;

    $scope.InsertedAttendance = function ()
    {
        $scope.EmployeeInsertedAttendance();
    }

    $scope.SaveRecord = function ()
    {
        if (isValidate())
        {
            setTimeout(function ()
            {
                $scope.DupList = $scope.HOEmployeeAttendanceLists;
                angular.forEach($scope.DupList, function (obj)
                {

                    if (obj.LogIn != undefined & 'Invalid date' != moment(obj.LogIn).format('HH:mm')) {
                        obj.LogIn = moment(obj.LogIn).format('HH:mm');
                    }
                    if (obj.LogOut != undefined & 'Invalid date' != moment(obj.LogOut).format('HH:mm')) {
                        obj.LogOut = moment(obj.LogOut).format('HH:mm');
                    }
                })
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
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
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
                $scope.DupList = $scope.HOEmployeeAttendanceLists;
                angular.forEach($scope.DupList, function (obj) {

                    if (obj.LogIn != undefined & 'Invalid date' != moment(obj.LogIn).format('HH:mm')) {
                        obj.LogIn = moment(obj.LogIn).format('HH:mm');
                    }
                    if (obj.LogOut != undefined & 'Invalid date' != moment(obj.LogOut).format('HH:mm')) {
                        obj.LogOut = moment(obj.LogOut).format('HH:mm');
                    }
                })
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
        $scope.HOEmployeeAttendanceLists = "";
        $scope.flagSearch = 0;
        if (flag == 0)
        {
            $scope.AttendanceDate = new Date();
            showMsgBox('4');
        };
        $scope.HOEmployeeAttendanceLists($scope.AttendanceDate);
        $scope.InsertedAttendance();
        $scope.disableSearch = true;
    };

    $scope.ddl_DepartmentChange = function ()
    {
        $scope.HOEmployeeAttendanceLists($scope.AttendanceDate);
    }

    $scope.HOEmployeeAttendanceList = function (attendancedate)
    {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj["Action"] = 23;
        collectionobj["VDate"] = moment(attendancedate).format('YYYY-MMM-DD');
        collectionobj["DepartmentCode"] = $scope.DepartmentCode;
        collectionobj["RelationshipId"] = relationshipId;
        collectionobj["SessionId"] = sessionId;
        collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Api/AttendanceTransactionApi/EmployeeAttendanceDateWiseList', collectionobj);
        getData.then(function (response)
        {
            $scope.HOEmployeeAttendanceLists = response.data;
            $.each($scope.HOEmployeeAttendanceLists, function (i, val)
            {
                $scope.ChkAll = true;
                val.Chk = true;
                if (val.AttendanceDate != null)
                {
                    $scope.flagSearch = 1;
                    return;
                }
                else
                {
                    $scope.flagSearch = 0;
                }
            });
            $scope.hideLoader();
        });
    };
    $scope.timeobject = function (t)
    {
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

    $scope.timediff = function (s, e)
    {
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
        if (inRange(hourDiff, 1, 9))
        {
            return '0' + hourDiff + ':' + Math.abs(minuteDiff);
        }
        else
        {
            return hourDiff + ':' + Math.abs(minuteDiff);
        }
    }

    $scope.HOEmployeeAttendanceListBioMetric = function (attendancedate)
    {
        var collectionobj = {};
        collectionobj["Action"] = 24;
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
                $.each($scope.HOEmployeeAttendanceLists, function (i1, val1)
                {
                    if (val1.EmployeeCode == val.EmployeeCode)
                    {
                        val1.PunchingBranchName = val.PunchingBranchName;
                        if ((val.LogOutDate != null) && (val.LogInDate != null))
                        {
                            var LID = val.LogInDate.substring(10, 19);
                            var LOD = val.LogOutDate.substring(10, 19);

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
        collectionobj.EmployeeAttendanceLists = JSON.stringify($scope.HOEmployeeAttendanceLists);
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
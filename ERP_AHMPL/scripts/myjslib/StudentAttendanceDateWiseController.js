app.StudentAttendanceDateWiseController = function ($scope, $element, $filter, myService) {
    $scope.SetDefaultRadio = function (Attendance) {
        Attendance.Mode = 'Offline';
    }
    
    $scope.SetFocus('#txtAttendanceDate');
    $scope.disableSearch = true;
    $scope.SetMaxMinDate().then(function (response) {
        $scope.AttendanceDate = response;
        $scope.$applyAsync();
    });
    //var userid = sessionStorage.getItem("userid");
    $scope.$watch('disableSearch', function () {
        if (typeof ($scope.disableSearch) === 'undefined') return;
        $scope.disableSearch = true;
        $scope.disableDelete = true;
        $scope.Save = "Update";
    });

    $scope.ddlAbbreviationCode_Change = function (Attendance) {
        if (Attendance.AbbreviationCode == undefined || Attendance.AbbreviationCode == '' || Attendance.AbbreviationCode == null)
            Attendance.Abbreviationindex = 0;
        else
            Attendance.Abbreviationindex = 1;

        if (Attendance.AbbreviationCode != undefined && Attendance.AbbreviationCode != '')
            Attendance.chk = true;
        else
            Attendance.chk = false;

        var abbr_code = ($filter('filter')($scope.AbbreviationList, { Abbreviation: 'P' }))[0].Code;

        if (Attendance.AbbreviationCode != abbr_code) {
            Attendance.Mode = '';
        }
        else {
            Attendance.Mode = 'Offline';
        }
    }
    $scope.ddlGbl_AbbreviationCode_Change = function () {

        var abbr_code = ($filter('filter')($scope.AbbreviationList, { Abbreviation: 'P' }))[0].Code;

        angular.forEach($scope.StudentAttendanceLists, function (obj) {
            if (obj.IsAttenDone == true) return;

            obj.AbbreviationCode = $scope.Gbl_AbbreviationCode;
            if (obj.AbbreviationCode != undefined && obj.AbbreviationCode != '')
                obj.chk = true;
            else
                obj.chk = false;

            //if (abbr_code == obj.AbbreviationCode) {
            //    obj.Mode = 'Offline';
            //}
            //else {
            obj.Mode = '';
            //}
        })
    }
    $scope.ddlGbl_Mode_Change = function (Attendance) {
        var abbr_code = ($filter('filter')($scope.AbbreviationList, { Abbreviation: 'P' }))[0].Code;

        angular.forEach($scope.StudentAttendanceLists, function (obj) {
            if (obj.IsAttenDone == true) return;
            if (abbr_code == obj.AbbreviationCode) {
                obj.Mode = $scope.Gbl_Mode;
            }
            else {
                obj.Mode = '';
            }
        })
    }
    $scope.ddlClass_Change = function (ClassCode)
    {
        $scope.StudentAttendanceLists = [];
        $scope.GetSections(ClassCode);
        //$scope.GetStudentsClassOrSectionWise();
    }

    $scope.BlanckDetails = function () {
        if (isValidate()) {
            $scope.StudentAttendanceLists = "";
            $scope.GetStudentsClassOrSectionWise();
        }
    }
    $scope.GetStudentsClassOrSectionWise = function () {
        var collectionobj = {};
        collectionobj.AttendanceDate = moment($scope.AttendanceDate).format('DD-MMM-YYYY');
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.ClassCode = $scope.ClassCode
        collectionobj.SectionCode = $scope.SectionCode
        //collectionobj.BranchCode = $scope.BranchCode
        //collectionobj.StreamCode = $scope.StreamCode
        collectionobj.Action = 4;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', "../api/StudentAttendanceApi/GetStudentAttendanceDateWiseList", collectionobj);
        getData.then(function (response) {
            $scope.StudentAttendanceLists = response.data;

        });

    }

    $scope.ddlSection_change = function () {
        $scope.GetStudentsClassOrSectionWise();
    }

    $scope.GetStatus = function (Attendance)
    {
        var collectionobj = {};
        collectionobj.Action = 25;
        collectionobj["RelationshipId"] = relationshipId;
        collectionobj["SessionId"] = sessionId;
        collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/EmployeeAttendanceDateWiseList", collectionobj);
        getData.then(function (response)
        {
            
            $scope.AbbreviationList = response.data;            
            Attendance.AbbreviationCode = ($filter('filter')($scope.AbbreviationList, { Abbreviation: 'P' }, true))[0].Code;
        });
    };
  

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.AttendanceDate = moment($scope.AttendanceDate).format('DD-MMM-YYYY');
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.StudentList = JSON.stringify($scope.StudentAttendanceLists);
            collectionobj.ClassCode = $scope.ClassCode;
            collectionobj.SectionCode = $scope.SectionCode > 0 ? $scope.SectionCode : null;
            //collectionobj.BranchCode = $scope.BranchCode> 0 ? $scope.BranchCode : null;
            //collectionobj.StreamCode = $scope.StreamCode > 0 ? $scope.StreamCode : null;
            collectionobj.UpdatedBy = userid;
            collectionobj.CreatedBy = userid;
            collectionobj.Action = 1;
            var getData = myService.methode('POST', "../Api/StudentAttendanceApi/InsertEditStudentAttendanceDateWise", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                    location.reload();
                }
            });

        }
    };

    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }

    }
    $scope.ResetControl = function (flag) {
        //debugger;
        $scope.Save = "Update";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.SetFocus('#txtAttendanceDate');
        $scope.$parent.ClassCode = "";
        $scope.BranchCode = "";
        $scope.$parent.SectionCode = "";
        $scope.StreamCode = "";
        $scope.StudentAttendanceLists = "";
        $scope.Gbl_AbbreviationCode = "";
        $scope.Gbl_Mode = "";
        $scope.SetMaxMinDate().then(function (response) {
            $scope.AttendanceDate = response;
            $scope.$applyAsync();
        });
        $scope.flagSearch = 0;
        if (flag == 0) {
            showMsgBox('4');
        };
        $scope.disableSearch = true;
        $scope.count = "";
    };

    //$scope.DeleteRecord = function ()
    //{
    //    var collectionobj = {};
    //         debugger;
    //    collectionobj.Action = 3;
    //    collectionobj.TransId = $('#Id').val();
    //    collectionobj.VoucherNo = $('#VoucherNo').val();
    //    collectionobj.SessionId = sessionId;
    //    collectionobj.SchoolCode = schoolCode;
    //    collectionobj.BranchCode = branchCode;
    //    collectionobj.FYId = fyId;
    //    var getData = myService.methode('POST', "../Attendance/InsertEditStudentAttendanceDateWise", collectionobj);
    //    getData.then(function (response) {
    //        if (showMsgBox(response.data)) {
    //            $scope.ClearControl();
    //        }
    //    });
    //}




};

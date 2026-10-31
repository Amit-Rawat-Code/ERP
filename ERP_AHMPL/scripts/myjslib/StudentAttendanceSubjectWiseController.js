app.StudentAttendanceSubjectWiseController = function ($scope, $element, $filter, myService) {
    $scope.SetDefaultRadio = function (Attendance) {
        Attendance.Mode = 'Offline';
    }
    $scope.SetMaxMinDate().then(function (response) {
        $scope.AttendanceDate = response;
        $scope.$applyAsync();
    });
    $scope.SetFocus('#txtAttendanceDate');
    $scope.disableSearch = true;

    $scope.PeriodsList = [];
    $scope.GetClassWisePeriods = function () {
        debugger
        var collectionobj = {};
        collectionobj.Action = 1;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetClassWisePeriods', collectionobj);
        getData.then(function (response) {
            debugger
            $scope.PeriodsList = response.data;
        });
    };
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
    //var userid = sessionStorage.getItem("userid");
    $scope.$watch('disableSearch', function () {
        if (typeof ($scope.disableSearch) === 'undefined') return;
        $scope.disableSearch = true;
        $scope.disableDelete = true;
        $scope.Save = "Update";
    });

    $scope.ddlClass_Change = function (ClassCode) {
        $scope.GetClassWisePeriods();
        $scope.GetSectionsUsingLoginId(ClassCode);
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
        collectionobj.Subject = $scope.SubjectCode
        collectionobj.Action = 4;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', "../api/StudentAttendanceApi/GetStudentAttendanceSubjectWiseList", collectionobj);
        getData.then(function (response) {
            $scope.StudentAttendanceLists = response.data;
            var att_len = ($filter('filter')($scope.StudentAttendanceLists, { IsAttenDone: true })).length;
            var std_len = $scope.StudentAttendanceLists.length;
            if (att_len == std_len) {
                $scope.disableAdd = true;
                $scope.disablePeriod = true;
            }
            else {
                $scope.disableAdd = false;
                $scope.disablePeriod = false;
            }
        });

    }

    $scope.ddlSection_change = function () {
        $scope.GetSubjectListUsingLoginId();

    }

    $scope.ddlSubject_Change = function () {
        $scope.GetStudentsClassOrSectionWise();
    }

    $scope.GetStatus = function (Attendance) {
        var collectionobj = {};
        collectionobj.Action = 25;
        collectionobj["RelationshipId"] = relationshipId;
        collectionobj["SessionId"] = sessionId;
        collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/EmployeeAttendanceDateWiseList", collectionobj);
        getData.then(function (response) {
            $scope.AbbreviationList = response.data;
        });
    };

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var att_len = $filter('filter')($scope.StudentAttendanceLists, { chk: true, IsAttenDone: false });
            if (att_len == 0) {
                showMsgBox('Mark Attandance, at least one student for the day.')
                return;
            }
            var collectionobj = {};
            collectionobj.AttendanceDate = $scope.AttendanceDate;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.StudentList = JSON.stringify($filter('filter')($scope.StudentAttendanceLists, { chk: true, IsAttenDone: false }));
            collectionobj.ClassCode = $scope.ClassCode;
            collectionobj.SectionCode = $scope.SectionCode;
            collectionobj.PeriodCode = $scope.PeriodCode
            collectionobj.Subject = $scope.SubjectCode;
            collectionobj.UpdatedBy = userid;
            collectionobj.CreatedBy = userid;
            collectionobj.Action = 1;
            var getData = myService.methode('POST', "../Api/StudentAttendanceApi/InsertEditStudentAttendanceSubjectWise", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
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
        $scope.PeriodCode = "";
        $scope.$parent.SectionCode = "";
        $scope.SubjectList = [];
        $scope.StudentAttendanceLists = "";
        $scope.SetMaxMinDate().then(function (response) {
            $scope.AttendanceDate = response;
            $scope.$applyAsync();
        });
        $scope.flagSearch = 0;
        $scope.Gbl_AbbreviationCode = "";
        $scope.Gbl_Mode = "";
        if (flag == 0) {
            showMsgBox('4');
        };
        $scope.disableSearch = true;
        $scope.count = "";
    };

}

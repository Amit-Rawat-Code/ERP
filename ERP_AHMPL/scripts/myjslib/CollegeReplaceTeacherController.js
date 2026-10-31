app.CollegeReplaceTeacherController = function ($scope, $element, $filter, myService) {
    //debugger
    $scope.SetFocus('#FromDate');

    $scope.btn_SearchClick = function () {
        $scope.ReplaceToEmployeeTeacherList = [];
        $scope.chkAll = false;
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.OldEmployeeCode = $scope.ReplaceFromEmployeeCode;
        collectionobj.AllotNewTeacherData = JSON.stringify(($filter('filter')($scope.TeacherSubjectList, { 'chk': true }, true)));
        collectionobj.Action = "2";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableTransactionApi/GetAllotNewTeacherMaster', collectionobj);
        getData.then(function (response) {

            $scope.ReplaceToEmployeeTeacherList = response.data;
            $scope.hideLoader();
        });
    }

    $scope.ddlShift_change = function () {
        $scope.ReplaceToEmployeeTeacherList = [];
        $scope.GetEmployee();
    }

    $scope.CheckUncheckChk = function () {
        angular.forEach($scope.TeacherSubjectList, function (obj) {
            obj.chk = $scope.chkAll;
        });
    }
    $scope.GetEmployee = function () {
        var collectionobj = {};
        collectionobj.ShiftCode = $scope.ShiftCode;
        //collectionobj.ToDate = moment($scope.ToDate).format('YYYY-MMM-DD');
        collectionobj.Action = "1";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableTransactionApi/GetEmployeeOnLeaveList', collectionobj);
        getData.then(function (response) {
            $scope.TeacherList = response.data.Table;
        });
    }

    $scope.ddlReplaceFromEmployee_Change = function () {
        $scope.ReplaceToEmployeeTeacherList = [];
        $scope.chkAll = false;
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = "1";
        collectionobj.OldEmployeeCode = $scope.ReplaceFromEmployeeCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableTransactionApi/GetAllotNewTeacherMaster', collectionobj);
        getData.then(function (response) {
            $scope.TeacherSubjectList = response.data;
            $scope.hideLoader();
        });
    }
    $scope.fillddlReplaceToEmployee = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.OldEmployeeCode = $scope.ReplaceFromEmployeeCode;
        collectionobj.AllotNewTeacherData = JSON.stringify(($filter('filter')($scope.TeacherSubjectList, { 'chk': true }, true)));
        collectionobj.Action = "2";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableTransactionApi/GetAllotNewTeacherMaster', collectionobj);
        getData.then(function (response) {

            $scope.ReplaceToEmployeeTeacherList = response.data;
            $scope.hideLoader();
        });
    }
    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };
    $scope.ResetControl = function (flag) {
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.hfId = "";
        $scope.ShiftCode = "";
        $scope.chkAll = false;
        $scope.TeacherList = [];
        $scope.TeacherSubjectList = [];
        $scope.ReplaceToEmployeeTeacherList = [];
        $scope.IsActive = "true";
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };
    /* Save Button Click Event */
    $scope.SaveRecord = function () {
        if (isValidate()) {
            if (($filter('filter')($scope.TeacherSubjectList, { 'chk': true }, true)).length > 0) {
                $scope.showLoader();
                var collectionobj = {};
                collectionobj.TransID = $scope.hfId;
                collectionobj.ShiftCode = $scope.ShiftCode;
                //collectionobj.ToDate = moment($scope.ToDate).format('YYYY-MMM-DD');
                collectionobj.OldEmployeeCode = $scope.ReplaceFromEmployeeCode;
                collectionobj.NewEmployeeCode = $scope.ReplaceToEmployeeCode;
                collectionobj.AllotNewTeacherData = JSON.stringify(($filter('filter')($scope.TeacherSubjectList, { 'chk': true }, true)));
                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.Action = "3";
                collectionobj.CreatedBy = userid;
                collectionobj.UpdatedBy = userid;
                var getData = myService.methode('POST', '../Api/CollegeTimeTableTransactionApi/InsertUpdateDeleteAllotNewTeacherMaster', collectionobj);

                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
            else {
                showMsgBox("Select at least one row for replace teacher.")
            }
        };
    }

    /*Search Button Click Event*/
    $scope.ReplaceTeacherList = [];
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {
        //debugger
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.OldEmployeeCode = $scope.ReplaceFromEmployeeCode;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableTransactionApi/GetAllotNewTeacherMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "CollegeTimeTable", "HeaderValue": "Title", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Shift", "HeaderValue": "ShiftName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Course", "HeaderValue": "CollegeCourseName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Branch", "HeaderValue": "CollegeBranchName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Semester", "HeaderValue": "Semester", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Subject", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Period", "HeaderValue": "PeriodName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Employee", "HeaderValue": "EmployeeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            if ($scope.ReplaceFromEmployeeCode != undefined && $scope.ReplaceFromEmployeeCode != '' && $scope.ShiftCode != undefined && $scope.ShiftCode != '') {
                messagevalues = [
                    { "Shift": ($filter('filter')($scope.Shifts, { Code: $scope.ShiftCode }))[0].ShiftName },
                    { "Old Employee": ($filter('filter')($scope.TeacherList, { EmployeeCode: $scope.ReplaceFromEmployeeCode }))[0].EmployeeName }
                ];
            }
            else {
                messagevalues = [
                    { "Shift": "" },
                    { "Old Employee": "" }
                ];
            }
            $scope.ReplaceTeacherList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $scope.hideLoader();
        });
    };

    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "CollegeTimeTable", "HeaderValue": "Title", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Shift", "HeaderValue": "ShiftName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Course", "HeaderValue": "CollegeCourseName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Branch", "HeaderValue": "CollegeBranchName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Semester", "HeaderValue": "Semester", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Subject", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Period", "HeaderValue": "PeriodName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Employee", "HeaderValue": "EmployeeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

        $scope.PrintMaster(tblheader, $scope.ReplaceTeacherList, window.document.title);
    };
}
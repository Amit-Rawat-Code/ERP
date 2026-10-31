app.CollegeTeacherBreakMasterController = function ($scope, $element, $filter, myService) {
    $scope.disableSearch = true;

    $scope.SearchTeacher = function () {
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SearchText = $scope.SearchText;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', "../Api/CollegeTimeTableApi/GetSelectTeacherBreakMaster", collectionobj);
        getData.then(function (response) {
            $scope.TeacherBreakList = response.data;
        });
    }

    $scope.$watch('disablePrint', function () {
        if (typeof ($scope.disablePrint) === 'undefined') return;
        $scope.disablePrint = true;
    });
    $scope.$watch('disableClear', function () {
        if (typeof ($scope.disableClear) === 'undefined') return;
        $scope.disableClear = true;
    });

    /* Save Button Click Event */
    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.TeacherBreakData = JSON.stringify($scope.TeacherBreakList);
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/InsertUpdateDeleteTeacherBreakMaster', collectionobj);
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
    };
    $scope.ResetControl = function (flag) {
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableClear = true;
        $scope.IsActive = "";
        $scope.hfId = "";
        $scope.TeacherBreakMasterList = [];
        $scope.$apply();
        if (flag == 0) {
            showMsgBox('4');
        };
    };
    $scope.TeacherBreakMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', "../Api/CollegeTimeTableApi/GetSelectTeacherBreakMaster", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Id", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Teacher", "HeaderValue": "EmployeeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Break After No of Consecutive Lecture", "HeaderValue": "BreakAfterNoOfConsecutiveLecture", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];
            $scope.TeacherBreakMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data, 'asc');
        });

    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.TeacherBreakData = JSON.stringify($scope.TeacherBreakList);
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/InsertUpdateDeleteTeacherBreakMaster', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };

    $scope.FillTeacherBreakMaster = function () {
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', "../Api/CollegeTimeTableApi/GetSelectTeacherBreakMaster", collectionobj);
        getData.then(function (response) {
            $scope.TeacherBreakList = response.data;
        });
    }

    $scope.FillTeacherBreakMaster();

    /*Refresh Search Table Record*/
    $(document).on("click", ".RefreshSearchTable", function (e) {
        debugger;
        var panelToRefresh = $(this).closest('.panel').find('.refresh-container');
        var dataToRefresh = $(this).closest('.panel').find('.panel-wrapper');
        var loadingAnim = panelToRefresh.find('.loading-progress');
        panelToRefresh.show();
        setTimeout(function () {
            loadingAnim.addClass('la-animate');
        }, 100);
        $scope.started();
        return false;
    });

    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "Id", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Teacher", "HeaderValue": "EmployeeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Break After No of Consecutive Lecture", "HeaderValue": "BreakAfterNoOfConsecutiveLecture", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];
        $scope.PrintMaster(tblheader, $scope.TeacherBreakMasterList, window.document.title);
    };
};
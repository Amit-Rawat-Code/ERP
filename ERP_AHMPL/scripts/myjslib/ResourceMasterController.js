app.ResourceMasterController = function ($scope, $element, $filter, myService) {
    $scope.disableClear = true;
    $scope.WeekDays = [];

    $scope.GetResourceType = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../api/TimeTableApi/GetResourceMaster", collectionobj);
        getData.then(function (response) {
            $scope.ResourceType = response.data;
        })
    };

    $scope.Reset = function (obj) {
        if (obj.Type == '0') {
            obj.IsExam = false;
            obj.PeriodInWeek = "";

            obj.Monday = false;
            obj.Tuesday = false;
            obj.Wednesday = false;
            obj.Thursday = false;
            obj.Friday = false;
            obj.Saturday = false;
            obj.Sunday = false;
            obj.chkWS = false;
        }
        else {
            obj.Monday = true;
            obj.Tuesday = true;
            obj.Wednesday = true;
            obj.Thursday = true;
            obj.Friday = true;
            obj.Saturday = true;
            obj.Sunday = false;
            obj.chkWS = false;
        }
    }
    $scope.fnChkWS = function (obj) {
        if (obj.chkWS) {
            obj.Monday = true;
            obj.Tuesday = true;
            obj.Wednesday = true;
            obj.Thursday = true;
            obj.Friday = true;
            obj.Saturday = true;
            obj.Sunday = true;
        }
        else {
            obj.Monday = false;
            obj.Tuesday = false;
            obj.Wednesday = false;
            obj.Thursday = false;
            obj.Friday = false;
            obj.Saturday = false;
            obj.Sunday = false;
        }
    }
    $scope.checkAll = function (obj) {
        if (obj.Monday == false || obj.Monday == 1) {
            obj.chkWS = false;
        } else if (obj.Tuesday == false || obj.Tuesday == 1) {
            obj.chkWS = false;
        } else if (obj.Wednesday == false || obj.Wednesday == 1) {
            obj.chkWS = false;
        } else if (obj.Thursday == false || obj.Thursday == 1) {
            obj.chkWS = false;
        } else if (obj.Friday == false || obj.Friday == 1) {
            obj.chkWS = false;
        } else if (obj.Saturday == false || obj.Saturday == 1) {
            obj.chkWS = false;
        } else if (obj.Sunday == false || obj.Sunday == 1) {
            obj.chkWS = false;
        }
        else {
            obj.chkWS = true;
        }
    }
    $scope.UncheckAll = function (obj) {
        obj.Monday = false;
        obj.Tuesday = false;
        obj.Wednesday = false;
        obj.Thursday = false;
        obj.Friday = false;
        obj.Saturday = false;
        obj.Sunday = false;
    }

    $scope.SaveRecord = function () {
        $scope.ChkBool = "";
        $scope.ChkWdays();
        if ($scope.ChkBool == "") {
            if (isValidate()) {
                var collectionobj = {};
                if ($scope.Save == "Save") {

                    collectionobj.Action = 1;
                }
                else {
                    collectionobj.Action = 2;
                }
                collectionobj.Code = $scope.hfId;
                collectionobj.ResourceName = $scope.ResourceName;
                collectionobj.ResourceShortName = $scope.ResourceShortName;
                collectionobj.DisplayOrder = $scope.DisplayOrder;
                collectionobj.DayPeriod = $scope.DayPeriod;
                collectionobj.IsTeacherRequired = $scope.IsTeachReq;
                collectionobj.IsActive = $scope.IsActive;
                collectionobj.ResourceType = $scope.ResourceTypeCode;
                collectionobj.WeekDays = JSON.stringify(($filter('filter')($scope.WeekDays, { 'chkL': 1 }, true)));
                collectionobj.SessionId = sessionId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.CreatedBy = userid;
                collectionobj.UpdatedBy = userid;
                collectionobj.IsActive = $scope.IsActive;
                var getData = myService.methode('POST', '../Api/TimeTableApi/InsertUpdateDeleteResourceMaster', collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            };
        }
        else {
            showMsgBox("Please Select Week Days...");
        }
    }

    $scope.ChkWdays = function () {
        var count = 0;
        if (($filter('filter')($scope.WeekDays, { 'Monday': 0 }, true)).length > 0) {
            count = count + 1;
        }
        if (($filter('filter')($scope.WeekDays, { 'Tuesday': 0 }, true)).length > 0) {
            count = count + 1;
        }
        if (($filter('filter')($scope.WeekDays, { 'Wednesday': 0 }, true)).length > 0) {
            count = count + 1;
        }
        if (($filter('filter')($scope.WeekDays, { 'Thursday': 0 }, true)).length > 0) {
            count = count + 1;
        }
        if (($filter('filter')($scope.WeekDays, { 'Friday': 0 }, true)).length > 0) {
            count = count + 1;
        }
        if (($filter('filter')($scope.WeekDays, { 'Saturday': 0 }, true)).length > 0) {
            count = count + 1;
        }
        if (($filter('filter')($scope.WeekDays, { 'Sunday': 0 }, true)).length > 0) {
            count = count + 1;
        }
        if (($filter('filter')($scope.WeekDays, { 'Monday': false }, true)).length > 0) {
            count = count + 1;
        }
        if (($filter('filter')($scope.WeekDays, { 'Tuesday': false }, true)).length > 0) {
            count = count + 1;
        }
        if (($filter('filter')($scope.WeekDays, { 'Wednesday': false }, true)).length > 0) {
            count = count + 1;
        }
        if (($filter('filter')($scope.WeekDays, { 'Thursday': false }, true)).length > 0) {
            count = count + 1;
        }
        if (($filter('filter')($scope.WeekDays, { 'Friday': false }, true)).length > 0) {
            count = count + 1;
        }
        if (($filter('filter')($scope.WeekDays, { 'Saturday': false }, true)).length > 0) {
            count = count + 1;
        }
        if (($filter('filter')($scope.WeekDays, { 'Sunday': false }, true)).length > 0) {
            count = count + 1;
        }
        if (count == 7) {
            $scope.ChkBool = "1";
        }
    }

    $scope.GetWeeks = function (ClassCode) {
        var collectionobj = {};
        if ($scope.Save == "Edit") {

            collectionobj.Action = 7;
        }
        else {
            collectionobj.Action = 6;
        }
        collectionobj.Code = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetResourceMaster', collectionobj);
        getData.then(function (response) {
            $scope.WeekDays = response.data;
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
        $scope.disableForEdit = false;
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableClear = true;
        $scope.hfId = "";
        $scope.GetWeeks();
        $scope.ResourceName = "";
        $scope.ResourceTypeCode = "";
        $scope.ResourceShortName = "";
        $scope.DisplayOrder = "";
        $scope.DayPeriod = "";
        $scope.IsTeachReq = "false";
        $scope.IsActive = "";
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    $scope.ResourceMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetResourceMaster', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Resource Type", "Value": "ResourceType", "HeaderValue": "ResourceType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Resource Name", "Value": "ResourceName", "HeaderValue": "ResourceName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Resource Short Name", "HeaderValue": "ResourceShortName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Teacher Requirement", "HeaderValue": "IsTeacherRequired", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Monday", "HeaderValue": "Monday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Tuesday", "HeaderValue": "Tuesday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Wednesday", "HeaderValue": "Wednesday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Thursday", "HeaderValue": "Thursday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Friday", "HeaderValue": "Friday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Saturday", "HeaderValue": "Saturday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Sunday", "HeaderValue": "Sunday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            $scope.ResourceMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable();
                var i = row.row(this).index();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ResourceTypeCode = $scope.ResourceMasterList[i].Id.toString();
                $scope.ResourceName = $scope.ResourceMasterList[i].ResourceName.toString();
                $scope.ResourceShortName = $scope.ResourceMasterList[i].ResourceShortName.toString();
                $scope.DisplayOrder = $scope.ResourceMasterList[i].DisplayOrder.toString();
                $scope.DayPeriod = $scope.ResourceMasterList[i].DayPeriod.toString();
                $scope.IsTeachReq = ($scope.ResourceMasterList[i].IsTeacherRequired == true ? true : false);
                $scope.IsActive = ($scope.ResourceMasterList[i].IsActive == true ? "true" : "false");
                $scope.hideLoader();
                $scope.disableForEdit = true;
                $scope.disableDelete = false;
                $scope.disableClear = false;
                $scope.$applyAsync();
                $scope.Save = "Edit";
                $scope.GetWeeks();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlClass', true);
            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.Code = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/TimeTableApi/InsertUpdateDeleteResourceMaster', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };
}
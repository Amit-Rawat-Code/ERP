app.CollegeShiftWiseCourseWisePeriodMasterController = function ($scope, $element, $filter, myService) {
    $scope.ShiftPeriodMappingList = [];
    $scope.CourseList = [];

    $scope.GetShifts = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetShiftMaster', collectionobj);
        getData.then(function (response) {
            $scope.Shifts = response.data;
        });
    }
    $scope.ShiftsWiseCourse = function (ShiftClassPeriodMappingMasterList) {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.Code = $scope.Shift;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetShiftMaster', collectionobj);
        getData.then(function (response) {
            $scope.CourseList = response.data;
            if (ShiftClassPeriodMappingMasterList.CourseCode != undefined)
                $.each($scope.CourseList, function (index, obj) {
                    obj.disabled = true;
                    if (ShiftClassPeriodMappingMasterList.CourseCode == obj.CourseCode) {
                        obj.chk = true;
                    }
                })
        });
    }
    $scope.GetAllPeriodByShift = function () {

        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.ShiftCode = $scope.Shift;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetShiftPeriodMappingMaster', collectionobj);
        getData.then(function (response) {
            if (response.data != '' || response.data != null) {
                $scope.ShiftPeriodMappingList = response.data.Table;
            }
            else {
                $scope.ShiftPeriodMappingList = [];
                // $scope.AddRow();
            }
        });

    }

    $scope.SaveRecord = function () {
        if (isValidate()) {
            debugger
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.ShiftCode = $scope.Shift;
            collectionobj.CourseCode = JSON.stringify($filter('filter')($scope.CourseList, { 'chk': true }));
            collectionobj.PeriodData = JSON.stringify($filter('filter')($scope.ShiftPeriodMappingList, { 'Chk': true }, true));
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }
            var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/InsertUpdateDeleteShiftWiseClassWisePeriodMappingMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.ShiftClassPeriodMappingMasterList = [];
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
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetShiftWiseClassWisePeriodMappingMaster', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Shift Name", "Value": "ShiftWithTime", "HeaderValue": "ShiftWithTime", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Class Name", "Value": "ClassName", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

                ];

            $scope.ShiftClassPeriodMappingMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ShiftClassPeriodMappingMasterList = $filter('filter')($scope.ShiftClassPeriodMappingMasterList, { 'Code': $scope.hfId }, true);

                var collectionobj = {};
                collectionobj.Action = "5";
                collectionobj.Code = $scope.hfId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetShiftWiseClassWisePeriodMappingMaster', collectionobj);
                getData.then(function (response) {
                    if (response.data) {
                        $scope.Shift = $scope.ShiftClassPeriodMappingMasterList[0].ShiftCode;
                        $scope.ShiftsWiseClass($scope.ShiftClassPeriodMappingMasterList[0]);
                        $scope.ShiftPeriodMappingList = response.data;

                        $.each($scope.ShiftPeriodMappingList, function (index, obj) {
                            obj.Chk = obj.DetailPeriodCode == null ? false : true;
                        })
                        debugger

                    }
                });
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlSession', true);
            });
        });
    };
    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
        if ($scope.ShiftCode != "") {
            var collectionobj = {};
            collectionobj.Action = "3";
            collectionobj.Code = $scope.hfId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.UpdatedBy = userid;
            var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/InsertUpdateDeleteShiftWiseClassWisePeriodMappingMaster', collectionobj);
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
        $scope.disableAdd = false;
        $scope.hfId = "";
        $scope.Shift = "";
        $scope.CourseList = [];
        $scope.ChkAll = false;
        $scope.ShiftPeriodMappingList = [];
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    $scope.CheckALL = function () {
        $.each($scope.ShiftPeriodMappingList, function (index, obj) {
            obj.Chk = $scope.ChkAll;
        });
    }


}
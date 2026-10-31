app.CollegeShiftPeriodsMappingController = function ($scope, $element, $filter, myService) {

    $scope.SetFocus('#ddlShift');
    $scope.ShiftPeriodMappingList = [];
    $scope.ddlShift_change = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetShiftPeriodMappingMaster', collectionobj);
        getData.then(function (response) {
            if (response.data.Table1.length > 0) {
                $scope.ShiftPeriodMappingList = response.data.Table1;
                $scope.Save = "Edit";
                $scope.disableDelete = false;
            }
            else {
                $scope.ShiftPeriodMappingList = [];
                $scope.AddRow();
            }
        });

    }

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
    $scope.AddRow = function () {
        $scope.ShiftPeriodMappingList.push({
            Srno: "1",
            PeriodName: "",
            Timing: "",
        });
    }
    $scope.RemoveRow = function (srno) {
        $scope.ShiftPeriodMappingList = $filter('filter')($scope.ShiftPeriodMappingList, { Srno: '!' + srno });
    }
    $scope.SaveRecord = function () {
        if (isValidate()) {
            if ($scope.ShiftPeriodMappingList[0].PeriodName != "") {
                var collectionobj = {};
                collectionobj.Code = $scope.hfId;
                collectionobj.ShiftCode = $scope.ShiftCode;
                $.each($scope.ShiftPeriodMappingList, function (index, array) {
                    array["FromTime"] = moment(array.FromTime).format("hh:mm A"),
                        array["ToTime"] = moment(array.ToTime).format("hh:mm A")
                });
                collectionobj.PeriodData = JSON.stringify($scope.ShiftPeriodMappingList);
                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                collectionobj.RelationshipId = relationshipId;
                if ($scope.Save == "Save") {
                    collectionobj.Action = "1";
                    collectionobj.CreatedBy = userid;
                }
                else if ($scope.Save == "Edit") {
                    collectionobj.Action = "1";
                    collectionobj.CreatedBy = userid;
                }
                var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/InsertUpdateDeleteShiftPeriodMappingMaster', collectionobj);

                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }

                });
            }
        }
    };

    $scope.ShiftPeriodMappingMasterList = [];
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
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetShiftPeriodMappingMaster', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Shift Name", "HeaderValue": "ShiftName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            $scope.ShiftPeriodMappingMasterList = response.data.Table;
            $scope.PeriodMappingMasterList = response.data.Table1;
            loadDataUsingPreDefinedColumn(tblheader, $scope.ShiftPeriodMappingMasterList);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ShiftPeriodMappingMasterList = $filter('filter')($scope.ShiftPeriodMappingMasterList, { 'Code': $scope.hfId }, true);
                $scope.ShiftCode = $scope.ShiftPeriodMappingMasterList[0].ShiftCode;
                $scope.ShiftPeriodMappingList = $filter('filter')($scope.PeriodMappingMasterList, { 'Code': $scope.hfId, 'ShiftCode': $scope.ShiftCode }, true);
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlShift', true);
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
        collectionobj.Code = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/InsertUpdateDeleteShiftPeriodMappingMaster', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
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
        $scope.ShiftCode = "";
        $scope.ShiftPeriodMappingList = [];
        $scope.ShiftPeriodMappingMasterList = [];
        $scope.AddRow();
        $scope.$applyAsync();
        $scope.SetFocus('#ddlShift');
        if (flag == 0) {
            showMsgBox('4');
        };
    };
    /*Refresh Search Table Record*/
    $(document).on("click", ".RefreshSearchTable", function (e) {

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
                { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Shift Name", "HeaderValue": "ShiftName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];
        $scope.PrintMaster(tblheader, $scope.ShiftPeriodMappingMasterList, window.document.title);
    };


}
app.LeaveTypeMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlLeaveType');

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};

            collectionobj.Code = $scope.hfId;
            collectionobj.TotalLeaves = $scope.TotalLeaves;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.AbbrTypeId = $scope.AbbrTypeId;
            collectionobj.CalculationType = $scope.CalculationType;
            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else {
                collectionobj.Action = 2;
            }
            var getData = myService.methode('POST', "../Api/AttendanceMasterApi/InsertUpdateDeleteLeaveTypeMaster", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    }

    $scope.deleteRecord = function () {

        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.Code = $scope.hfId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;

        var getData = myService.methode('POST', "../Api/AttendanceMasterApi/InsertUpdateDeleteLeaveTypeMaster", collectionobj);
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

    $scope.ResetControl = function (flag)
    {
        $scope.LeaveTypeId = "";
        $scope.AbbrTypeId = "";
        $scope.CalculationType = "";
        $scope.TotalLeaves = "";
        $scope.IsActive = "true";
        $scope.Save = "Save"
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.hfId = "";
        $scope.SetFocus('#ddlLeaveType');
        $scope.LeaveTypeMasterList = [];
        if (flag == 0)
        {
            showMsgBox('4');
        };
    };
    $scope.LeaveTypeMasterList = [];
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        //collectionobj.FYId = fyId;
        var getData = myService.methode('POST', "../Api/AttendanceMasterApi/GetLeaveTypeMaster", collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Leave Type", "Value": "AbbrTypeId", "HeaderValue": "AbbrType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Calculation Type", "Value": "CalculationType", "HeaderValue": "CalculationType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Total Leaves", "HeaderValue": "TotalLeaves", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" }
                ];
            $scope.LeaveTypeMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function ()
            {
                $scope.showLoader();
                debugger
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.LeaveTypeMasterList = $filter('filter')($scope.LeaveTypeMasterList, { 'Code': $scope.hfId });
                $scope.AbbrTypeId = $(this).find('input[type="hidden"]#hdAbbrType').val();
                $scope.CalculationType = $scope.LeaveTypeMasterList[0].CalculationType == null ? "" : $scope.LeaveTypeMasterList[0].CalculationType.toString();
                $scope.LeaveType = row[1];
                $scope.TotalLeaves = row[3];
                $scope.IsActive = row[4] == "Yes" ? "true" : "false";               
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#ddlLeaveType', true);
                $scope.hideLoader();
            });
        });
    };

    // $scope.SearchbyValue = function () {
    //    var collectionobj1 = {};
    //    collectionobj1.LeaveTypeId = $scope.hfId;
    //    collectionobj1.SessionId = sessionId;
    //    collectionobj1.Action = 4;
    //    collectionobj1.FYId = fyId;
    //    collectionobj1.SchoolCode = sessionStorage.getItem('schoolCode');
    //    collectionobj1.BranchCode = sessionStorage.getItem('branchCode');
    //    var getData = myService.methode('POST', "../Attendance/LeaveTypeMasterList", '{obj:' + JSON.stringify(collectionobj1) + '}');
    //    getData.then(function (response) {
    //        debugger;
    //        $scope.LeaveTypeId = response.data[0]["LeaveTypeId"].toString();
    //        $scope.TotalLeaves = response.data[0]["TotalLeaves"];          
    //        $scope.IsActive = (response.data[0]["IsActive"].toString());
    //        $('#btnSave').val("Edit");
    //        $('#btnSavetxt').text("Edit");
    //     
    //        $('#btnSave').prop('disabled', false);
    //        //collapse box
    //        $('.br-pageheader').fadeIn();
    //        $('#collapseinputbox').fadeIn();
    //        $('#CollapseSearchTableList').fadeOut();

    //        $scope.hideLoader();
    //    });
    //}

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
        //started();
        return false;
    });

    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "HeaderValue": "LeaveTypeId", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Leave Type", "HeaderValue": "AbbrType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Total Leaves", "HeaderValue": "TotalLeaves", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" }
            ];
        $scope.PrintMaster(tblheader, $scope.LeaveTypeMasterList, window.document.title);
    };
}
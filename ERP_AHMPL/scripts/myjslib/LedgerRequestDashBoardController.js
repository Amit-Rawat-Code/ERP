app.LedgerRequestDashBoardController = function ($scope, $element, $filter, myService) {
    var table1;
    $scope.LedgerRequestList = [];
    $scope.$on('CustomFunction', function () {
        table1 = $("#example1").DataTable({
            "searching": true,
        });

        //Apply the search
        table1.columns().every(function () {
            var that = this;

            $('input', this.footer()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });
    });

    $scope.GetSchools = function () {
        var collectionobj = {};
        collectionobj.Action = '1';
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/MISReportApi/GetMISReport', collectionobj);
        getData.then(function (response) {
            $scope.SchoolList = response.data;
            angular.forEach($scope.SchoolList, function (obj) {
                obj.chk = true;
            });
            $scope.started();
        });
    };

    $scope.ddlAction_Change = function () {
        $scope.disableDelete = true;
        if ($.fn.DataTable.isDataTable('#example1')) {
            $('#example1').dataTable().fnClearTable();
            $('#example1').dataTable().fnDestroy();
        }
        $scope.started();
    }

    $scope.SearchRecord = function () {
        //var checkboxlist = $('.chk-validate').find('input[type=checkbox]:checked');
        if (isValidate()) {
            if ($.fn.DataTable.isDataTable('#example1')) {
                $('#example1').dataTable().fnClearTable();
                $('#example1').dataTable().fnDestroy();
            }
            $scope.started();
        }
    }

    $scope.started = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.FYId = fyId;
        collectionobj.SchoolList = JSON.stringify($filter('filter')($scope.SchoolList, { chk: true }));
        var getData = myService.methode('POST', "../Api/AccountDashBoardApi/GetLedger_Temp", collectionobj);
        getData.then(function (response) {         
            $scope.LedgerRequestList = response.data;
            if ($scope.Action == 'D' && $scope.LedgerRequestList.length > 0)
                $scope.disableDelete = false;
            else
                $scope.disableDelete = true;
            $scope.hideLoader();
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {

        debugger;
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.LedgerRequestList = JSON.stringify($filter('filter')($scope.LedgerRequestList, { chk: true }));
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        collectionobj.FYId = fyId;

        var getData = myService.methode('POST', "../Api/AccountMasterApi/InsertUpdateDeleteLedger_Temp", collectionobj);
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
        $scope.Action = '';
        $scope.LedgerRequestList = true;
        if ($.fn.DataTable.isDataTable('#example1')) {
            $('#example1').dataTable().fnClearTable();
            $('#example1').dataTable().fnDestroy();
        }   
        if (flag == 0) {
            showMsgBox('4');
        };

    };

    $scope.LedgerObj = {};

    $scope.btn_Click = function (obj) {
        $scope.showLoader();
        window.location.href = "/AccountMaster/GeneralLedgerGlobal?TransId=" + obj.SubCode + "&RelId=" + obj.RelationshipId;
        //$scope.SelectIframoutiframe("/AccountMaster/GeneralLedgerGlobal", "Global General Ledger Master", obj.SubCode, relationshipId, "No");
        //$scope.SchoolListForSelect = [];
        //$scope.chkAll = false;
        //angular.forEach($scope.SchoolList, function (obj) {
        //    $scope.SchoolListForSelect.push({ "RelationshipId": obj.RelationshipId, "BranchName": obj.BranchName, "BranchAddress": obj.BranchAddress, "chk": false });
        //});
        //$scope.LedgerObj = obj;
        //$('#ModalSchools').modal().show();
    }

    //$scope.btnCreateLedger_Click = function (subcode) {
    //    $scope.SelectIframoutiframe("/AccountMaster/GeneralLedger", "General Ledger Master", $scope.LedgerObj['SubCode'], JSON.stringify($filter('filter')($scope.SchoolListForSelect, { chk: true })), "No");
    //}


}
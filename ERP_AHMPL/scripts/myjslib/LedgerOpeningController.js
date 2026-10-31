app.LedgerOpeningController = function ($scope, $element, $filter, myService) {
    $scope.TotalCrAmt = 0;
    $scope.TotalDrAmt = 0;
    $scope.visibleSearch = false;
    $scope.disableAdd = false;
    $scope.disableDelete = true;
    $scope.disablePrint = true;
    $scope.disableClear = true;
    $scope.LedgerDataList = [];

    $scope.$on('CustomFunction', function () {

        var table1 = $("#example1").DataTable({
            realtime: true,
            responsive: false,
            "retrieve": true,
            "searching": true,
            "bDestroy": true,
            "scrollX": true,
            "iDisplayLength": -1,
            "lengthMenu": [[-1], ["All"]]
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

    $scope.CheckAll = function () {
        $scope.LedgerDataList.map(obj => { obj.chk = $scope.chkAll });
    }

    $scope.UnCheckAll = function () {
        $scope.LedgerDataList.map(obj => { if (obj.chk == false) { $scope.chkAll = false; return } });
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
        $scope.disableClear = true;
        $scope.disableAdd = true;
        $scope.VNarration = "";
        $scope.LedgerGroup = "";
        $scope.Nature = "";
        $scope.SubCode = "";
        $scope.chkAll = true;
        $scope.LedgerDataList = [];
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#TableList').attr('class', 'collapse');
        if (flag == 0) {
            showMsgBox('4');
        };
    }

    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record? All openning amount will be Zero.", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {
        debugger;
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.TransId = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        collectionobj.LedgerFilteredList = JSON.stringify($scope.LedgerDataList);

        var getData = myService.methode('POST', "../Api/AccountTransactionApi/UpdateLedgerOpening", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data[0])) {
                $scope.ClearControl(1);
            }
        });
    };

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

        $scope.PrintVoucher($scope.hfId, $scope.VoucherModel);
    };

    $scope.GetNatureList = function ()
    {
        collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.relationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/AccountTransactionApi/GetLedgerOpening", collectionobj);
        getData.then(function (response) {
            $scope.NatureList = response.data;
        });
    }
    $scope.LoadLedger = function () {
        collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.relationshipId = relationshipId;        
        var getData = myService.methode('POST', "../Api/AccountTransactionApi/GetLedgerOpening", collectionobj);
        getData.then(function (response) {
            $scope.LedgerList = response.data;
        });
    }

    $scope.SearchData = function () {
        $('#collapseinputbox').attr('class', 'collapse');
        $('#TableList').attr('class', 'collapse in');
        $scope.started();
    };
    $scope.started = function ()
    {
        $scope.showLoader();       
        collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.MainGroupCode = $scope.LedgerGroup;
        collectionobj.Nature = $scope.Nature;
        collectionobj.SubCode = $scope.SubCode;
        var getData = myService.methode('POST', "../Api/AccountTransactionApi/GetLedgerOpening", collectionobj);
        getData.then(function (response)
        {
            if (response.data != null && response.data.length > 0) {
                $scope.LedgerDataList = response.data;
                $scope.disableAdd = false;
                $scope.disableDelete = false;
                $scope.disableClear = false;
                $scope.hideLoader();
            }
            else
            {
                $('#collapseinputbox').attr('class', 'collapse in');
                $('#TableList').attr('class', 'collapse');
                showMsgBox('No Record Found');
            }
        });
    };
    $scope.SaveRecord = function ()
    {
        if ($scope.LedgerDataList.length > 0) {
            $scope.showLoader();
            collectionobj = {};
            collectionobj.Action = 2;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.LedgerFilteredList = JSON.stringify($filter('filter')($scope.LedgerDataList, {chk:true}));
            var getData = myService.methode('POST', "../Api/AccountTransactionApi/UpdateLedgerOpening", collectionobj);
            getData.then(function (response) {
                if (response.data != null && response.data.length > 0)
                    if (showMsgBox(response.data[0])) {
                        $scope.ClearControl(1);
                    }
            });
        }
        else
        {
            showMsgBox('Please Filter Data...');
        }
    }
}
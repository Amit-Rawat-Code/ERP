app.LaserOpeningController = function ($scope, $element, $filter, myService) {
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
        $scope.GetNatureList();
        $scope.SubCode = "";
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

    $scope.started1 = function (transid) {
        if (locked != 'No') {
            $scope.visibleAdd = false;
            $scope.visibleSearch = false;
            $scope.visibleDelete = false;
            $scope.visiblePrint = false;
            $scope.visibleClear = false;
        }
        else {
            setTimeout(function () {
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.hfId = transid;
            }, 500);
        }


        $scope.showLoader();

        $scope.ResetVirtualTable();
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;

        collectionobj.VoucherType = $scope.VoucherModel;
        debugger;
        var getData = myService.methode('POST', "../Api/AccountTransactionApi/GetLedgerVoucher", collectionobj);
        getData.then(function (response) {


            $scope.LedgerVoucherList = response.data;

            $scope.showLoader();

            debugger;
            $scope.LedgerVoucherList = $filter('filter')($scope.LedgerVoucherList, { 'TransId': transid });
            $scope.VoucherModel = $scope.LedgerVoucherList[0].V_Type;
            //$(FindHtml(row[1])).val();
            $scope.PVNo = $scope.LedgerVoucherList[0].PVNO;
            $scope.PVDate = new Date(moment($scope.LedgerVoucherList[0].PVDate, 'DD-MM-YYYY'));
            $scope.CVNo = $scope.LedgerVoucherList[0].CVNo;
            $scope.CVDate = new Date(moment($scope.LedgerVoucherList[0].CVDate, 'DD-MM-YYYY'));


            $scope.VConfirm = $scope.LedgerVoucherList[0].VoucherConfirm == "Yes" ? true : false;
            $scope.VNarration = $scope.LedgerVoucherList[0].VoucherNarr;

            if ($scope.LedgerVoucherList[0].Chq_Date != null)
                $scope.ChequeDate = new Date(moment($scope.LedgerVoucherList[0].Chq_Date, 'DD-MM-YYYY'));

            $scope.ChequeNo = $scope.LedgerVoucherList[0].Chq_No;
            $scope.TransModeModel = $scope.LedgerVoucherList[0].TransferMode;

            var collectionobj = {};
            collectionobj.Action = 5;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;

            collectionobj.VoucherType = $scope.VoucherModel;
            collectionobj.TransId = transid;
            debugger;
            var getData = myService.methode('POST', "../Api/AccountTransactionApi/GetLedgerVoucher", collectionobj);
            getData.then(function (response) {
                $scope.VoucherData = response.data
                $scope.DrSum();
                $scope.CrSum();
                $scope.hideLoader();
            });
            $scope.$applyAsync();
        });
    };
    var transId = getParameterByName('TransId');
    var locked = getParameterByName('Locked');
    if (transId != null) {
        setTimeout(function () { $scope.started1(transId); }, 1000);
    }

    $scope.GetNatureList = function ()
    {
        collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.relationshipId = relationshipId;
        collectionobj.MainGroupCode = $scope.LedgerGroup;
        var getData = myService.methode('POST', "../Api/AccountTransactionApi/GetLedgerOpening", collectionobj);
        getData.then(function (response) {
            $scope.NatureList = response.data;
        });
    }
    $scope.GetLedgerList = function () {
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
        //$scope.started();
        setTimeout(function () { $scope.started(); }, 1000);
        $scope.showLoader();
    };
    $scope.started = function ()
    {               
        collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.relationshipId = relationshipId;
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
            collectionobj = {};
            collectionobj.Action = 2;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.UpdatedBy = userid;
            collectionobj.LedgerFilteredList = JSON.stringify($scope.LedgerDataList);
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
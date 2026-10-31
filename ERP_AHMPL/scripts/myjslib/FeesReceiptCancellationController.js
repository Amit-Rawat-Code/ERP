app.FeesReceiptCancellationController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlClass');
    $scope.Cancel = "";
    $scope.tblbody = [];
    $scope.tblSummary = [];
    $scope.StudentCode = "";
    $scope.ReceiptCancelId = "";
    $scope.Remark = "";

    $scope.ddl_StudentsListChange = function () {
        setTimeout(function () { $scope.GetFeesReceipt(); }, 200);
    }

    $scope.GetFeesReceipt = function () {
        var collectionobj = {};
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.Action = 4
        var getData = myService.methode('POST', "../Api/FeeTransactionApi/GetFeeReceipt", collectionobj);
        getData.then(function (response) {
            $scope.tblbody = response.data;
        });
    }

    $scope.ChangeReceipt = function (feeTransId,cancel) {
        $scope.Cancel = cancel;
        $.each($scope.tblbody, function (index, val) {
            if ($scope.Cancel != val.FeeTransId) {
                $scope.tblbody[index].V_Date = "";
                $scope.tblbody[index].IsCheckBounced = false;
                $scope.tblbody[index].Remarks = "";
                $scope.tblbody[index].CheckBounceAmt = 0;
            }
        });
        $.each($('input'), function (index) {
            $(this).removeClass("red-validation");
        });
        $scope.GetFeeReceiptDetails(feeTransId);
    }

    $scope.GetFeeReceiptDetails = function (feeTransId) {
        var collectionobj = {};
        collectionobj.TransId = feeTransId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.Action = 3
        var getData = myService.methode('POST', "../Api/FeeTransactionApi/GetFeeReceiptDetails", collectionobj);
        getData.then(function (response) {
            $scope.tblSummary = response.data;
            $scope.CalculateFooter();
        });
    }

    $scope.CalculateFooter = function () {
        $scope.TotalFeeAmt = 0;
        $scope.TotalDueAmt = 0;
        $scope.TotalDisAmt = 0;
        $scope.TotalFeeRect = 0;

        $.each($scope.tblSummary, function (index, array) {
            $scope.TotalFeeAmt = $scope.TotalFeeAmt + Number(array['FeeAmt'])
            $scope.TotalDueAmt = $scope.TotalDueAmt + Number(array['DueAmt'])
            $scope.TotalDisAmt = $scope.TotalDisAmt + Number(array['DisAmt'])
            $scope.TotalFeeRect = $scope.TotalFeeRect + Number(array['FeeRect'])
        });
    }

    $scope.ConvertDate = function (date) {
        return new Date(date);
    }

    $scope.SaveRecord = function () {
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.TransID = $scope.ReceiptCancelId;
            collectionobj.StudentCode = $scope.StudentCode;
            $scope.ReceiptCancellationList = [];

            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;

            if ($scope.Save == "Save") {
                $.each($scope.tblbody, function (index, array) {
                    if ($scope.Cancel == array.FeeTransId) {
                        array.V_Date = moment(array.V_Date).format('DD-MMM-YYYY');
                        $scope.ReceiptCancellationList.push(array);
                        return;
                    }
                });
                $scope.ReceiptCancellationList[0].Remarks = $scope.Remark;
                collectionobj.ReceiptCancellationList = JSON.stringify($scope.ReceiptCancellationList)
                collectionobj.Action = 1;
            }
            else if ($scope.Save == "Edit") {         
                $scope.ReceiptCancellationList=$scope.tblEditCancelation;
                $scope.ReceiptCancellationList[0].V_Date = moment($scope.ReceiptCancellationList[0].V_Date).format('DD-MMM-YYYY');
                $scope.ReceiptCancellationList[0].Remarks = $scope.Remark;
                collectionobj.ReceiptCancellationList = JSON.stringify($scope.ReceiptCancellationList)
                collectionobj.Action = 2;
            }

            var getData = myService.methode('POST', "../Api/FeeTransactionApi/InsertUpdateDeleteFeesReceiptCancellation", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
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
        debugger;
        $scope.Save = "Save";
        $scope.disabledSearch = false;
        $scope.disableClass = false;
        $scope.disableSection = false;
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;

        $scope.CurrentDueAmount = 0;
        $scope.TotalRectAmount = 0;
        $scope.TotalFeeAmt = 0;
        $scope.TotalDueAmt = 0;
        $scope.TotalDisAmt = 0;
        $scope.TotalFeeRect = 0;
        $scope.TotalPaybleAmount = 0;
        $scope.ClassCode = ""
        $scope.SectionCode = ""

        $scope.SearchText = "";

        $scope.Remark = "";
        $scope.Cancel = "";
        $scope.tblbody = [];
        $scope.tblSummary = [];
        $scope.StudentCode = "";
        $scope.ReceiptCancelId = "";
        $scope.tblEditCancelation = [];

        $scope.SetFocus('#ddlClass');
        $scope.FeesReceiptCancellationList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
    }
    $scope.FeesReceiptCancellationList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('Fee', 'collapse in');
        $('#CollapseSearchTableList').attr('Fee', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.Action = 4;

        var getData = myService.methode('POST', "../Api/FeeTransactionApi/GetFeesReceiptCancellation", collectionobj);
        getData.then(function (response) {

            var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "ReceiptCancelId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes" },
                { "HeaderText": "Receipet No.", "HeaderValue": "FeeReceipetNo", "Width": "120px", "ShowColumn": "Yes", "CssClass": "blue-text" },
                { "HeaderText": "Cancellation Date", "HeaderValue": "V_Date", "Width": "70px", "ShowColumn": "Yes" } ,
                { "HeaderText": "Student Id", "HeaderValue": "StudentId", "Width": "100%", "ShowColumn": "Yes" },
                { "HeaderText": "Student Name", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes" },
                { "HeaderText": "Bill No.", "HeaderValue": "BillNo", "Width": "70px", "ShowColumn": "Yes" },
                { "HeaderText": "Pay Mode", "HeaderValue": "PayMode", "Width": "90px", "ShowColumn": "Yes" },
                { "HeaderText": "Installment", "HeaderValue": "Installment", "Width": "80px", "ShowColumn": "Yes" },
                { "HeaderText": "Fee Amt", "HeaderValue": "FeeAmt", "Width": "70px", "ShowColumn": "Yes" },
                { "HeaderText": "IsChequeBounced", "HeaderValue": "IsCheckBounced", "Width": "70px", "ShowColumn": "Yes" },
                { "HeaderText": "Chk Fine", "HeaderValue": "CheckBounceAmt", "Width": "70px", "ShowColumn": "Yes" },
                { "HeaderText": "Remarks", "HeaderValue": "Remarks", "Width": "90px", "ShowColumn": "No" }                   
            ];

            $scope.FeesReceiptCancellationList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
                $scope.tblbody = [];
            
                var row = $('#example').DataTable().row(this).data();
                $scope.ReceiptCancelId = $(this).find('input[type="hidden"]').val();
 
                $scope.FeesReceiptCancellationList = $filter('filter')($scope.FeesReceiptCancellationList, { 'ReceiptCancelId': $scope.ReceiptCancelId });

                $scope.SearchText = $scope.FeesReceiptCancellationList[0].StudentName;
                $scope.StudentCode = $scope.FeesReceiptCancellationList[0].StudentCode;


                $scope.Remark = $scope.FeesReceiptCancellationList[0].Remarks;
                $scope.tblEditCancelation = $scope.FeesReceiptCancellationList;
                $scope.GetFeeReceiptDetails($scope.tblEditCancelation[0].FeeTransId);

                $scope.Save = 'Edit';
                $scope.disabledSearch = true;
                $scope.disableClass = true;
                $scope.disableSection = true;
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#ddlClass', true);
                $scope.hideLoader();
            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.TransID = $scope.ReceiptCancelId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.UpdatedBy = userid;
        collectionobj.Action = 3;

        var getData = myService.methode('POST', "../Api/FeeTransactionApi/InsertUpdateDeleteFeesReceiptCancellation", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            };
        });
    };
    /*Refresh Search Table Record*/
    $(document).on("click", ".RefreshSearchTable", function (e) {
        debugger;
        var panelToRefresh = $(this).closest('.panel').find('.refresh-container');
        var dataToRefresh = $(this).closest('.panel').find('.panel-wrapper');
        var loadingAnim = panelToRefresh.find('.loading-progress');
        panelToRefresh.show();
        setTimeout(function () {
            loadingAnim.addFee('la-animate');
        }, 100);
        $scope.started();
        return false;
    });

    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "TransId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes" },
                { "HeaderText": "Student Id", "HeaderValue": "StudentId", "Width": "100%", "ShowColumn": "Yes" },
                { "HeaderText": "Student Name", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes" },
                { "HeaderText": "Receipet No.", "HeaderValue": "FeeReceipetNo", "Width": "120px", "ShowColumn": "Yes" },
                { "HeaderText": "Bill No.", "HeaderValue": "BillNo", "Width": "70px", "ShowColumn": "Yes" },
                { "HeaderText": "Pay Mode", "HeaderValue": "PayMode", "Width": "90px", "ShowColumn": "Yes" },
                { "HeaderText": "Due Month", "HeaderValue": "DueMonth", "Width": "80px", "ShowColumn": "Yes" },
                { "HeaderText": "Fee Amt", "HeaderValue": "FeeAmt", "Width": "70px", "ShowColumn": "Yes" },
                { "HeaderText": "IsCheckBounced", "HeaderValue": "IsCheckBounced", "Width": "70px", "ShowColumn": "Yes" },
                { "HeaderText": "Chk Fine", "HeaderValue": "CheckBounceAmt", "Width": "70px", "ShowColumn": "Yes" },
                { "HeaderText": "Remarks", "HeaderValue": "Remarks", "Width": "90px", "ShowColumn": "Yes" },
                { "HeaderText": "Cancellation Date", "HeaderValue": "V_Date", "Width": "70px", "ShowColumn": "Yes" }
            ];
        $scope.PrintMaster(tblheader, $scope.FeesReceiptCancellationList, window.document.title);
    };
}
app.ContraVoucherController = function ($scope, $element, $filter, myService)
{
    $scope.disPVDate = false;
    $scope.disCVDate = false;
    $scope.VoucherModel = "CONT";
    $scope.VoucherData = [];
    $scope.showVoucherDataobjRow = true;
    $scope.VoucherDataobj = {};

    $scope.TotalCrAmt = 0;
    TotalDrAmt = 0;

    var DepositDate = getParameterByName('DepositDate');
    $scope.CRAmt = getParameterByName('CRAmt');
    var BankSubCode = getParameterByName('BankSubCode');   
    var TransIds = getParameterByName('TransID');

    
    if (TransIds != null)
    {
        $scope.showVoucherDataobjRow = false;
        $scope.disabledChequeDate = true;
        $scope.disabledChequeNo = true;
        $scope.disabledTransModeModel = true;
        $scope.FromCDInBank = true;
        $scope.VoucherData.push({
            DrCr: 'C',
            SubCode: BankSubCode,
            DrAmount:0,
            CrAmount: $scope.CRAmt,
            ENarr:"",
            RuningBalance: 0
        });

        $scope.$watch('PVDate', function () {
            if (typeof ($scope.PVDate) === 'undefined') return;
            if (moment($scope.PVDate).format('DD-MMM-YYYY') != moment(new Date(DepositDate)).format('DD-MMM-YYYY')) {
                $scope.PVDate = new Date(DepositDate);
                $scope.CVDate = new Date(DepositDate);
                $scope.disPVDate = true;
                $scope.disCVDate = true;
            }
        })
    }
    

    $scope.$watch('VoucherModel', function ()
    {
        $scope.Voucherdisability = true;
      
        // if ($scope.Save == "Save" && transId == null)
        if ($scope.Save == "Save") {
            $scope.CheckVoucherConfirm();
        }
        $scope.BindCashBankLedger();
        $scope.BindTransModes();

    });

    $scope.GetIsFeeRectAutoGenrate = function () {
        $scope.FeeRectAutoGenrate = true;
    }
    setTimeout(function () { $scope.GetIsFeeRectAutoGenrate(); }, 500);

    $scope.AddRow = function ()
    {
        if (isValidateList())
        {
            if (typeof ($scope.VoucherDataobj) === 'undefined') return;
            if (typeof ($scope.VoucherDataobj.SubCode) !== 'undefined')
            {
                $scope.VoucherData.push({
                    DrCr: $scope.VoucherDataobj.DrCr,
                    SubCode: $scope.VoucherDataobj.SubCode,
                    DrAmount: $scope.ConvertAmountToDecimalPoint($scope.VoucherDataobj.DrAmount),
                    CrAmount: $scope.ConvertAmountToDecimalPoint($scope.VoucherDataobj.CrAmount),
                    ENarr: $scope.VoucherDataobj.ENarr,
                    RuningBalance: $scope.VoucherDataobj.RuningBalance
                });
                setTimeout(function () { $('#ddlDrCr').focus(); }, 500);
               // $scope.ResetVirtualTable();
            }
        }
    };


    $scope.DrSum = function ()
    {
        if (!isNaN($scope.VoucherDataobj.DrAmount))
        {
            $scope.TotalDrAmt =  $scope.ConvertAmountToDecimalPoint((Number($scope.VoucherData.sum('DrAmount')) + Number($scope.VoucherDataobj.DrAmount)).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 }));
        }
        else
        {
            $scope.TotalDrAmt =  $scope.ConvertAmountToDecimalPoint((Number($scope.VoucherData.sum('DrAmount'))).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 }));
        }

    }

    $scope.CrSum = function ()
    {
        if (!isNaN($scope.VoucherDataobj.CrAmount))
        {
            $scope.TotalCrAmt =  $scope.ConvertAmountToDecimalPoint((Number($scope.VoucherData.sum('CrAmount')) + Number($scope.VoucherDataobj.CrAmount)).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 }));
        }
        else
        {
            $scope.TotalCrAmt =  $scope.ConvertAmountToDecimalPoint((Number($scope.VoucherData.sum('CrAmount'))).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 }));
        }
    }

    //if (($scope.CRAmt == 0) && (DepositDate == null || DepositDate == undefined))
    //{
        //debugger
        //$scope.ResetVirtualTable = function ()
        //{
        //    $scope.VoucherDataobj =
        //    {
        //        DrCr: "D",
        //        SubCode: "",
        //        DrAmount: "",
        //        CrAmount: "",
        //        ENarr: "",
        //        RuningBalance: "",
        //    };
        //}
    //}

    $scope.RemoveRow = function (index)
    {
        $scope.VoucherData.splice(index, 1);
        $scope.TotalDrAmt =  $scope.ConvertAmountToDecimalPoint((Number($scope.VoucherData.sum('DrAmount'))).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 }));
        $scope.TotalCrAmt =  $scope.ConvertAmountToDecimalPoint((Number($scope.VoucherData.sum('CrAmount'))).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 }));
    };

    $scope.SaveRecord = function ()
    {
        if (isValidate()) {

            $scope.showLoader();
            var collectionobj = {};

            collectionobj.VoucherType = $scope.VoucherModel;
            collectionobj.PVNo = $scope.PVNo;
            collectionobj.PVDate = moment($scope.PVDate).format('YYYY-MMM-DD');

            if ($scope.CVNo == 'undefined') return
            collectionobj.CVNo = $scope.CVNo;

            if ($scope.CVNo == 'undefined') return
            collectionobj.CVDate = moment($scope.CVDate).format('YYYY-MMM-DD');

            collectionobj.ContraSubCode = $scope.CashBankACModel;
            collectionobj.VoucherNarr = $scope.VNarration;
            collectionobj.VoucherConfirm = $scope.VConfirm;
            if ($scope.ChequeDate != undefined)
                collectionobj.ChequeDate = moment($scope.ChequeDate).format('YYYY-MMM-DD');
            collectionobj.ChequeNo = $scope.ChequeNo;
            collectionobj.TransferMode = $scope.TransModeModel;

            $scope.AddRow();
            collectionobj.VoucherData = JSON.stringify($scope.VoucherData);
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;         
            collectionobj.LedgerDataTransID = TransIds ; 

            if ($scope.Save == "Save")
            {
                collectionobj.Action = 1;
                collectionobj.CreatedBy = userid;
                var getData = myService.methode('POST', "../Api/AccountTransactionApi/InsertUpdateDeleteVoucherLedger", collectionobj);
                getData.then(function (response)
                {
                    if (response.data != null && response.data.length > 0)
                        if (showMsgBox(response.data[0])) {
                            $scope.ClearControl(1);
                        }
                    if (response.data != null && response.data.length > 0) {
                        if ($scope.FeeRectAutoGenrate === true) {
                            $scope.PrintVoucher(response.data[1], $scope.VoucherModel);
                        }
                    }
                });
            }
            else
            {
                collectionobj.Action = 2;
                collectionobj.TransID = $scope.hfId;
                collectionobj.UpdatedBy = userid;
                var getData = myService.methode('POST', "../Api/AccountTransactionApi/InsertUpdateDeleteVoucherLedger", collectionobj);
                getData.then(function (response)
                {
                    if (response.data != null && response.data.length > 0)
                        if (showMsgBox(response.data[0])) {
                            $scope.ClearControl(1);
                        }
                    if (response.data != null && response.data.length > 0) {
                        if ($scope.FeeRectAutoGenrate === true) {
                            $scope.PrintVoucher(response.data[1], $scope.VoucherModel);
                        }
                    }
                });
            }
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
     
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.VNarration = "";
        $scope.CashBankACModel = "";
        $scope.SetFocus('#ddlCashBankLedger');
        $scope.IsActive = "";
        $scope.TransModeModel = "";
        $scope.ChequeNo = "";
        $scope.ChequeDate = "";
        $scope.hfId = "";
        $scope.LedgerVoucherList = [];
        $scope.VoucherData = [];
        $scope.VoucherDataobj = {
            DrCr: 'D'
        };
        $scope.CashRuningBalance = "";
        $scope.TotalCrAmt = 0;
        $scope.TotalDrAmt = 0;
        $scope.BindVoucherKeys($scope.VConfirm);
        if (TransIds != null)
        {
            location.href = "/AccountTransaction/CashDepositInBank";
        }
        if (flag == 0) {
            showMsgBox('4');
        };

    }

    $scope.LedgerVoucherList = [];

    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function ()
    {
        //$scope.ResetVirtualTable();
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.BranchCode = branchCode; 
        collectionobj.VoucherType = $scope.VoucherModel;
        
        var getData = myService.methode('POST', "../Api/AccountTransactionApi/GetLedgerVoucher", collectionobj);
        getData.then(function (response) {

            var tblheader =
            [
                { "HeaderText": "Srno", "HeaderValue": "TransId", "Width": "50px", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "V_Type", "Value": "V_Type", "HeaderValue": "V_Type", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" },
                { "HeaderText": "PVNo.", "HeaderValue": "PVNO", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "PVDate", "HeaderValue": "PVDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "CVNo", "HeaderValue": "CVNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "CVDate", "HeaderValue": "CVDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "BookAccount", "Value": "BookAccountCode", "HeaderValue": "BookAccount", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "LedgerAccount", "Value": "LedgerAccountCode", "HeaderValue": "LedgerAccount", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "CrAmt", "HeaderValue": "CrAmt", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No"	,"NumberType": $scope.Amt },
                { "HeaderText": "DrAmt", "HeaderValue": "DrAmt", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No"	,"NumberType": $scope.Amt },
                { "HeaderText": "Confirm", "Value": "TransId", "HeaderValue": "VoucherConfirm", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" },
                { "HeaderText": "VoucherNarr", "HeaderValue": "VoucherNarr", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" },
                { "HeaderText": "Chq_Date", "HeaderValue": "Chq_Date", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" },
                { "HeaderText": "Chq_No", "HeaderValue": "Chq_No", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" },
                { "HeaderText": "TransferMode", "HeaderValue": "TransferMode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" },
            ];

            $scope.LedgerVoucherList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
               
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(FindHtml(row[10])).val();
              
                $scope.LedgerVoucherList = $filter('filter')($scope.LedgerVoucherList, { 'TransId': $scope.hfId });
                $scope.VoucherModel = $(FindHtml(row[1])).val();
                $scope.PVNo = row[2];
                $scope.PVDate = new Date(moment(row[3], 'DD-MM-YYYY'));
                $scope.CVNo = row[4];
                $scope.CVDate = new Date(moment(row[5], 'DD-MM-YYYY'));

                $scope.CashBankACModel = $(FindHtml(row[6])).val();
                $scope.VConfirm = FindText(row[10]) == "Yes" ? true : false;
                $scope.VNarration = row[11];
                if (row[12] != null && row[12] != '')
                    $scope.ChequeDate = new Date(moment(row[12], 'DD-MM-YYYY'));
                $scope.ChequeNo = row[13];
                $scope.TransModeModel = row[14];


                var collectionobj = {};
                collectionobj.Action = 5;
                collectionobj.FYId = fyId;
                collectionobj.RelationshipId = relationshipId;
    
                collectionobj.VoucherType = $scope.VoucherModel;
                collectionobj.TransId = $scope.hfId;
            
                var getData = myService.methode('POST', "../Api/AccountTransactionApi/GetLedgerVoucher", collectionobj);
                getData.then(function (response)
                {
                    $scope.VoucherData = response.data
                    $scope.DrSum();
                    $scope.CrSum();
                })
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#ddlCashBankLedger', true);
                $scope.hideLoader();
            });
        });
    };

    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {

       
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.TransId = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.BranchCode = branchCode; 
        collectionobj.FYId = fyId;
        collectionobj.UpdatedBy = userid;

        var getData = myService.methode('POST', "../Api/AccountTransactionApi/InsertUpdateDeleteVoucherLedger", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data[0])) {
                $scope.ClearControl(1);
            }
        });
    };

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

        $scope.PrintVoucher($scope.hfId, $scope.VoucherModel);
    };
    $scope.BackToUrl = function () {
        location.href = "/AccountTransaction/CashDepositInBank";
    };
}
app.AdmissionJournalVoucherController = function ($scope, $element, $filter, myService) {
    $scope.VoucherModel = "ADMJV";
    $scope.VoucherData = [];
    $scope.TotalCrAmt = 0;
    $scope.TotalDrAmt = 0;

    $scope.$watch('VoucherModel', function () {
        $scope.Voucherdisability = true;
        if ($scope.Save == "Save" && transId == null) {
            $scope.CheckVoucherConfirm();
        }
        $scope.BindTransModes();
    });

    $scope.AddRow = function () {
        if (isValidateList()) {
            debugger;
            if (typeof ($scope.VoucherDataobj.SubCode) !== 'undefined') {
                $scope.VoucherData.push({
                    DrCr: $scope.VoucherDataobj.DrCr,
                    SubCode: $scope.VoucherDataobj.SubCode,
                    DrAmount: $scope.VoucherDataobj.DrAmount,
                    CrAmount: $scope.VoucherDataobj.CrAmount,
                    ENarr: $scope.VoucherDataobj.ENarr,
                    RuningBalance: $scope.VoucherDataobj.RuningBalance
                });
                $scope.CallNewRow();
                $scope.ResetVirtualTable();
                setTimeout(function () { $('#ddlDrCr').focus(); }, 500);
            }
        }
    };

    $scope.DrSum = function () {
        if (!isNaN($scope.VoucherDataobj.DrAmount)) {
            $scope.TotalDrAmt =  $scope.ConvertAmountToDecimalPoint((Number($scope.VoucherData.sum('DrAmount')) + Number($scope.VoucherDataobj.DrAmount)).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 }));
        }
        else {
            $scope.TotalDrAmt =  $scope.ConvertAmountToDecimalPoint((Number($scope.VoucherData.sum('DrAmount'))).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 }));
        }

    }

    $scope.CrSum = function () {
        if (!isNaN($scope.VoucherDataobj.CrAmount)) {
            $scope.TotalCrAmt =  $scope.ConvertAmountToDecimalPoint((Number($scope.VoucherData.sum('CrAmount')) + Number($scope.VoucherDataobj.CrAmount)).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 }));
        }
        else {
            $scope.TotalCrAmt =  $scope.ConvertAmountToDecimalPoint((Number($scope.VoucherData.sum('CrAmount'))).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 }));
        }
    }

    $scope.ResetVirtualTable = function () {
        $scope.VoucherDataobj = {
            DrCr: "D",
            SubCode: "",
            DrAmount: "",
            CrAmount: "",
            ENarr: "",
            RuningBalance: "",
        };
    }

    $scope.CallNewRow = function () {
        setTimeout(function () {

            if ($scope.VoucherData.length == 1) {
                if ($scope.VoucherDataobj.DrCr == "D") {
                    $scope.CNRCrDR = "C";
                    $scope.CNRDrAmount = "";
                    $scope.CNRCrAmount = (Number($scope.VoucherData.sum('DrAmount'))).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 });
                }
                else {
                    $scope.CNRCrDR = "D";
                    $scope.CNRDrAmount = (Number($scope.VoucherData.sum('CrAmount'))).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 });
                    $scope.CNRCrAmount = "";

                }

            }
            else if ($scope.VoucherData.length > 1) {
            
                if ($scope.VoucherData[$scope.VoucherData.length-1].DrCr == "D") {

                    $scope.CNRCrDR = "D";

                    if (Number($scope.VoucherData.sum('DrAmount')) > Number($scope.VoucherData.sum('CrAmount')))
                    { $scope.CNRDrAmount =  $scope.ConvertAmountToDecimalPoint((Number($scope.VoucherData.sum('DrAmount')) - Number($scope.VoucherData.sum('CrAmount'))).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 })); }
                    else
                    { $scope.CNRDrAmount = $scope.ConvertAmountToDecimalPoint((Number($scope.VoucherData.sum('CrAmount')) - Number($scope.VoucherData.sum('DrAmount'))).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 })); }
                
                    $scope.CNRCrAmount = "";

                }
                else {
                    $scope.CNRCrDR = "C";

                    if (Number($scope.VoucherData.sum('DrAmount')) > Number($scope.VoucherData.sum('CrAmount')))
                    { $scope.CNRCrAmount =  $scope.ConvertAmountToDecimalPoint((Number($scope.VoucherData.sum('DrAmount')) - Number($scope.VoucherData.sum('CrAmount'))).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 })) }
                    else
                    { $scope.CNRCrAmount =  $scope.ConvertAmountToDecimalPoint((Number($scope.VoucherData.sum('CrAmount')) - Number($scope.VoucherData.sum('DrAmount'))).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 })) }

                    $scope.CNRDrAmount = "";
                }
            }

            $scope.VoucherDataobj = {
                DrCr: $scope.CNRCrDR,
                SubCode: "",
                DrAmount: $scope.ConvertAmountToDecimalPoint($scope.CNRDrAmount),
                CrAmount: $scope.ConvertAmountToDecimalPoint($scope.CNRCrAmount),
                ENarr: "",
                RuningBalance: "",
            };
            $scope.TotalCrAmt = 0;
            $scope.TotalDrAmt = 0;
            $scope.DrSum();
            $scope.CrSum();

            $scope.$applyAsync();

        }, 100)
    }

    $scope.ResetCrDr = function (dc, c, d,i) {
        $scope.TotalCrAmt = 0;
        $scope.TotalDrAmt = 0;
        if (dc == "D") {
            if (i == '-1')
            { $scope.VoucherDataobj.DrAmount = c; $scope.VoucherDataobj.CrAmount = "";}
            else
            { $scope.VoucherData[i].DrAmount = c; $scope.VoucherData[i].CrAmount = ""; }
           
            $scope.DrSum();
            $scope.CrSum();
        }
        else {
            if (i == '-1') {$scope.VoucherDataobj.DrAmount = ""; $scope.VoucherDataobj.CrAmount = d;}
            else { $scope.VoucherData[i].DrAmount = ""; $scope.VoucherData[i].CrAmount = d; }

            $scope.DrSum();
            $scope.CrSum();
        }
    }



    $scope.RemoveRow = function (index) {
        $scope.VoucherData.splice(index, 1);
        $scope.TotalDrAmt =  $scope.ConvertAmountToDecimalPoint((Number($scope.VoucherData.sum('DrAmount'))).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 }));
        $scope.TotalCrAmt =  $scope.ConvertAmountToDecimalPoint((Number($scope.VoucherData.sum('CrAmount'))).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 }));
    };

    $scope.SaveRecord = function () {
        if (isValidate()) {
            //if ($scope.voucherdata.length == 0) {
            //    showmsgbox('99999');
            //    return;
            //}
            //if ($scope.voucherdata.length >= 1) {
                if (Number($scope.TotalDrAmt) === Number($scope.TotalCrAmt)) {
                    debugger;
                    $scope.showLoader();
                    var collectionobj = {};

                    collectionobj.VoucherType = $scope.VoucherModel;
                    collectionobj.PVNo = $scope.PVNo;
                    collectionobj.PVDate = moment($scope.PVDate).format('YYYY-MMM-DD');

                    if ($scope.CVNo == 'undefined') return
                    collectionobj.CVNo = $scope.CVNo;

                    if ($scope.CVDate == 'undefined') return
                    collectionobj.CVDate = moment($scope.CVDate).format('YYYY-MMM-DD');

                    collectionobj.VoucherNarr = $scope.VNarration;
                    collectionobj.VoucherConfirm = $scope.VConfirm;

                    if ($scope.ChequeDate != undefined && $scope.ChequeDate != '')
                        collectionobj.ChequeDate = ($scope.ChequeDate != undefined && $scope.ChequeDate != '') ? moment($scope.ChequeDate).format('YYYY-MMM-DD') : null;

                    collectionobj.ChequeNo = $scope.ChequeNo;
                    collectionobj.TransferMode = $scope.TransModeModel;

                    $scope.AddRow();
                    collectionobj.VoucherData = JSON.stringify($scope.VoucherData);

                    collectionobj.IsActive = $scope.IsActive;
                    collectionobj.SessionId = sessionId;
                    collectionobj.FYId = fyId;
                    collectionobj.RelationshipId = relationshipId;
                    

                    if ($scope.Save == "Save") {
                        collectionobj.Action = 1;
                        collectionobj.CreatedBy = userid;
                        var getData = myService.methode('POST', "../Api/AccountTransactionApi/InsertUpdateDeleteVoucherLedger", collectionobj);
                        getData.then(function (response) {
                            if (response.data != null && response.data.length > 0)
                            if (showMsgBox(response.data[0])) {
                                $scope.ClearControl(1);
                            }
                        });
                    }
                    else {
                        collectionobj.Action = 2;
                        collectionobj.TransID = $scope.hfId;
                        collectionobj.UpdatedBy = userid;
                        var getData = myService.methode('POST', "../Api/AccountTransactionApi/InsertUpdateDeleteVoucherLedger", collectionobj);
                        getData.then(function (response) {
                            if (response.data != null && response.data.length > 0)
                            if (showMsgBox(response.data[0])) {
                                $scope.ClearControl(1);
                            }
                        });
                    }

                }
                else {
                    debugger;
                    showMsgBox('9999');

                }
            //}
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
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.VNarration = "";
        $scope.SetFocus('#ddlDrCr');
        $scope.IsActive = "";
        $scope.TransModeModel = "";
        $scope.ChequeNo = "";
        $scope.ChequeDate = "";
        $scope.hfId = "";
        if (transId != null) {
            var href = window.location.href;
            window.location.href = href.split('?')[0];
        }
        $scope.VoucherData = [];
        $scope.LedgerVoucherList = [];
        $scope.ResetVirtualTable();
        $scope.TotalCrAmt = 0;
        $scope.TotalDrAmt = 0;
        $scope.BindVoucherKeys($scope.VConfirm);
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

    $scope.started = function () {
        $scope.ResetVirtualTable();
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        
        collectionobj.VoucherType = $scope.VoucherModel;
        debugger;
        var getData = myService.methode('POST', "../Api/AccountTransactionApi/GetLedgerVoucher", collectionobj);
        getData.then(function (response) {

            var tblheader =
            [
                { "HeaderText": "Srno","HeaderValue": "TransId", "Width": "50px", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "V_Type", "Value": "V_Type", "HeaderValue": "V_Type", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" },
                { "HeaderText": "PVNo.", "HeaderValue": "PVNO", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "PVDate","HeaderValue": "PVDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "CVNo",  "HeaderValue": "CVNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "CVDate","HeaderValue": "CVDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "BookAccount", "Value": "BookAccountCode", "HeaderValue": "BookAccount", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "LedgerAccount", "Value": "LedgerAccountCode", "HeaderValue": "LedgerAccount", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "CrAmt", "HeaderValue": "CrAmt", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "NumberType": $scope.Amt },
                { "HeaderText": "DrAmt", "HeaderValue": "DrAmt", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "NumberType": $scope.Amt },
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
                debugger;
                $scope.LedgerVoucherList = $filter('filter')($scope.LedgerVoucherList, { 'TransId': $scope.hfId });
                $scope.VoucherModel = $(FindHtml(row[1])).val(); 
                $scope.PVNo = row[2];
                $scope.PVDate = new Date(moment(row[3], 'DD-MM-YYYY'));
                $scope.CVNo = row[4];
                $scope.CVDate = new Date(moment(row[5], 'DD-MM-YYYY'));
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
                debugger;
                var getData = myService.methode('POST', "../Api/AccountTransactionApi/GetLedgerVoucher", collectionobj);
                getData.then(function (response) {
                    $scope.VoucherData = response.data
                    $scope.DrSum();
                    $scope.CrSum();

                })

                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#ddlCashAC', true);
                $scope.hideLoader();


            });
        });
    };

    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {

        debugger;
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.TransId = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        
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
      
        $scope.PrintVoucher($scope.hfId,$scope.VoucherModel);
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
   
}
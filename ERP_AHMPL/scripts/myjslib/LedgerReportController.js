app.LedgerReportController = function ($scope, $element, $filter, myService) {
  
    $scope.BindAccountName = function () {
        debugger;
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        
        var getData = myService.methode('POST', "../Api/AccountMasterApi/GetAccountName", collectionobj);
        getData.then(function (response) {
            $scope.BindAccount = response.data;
        });

    };
    $scope.SearchRecord = function ()
    {
        if (isValidate()) {
            $('#CollapseSearchTableList').attr('class', 'collapse');
            $scope.started();
        }
    };
    $scope.started = function ()
    {
        if (subcode != null) {
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
                    //$scope.hfId = transid;
                }, 500);

            }
        }
        var collectionobj = {};
        collectionobj.RelationshipId = relationshipId;
         
        collectionobj.FYId = fyId;
        collectionobj.Action = 6;
        collectionobj.FromDate = moment($scope.FromDate).format('YYYY-MMM-DD');
        collectionobj.ToDate = moment($scope.ToDate).format('YYYY-MMM-DD');
        collectionobj.SubCode = $scope.SubCode;
        collectionobj.EntryNarration = $scope.EntryNarration?"1":"0";
        collectionobj.VoucherNarration = $scope.VoucherNarration ? "1" : "0";
        var getData = myService.methode('POST', "../Api/AccountReportApi/GetLedgerReport", collectionobj);
        getData.then(function (response)
        {
            $scope.LedgerList = $filter('filter')($scope.BindAccount, { 'SubCode': $scope.SubCode });
           
            messagevalues = [
                    { "FromDate": moment($scope.FromDate).format('DD-MMM-YYYY') }, 
                    { "ToDate": moment($scope.ToDate).format('DD-MMM-YYYY') },
                    { "Account Name": $scope.LedgerList[0].Name }                
            ];
            var tblheader =
                [
                    { "HeaderText": "SrNo", "Value": "TransId", "HeaderValue": "rownum", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Date", "Value": "RefVoucherType", "HeaderValue": "Date", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Voucher Type", "HeaderValue": "V_Type", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Number", "HeaderValue": "CvNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Particular", "HeaderValue": "Name", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "FooterText": "Total" },
                    { "HeaderText": "Dr", "HeaderValue": "DebitAmt", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right", "Fun": "Sum", "NumberType": $scope.Amt },
                    { "HeaderText": "Cr", "HeaderValue": "CreditAmt", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right", "Fun": "Sum", "NumberType": $scope.Amt },
                    { "HeaderText": "Balance", "HeaderValue": "Balance", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right", "NumberType": $scope.Amt },
                    { "HeaderText": "DR/CR", "HeaderValue": "DRCR", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right" }
                ];
            $('#CollapseSearchTableList').attr('class', 'collapse in');
            loadDataUsingPreDefinedColumn(tblheader, response.data,'asc');
            $('#example tbody').on('dblclick', 'tr', function () {
                var row = $('#example').DataTable().row(this).data();
                var RefVoucherType = $(FindHtml(row[1])).val();
                if (row[2] == 'FDST') {
                    $scope.SelectIframoutiframe("/FeeTransaction/FeeDeposit", "Fees Deposit", $(FindHtml(row[0])).val(), branchCode, "No");
                }
                if (row[2] == 'AFDST') {
                    $scope.SelectIframoutiframe("/FeeTransaction/AdmissionFeeDeposit", "Admission Fees Deposit", $(FindHtml(row[0])).val(), branchCode, "No");
                }
                else if (row[2] == 'PBLCR' || row[2] == 'PBLCS') {
                    $scope.SelectIframoutiframe("/Purchase/PurchaseBill", "Purchase Bill", $(FindHtml(row[0])).val(), branchCode, "No");
                }
                else if (row[2] == 'PJBCR' || row[2] == 'PJBCS') {
                    $scope.SelectIframoutiframe("/Purchase/PServiceBill", "Purchase Service Bill", $(FindHtml(row[0])).val(), branchCode, "No");
                }
                else if (row[2] == 'SBLCR' || row[2] == 'SBLCS') {
                    $scope.SelectIframoutiframe("/Sale/SaleBill", "Sale Bill", $(FindHtml(row[0])).val(), branchCode, "No");
                }
                else if (row[2] == 'JBLCR' || row[2] == 'JBLCS') {
                    $scope.SelectIframoutiframe("/Sale/ServiceBill", "Service Bill", $(FindHtml(row[0])).val(), branchCode, "No");
                }
                else if (row[2] == 'JV') {
                    if (RefVoucherType == 'PLPAY')
                        $scope.SelectIframoutiframe("/Report/MaterialPartyWise", "Party Payment Sheet", $(FindHtml(row[0])).val(), branchCode, "No");
                    else if (RefVoucherType == 'TRANS')
                        $scope.SelectIframoutiframe("/Report/TransporterLedger", "Transporter Ledger", $(FindHtml(row[0])).val(), branchCode, "No");
                    else
                        $scope.SelectIframoutiframe("/AccountTransaction/JournalVoucher", "Journal Voucher", $(FindHtml(row[0])).val(), branchCode, "No");
                }
                else if (row[2] == 'CONT') {
                    $scope.SelectIframoutiframe("/AccountTransaction/ContraVoucher", "Contra Voucher", $(FindHtml(row[0])).val(), branchCode, "No");
                }
                else if (row[2] == 'CP') {
                    $scope.SelectIframoutiframe("/AccountTransaction/CashPaymentVoucher", "Cash Payment Voucher", $(FindHtml(row[0])).val(), branchCode, "No");
                }
                else if (row[2] == 'BP') {
                    $scope.SelectIframoutiframe("/AccountTransaction/BankPaymentVoucher", "Bank Payment Voucher", $(FindHtml(row[0])).val(), branchCode, "No");
                }
                else if (row[2] == 'CR') {
                    $scope.SelectIframoutiframe("/AccountTransaction/CashReceiveVoucher", "Cash Receive Voucher", $(FindHtml(row[0])).val(), branchCode, "No");
                }
                else if (row[2] == 'BR') {
                    $scope.SelectIframoutiframe("/AccountTransaction/BankReceiveVoucher", "Bank Receive Voucher", $(FindHtml(row[0])).val(), branchCode, "No");
                }
                //OPBAL no need to open
                //    }
                //});
            });
        });
    }


    var subcode = getParameterByName('SubCode');
    var locked = getParameterByName('Locked');
    var fromdate = getParameterByName('FromDate');
    var todate = getParameterByName('ToDate');
    $scope.$watch('BindAccount', function () {
        if (typeof ($scope.BindAccount) != 'undefined') {
            if (subcode != null) {
                $scope.FromDate = new Date(fromdate);
                $scope.ToDate = new Date(todate);
                $scope.SubCode = subcode;
                $scope.EntryNarration = false;
                $scope.VoucherNarration = true;
                $scope.$applyAsync();
                setTimeout(function () {
                    $scope.SearchRecord();
                }, 1000);
            }
        }   
    })
    
}
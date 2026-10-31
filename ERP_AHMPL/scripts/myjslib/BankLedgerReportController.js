app.BankLedgerReportController = function ($scope, $element, $filter, myService) {

    $scope.BindBankingLedgers = function () {
        debugger;
        var collectionobj = {};
        collectionobj.Action = 1;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        
        
        
        var getData = myService.methode('POST', "../Api/AccountMasterApi/GetAccountName", collectionobj);
        getData.then(function (response) {
            $scope.BindBankingLedger = response.data;
        });
        $scope.EntryNarration = true;
        $scope.VoucherNarration = true;
    };
    $scope.SearchRecord = function () {
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };
    $scope.started = function () {
        debugger;
        var collectionobj = {};
        collectionobj.RelationshipId = relationshipId;
        
        
        
        collectionobj.FYId = fyId;
        collectionobj.Action = 2;
        collectionobj.FromDate = moment($scope.FromDate).format('YYYY-MMM-DD');
        collectionobj.ToDate = moment($scope.ToDate).format('YYYY-MMM-DD');
        collectionobj.SubCode = $scope.BankingSubCode;
        collectionobj.EntryNarration = $scope.EntryNarration ? "1" : "0";
        collectionobj.VoucherNarration = $scope.VoucherNarration ? "1" : "0";
        var getData = myService.methode('POST', "../Api/AccountReportApi/GetLedgerReport", collectionobj);
        getData.then(function (response) {
            $scope.LedgerList = $filter('filter')($scope.BindBankingLedger, { 'SubCode': $scope.BankingSubCode });

            messagevalues = [
                    { "From Date": moment($scope.FromDate).format('DD-MMM-YYYY') },
                    { "To Date": moment($scope.ToDate).format('DD-MMM-YYYY') },
                    { "Account Name": $scope.LedgerList[0].Name }

            ];
            var tblheader =
             [
                { "HeaderText": "SrNo", "Value": "TransId", "HeaderValue": "rownum", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Date", "Value": "RefVoucherType", "HeaderValue": "Date", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Voucher Type", "HeaderValue": "V_Type", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Number", "HeaderValue": "CvNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Cheque No", "HeaderValue": "ChqNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Cheque Date", "HeaderValue": "ChqDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

                { "HeaderText": "Particular", "HeaderValue": "Name", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "FooterText": "Total" },
                { "HeaderText": "Dr", "HeaderValue": "DebitAmt", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right", "Fun": "Sum", "NumberType": $scope.Amt },
                { "HeaderText": "Cr", "HeaderValue": "CreditAmt", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right", "Fun": "Sum", "NumberType": $scope.Amt },
                { "HeaderText": "Balance", "HeaderValue": "Balance", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right", "NumberType": $scope.Amt },
                { "HeaderText": "DR/CR", "HeaderValue": "DRCR", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right" }
             ];

            loadDataUsingPreDefinedColumn(tblheader, response.data, 'asc');
            $('#example tbody').on('dblclick', 'tr', function () {
                var row = $('#example').DataTable().row(this).data();
                //var collectionobj = {};
                //collectionobj.RelationshipId = relationshipId;
                //
                //
                //
                //collectionobj.FYId = fyId;
                //collectionobj.Action = 8;
                //collectionobj.TransId = $(FindHtml(row[0])).val();
                //var getData = myService.methode('POST', "../Report/GetLedgerReport", collectionobj);
                //getData.then(function (response) {
                //    var result = Object.valueOf(response.data);
                //    if (result == '1') {
                var RefVoucherType = $(FindHtml(row[1])).val();
                if (row[2] == 'PBLCR' || row[2] == 'PBLCS') {
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
                        $scope.SelectIframoutiframe("/Voucher/JournalVoucher", "Journal Voucher", $(FindHtml(row[0])).val(), branchCode, "No");
                }
                else if (row[2] == 'CONT') {
                    $scope.SelectIframoutiframe("/Voucher/ContraVoucher", "Contra Voucher", $(FindHtml(row[0])).val(), branchCode, "No");
                }
                else if (row[2] == 'CP') {
                    $scope.SelectIframoutiframe("/Voucher/CashPaymentVoucher", "Cash Payment Voucher", $(FindHtml(row[0])).val(), branchCode, "No");
                }
                else if (row[2] == 'BP') {
                    $scope.SelectIframoutiframe("/Voucher/BankPaymentVoucher", "Bank Payment Voucher", $(FindHtml(row[0])).val(), branchCode, "No");
                }
                else if (row[2] == 'CR') {
                    $scope.SelectIframoutiframe("/Voucher/CashRecieveVoucher", "Cash Receive Voucher", $(FindHtml(row[0])).val(), branchCode, "No");
                }
                else if (row[2] == 'BR') {
                    $scope.SelectIframoutiframe("/Voucher/BankRecieveVoucher", "Bank Receive Voucher", $(FindHtml(row[0])).val(), branchCode, "No");
                }
                //OPBAL no need to open
                //    }
                //});
            });
        });
    }
}
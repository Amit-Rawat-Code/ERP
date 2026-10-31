app.OnlineFeePaymentReportController = function ($scope, $element, $filter, myService) {

    $scope.SearchRecord = function () {
        if (isValidate()) {
            $('#collapseinputbox').attr('class', 'collapse in');
            $('#CollapseSearchTableList').attr('class', 'collapse');
            $scope.started();
        }
    };
   
    $scope.started = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.SessionId = sessionId;
        collectionobj.FromDate = moment($scope.FromDate).format('YYYY-MMM-DD');
        collectionobj.ToDate = moment($scope.ToDate).format('YYYY-MMM-DD');
        collectionobj.RelationshipId = relationshipId;
        collectionobj.Action = $scope.ReportCategory == 'FRG' ? '1' : '2';
        var getData = myService.methode('POST', "../Api/OnlinePaymentReportApi/GetPaymentReport", collectionobj);
        getData.then(function (response) {
            var tblheader = '';
            //$('#UpdatePanel').text('');
            messagevalues = [
                {
                    "From Date": moment($scope.FromDate).format('DD-MMM-YYYY'),
                    "To Date": moment($scope.ToDate).format('DD-MMM-YYYY')
                }
            ];
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Admission No.", "HeaderValue": "AdmissionNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Class", "HeaderValue": "ClassSection", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Student Name", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Father Name", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Mobile", "HeaderValue": "Mobile", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Payment<br>Ref. Id", "HeaderValue": "OrderId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Payment<br>Date", "HeaderValue": "PaymentDateTime", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Bank<br>Ref. No.", "HeaderValue": "BankRefId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Payment<br>Response Date", "HeaderValue": "ResponseDateTime", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Amount", "HeaderValue": "Amount", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Payment<br>Status<br>(ERP)", "HeaderValue": "OrderStatus", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Payment<br>Status<br>(Bank)", "HeaderValue": "GatewayOrderStatus", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Fee<br>Receipt No.", "HeaderValue": "FeeReceiptNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            loadDataUsingPreDefinedColumn(tblheader, response.data);
        });
    }
}
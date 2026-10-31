app.HDFCGatewayResponseController = function ($scope, $element, $filter, myService) {
    $scope.PaymentStatus = "";
    $scope.PaymentOrderId = "";
    $scope.PaymentTransId = "";

    $scope.HDFCPayment = function () {
        var collectionobj = {};
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.CreatedBy = userid;
        var getDetails = myService.methode('POST', '/PaymentGateway/GetHDFCGatewayResponse', collectionobj);
        getDetails.then(function (response) {
            console.log(response.data);
            if (response.data != null && response.data != '') {
                $scope.PaymentStatus = response.data["order_status"];
                $scope.PaymentOrderId = response.data["order_id"];
                $scope.BankRefNo = response.data["bank_ref_no"];
                $scope.Amount = response.data["amount"];
            }
            if ($scope.PaymentStatus != undefined && $scope.PaymentStatus != '' && $scope.PaymentStatus == null)
                localStorage.setItem("PaymentStatus", $scope.PaymentStatus);
        });
    };
    $scope.HDFCPayment();
}
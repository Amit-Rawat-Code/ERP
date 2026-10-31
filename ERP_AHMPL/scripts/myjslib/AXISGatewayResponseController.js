app.AXISGatewayResponseController = function ($scope, $element, $filter, myService) {

    $scope.PaymentStatus = "";
    $scope.PaymentOrderId = "";
    $scope.PaymentTransId = "";

    $scope.AxisPayment = function () {
        var collectionobj = {};
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.CreatedBy = userid;
        var getDetails = myService.methode('POST', '/PaymentGateway/GetAXISGatewayResponse', collectionobj);
        getDetails.then(function (response) {
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
    $scope.AxisPayment();
}
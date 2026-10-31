app.ICICIGatewayResponseController = function ($scope, $element, $filter, myService) {
    $scope.PaymentStatus = "";
    $scope.PaymentOrderId = "";
    $scope.PaymentTransId = "";

    $scope.AxisPayment = function () {
        var getDetails = myService.methode('GET', '/PaymentGateway/GetICICIGatewayResponse');
        getDetails.then(function (response) {
            if (response.data != null && response.data != '') {
                console.log(response.data);
                //$scope.PaymentStatus = response.data["order_status"];
                //$scope.PaymentOrderId = response.data["order_id"];
                //$scope.BankRefNo = response.data["bank_ref_no"];
                //$scope.StudentName = response.data["merchant_param1"];
                //$scope.AdmissionNo = response.data["merchant_param2"];
                //$scope.ClassName = response.data["merchant_param3"];
                //$scope.FatherName = response.data["merchant_param4"];
                //$scope.MobileNo = response.data["merchant_param5"];
            }
            if ($scope.PaymentStatus.toUpperCase() == "SUCCESS")
                localStorage.setItem("PaymentStatus", "Success");
        });
    };
    $scope.AxisPayment();
}
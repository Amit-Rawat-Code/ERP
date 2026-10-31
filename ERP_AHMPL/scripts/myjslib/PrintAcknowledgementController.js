app.PrintAcknowledgementController = function ($scope) {
    var paymentHistory = JSON.parse(sessionStorage.getItem('paymentHistory'));
    $scope.PaymentStatus = paymentHistory["OrderStatus"];
    $scope.PaymentOrderId = paymentHistory["OrderId"];
    $scope.BankRefNo = paymentHistory["BankRefId"];
    $scope.Amount = paymentHistory["Amount"];

    $scope.CloseWindow = function () {
        sessionStorage.removeItem('paymentHistory');
    }
}
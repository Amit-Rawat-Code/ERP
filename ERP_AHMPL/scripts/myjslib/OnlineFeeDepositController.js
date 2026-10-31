app.OnlineFeeDepositController = function ($scope, $element, $filter, myService) {
    $scope.paymentRequest = {};
    $scope.btnClass = 'btn-primary';
    $scope.StudentCode = code;
    sessionStorage.removeItem('paymentHistory');

    $scope.FinalStudentsList_Promiss(1, sessionId, $scope.StudentCode).then(function () {
        var student = $scope.StudentList[0];
        $scope.AdmissionNo = student.AdmissionNo
        $scope.StudentPhoto = student.StudentPhoto;
        $scope.StudentCode = student.StudentCode;
        $scope.ClassCode = student.ClassCode;
        $scope.StudentName = student.Name;
        $scope.Address = student.Address
        $scope.ParentName = student.FatherName
        $scope.Contact = student.Mobile
        $scope.SessionName = student.SessionName
        $scope.StudentDOB = new Date(student.DOB)
        $scope.ClassName = student.ClassName
        $scope.EmailId = student.EmailId
    });

    $scope.ShowStudentFeeCard = function () {
        var collectionobj = {};
        collectionobj.Action = 10;
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetStudentWiseFeeStructure', collectionobj);
        getData.then(function (response) {
            $scope.StudentFeeDetails = response.data.Table;
        });
    }

    $scope.GetPaymentHistory = function () {
        var collectionobj = {};
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.fyId = fyId;
        collectionobj.CreatedBy = userid;
        var getData = myService.methode('POST', '../Api/OnlinePaymentReportApi/GetPaymentHistory', collectionobj);
        getData.then(function (response) {
            $scope.PaymentHistory = response.data;
            angular.forEach($scope.PaymentHistory,async function (orderDetail) {
                if (orderDetail.OrderStatus == '' || orderDetail.OrderStatus == undefined || orderDetail.OrderStatus == null)
                    await $scope.PaymentVarify(orderDetail).then(function (response) {
                    console.log(response);
                    orderDetail.OrderStatus = response
                });
            })
            
        });
    }

    $scope.CheckInstallments = function (index,ischecked) {
        if (ischecked) {
            angular.forEach($scope.StudentFeeDetails.length, function (feedetails) {
                feedetails.Chk = false
            });
            for (var i = 0; i < $scope.StudentFeeDetails.length; i++) {
                var feedetails = $scope.StudentFeeDetails[i];
                if (feedetails.FeeStatus != 'Paid') {
                    feedetails.Chk = true
                }
                if (i == index)
                    return;
            }

        }
        else {
            for (var i = index; i < $scope.StudentFeeDetails.length; i++) {
                var feedetails = $scope.StudentFeeDetails[i];
                feedetails.Chk = false;
            }
        }
    }

    $scope.FeePayment = function () {
        if ($scope.StudentList.length > 0) {
            $scope.paymentRequest.StudentCode = $scope.StudentCode;
            $scope.paymentRequest.StudentName = $scope.StudentName;
            $scope.paymentRequest.AdmissionNo = $scope.AdmissionNo;
            $scope.paymentRequest.ClassSection = $scope.ClassName;
            $scope.paymentRequest.Remark = 'Total amount to be paid:' + $scope.paymentRequest.AMT;
            $scope.paymentRequest.EmailId = $scope.EmailId;
            $scope.paymentRequest.MobileNo = $scope.Contact;
            $scope.paymentRequest.RelationshipId = relationshipId;
            $scope.paymentRequest.SessionId = sessionId;
            $scope.paymentRequest.FYId = fyId;
            $scope.paymentRequest.CreatedBy = userid;


            $scope.paymentRequest.customer_identifier = $scope.StudentCode;
            $scope.paymentRequest.currency = "INR";
            $scope.paymentRequest.billing_name = $scope.StudentName;
            $scope.paymentRequest.billing_country = $scope.CountryName;
            $scope.paymentRequest.billing_state = $scope.StateName;
            $scope.paymentRequest.billing_city = $scope.CityName;
            $scope.paymentRequest.billing_zip = $scope.PinCode;
            $scope.paymentRequest.billing_address = $scope.Address;
            $scope.paymentRequest.billing_tel = $scope.Contact;
            $scope.paymentRequest.billing_email = $scope.EmailId;

            $scope.paymentRequest.delivery_name = $scope.StudentName;
            $scope.paymentRequest.delivery_country = $scope.CountryName;
            $scope.paymentRequest.delivery_state = $scope.StateName;
            $scope.paymentRequest.delivery_city = $scope.CityName;
            $scope.paymentRequest.delivery_zip = $scope.PinCode;
            $scope.paymentRequest.delivery_address = $scope.Address;
            $scope.paymentRequest.delivery_tel = $scope.Contact;

            $scope.paymentRequest.merchant_param1 = $scope.StudentName;
            $scope.paymentRequest.merchant_param2 = $scope.AdmissionNo;
            $scope.paymentRequest.merchant_param3 = $scope.ClassName;
            $scope.paymentRequest.merchant_param4 = $scope.FatherName;
            $scope.paymentRequest.merchant_param5 = $scope.Contact;

            $scope.paymentRequest.amount = $scope.paymentRequest.AMT;

            var studentFeeDetails = JSON.stringify($filter('filter')($scope.StudentFeeDetails, { Chk: true }, true));
            var getDetails = myService.methode('POST', '/Api/PaymentGatewayApi/PaymentRequest', { paymentDetails: $scope.paymentRequest, relationshipId: relationshipId, studentFeeDetails: studentFeeDetails });
            getDetails.then(function (response) {
                $scope.StatusCode = response.data.StatusCode
                $scope.ErrorMsg = response.data.ErrorMsg
                if ($scope.StatusCode == "1") {
                    $scope.PlainText = response.data.PlainText
                    $scope.EncryptedText = response.data.EncryptedText
                    localStorage.setItem('PaymentStatus', "Pending")
                    $scope.btndisabled = true;
                    $scope.btnClass = 'btn-warning';
                    var tab = window.open('about:blank', "Payment Gateway", "width=500,height=500,left=250,top=150,toolbar=0,status=0,");
                    tab.document.write(response.data.Form); // where 'html' is a variable containing your HTML
                    tab.document.close(); // to finish loading the page
                    var a = setInterval(function () {
                        var status = localStorage.getItem('PaymentStatus');
                        if (status.toUpperCase() == "SUCCESS" || status.toUpperCase() == "FAILURE" || status.toUpperCase() == "ABORTED") {
                            $scope.ShowStudentFeeCard();
                            $scope.GetPaymentHistory();
                            $scope.btndisabled = false;
                            $scope.btnClass = 'btn-primary';
                            $scope.$applyAsync();
                            clearInterval(a);
                        }
                    }, 100);
                }
                else {
                    showMsgBox($scope.ErrorMsg);
                }
            });
        }
    };
    $scope.PaymentVarify = function (orderDetail) {
        var getDetails = myService.methode('POST', '/Api/PaymentGatewayApi/PaymentVarify', { PaymentDetails: orderDetail, RelationshipId: relationshipId, SessionId: sessionId, FYId: fyId, CreatedBy: userid });
        return getDetails.then(function (response) {
            return response.data;
        });
    }

    $scope.PrintAck = function (paymentHistory) {
        sessionStorage.setItem('paymentHistory', JSON.stringify(paymentHistory))
        var tab = window.open('../PaymentGateway/PrintAcknowledgement', "Print Acknowledgement", "width=500,height=500,left=250,top=150,toolbar=0,status=0,");
        tab.document.close(); // to finish loading the page
    }
}
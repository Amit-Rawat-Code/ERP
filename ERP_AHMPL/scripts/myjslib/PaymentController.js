app.PaymentController = function ($scope, $element, $filter, myService) {
    $scope.paymentRequest = {};
    $scope.btnClass = 'btn-primary';

    //$scope.StudentFeeDetails = [
    //    {
    //        Installment: 'Installment-1',
    //        InstallmentCode: 'Installment-1',
    //        Date: '01-Apr-2021',
    //        Amount: '15000.00',
    //        FeeStatus: 'UnPaid',
    //        Chk: false
    //    },
    //    {
    //        Installment: 'Installment-2',
    //        Date: '01-July-2021',
    //        Amount: '15000.00',
    //        FeeStatus: 'UnPaid',
    //        Chk: false
    //    },
    //    {
    //        Installment: 'Installment-3',
    //        Date: '01-Oct-2021',
    //        Amount: '15000.00',
    //        FeeStatus: 'UnPaid',
    //        Chk: false
    //    },
    //    {
    //        Installment: 'Installment-4',
    //        Date: '01-Jan-2022',
    //        Amount: '15000.00',
    //        FeeStatus: 'UnPaid',
    //        Chk: false
    //    }
    //]

    $scope.ShowStudentFeeCard = function () {
        if (relationshipId == 1)
            $scope.StudentCode = '10000019';
        if (relationshipId == 5)
            $scope.StudentCode = '50000001';
        else if (relationshipId == 15)
            $scope.StudentCode = '150002984';
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

    $scope.AxisPayment = function () {
        $scope.paymentRequest.StudentCode = $scope.StudentCode;
        $scope.paymentRequest.StudentName = 'Mohit Gupta';
        if (relationshipId == 5)
            $scope.paymentRequest.AdmissionNo = 'AKIDSS/2223/000001';
        else if (relationshipId == 15)
            $scope.paymentRequest.AdmissionNo = 'DPSELD/2223/000001';
        $scope.paymentRequest.ClassSection = 'V-A';
        $scope.paymentRequest.Remark = 'Total paid amount is:' + $scope.paymentRequest.AMT;
        $scope.paymentRequest.EmailId = 'ermohit1189@gmail.com';
        $scope.paymentRequest.MobileNo = '7017525189'; 
        $scope.paymentRequest.RelationshipId = relationshipId;
        $scope.paymentRequest.SessionId = sessionId;
        $scope.paymentRequest.FYId = fyId;
        $scope.paymentRequest.CreatedBy = userid;

        var studentFeeDetails = JSON.stringify($filter('filter')($scope.StudentFeeDetails, { Chk: true }, true));
        var getDetails = myService.methode('POST', '/Api/PaymentGatewayApi/PaymentRequest', { paymentDetails: $scope.paymentRequest, relationshipId: relationshipId, studentFeeDetails: studentFeeDetails });
        getDetails.then(function (response) {
            $scope.PlainText = response.data.PlainText
            $scope.EncryptedText = response.data.EncryptedText
            localStorage.setItem('PaymentStatus', "Pending")
            $scope.btndisabled = true;
            $scope.btnClass = 'btn-warning';
            var tab = window.open('about:blank', "AXIS", "width=500,height=500,left=250,top=150,toolbar=0,status=0,");
            tab.document.write(response.data.Form); // where 'html' is a variable containing your HTML
            tab.document.close(); // to finish loading the page
            var a = setInterval(function () {
                var status = localStorage.getItem('PaymentStatus');
                if (status == "Success") {
                    $scope.ShowStudentFeeCard();
                    $scope.btndisabled = false;
                    $scope.btnClass = 'btn-primary';
                    $scope.$applyAsync();
                    clearInterval(a);
                }
            }, 100);
        });
    };

    $scope.HDFCPayment = function () {
        $scope.paymentRequest.customer_identifier = $scope.StudentCode;
        $scope.paymentRequest.billing_state = 'MP';
        $scope.paymentRequest.currency = 'INR';
        $scope.paymentRequest.billing_name = 'Charli';
        $scope.paymentRequest.billing_address = 'Room no 1101, near Railway station Ambad';
        $scope.paymentRequest.billing_city = 'Indore';
        $scope.paymentRequest.billing_zip = '425001';
        $scope.paymentRequest.billing_country = 'India';
        $scope.paymentRequest.billing_tel = '9899622605';
        $scope.paymentRequest.billing_email = 'test@gmail.com';
        $scope.paymentRequest.delivery_name = 'Chaplin';
        $scope.paymentRequest.delivery_address = 'room no.701 near bus stand';
        $scope.paymentRequest.delivery_city = 'Hyderabad';
        $scope.paymentRequest.delivery_state = 'Andhra';
        $scope.paymentRequest.delivery_zip = '425001';
        $scope.paymentRequest.delivery_country = 'India';
        $scope.paymentRequest.delivery_tel = '9896426054';
        $scope.paymentRequest.merchant_param1 = 'Mohit Gupta';
        $scope.paymentRequest.merchant_param2 = 'ALLENP/2122/000001';
        $scope.paymentRequest.merchant_param3 = 'V-A';
        $scope.paymentRequest.merchant_param4 = 'Santosh Babu Gupta';
        $scope.paymentRequest.merchant_param5 = '9898909898';

        $scope.paymentRequest.RelationshipId = relationshipId;
        var studentFeeDetails = JSON.stringify($filter('filter')($scope.StudentFeeDetails, { Chk: true }, true));
        var getDetails = myService.methode('POST', '/Api/PaymentGatewayApi/PaymentRequest', { paymentDetails: $scope.paymentRequest, relationshipId: relationshipId, studentFeeDetails: studentFeeDetails });
        getDetails.then(function (response) {
            localStorage.setItem('PaymentStatus', "Pending")
            $scope.btndisabled = true;
            $scope.btnClass = 'btn-warning';
            var tab = window.open('about:blank', "HDFC", "width=500,height=500,left=250,top=150,toolbar=0,status=0,");
            tab.document.write(response.data.Form); // where 'html' is a variable containing your HTML
            tab.document.close(); // to finish loading the page
            var a = setInterval(function () {
                var status = localStorage.getItem('PaymentStatus');
                if (status == "Success") {
                    $scope.ShowStudentFeeCard();
                    $scope.btndisabled = false;
                    $scope.btnClass = 'btn-primary';
                    $scope.$applyAsync();
                    clearInterval(a);
                }
            }, 100);
        });
    };

    $scope.ICICIPayment = function () {
        //var tab = window.open("https://eazypayuat.icicibank.com/EazyPG?merchantid=130228&mandatory fields=XS8+7NxncwPuJ/OWkghwNmB1epHhPlk/lY0BFT+DmzC1olwK8Eh6OU1ug3eVBAYMJXSXnAuXwF65MOLDD6/Z3Q==&optional fields=&returnurl=sxAfdcVFWiN/P4QxlE9e6nIMLLcQUmHTaDVbv7fOp0Mj7GcfPEIW0HguHxAjcvbyMX3byU7ts1Qs0j+ACu2xeg==&Reference No=Txddn/HVWrtIDZ5v7U1n/g==&submerchantid=L65n4YE12K9kjNmIXZNoQA==&transaction amount=6oWKz4+irb+t3owNjtSwPA==&paymode=A1C5ob4l9576S0uQHMjWmA==", "ICICI", "width=500,height=500,left=250,top=150,toolbar=0,status=0,");
        //tab.document.write(response.data); // where 'html' is a variable containing your HTML
        //tab.document.close(); // to finish loading the page
        $scope.paymentRequest.SubmerchantId = "2000001";
        $scope.paymentRequest.AdmissionNo = "ALLENP/2122/000001";
        $scope.paymentRequest.StudentName = "Mohit Gupta";
        $scope.paymentRequest.ClassSection = "I-A";
        $scope.paymentRequest.InstallmentName = "Installment1,Installment2,Installment3,Installment4";
        $scope.paymentRequest.MobileNo = "8787678987";
        $scope.paymentRequest.Remark = "Payment of Installment1,Installment2,Installment3,Installment4";

        var getDetails = myService.methode('POST', '/PaymentGateway/ICICIPaymentRequest', $scope.paymentRequest);
        getDetails.then(function (response) {
            localStorage.setItem('PaymentStatus', "Pending")
            $scope.HDFCPaymentdisabled = true;
            $scope.btnClass = 'btn-warning';
            var tab = window.open('about:blank', "ICICI", "width=500,height=500,left=250,top=150,toolbar=0,status=0,");
            tab.document.write(response.data); // where 'html' is a variable containing your HTML
            tab.document.close(); // to finish loading the page

            var a = setInterval(function () {
                var status = localStorage.getItem('PaymentStatus');
                if (status == "Success") {
                    $scope.ICICIPaymentdisabled = false;
                    $scope.btnClass = 'btn-primary';
                    $scope.$applyAsync();
                    clearInterval(a);
                }
            }, 100);
        });
    };

    $scope.PaymentHistory = [
        {
            order_no: '20000001120422074213',
            reference_no: '1649772600134',
            amount: '1.00'
        }]
    $scope.hdfcResponseBystatusApi = "";
    $scope.HDFCVarify = function (orderDetail) {
        var getDetails = myService.methode('POST', '/Api/PaymentGatewayApi/PaymentVarify', { paymentDetails: orderDetail, relationshipId: relationshipId });
        getDetails.then(function (response) {
            $scope.hdfcResponseBystatusApi = response.data;;
        });
    }
}
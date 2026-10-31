app.RegistrationFeePostingController = function ($scope, $element, $filter, myService) {

    $scope.StudentsList = [];

    setTimeout(function () {
        $scope.Save = "Post Registration Fee";
        $scope.$applyAsync();
    }, 10)


    $scope.CheckUnCheckAll = function (value) {
        angular.forEach($scope.StudentsList, function (array) {
            array.Chk = value;
        });
    }

    $scope.CheckUnCheck = function () {
        var flag = true;
        angular.forEach($scope.StudentsList, function (array) {
            if (array.Chk == false) {
                flag = false;
            }
        });
        $scope.ChkAll = flag;
    }

    $scope.ddlStatus_Change = function () {
        $scope.GetRegistrationFormSaleTransactions();
    }

    $scope.ddlVoucherType_Change = function () {
        if ($scope.VType == 'BR') {
            $('#ddlBankAC').addClass('validate');
            $scope.BindBankLedger();
        }
        else
            $('#ddlBankAC').removeClass('validate');
    }

    $scope.GetRegistrationFormSaleTransactions = function () {
        $scope.ChkAll = false;
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Status = $scope.Status;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.Action = "5";
        var getData = myService.methode('POST', '../Api/RegistrationTransactionApi/GetRegistrationFormSaleTransactions', collectionobj);
        getData.then(function (response) {
            $scope.StudentsList = response.data;
            $scope.hideLoader();
            if ($scope.StudentsList.length>0)
                $('#divExample2').attr('style', "height:400px;overflow-y:scroll;overflow-x:hidden")
            else
                $('#divExample2').removeAttr('style')
        });
    };

    $scope.SaveRecord = function () {
        if (isValidate()) {
            if (($filter('filter')($scope.StudentsList, { Chk: true })).length > 0) {
                $scope.disableAdd = true;
                var collectionobj = {};
                collectionobj.StudentList = JSON.stringify($filter('filter')($scope.StudentsList, { Chk: true }))
                collectionobj.VDate = moment($scope.VDate).format('YYYY-MMM-DD');
                collectionobj.VType = $scope.VType
                if ($scope.VType == 'BR')
                    collectionobj.SubCode = $scope.BankACModel
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                collectionobj.CreatedBy = userid;
                collectionobj.UpdatedBy = userid;
                collectionobj.Action = "1";
                var getData = myService.methode('POST', '../Api/RegistrationTransactionApi/InsertUpdateDeleteRegistrationFeePosting', collectionobj);
                getData.then(function (response) {
                    $scope.disableAdd = false;
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
            else {
                showMsgBox("Sorry, No student selected for Registration Fee Posting.");
            }
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
        $scope.Save = "Post Registration Fee";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.VType = "";
        $scope.VDate = new Date();
        $scope.Status = "";
        $scope.BindBankLedger();
        $scope.StudentList = [];
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };



}











 
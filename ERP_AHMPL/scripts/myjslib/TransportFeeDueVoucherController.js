app.TransportFeeDueVoucherController = function ($scope, $element, $filter, myService) {

    $scope.Remaining = 0;
    $scope.StudentsList = [];

    setTimeout(function () {
        $scope.Save = "Post Voucher";
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

    $scope.SaveRecord = function () {
        if (isValidate()) {
            if (($filter('filter')($scope.ClassList, { chk: true }).length > 0)) {
                if ($scope.Remaining > 0) {
                    if (($filter('filter')($scope.StudentsList, { Chk: true })).length > 0) {
                        $scope.showLoader();
                        var collectionobj = {};
                        collectionobj.ClassList = JSON.stringify($filter('filter')($scope.ClassList, { chk: true }));
                        collectionobj.StudentList = JSON.stringify($filter('filter')($scope.StudentsList, { Chk: true }))
                        collectionobj.InstallmentCode = $scope.InstallmentCode
                        collectionobj.DueOn = moment($scope.DueOn).format('YYYY-MMM-DD');
                        collectionobj.ActiveParital = $scope.ddlActiveParital;
                        collectionobj.RelationshipId = relationshipId;
                        collectionobj.SessionId = sessionId;
                        collectionobj.FYId = fyId;
                        collectionobj.CreatedBy = userid;
                        collectionobj.UpdatedBy = userid;
                        collectionobj.Action = "1";
                        var getData = myService.methode('POST', '../Api/FeeTransactionApi/InsertUpdateDeleteTransportFeeDueVoucher', collectionobj);
                        getData.then(function (response) {
                            if (showMsgBox(response.data)) {
                                $scope.ClearControl(1);
                                $scope.GetNotStudentsPostedList();
                            }

                        });
                    }
                    else {
                        var InstallmentName = ($filter('filter')($scope.InstallmentList, { Code: $scope.InstallmentCode }))[0].InstallmentName;
                        showMsgBox("Sorry, No student is selected for Fee Due Voucher of " + InstallmentName + ".");
                    }
                }
                else {
                    var InstallmentName=($filter('filter')($scope.InstallmentList, { Code: $scope.InstallmentCode }))[0].InstallmentName;
                    showMsgBox("Sorry, No student is found for Fee Due Voucher of " + InstallmentName + ".");
                }
            }
            else {
                showMsgBox("At least one class should be selected.")
            }
        }
    };

    $scope.ddlClass_Change = function () {
        $scope.GetNoofStudentsPosted();
        $scope.GetNotStudentsPostedList();
    }
    $scope.ddlInstallment_Change = function () {
        $scope.GetNoofStudentsPosted();
        $scope.DueOn = new Date(($filter('filter')($scope.InstallmentList, { Code: $scope.InstallmentCode },true))[0].DueOn);
    }
    $scope.ddlActiveParital_Change = function () {
        $scope.GetNoofStudentsPosted();
    }

    $scope.ddlClassCheckAll_click = function () {
        $scope.GetNoofStudentsPosted();
        $scope.GetNotStudentsPostedList();
    }

    $scope.ddlClassUnCheckAll_click = function () {
        $scope.GetNoofStudentsPosted();
        $scope.GetNotStudentsPostedList();
    }

    $scope.GetNoofStudentsPosted = function () {
        $scope.TotalNoofStudents = 0;
        $scope.NoofStudentsPosted = 0;
        $scope.Remaining = 0;

        var collectionobj = {};
        collectionobj.ClassList = JSON.stringify($filter('filter')($scope.ClassList, { chk: true }));
        collectionobj.InstallmentCode = $scope.InstallmentCode
        collectionobj.ActiveParital = $scope.ddlActiveParital;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.Action = "5";
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetTransportFeeDueVoucher', collectionobj);
        getData.then(function (response) {
            if (response.data != null && response.data.length > 0) {
                $scope.TotalNoofStudents = response.data[0].TotalStd;
                $scope.NoofStudentsPosted = response.data[0].PostedStd;
                $scope.Remaining = response.data[0].Remaining;
            }
        });

    };

    $scope.GetNotStudentsPostedList = function () {
        $scope.ChkAll = false;
        $scope.showLoader();

        var collectionobj = {};
        collectionobj.ClassList = JSON.stringify($filter('filter')($scope.ClassList, { chk: true }));
        collectionobj.InstallmentCode = $scope.InstallmentCode
        collectionobj.ActiveParital = $scope.ddlActiveParital;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.Action = "6";
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetTransportFeeDueVoucher', collectionobj);
        getData.then(function (response) {
            $scope.StudentsList = response.data;
            $scope.hideLoader();
            if ($scope.StudentsList.length>0)
                $('#divExample2').attr('style', "height:400px;overflow-y:scroll;overflow-x:hidden")
            else
                $('#divExample2').removeAttr('style')
        });
    };

    $scope.GetPostedStudentsList = function () {
        var collectionobj = {};
        collectionobj.ClassList = JSON.stringify($filter('filter')($scope.ClassList, { chk: true }));
        collectionobj.InstallmentCode = $scope.InstallmentCode
        collectionobj.ActiveParital = $scope.ddlActiveParital;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.Action = "7";
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetTransportFeeDueVoucher', collectionobj);
        getData.then(function (response) {
            $scope.PostedStudentsList = response.data;
        });
    };

    $scope.GetStudentDueLedger = function (studentcode) {
        var collectionobj = {};
        collectionobj.StudentCode = studentcode
        collectionobj.InstallmentCode = $scope.InstallmentCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.Action = "8";
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetTransportFeeDueVoucher', collectionobj);
        getData.then(function (response) {
            $scope.StudentDueLedger = response.data;
        });
    };
    
    

    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.ResetControl = function (flag) {
        $scope.Save = "Post Voucher";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.ddlActiveParital = '1';
        $scope.GetNoofStudentsPosted();
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };

}











 
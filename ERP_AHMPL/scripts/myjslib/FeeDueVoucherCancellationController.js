app.FeeDueVoucherCancellationController = function ($scope, $element, $filter, myService) {

    $scope.Remaining = 0;
    $scope.PostedStudentsList = [];

    setTimeout(function () {
        $scope.Save = "Delete Posted Due Voucher(s)";
    }, 10)


    $scope.CheckUnCheckAll = function (value) {
        angular.forEach($scope.PostedStudentsList, function (array) {
            array.Chk = value;
        });
    }

    $scope.CheckUnCheck = function () {
        var flag = true;
        angular.forEach($scope.PostedStudentsList, function (array) {
            if (array.Chk == false) {
                flag = false;
            }
        });
        $scope.ChkAll = flag;
    }

    $scope.ddlClass_Change = function () {
        $scope.GetPostedStudentsList();
    }
    $scope.ddlInstallment_Change = function () {
        $scope.GetPostedStudentsList();
    }
    $scope.ddlActiveParital_Change = function () {
        $scope.GetPostedStudentsList();
    }

    $scope.ddlClassCheckAll_click = function () {
        $scope.GetPostedStudentsList();
    }

    $scope.ddlClassUnCheckAll_click = function () {
        $scope.GetPostedStudentsList();
    }

    //$scope.GetNoofStudentsPosted = function () {
    //    $scope.TotalNoofStudents = 0;
    //    $scope.NoofStudentsPosted = 0;
    //    $scope.Remaining = 0;

    //    var collectionobj = {};
    //    collectionobj.ClassList = JSON.stringify($filter('filter')($scope.ClassList, { chk: true }));
    //    collectionobj.InstallmentCode = $scope.InstallmentCode
    //    collectionobj.ActiveParital = $scope.ddlActiveParital;
    //    collectionobj.RelationshipId = relationshipId;
    //    collectionobj.SessionId = sessionId;
    //    collectionobj.FYId = fyId;
    //    collectionobj.Action = "5";
    //    var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetFeeDueVoucher', collectionobj);
    //    getData.then(function (response) {
    //        if (response.data != null && response.data.length > 0) {
    //            $scope.TotalNoofStudents = response.data[0].TotalStd;
    //            $scope.NoofStudentsPosted = response.data[0].PostedStd;
    //            $scope.Remaining = response.data[0].Remaining;
    //        }
    //    });

    //};

    //$scope.GetNotStudentsPostedList = function () {
    //    $scope.ChkAll = false;
    //    $scope.showLoader();

    //    var collectionobj = {};
    //    collectionobj.ClassList = JSON.stringify($filter('filter')($scope.ClassList, { chk: true }));
    //    collectionobj.InstallmentCode = $scope.InstallmentCode
    //    collectionobj.ActiveParital = $scope.ddlActiveParital;
    //    collectionobj.RelationshipId = relationshipId;
    //    collectionobj.SessionId = sessionId;
    //    collectionobj.FYId = fyId;
    //    collectionobj.Action = "6";
    //    var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetFeeDueVoucher', collectionobj);
    //    getData.then(function (response) {
    //        $scope.StudentsList = response.data;
    //        $scope.hideLoader();
    //        if ($scope.StudentsList.length>0)
    //            $('#divExample2').attr('style', "height:400px;overflow-y:scroll;overflow-x:hidden")
    //        else
    //            $('#divExample2').removeAttr('style')
    //    });
    //};

    $scope.GetPostedStudentsList = function () {
        $scope.ChkAll = false;
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.ClassList = JSON.stringify($filter('filter')($scope.ClassList, { chk: true }));
        collectionobj.InstallmentCode = $scope.InstallmentCode
        collectionobj.ActiveParital = $scope.ddlActiveParital;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.Action = "7";
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetFeeDueVoucher', collectionobj);
        getData.then(function (response) {
            $scope.PostedStudentsList = response.data;
            $scope.hideLoader();
            if ($scope.PostedStudentsList.length>0)
                $('#divExample2').attr('style', "height:400px;overflow-y:scroll;overflow-x:hidden")
            else
                $('#divExample2').removeAttr('style')
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
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetFeeDueVoucher', collectionobj);
        getData.then(function (response) {
            $scope.StudentDueLedger = response.data;
        });
    };
    $scope.SaveRecord = function () {
        $scope.DeleteRecord();
    }
    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        if (isValidate()) {
            if (($filter('filter')($scope.PostedStudentsList, { Chk: true })).length > 0) {
                deleteConfirmbox("Do you want to delete selected record(s)?", $scope.deleteRecord);
            }
            else {
                var InstallmentName = ($filter('filter')($scope.InstallmentList, { Code: $scope.InstallmentCode }))[0].InstallmentName;
                showMsgBox("Sorry, No student is found for Fee Due Voucher of " + InstallmentName + ".");
            }
        }
    };
    $scope.deleteRecord = function () {
       
       
            var collectionobj = {};
            collectionobj.StudentList = JSON.stringify($filter('filter')($scope.PostedStudentsList, { Chk: true }))
            collectionobj.InstallmentCode = $scope.InstallmentCode
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.Action = "3";
            var getData = myService.methode('POST', '../Api/FeeTransactionApi/InsertUpdateDeleteFeeDueVoucher', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
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
        $scope.Save = "Delete Posted Due Voucher(s)";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.ddlActiveParital = '1';
        $scope.GetPostedStudentsList();
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };



}











 
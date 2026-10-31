app.SendEmailSMSForEntranceMeritListController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlCommunicationVia');
    $scope.datedisable = true;

    $scope.GetStudentRecord = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.CommunicationVia = $scope.CommunicationVia;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetStudentRecordEntranceMeritList', collectionobj);
        getData.then(function (response) {
            $scope.studentlist = response.data
        });
    };

    $scope.$on('tablecellmarge', function () {
        $('#example2').margetable({
            type: 2,
            colindex: [1]
        });
    });

    $scope.CheckAll = function (flag) {
        $.each($scope.studentlist, function (index, obj) {
            obj.chk = flag;
        });
    }

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.ToDate = new Date(moment($scope.ToDate, 'DD-MMM-YYYY'));
            collectionobj.CommunicationVia = $scope.CommunicationVia;
            collectionobj.StudentData = JSON.stringify($filter('filter')($scope.studentlist, { 'chk': true }, true));
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            if ($scope.Save == "Send") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/InsertUpdateDeleteSendSMSEmailForEntranceMeritList', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
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
        $scope.Save = "Send";
        $scope.datedisable = true;
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.hfId = "";
        $scope.ToDate = new Date();
        $scope.CommunicationVia = "";
        $scope.studentlist = [];
        $scope.$applyAsync();
        $scope.SetFocus('#txtToDate');
        if (flag == 0) {
            showMsgBox('4');
        };
    };
}
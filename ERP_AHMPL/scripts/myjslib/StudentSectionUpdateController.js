app.StudentSectionUpdateController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlClass');
    $scope.txtlimit = 0;

    $scope.GetAllClass = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GblMasterApi/GetClasses', collectionobj);
        getData.then(function (response) {
            $scope.ClassList = response.data;
        });
    };

    $scope.GetSection = function (code) {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.ClassCode = code;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;

        var getData = myService.methode('POST', '../Api/GblMasterApi/GetSections', collectionobj);
        getData.then(function (response) {
            $scope.Sections = response.data;
        });
    };

    $scope.GetFieldsForUpdation = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;

        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetStudentDetailsForUpdation', collectionobj);
        getData.then(function (response) {
            $scope.FieldsNameList = response.data;
        });
    };
    $scope.GetFieldsForUpdation();
       
    $scope.GetStudentList = function () {
        var collectionobj = {};
        $scope.buttonUpdate = true;
        collectionobj.Action = '1';
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetStudentDetailsForUpdation', collectionobj);
        getData.then(function (response) {
            $scope.StudentList = response.data;
        });
    };

    $scope.SaveRecord = function () {
        if ($filter('filter')($scope.StudentList, { 'chk': true }, true).length > 0) {
            var collectionobj = {};
            collectionobj.Action = "5";
            collectionobj.RelationshipId = relationshipId;
            collectionobj.FYId = fyId;
            collectionobj.SessionId = sessionId;
            collectionobj.UpdatedBy = userid;
            collectionobj.StudentList = JSON.stringify($filter('filter')($scope.StudentList, { 'chk': true }, true));
            if ($scope.Update == "Update") {
                var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/UpdateStudentDetails', collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
        }
        else {
            showMsgBox("Please Select Atleast One Student For Updation.");
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
        $scope.ClassCode = "";
        $scope.StudentList = [];

        $scope.$applyAsync();
        $scope.SetFocus('#ddlClass');
        if (flag == 0) {
            showMsgBox('4');
        };
    }
}
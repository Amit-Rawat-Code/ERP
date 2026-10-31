app.AssignStudentRollNumberController = function($scope, $element, $filter, myService){
    $scope.SetFocus('#ddlClassSection');

    $scope.ddlClass_Change = function ()
    {
        var collectionobj = {};
        collectionobj.Action = '4';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SectionCode = $scope.AllClassSection;
       
        var getData = myService.methode('POST', "/Api/StudentAttendanceApi/GetStudentDataForRollNumber", collectionobj);
        getData.then(function (response) {
            if (response.data) {
                $scope.StudentList = response.data;
            }
            
        }); 
    }
    $scope.Order_Change = function () {
        
        var collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SectionCode = $scope.AllClassSection;
        collectionobj.OrderBy = $scope.OrderBy;
        var getData = myService.methode('POST', "/Api/StudentAttendanceApi/GetStudentDataForRollNumber", collectionobj);
        getData.then(function (response) {
            
            $scope.StudentList = response.data;
        }); 
    }

    $scope.SaveRecord = function () {
        debugger
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.StudentList = JSON.stringify($scope.StudentList);
            collectionobj.SectionCode = $scope.AllClassSection;
            collectionobj.AcademicSessionID = sessionId;
            collectionobj.UpdatedBy = userid;
            collectionobj.Action = 1;
            //if ($scope.Save == "Save") {
            //    collectionobj.Action = 1;
            //}
            //else {
            //    collectionobj.Action = 2;
            //}
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            var getData = myService.methode('POST', "/Api/StudentAttendanceApi/InsertUpdateDeleteStudentRollNumber", collectionobj);
            getData.then(function (response) {
                debugger
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
        else
        {
            showMsgBox("Oops! Please Select Signature....");
            $scope.hideLoader();
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

        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.AllClassSection = '';
        $scope.OrderBy = '';
        $scope.StudentList = [];
        $scope.SetFocus('#ddlClassSection')
        $scope.hfId = "";
        if (flag == 0) {
            showMsgBox('4');
        };
    }

}
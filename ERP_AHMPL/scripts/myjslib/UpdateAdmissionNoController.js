app.UpdateAdmissionNoController = function ($scope, $element, $filter, myService)
{
    $scope.tableData = true;
    $scope.buttonUpdate = true;
    $scope.GetAllStudentAdmissionNoByClassSection = function ()
    {
        var collectionobj = {};
        collectionobj.Action = 1;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.SectionCode = $scope.AllClassSection;
        var getData = myService.methode('POST', "../Api/AdmissionTransactionApi/GetStudentAdmissionNoByClassSection", collectionobj);
        getData.then(function (response)
        {
            if (response.data.length > 0)
            {
                $scope.StudentAdmissionNoLists = response.data;
                $scope.tableData = false;
                $scope.buttonUpdate = false;
            }
            else
            {
                $scope.StudentAdmissionNoLists = response.data;
                $scope.tableData = true;
                $scope.buttonUpdate = true;
            }
        });
    };

    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function ()
    {
        if ($filter('filter')($scope.StudentAdmissionNoLists, { 'chk': true }, true).length > 0)
        {
            var collectionobj = {};
            collectionobj.Action = 1;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.FYId = fyId;
            collectionobj.SessionId = sessionId;
            collectionobj.UpdatedBy = userid;
            collectionobj.StudentAdmissionNoLists = JSON.stringify($filter('filter')($scope.StudentAdmissionNoLists, { 'chk': true }, true));
            if ($scope.Update == "Update")
            {
                var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/UpdateStudentAdmissionNo', collectionobj);
                getData.then(function (response)
                {
                    if (showMsgBox(response.data))
                    {
                        $scope.ClearControl(1);
                        
                    }
                });
            }
        }
        else
        {
            showMsgBox("Check Atleast One CheckBox.");
        }
    }
    $scope.ClearControl = function (flag)
    {
        if (flag == 1)
        {
            $scope.ResetControl(flag);
        }
        else
        {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };
    $scope.ResetControl = function (flag)
    {
        $scope.AllClassSection = '';
        $scope.StudentAdmissionNoLists = {};
        $scope.tableData = true;
        $scope.buttonUpdate = true;
    };

}
app.AllotNewTeacherController = function ($scope, $element, $filter, myService)
{


    $scope.GetEmployee = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetEmployeeList', collectionobj);
        getData.then(function (response) {

            $scope.TeacherList = response.data;
        });
    }

    $scope.ddlOldEmployeeCode_Change = function ()
    {
        
        var collectionobj = {};
        collectionobj.Action = "1";
        collectionobj.OldEmployeeCode = $scope.OldEmployeeCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableTransactionApi/GetAllotNewTeacherMaster', collectionobj);
        getData.then(function (response) {
            $scope.TeacherSubjectList = response.data;
        });
    }

    $scope.fillddlNewEmployee = function () {
        
        var collectionobj = {};  
        collectionobj.OldEmployeeCode = $scope.OldEmployeeCode;
        collectionobj.Action = "2";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableTransactionApi/GetAllotNewTeacherMaster', collectionobj);
        getData.then(function (response) {

            $scope.NewTeacherList = response.data;
        });
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
        $scope.disableForEdit = false;
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.disabledDDLClass = false;
        $scope.hfId = "";       
        $scope.TeacherSubjectList = [];
        $scope.NewTeacherList = [];
        $scope.IsActive = "true";
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };
    /* Save Button Click Event */
    $scope.SaveRecord = function ()
    {
        
        if (isValidate())
        {
            if (($scope.TeacherSubjectList).length > 0)
            {
                var collectionobj = {};
                collectionobj.TransID = $scope.hfId;              
                collectionobj.OldEmployeeCode = $scope.OldEmployeeCode;
                collectionobj.NewEmployeeCode = $scope.NewEmployeeCode;
                collectionobj.AllotNewTeacherData = JSON.stringify(($scope.TeacherSubjectList));
                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                collectionobj.RelationshipId = relationshipId;
                if ($scope.Save == 'Edit') {
                    collectionobj.Action = "7";
                }
                else {
                    collectionobj.Action = "3";
                }
                collectionobj.CreatedBy = userid;
                collectionobj.UpdatedBy = userid;
                var getData = myService.methode('POST', '../Api/TimeTableTransactionApi/InsertUpdateDeleteAllotNewTeacherMaster', collectionobj);

                getData.then(function (response)
                {
                    if (showMsgBox(response.data))
                    {
                        $scope.ClearControl(1);
                    }
                });
            }
        };
    }

    /*Search Button Click Event*/
    $scope.AllotNewTeacherList = [];
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function ()
    {
        $scope.disable = true;
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/TimeTableTransactionApi/GetAllotNewTeacherMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [            
                    { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Old Teacher", "HeaderValue": "OldEmployeeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "New Teacher", "HeaderValue": "NewEmployeeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Classes", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.AllotNewTeacherList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event) {

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.AllotNewTeacherList = $filter('filter')($scope.AllotNewTeacherList, { TransID: $scope.hfId }, true);

                //$scope.hfId = $scope.AllotNewTeacherList[0].TransID;
                //$scope.showLoader();
                var collectionobj = {};
                collectionobj.TransID = $scope.hfId;
                collectionobj.Action = "6";
                collectionobj.RelationshipId = relationshipId;
                collectionobj.FYId = fyId;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/TimeTableTransactionApi/GetAllotNewTeacherMaster', collectionobj);
                getData.then(function (response) {

                    $scope.TeacherSubjectList = response.data;
                    $scope.fillddlNewEmployee();
                });
                //debugger
                //var collectionobj = {};
                //collectionobj.OldEmployeeCode = $scope.OldEmployeeCode;
                //collectionobj.Action = "2";
                //collectionobj.RelationshipId = relationshipId;
                //collectionobj.SessionId = sessionId;
                //var getData = myService.methode('POST', '../Api/TimeTableTransactionApi/GetAllotNewTeacherMaster', collectionobj);
                //getData.then(function (response) {

                //    $scope.NewTeacherList = response.data;
                //});

         
                $scope.OldEmployeeCode = $scope.AllotNewTeacherList[0].OldEmployeeCode;
                $scope.NewEmployeeCode = $scope.AllotNewTeacherList[0].NewEmployeeCode;
                //$scope.TeacherSubjectList = response.data;
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#FromDate', true);
            });
        });
    };
    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
        debugger;
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.TransID = $scope.TransID;      
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/TimeTableTransactionApi/InsertUpdateDeleteAllotNewTeacherMaster', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };

}
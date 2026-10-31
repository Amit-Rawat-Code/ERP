app.ConceptMasterController = function ($scope, $element, $filter, myService)
{
    $scope.GetAllClass = function ()
    {
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GblMasterApi/GetClasses', collectionobj);
        getData.then(function (response)
        {
            $scope.ClassList = response.data;
        });
    };
    $scope.GetAllClassWiseSubject = function ()
    {        
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.ClassCode = $scope.ClassCode; 
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetConceptMaster', collectionobj);
        getData.then(function (response)
        {
            $scope.SubjectList = response.data;
        });
    };

    $scope.ConceptList = [];
    $scope.AddRow = function () {
        $scope.ConceptList.push({
            Srno: "1",
            ConceptName: "",
        });
    }

    $scope.RemoveRow = function (srno) {
        $scope.ConceptList = $filter('filter')($scope.ConceptList, { Srno: '!' + srno });
    }

    /* Save Button Click Event */
    $scope.SaveRecord = function ()
    {
        if (isValidate())
        {
            var collectionobj = {};
            collectionobj.ConceptData = JSON.stringify($scope.ConceptList); 
            collectionobj.SubjectCode = $scope.SubjectCode; 
            collectionobj.ClassCode = $scope.ClassCode; 
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            if ($scope.Save == "Save")
            {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit")
            {
                collectionobj.Action = "4";
                collectionobj.IsActive = $scope.IsActive;
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }
            var getData = myService.methode('POST', '../Api/AssessmentApi/InsertUpdateDeleteConceptMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data))
                {
                    $scope.ClearControl(1);
                }

            });
        }
    };

    $scope.ConceptMasterList = [];

    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function ()
    {
        var collectionobj = {};
        collectionobj.Action = "2";
        collectionobj.RelationshipId = relationshipId; 
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetConceptMaster', collectionobj);
        getData.then(function (response)
        {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Subject", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                   
                ];
            
            $scope.ConceptMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event)
            {
                
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ConceptMasterList = $filter('filter')($scope.ConceptMasterList, { 'Code': $scope.hfId }, true);
                $scope.ConceptMasterList = $scope.ConceptMasterList;
                $scope.ClassCode = $scope.ConceptMasterList[0].ClassCode;
                $scope.SubjectCode = $scope.ConceptMasterList[0].SubjectCode;
                $scope.GetAllClassWiseSubject();

                var collectionobj = {};
                collectionobj.Action = "5";
                collectionobj.Code = $scope.hfId;  
                var getData = myService.methode('POST', '../Api/AssessmentApi/GetConceptMaster', collectionobj);
                getData.then(function (response)
                {
                    if (response.data)
                    {
                        $scope.ConceptList = response.data;
                    }
                });
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                //$scope.SetFocus('#ddlSession', true);
            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function ()
    {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function ()
    {
        debugger
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.Code = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;  
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/AssessmentApi/InsertUpdateDeleteConceptMaster', collectionobj);
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
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.hfId = "";
        $scope.ClassCode = '';
        $scope.SubjectCode = '';
        $scope.ConceptMasterList = [];
        $scope.ConceptList = [];       
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };
}

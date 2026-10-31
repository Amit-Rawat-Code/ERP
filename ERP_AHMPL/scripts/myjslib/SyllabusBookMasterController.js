app.SyllabusBookMasterController = function ($scope, $element, $filter, myService)
{
    $scope.EntryDate = new Date();

    $scope.GetYear = function () {
        debugger
        var collectionobj = {};
        collectionobj.Action = '1';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GblMasterApi/GetAllYear', collectionobj);
        getData.then(function (response) {
            $scope.YearList = response.data;
        });
    };

    $scope.GetYear();

    /* Save Button Click Event */
    $scope.SaveRecord = function () {           
        if (isValidate()) {            
            var collectionobj = {};
            collectionobj.BookName = $scope.BookName;
            collectionobj.Publication = $scope.Publication;
            collectionobj.EntryDate = $scope.EntryDate;
            collectionobj.Year1 = $scope.Year1;

            collectionobj.FYId = fyId;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            if ($scope.Save == "Save")
            {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit")
            {
                collectionobj.Action = "2";
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }
            var getData = myService.methode('POST', '../Api/AssessmentApi/InsertUpdateDeleteSyllabusBookMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });
        }
    };

    $scope.SyllabusBookMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetSyllabusBookMaster', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Name Of Book", "HeaderValue": "NameOfBook", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Publication", "HeaderValue": "Publication", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Publication Year", "HeaderValue": "Year1", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }

                ];

            $scope.SyllabusBookMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.SyllabusBookMasterList = $filter('filter')($scope.SyllabusBookMasterList, { 'Code': $scope.hfId }, true);
                $scope.SyllabusBookMasterList = $scope.SyllabusBookMasterList;
                $scope.EntryDate = $scope.ConverDate($scope.SyllabusBookMasterList[0].EntryDate); 
                $scope.BookName = $scope.SyllabusBookMasterList[0].NameOfBook;
                $scope.Publication = $scope.SyllabusBookMasterList[0].Publication;
                $scope.Year1 = $scope.SyllabusBookMasterList[0].Year1;   
                $scope.IsActive = $scope.SyllabusBookMasterList[0].IsActive == true ? "true" : "false"; ;    
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
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
        debugger
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.Code = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/AssessmentApi/InsertUpdateDeleteSyllabusBookMaster', collectionobj);
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
    $scope.ResetControl = function (flag)
    {
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.hfId = "";
        $scope.SyllabusBookMasterList = [];
        $scope.EntryDate = ''
        $scope.BookName = ''
        $scope.Publication = '';
        $scope.Year1 = '';
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };
}

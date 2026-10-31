app.SubjectMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlSubjectGroup');  

    $scope.ddlSubjectGroup_Change = function () {
        $scope.SubjectName = ($filter('filter')($scope.SubjectGroups, { 'Code': $scope.SubjectGroupCode }, true))[0].SubjectGroupName;
    }

    /* Save Button Click Event */
    $scope.SaveRecord = function ()
    {
        if (isValidate())
        {
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.SubjectGroupCode = $scope.SubjectGroupCode;
            collectionobj.SubjectName = $scope.SubjectName;
            collectionobj.SubjectCode = $scope.SubjectCode;
            collectionobj.Abbreviation = $scope.Abbreviation;
            collectionobj.ColorCode = $scope.ColorCode;
            collectionobj.DisplayOrder = $scope.DisplayOrder;
            collectionobj.FYId = fyId;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
            }
            var getData = myService.methode('POST', '../Api/TimeTableApi/InsertUpdateDeleteSubjectMaster', collectionobj);
            getData.then(function (response)
            {
                if (showMsgBox(response.data))
                {
                    $scope.ClearControl(1);
                }

            });
        }
    };

    $scope.GetDisplayOrder = function () {

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetSubjectMaster', collectionobj);
        getData.then(function (response) {
            if (response.data == null)
                $scope.DisplayOrder = 1;
            else
                $scope.DisplayOrder = response.data.length + 1;
        });
    }

    $scope.GetDisplayOrder();
    /*Search Button Click Event*/
    $scope.SubjectMasterList = [];
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
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetSubjectMaster', collectionobj);
        getData.then(function (response) {
            
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Subject Group", "HeaderValue": "SubjectGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Subject Name", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Subject Code", "HeaderValue": "SubjectCode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Abbreviation", "HeaderValue": "Abbreviation", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Sequence No.", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Color Code", "HeaderValue": "ColorCode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },                   
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.SubjectMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.SubjectMasterList = $filter('filter')($scope.SubjectMasterList, { 'Code': $scope.hfId }, true);  
               
                $scope.SubjectGroupCode = $scope.SubjectMasterList[0].SubjectGroupCode;
                $scope.SubjectName = $scope.SubjectMasterList[0].SubjectName;
                $scope.SubjectCode = $scope.SubjectMasterList[0].SubjectCode;
                $scope.Abbreviation = $scope.SubjectMasterList[0].Abbreviation;
                $scope.ColorCode = $scope.SubjectMasterList[0].ColorCode;
                $scope.DisplayOrder = $scope.SubjectMasterList[0].DisplayOrder;
                $scope.IsActive = $scope.SubjectMasterList[0].IsActive == true ? "true" : "false"; 
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableAdd=false;
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlSubjectGroup', true);
            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.Code = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableApi/InsertUpdateDeleteSubjectMaster', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };

    /*Clear Button Click Event*/
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
        $scope.SubjectGroupCode = "";
        $scope.SubjectName = "";
        $scope.SubjectCode = "";
        $scope.Abbreviation = "";
        $scope.ColorCode = "";
        $scope.GetDisplayOrder();
        $scope.IsActive = "true";
        $scope.SubjectMasterList = [];
        $scope.$applyAsync();
        $scope.SetFocus('#ddlSubjectGroup');
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    /*Refresh Search Table Record*/
    $(document).on("click", ".RefreshSearchTable", function (e) {
        
        var panelToRefresh = $(this).closest('.panel').find('.refresh-container');
        var dataToRefresh = $(this).closest('.panel').find('.panel-wrapper');
        var loadingAnim = panelToRefresh.find('.loading-progress');
        panelToRefresh.show();
        setTimeout(function () {
            loadingAnim.addClass('la-animate');
        }, 100);
        $scope.started();
        return false;
    });
    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Subject Group", "HeaderValue": "SubjectGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Subject", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Subject Code", "HeaderValue": "SubjectCode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Abbreviation", "HeaderValue": "Abbreviation", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Sequence No.", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Color Code", "HeaderValue": "ColorCode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];
        $scope.PrintMaster(tblheader, $scope.SubjectMasterList, window.document.title);
    };
}
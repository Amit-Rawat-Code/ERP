app.FeeStructureGroupMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#FeeStructureGroupName');
    $scope.SessionId = sessionId;

    $scope.SaveRecord = function () {
        if (isValidate()) {           
            var collectionobj = {};         
            collectionobj.FeeStructureGroupName = $scope.FeeStructureGroupName;  
            collectionobj.Abbreviation = $scope.Abbreviation;  
            collectionobj.AcademicSessionId = $scope.SessionId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
                collectionobj.IsActive = $scope.IsActive;
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }
            var getData = myService.methode('POST', '../Api/FeeMasterApi/InsertUpdateDeleteFeeStructureGroupMaster', collectionobj);

            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });
        }
    };

    $scope.FeeStructureGroupMasterList = [];

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

        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetFeeStructureGroupMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "AcademicSession", "HeaderValue": "AcademicSession", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Fee Structure Group Name", "HeaderValue": "FeeStructureGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Abbreviation", "HeaderValue": "Abbreviation", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            $scope.FeeStructureGroupMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, $scope.FeeStructureGroupMasterList);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.FeeStructureGroupMasterList = $filter('filter')($scope.FeeStructureGroupMasterList, { 'Code': $scope.hfId }, true);

                $scope.FeeStructureGroupName = $scope.FeeStructureGroupMasterList[0].FeeStructureGroupName;
                $scope.SessionId = $scope.FeeStructureGroupMasterList[0].AcademicSessionId;
                $scope.Abbreviation = $scope.FeeStructureGroupMasterList[0].Abbreviation;   
                $scope.IsActive = $scope.FeeStructureGroupMasterList[0].IsActive == true ? "true" : "false"; 
   
                $scope.hideLoader();
                $scope.Save = "Edit";
                // $scope.disableAdd=true;
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#FeeStructureGroupName', true);
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
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/InsertUpdateDeleteFeeStructureGroupMaster', collectionobj);
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
        $scope.FeeStructureGroupName = "";
        $scope.AcademicSessionId = sessionId;
        $scope.Abbreviation = "";
        $scope.IsActive="true";
        $scope.$applyAsync();
        $scope.SetFocus('#FeeStructureGroupName');
        if (flag == 0) {
            showMsgBox('4');
        };
    };


    $scope.SetAbbr = function () {
        var array = $scope.FeeStructureGroupName.split(' ');
        if (array.length > 0 && array.length < 2)
            $scope.Abbreviation = $scope.FeeStructureGroupName.substr(0, 2);
        else if (array.length > 1) {
            $scope.Abbreviation = array[0].substr(0, 1) + array[1].substr(0, 1);
        }
        else {
            $scope.Abbreviation = "";
        }
    }
}
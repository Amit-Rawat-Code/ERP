app.InventoryModelMasterController = function ($scope, $element, $filter, myService)
{
    $scope.SetFocus('#txtModelName');

    $scope.SaveRecord = function () {
     
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.ModelName = $scope.ModelName;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;

            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
                collectionobj.CreatedBy = userid;
            }
            else {
                collectionobj.Action = 2;
                collectionobj.UpdatedBy = userid;
            }
            var getData = myService.methode('POST', "../Api/InventoryMasterApi/InsertUpdateDeleteModelMaster", collectionobj);
            getData.then(function (response) {
                
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
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
        $scope.ModelName = "";
        $scope.SetFocus('#txtHSNCode');
        $scope.IsActive = "true";
        $scope.hfId = "";
        if (flag == 0) {
            showMsgBox('4');
        };
    }
   

    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', "../Api/InventoryMasterApi/GetModelMaster", collectionobj);
        getData.then(function (response) {
            debugger
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                   { "HeaderText": "Model Name", "HeaderValue": "ModelName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                   { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            $scope.ModelMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ModelMasterList = $filter('filter')($scope.ModelMasterList, { 'Code': $scope.hfId });
                $scope.ModelName = $scope.ModelMasterList[0].ModelName;
                $scope.IsActive = $scope.ModelMasterList[0].IsActive.toString();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#txtHSNCode', true);
                $scope.hideLoader();


            });
        });
    };
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {

        debugger;
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.Code = $scope.hfId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;

        var getData = myService.methode('POST', "../Api/InventoryMasterApi/InsertUpdateDeleteModelMaster", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };
    $(document).on("click", ".RefreshSearchTable", function (e) {
        debugger;
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
        debugger
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Sr", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Model Name", "HeaderValue": "ModelName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];

        $scope.PrintMaster(tblheader, $scope.ModelMasterList, window.document.title);
    };
}
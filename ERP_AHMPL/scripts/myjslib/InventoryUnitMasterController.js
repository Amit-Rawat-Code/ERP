app.InventoryUnitMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtUnitName')

    $scope.SaveRecord = function () {
        
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};

            collectionobj.Code = $scope.hfId;
            collectionobj.Name = $scope.Name;
            collectionobj.ShortName = $scope.ShortName;
            collectionobj.DisplayOrder = $scope.DisplayOrder;
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
            var getData = myService.methode('POST', "../Api/InventoryMasterApi/InsertUpdateDeleteUnitMaster", collectionobj);
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
        $scope.Code = "";
        $scope.Name = "";
        $scope.ShortName = "";
        $scope.GetDisplayOrder();
        $scope.SetFocus('#txtUnitName');
        $scope.IsActive = "true";
        $scope.hfId = "";
        $scope.UnitMasterList = [];
        if (flag == 0) {
            showMsgBox('4');
        };

    }

    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.GetDisplayOrder = function () {

        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        
        var getData = myService.methode('POST', "../Api/InventoryMasterApi/GetUnitMaster", collectionobj);
        getData.then(function (response) {
            if (response.data == null)
                $scope.DisplayOrder = 1;
            else
                $scope.DisplayOrder = response.data.length + 1;
        });
    }

    $scope.GetDisplayOrder();
    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
       
        var getData = myService.methode('POST', "../Api/InventoryMasterApi/GetUnitMaster", collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Unit Name", "HeaderValue": "Name", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Short Name", "HeaderValue": "ShortName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "DisplayOrder", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" },
                ];

            $scope.UnitMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.UnitMasterList = $filter('filter')($scope.UnitMasterList, { 'Code': $scope.hfId });
                $scope.Name = $scope.UnitMasterList[0].Name;
                $scope.ShortName = $scope.UnitMasterList[0].ShortName;
                $scope.DisplayOrder = $scope.UnitMasterList[0].DisplayOrder;
                $scope.IsActive = $scope.UnitMasterList[0].IsActive.toString();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#txtUnitName', true);
                $scope.hideLoader();


            });
        });
    };

    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {

        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.Code = $scope.hfId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;

        var getData = myService.methode('POST', "../Api/InventoryMasterApi/InsertUpdateDeleteUnitMaster", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };
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
                { "HeaderText": "Unit Name", "HeaderValue": "Name", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Short Name", "HeaderValue": "ShortName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "DisplayOrder", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" },
            ];

        $scope.PrintMaster(tblheader, $scope.UnitMasterList, window.document.title);
    };

}
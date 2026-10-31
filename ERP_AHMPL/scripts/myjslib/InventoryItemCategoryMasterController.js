app.InventoryItemCategoryMasterController = function ($scope, $element, $filter, myService)
{
    $scope.SetFocus('#txtItemCategoryName');

    $scope.BindItemGroup = function () {
        collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', "../Api/InventoryMasterApi/GetItemGroupMaster", collectionobj);
        getData.then(function (response) {
        
            $scope.ItemGroupList = response.data;
        });
    }

    $scope.SaveRecord = function () {
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.CategoryName = $scope.CategoryName;
            collectionobj.ItemGroupCode = $scope.ItemGroupCode;
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
            var getData = myService.methode('POST', "../Api/InventoryMasterApi/InsertUpdateDeleteItemCategoryMaster", collectionobj);
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
        $scope.CategoryName = "";
        $scope.ItemGroupCode = "";
        $scope.SetFocus('#txtItemCategoryName');
        $scope.IsActive = "true";
        $scope.hfId = "";
        $scope.ItemCategoryMasterList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
    }

    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    }

    $scope.started = function () {
       
        var collectionobj = {};
        collectionobj.Action = 4
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        
        var getData = myService.methode('POST', "../Api/InventoryMasterApi/GetItemCategoryMaster", collectionobj);
        getData.then(function (response) {
            
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Item Category Name", "HeaderValue": "CategoryName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Item Group Name", "Value": "Name", "HeaderValue": "Name", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "isactive" },
                ];

            $scope.ItemCategoryMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
                
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ItemCategoryMasterList = $filter('filter')($scope.ItemCategoryMasterList, { 'Code': $scope.hfId });
                $scope.CategoryName = $scope.ItemCategoryMasterList[0].CategoryName;
                $scope.ItemGroupCode = $scope.ItemCategoryMasterList[0].ItemGroupCode;
                $scope.IsActive = $scope.ItemCategoryMasterList[0].IsActive.toString();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#txtItemCategoryName', true);
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

        var getData = myService.methode('POST', "../Api/InventoryMasterApi/InsertUpdateDeleteItemCategoryMaster", collectionobj);
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
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Item Category Name", "HeaderValue": "CategoryName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Item Group Name", "Value": "ItemGroupCode", "HeaderValue": "ItemGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "isactive" },
            ];
        $scope.PrintMaster(tblheader, $scope.ItemCategoryMasterList, window.document.title);
    };

}
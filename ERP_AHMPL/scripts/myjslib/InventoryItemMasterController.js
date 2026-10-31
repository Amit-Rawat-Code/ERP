app.InventoryItemMasterController = function ($scope, $element, $filter, myService) {

    $scope.SetFocus('#txtItemName');

    $scope.BindItemCategory = function () {
        
        collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;

        var getData = myService.methode('POST', "../Api/InventoryMasterApi/GetItemCategoryMaster", collectionobj);
        getData.then(function (response) {
            
            $scope.ItemCategoryList = response.data;
        })
    };
    $scope.ddlItemCategory_change = function (ItemCategoryCode) {
       debugger
        collectionobj = {};
        collectionobj.Action = '6';
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.Code = ItemCategoryCode;

        var getData = myService.methode('POST', "../Api/InventoryMasterApi/GetItemCategoryMaster", collectionobj);
        getData.then(function (response) {
           
            if (response.data.length > 0) {
                $scope.ItemGroupList = response.data;
                $scope.ItemGroupCode = $scope.ItemGroupList[0].ItemGroupCode;
                $scope.ItemGroupName = $scope.ItemGroupList[0].ItemGroupName;

            }
            else {
                $scope.ItemGroupName = '';
            }

        })
    }
    $scope.BindUnit = function () {

        collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;

        var getData = myService.methode('POST', "../Api/InventoryMasterApi/GetUnitMaster", collectionobj);
        getData.then(function (response) {

            $scope.UnitCodeList = response.data;
        })
    };

    $scope.BindVatCommodity = function ()
    {
        collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;

        var getData = myService.methode('POST', "../Api/InventoryMasterApi/GetCommodityMaster", collectionobj);
        getData.then(function (response) {

            $scope.VatCommodityList = response.data;
        })
    }

    $scope.SaveRecord = function () {
        debugger
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.ItemName = $scope.ItemName;
            collectionobj.ItemCode = $scope.ItemCode;
            collectionobj.ItemCategoryCode = $scope.ItemCategoryCode;
            collectionobj.ItemGroupCode = $scope.ItemGroupCode;
            collectionobj.BaseUnitCode = $scope.BaseUnitCode;
            collectionobj.MaxQty = $scope.MaxQty;
            collectionobj.MinQty = $scope.MinQty;
            collectionobj.ItemType = $scope.ItemType;
            collectionobj.VATComCode = $scope.VATComCode;
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
            var getData = myService.methode('POST', "../Api/InventoryMasterApi/InsertUpdateDeleteItemMaster", collectionobj);
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
        $scope.Code = '';
        $scope.ItemName = '';
        $scope.ItemCode = '';
        $scope.ItemCategoryCode = '';
        $scope.ItemGroupCode = '';
        $scope.ItemGroupName = '';
        $scope.BaseUnitCode = '';
        $scope.MaxQty = '';
        $scope.MinQty = '';
        $scope.ItemType = '';
        $scope.VATComCode = '';
        $scope.SetFocus('#txtItemName');
        $scope.IsActive = "true";
        $scope.hfId = '';
        $scope.ItemMasterList = [];
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
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', "../Api/InventoryMasterApi/GetItemMaster", collectionobj);
        getData.then(function (response) {
           
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Item Name", "HeaderValue": "ItemName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Short Name", "HeaderValue": "ItemCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Item Category Name", "HeaderValue": "ItemCategory", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Item Group Name", "HeaderValue": "ItemGroup", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit", "HeaderValue": "Unit", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Maximum Quantity", "HeaderValue": "MaxQty", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Minimum Quantity", "HeaderValue": "MinQty", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Item Type", "HeaderValue": "ItemType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "isactive" },
                ];

            $scope.ItemMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
                debugger
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ItemMasterList = $filter('filter')($scope.ItemMasterList, { 'Code': $scope.hfId });
                $scope.ItemName = $scope.ItemMasterList[0].ItemName;
                $scope.ItemCode = $scope.ItemMasterList[0].ItemCode;
                $scope.ItemCategoryCode = $scope.ItemMasterList[0].ItemCategoryCode;
                $scope.ItemGroupCode = $scope.ItemMasterList[0].ItemGroupCode;
                $scope.ddlItemCategory_change($scope.ItemCategoryCode);    
                $scope.BaseUnitCode = $scope.ItemMasterList[0].BaseUnitCode;
                $scope.MaxQty = $scope.ItemMasterList[0].MaxQty;
                $scope.MinQty = $scope.ItemMasterList[0].MinQty;
                $scope.ItemType = $scope.ItemMasterList[0].ItemType;
                $scope.VATComCode = $scope.ItemMasterList[0].VATComCode;
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

        debugger;
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.Code = $scope.hfId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;

        var getData = myService.methode('POST', "../Api/InventoryMasterApi/InsertUpdateDeleteItemMaster", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };

    
}